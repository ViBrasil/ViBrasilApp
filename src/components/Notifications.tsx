import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Trophy, Bell } from 'lucide-react';

export default function Notifications() {
  const navigate = useNavigate();

  const notifications = JSON.parse(
    localStorage.getItem('vibrasil_notifications') || '[]'
  );

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
        {notifications.length === 0 ? (
          <div className="level-card">
            <span className="level-title">
              <Bell size={18} /> Nenhuma notificação ainda
            </span>
            <span className="level-status">
              Conclua etapas para desbloquear conquistas.
            </span>
          </div>
        ) : (
          notifications.map((notification: any, index: number) => (
            <div className="level-card" key={index}>
              <span className="level-title">
                <Trophy size={18} /> {notification.title}
              </span>
              <span className="level-status">
                {notification.message}
              </span>
            </div>
          ))
        )}
      </main>
    </section>
  );
}