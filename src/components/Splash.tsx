import { useNavigate } from 'react-router-dom';
import './Splash.css';
import { supabase } from '../lib/supabase';

export default function Splash() {
  const navigate = useNavigate();

  return (
    <section className="screen-container splash-screen" aria-labelledby="splash-title">
      <div className="splash-content">
        <div className="logo-container" aria-hidden="true">
          {/* Logo visual gerada via CSS ou Imagem */}
          <h1 className="logo-text">ViBrasil</h1>
        </div>
        
        <div className="welcome-text">
          <h2 id="splash-title">Olá!</h2>
          <p>Bem-vindo(a) ao ViBrasil. Partiu entrar em movimento!</p>
        </div>
      </div>

      <div className="splash-actions">
        <button 
          className="btn btn-outline" 
          onClick={() => navigate('/login')}
          aria-label="Entrar com sua conta existente"
        >
          Entrar
        </button>
        <button 
          className="btn btn-outline" 
          onClick={() => navigate('/register')}
          aria-label="Criar uma nova conta"
        >
          Criar conta
        </button>
        <button
  className="btn btn-ghost"
  onClick={async () => {

  await supabase.auth.signOut();

  localStorage.setItem('vibrasil_guest', 'true');
  localStorage.setItem('vibrasil_username', 'Convidado');

  navigate('/dashboard');

}}
  aria-label="Continuar para o aplicativo sem fazer login"
>
  Continuar sem login
</button>
      </div>
    </section>
  );
}
