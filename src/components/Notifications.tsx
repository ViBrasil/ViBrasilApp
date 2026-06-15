import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Trophy, Users, Bell } from 'lucide-react';

export default function Notifications() {
  const navigate = useNavigate();

  return (
    <section className="levels-container">
      <header className="modulos-header">
        <button className="icon-btn" onClick={() => navigate('/dashboard')} aria-label="Voltar">
          <ArrowLeft size={24} color="#333" />
        </button>

        <h1 className="modulos-title">Notificações</h1>

        <div style={{ width: 24 }} />
      </header>

      <main className="levels-list">
        <div className="level-card">
          <span className="level-title"><Trophy size={18} /> Conquista desbloqueada</span>
          <span className="level-status">Festeiro — continue praticando para ganhar novas conquistas.</span>
        </div>

        <div className="level-card">
          <span className="level-title"><Users size={18} /> Grupos</span>
          <span className="level-status">Entre em uma conta para criar grupos e acompanhar amigos.</span>
        </div>

        <div className="level-card">
          <span className="level-title"><Bell size={18} /> Bem-vindo ao ViBrasil</span>
          <span className="level-status">Aprenda danças brasileiras no seu ritmo.</span>
        </div>
      </main>
    </section>
  );
}