import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Bell, Menu } from 'lucide-react';
import './Dashboard.css';

// Importando as imagens das conquistas da pasta fornecida pelo usuário
import imgCoffee from '../assets/images/conquistas/CAFÉ.png';
import imgCap from '../assets/images/conquistas/BONÉ.png';
import imgFlags from '../assets/images/conquistas/BANDEIRA.png';
import imgMap from '../assets/images/conquistas/BRASIL.png';
import imgCrown from '../assets/images/conquistas/COROA.png';

export default function Dashboard() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('mestredofrevo352');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const isGuest = localStorage.getItem('vibrasil_guest') === 'true';

if (isGuest) {
  setUsername(
    localStorage.getItem('vibrasil_username') || 'Convidado'
  );

  return;
}
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user?.user_metadata?.username) {
        setUsername(session.user.user_metadata.username);
      }
    };
    fetchUser();
  }, []);

  return (
    <section className="dashboard-container" aria-label="Painel principal">
      <header className="dash-header">
        <div 
          className="user-profile" 
          onClick={() => navigate('/profile')}
          style={{cursor: 'pointer'}}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && navigate('/profile')}
          aria-label="Ir para o perfil"
        >
          <div className="avatar-placeholder" aria-hidden="true"></div>
          <span className="username">{username}</span>
        </div>
        <div className="header-actions" style={{position: 'relative'}}>
          <button
  className="icon-btn"
  aria-label="Notificações"
  onClick={() => navigate('/notifications')}
>
            <Bell size={24} color="#c41e1e" />
          </button>
          <button 
            className="icon-btn" 
            aria-label="Menu principal" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
          >
            <Menu size={24} color="#c41e1e" />
          </button>
          
          {isMenuOpen && (
            <div className="hamburger-dropdown">
              <button onClick={() => navigate('/modulos')}>Módulos</button>
              <button onClick={() => navigate('/grupos')}>Grupos</button>
            </div>
          )}
        </div>
      </header>

      <main className="dash-content">
        <h2 className="section-title main-title">Qual vai ser a boa hoje?</h2>
        
        {/* Recomendado Carousel Placeholder */}
        <div 
          className="recommended-card" 
          onClick={() => navigate('/modulos')}
          role="button"
          tabIndex={0}
          aria-label="Ir para módulos"
          onKeyDown={(e) => e.key === 'Enter' && navigate('/modulos')}
        >
          <div className="card-info">
            <h3>Recomendado</h3>
            <p>Achamos que você vai gostar disso</p>
          </div>
        </div>

        <div className="section-header">
          <h2 className="section-title">Progresso</h2>
          <button className="text-btn">ver tudo</button>
        </div>
        
        <div className="progress-list" role="list">
          <div className="progress-item" role="listitem">
            <div className="progress-info">
              <span className="progress-name">Gaúcha</span>
              <div className="progress-bar-container" aria-label="Progresso Gaúcha 60%">
                <div className="progress-bar-fill" style={{width: '60%'}}></div>
              </div>
            </div>
          </div>
          <div className="progress-item blue-bg" role="listitem">
            <div className="progress-info">
              <span className="progress-name">Hip Hop</span>
              <div className="progress-bar-container" aria-label="Progresso Hip Hop 30%">
                <div className="progress-bar-fill" style={{width: '30%'}}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="section-header">
          <h2 className="section-title">Próximas Conquistas</h2>
          <button className="text-btn">ver tudo</button>
        </div>

        <div className="achievements-carousel" role="list" aria-label="Lista de conquistas">
          <div className="achievement-card" role="listitem">
            <img src={imgCoffee} alt="Ilustração de xícara de café" className="achievement-img" />
            <div className="achievement-info">
              <h4>Café Energético</h4>
              <span>50p</span>
            </div>
          </div>
          <div className="achievement-card" role="listitem">
            <img src={imgFlags} alt="Bandeirinhas de festa junina" className="achievement-img" />
            <div className="achievement-info">
              <h4>Festeiro</h4>
              <span>50p</span>
            </div>
          </div>
          <div className="achievement-card" role="listitem">
            <img src={imgMap} alt="Mapa do Brasil gradiente" className="achievement-img" />
            <div className="achievement-info">
              <h4>O Explorador</h4>
              <span>50p</span>
            </div>
          </div>
          <div className="achievement-card" role="listitem">
            <img src={imgCrown} alt="Coroa dourada" className="achievement-img" />
            <div className="achievement-info">
              <h4>Rei da Pista</h4>
              <span>100p</span>
            </div>
          </div>
          <div className="achievement-card" role="listitem">
            <img src={imgCap} alt="Boné marrom" className="achievement-img" />
            <div className="achievement-info">
              <h4>Estiloso</h4>
              <span>30p</span>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
}
