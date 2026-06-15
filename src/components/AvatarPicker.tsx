import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { ArrowLeft } from 'lucide-react';
import './AvatarPicker.css';

// Importando os 5 avatares
import avatar01 from '../assets/images/avatares/01.png';
import avatar02 from '../assets/images/avatares/02.png';
import avatar03 from '../assets/images/avatares/03.png';
import avatar04 from '../assets/images/avatares/04.png';
import avatar05 from '../assets/images/avatares/05.png';

/**
 * Tela de Seleção de Avatar — acessada ao clicar no avatar dentro do Perfil.
 *
 * Exibe um grid com os 5 avatares disponíveis.
 * Ao clicar em um, ele é salvo no Supabase (tabela `profiles`)
 * e o usuário é redirecionado de volta para o Perfil.
 *
 * Acessibilidade:
 * - Os avatares usam role="radiogroup" + role="radio" para seleção.
 * - Cada avatar tem aria-checked e aria-label.
 * - Navegação por teclado suportada (Enter para selecionar).
 */

interface AvatarOption {
  id: string;
  src: string;
  label: string;
}

const avatars: AvatarOption[] = [
  { id: '01', src: avatar01, label: 'Avatar 1 — personagem com cabelo loiro' },
  { id: '02', src: avatar02, label: 'Avatar 2 — personagem com cabelo escuro' },
  { id: '03', src: avatar03, label: 'Avatar 3 — personagem com cabelo castanho' },
  { id: '04', src: avatar04, label: 'Avatar 4 — personagem com fundo vermelho' },
  { id: '05', src: avatar05, label: 'Avatar 5 — personagem com fundo vermelho escuro' },
];

export default function AvatarPicker() {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState('01');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Busca o avatar atual do usuário para marcar como selecionado
    const fetchCurrentAvatar = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const { data: profile } = await supabase
        .from('profiles')
        .select('avatar_id')
        .eq('id', session.user.id)
        .single();

      if (profile?.avatar_id) {
        setSelectedId(profile.avatar_id);
      }
    };
    fetchCurrentAvatar();
  }, []);

  const handleSelect = async (avatarId: string) => {
    setSelectedId(avatarId);
    setIsSaving(true);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      await supabase
        .from('profiles')
        .update({ avatar_id: avatarId })
        .eq('id', session.user.id);

      // Pequeno delay para o usuário ver a seleção antes de voltar
      setTimeout(() => navigate('/profile'), 400);
    } catch {
      console.error('Erro ao salvar avatar');
      setIsSaving(false);
    }
  };

  return (
    <section className="avatar-picker-container" aria-labelledby="avatar-picker-title">
      <header className="avatar-picker-header">
        <button
          className="icon-btn"
          onClick={() => navigate(-1)}
          aria-label="Voltar para o perfil"
        >
          <ArrowLeft size={24} color="#333" />
        </button>
        <h1 id="avatar-picker-title" className="avatar-picker-title">Alterar avatar</h1>
        <div style={{ width: 24 }} aria-hidden="true"></div>
      </header>

      <main className="avatar-picker-content">
        <p className="avatar-picker-instruction">Selecione um novo avatar</p>

        <div
          className="avatar-grid"
          role="radiogroup"
          aria-label="Avatares disponíveis"
        >
          {avatars.map((avatar) => (
            <button
              key={avatar.id}
              role="radio"
              aria-checked={selectedId === avatar.id}
              aria-label={avatar.label}
              className={`avatar-option ${selectedId === avatar.id ? 'selected' : ''}`}
              onClick={() => handleSelect(avatar.id)}
              disabled={isSaving}
            >
              <img
                src={avatar.src}
                alt=""
                aria-hidden="true"
                className="avatar-option-img"
              />
              {selectedId === avatar.id && (
                <div className="avatar-check" aria-hidden="true">✓</div>
              )}
            </button>
          ))}
        </div>
      </main>
    </section>
  );
}
