import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { supabase } from '../lib/supabase';
import './Profile.css';

export default function Settings() {
  const navigate = useNavigate();

  const [username, setUsername] = useState(
    localStorage.getItem('vibrasil_username') || 'Convidado'
  );

  const isGuest = localStorage.getItem('vibrasil_guest') === 'true';

  const handleSaveName = async () => {
    localStorage.setItem('vibrasil_username', username);

    if (!isGuest) {
      await supabase.auth.updateUser({
        data: { username }
      });
    }

    alert('Nome atualizado!');
    navigate('/profile');
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();

    localStorage.removeItem('vibrasil_guest');
    localStorage.removeItem('vibrasil_username');

    navigate('/');
  };

  return (
    <section className="profile-container">
      <header className="modulos-header">
        <button
          className="icon-btn"
          onClick={() => navigate('/profile')}
          aria-label="Voltar"
        >
          <ArrowLeft size={24} color="#333" />
        </button>

        <h1 className="modulos-title">Configurações</h1>

        <div style={{ width: 24 }} />
      </header>

      <main className="profile-tab-content">
        <div className="input-group">
          <label className="input-label" htmlFor="username">
            Nome de usuário
          </label>

          <input
            id="username"
            className="input-field"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <button className="btn btn-outline" onClick={handleSaveName}>
          Salvar nome
        </button>

        <div style={{ height: 16 }} />

        <button className="btn btn-ghost" onClick={handleLogout}>
          Sair
        </button>

        {isGuest && (
          <p style={{ marginTop: 16, fontSize: 13, color: '#888' }}>
            Você está usando o modo convidado. Seu progresso ficará salvo apenas neste dispositivo.
          </p>
        )}
      </main>
    </section>
  );
}