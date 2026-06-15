-- Executar no SQL Editor do Supabase

-- Criar tabela de Grupos
CREATE TABLE IF NOT EXISTS public.groups (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    code TEXT UNIQUE NOT NULL,
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Criar tabela de Perfis (Profiles) se não existir
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    username TEXT,
    avatar_id TEXT DEFAULT '01', -- Começa com o avatar 01
    group_id UUID REFERENCES public.groups(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Ativar RLS (Row Level Security)
ALTER TABLE public.groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Políticas para groups: qualquer usuário autenticado pode ler, criar e atualizar
CREATE POLICY "Enable read access for all authenticated users on groups" ON public.groups FOR SELECT TO authenticated USING (true);
CREATE POLICY "Enable insert for authenticated users only on groups" ON public.groups FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Enable update for users on their groups" ON public.groups FOR UPDATE TO authenticated USING (true);

-- Políticas para profiles: qualquer usuário autenticado pode ler, mas só atualizar o próprio perfil
CREATE POLICY "Enable read access for all authenticated users on profiles" ON public.profiles FOR SELECT TO authenticated USING (true);
CREATE POLICY "Enable insert for authenticated users only on profiles" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);
CREATE POLICY "Enable update for users based on email on profiles" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id);

-- Trigger para criar um perfil automaticamente quando um usuário se cadastrar (opcional mas recomendado)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, username, avatar_id)
  VALUES (new.id, split_part(new.email, '@', 1), '01');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Se o trigger não existir, cria-se
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Para os usuários que já existem (se houver), rodar esse script manual para criar o perfil:
INSERT INTO public.profiles (id, username, avatar_id)
SELECT id, split_part(email, '@', 1), '01'
FROM auth.users
ON CONFLICT (id) DO NOTHING;
