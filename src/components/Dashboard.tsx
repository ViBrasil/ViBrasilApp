import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Bell, Menu } from 'lucide-react';
import './Dashboard.css';

import imgDashboardRecomendado from '../assets/images/interface/DASHBOARD_RECOMENDADO.png';
import imgFestaJunina from '../assets/images/módulos/FESTA JUNINA.png';
import imgHipHop from '../assets/images/módulos/DANÇA HIP HOP.png';

// Importando as imagens das conquistas da pasta fornecida pelo usuário
import imgCoffee from '../assets/images/conquistas/CAFÉ.png';
import imgCap from '../assets/images/conquistas/BONÉ.png';
import imgFlags from '../assets/images/conquistas/BANDEIRA.png';
import imgMap from '../assets/images/conquistas/BRASIL.png';
import imgCrown from '../assets/images/conquistas/COROA.png';

import avatar01 from '../assets/images/avatares/01.png';
import avatar02 from '../assets/images/avatares/02.png';
import avatar03 from '../assets/images/avatares/03.png';
import avatar04 from '../assets/images/avatares/04.png';
import avatar05 from '../assets/images/avatares/05.png';

const avatarMap: Record<string, string> = {
  '01': avatar01,
  '02': avatar02,
  '03': avatar03,
  '04': avatar04,
  '05': avatar05,
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('mestredofrevo352');
  const [avatarId, setAvatarId] = useState('01');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const isGuest = localStorage.getItem('vibrasil_guest') === 'true';

if (isGuest) {
  setUsername(
    localStorage.getItem('vibrasil_username') || 'Convidado'
  );
  setAvatarId(localStorage.getItem('vibrasil_avatar_id') || '01');

  return;
}
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user?.user_metadata?.username) {
        setUsername(session.user.user_metadata.username);
        const { data: profile } = await supabase
  .from('profiles')
  .select('avatar_id')
  .eq('id', session?.user.id)
  .single();

if (profile?.avatar_id) {
  setAvatarId(profile.avatar_id);
}
      }
    };
    
    fetchUser();
  }, []);
  const currentAvatar = avatarMap[avatarId] || avatar01;

  const calcularProgressoModulo = (modulo: string) => {
  const modosPorModulo: Record<string, string[]> = {
    'festa-junina': ['dama', 'cavalheiro', 'dupla'],
    'hip-hop': ['solo', 'dupla'],
    'afro': ['solo', 'dupla'],
    'gaucha': ['dama', 'cavalheiro', 'dupla'],
  };

  const niveis = ['iniciante', 'intermediario', 'avancado'];
  const etapas = [
    'passo-1',
    'passo-2',
    'passo-3',
    'passo-4',
    'passo-5',
    'passo-6',
    'passo-7',
  ];

  const modos = modosPorModulo[modulo] || [];

  let total = 0;
  let concluidas = 0;

  modos.forEach((modo) => {
    niveis.forEach((nivel) => {
      etapas.forEach((etapa) => {
        total++;

        const key = `vibrasil_completed_${modulo}_${modo}_${nivel}_${etapa}`;

        if (localStorage.getItem(key) === 'true') {
          concluidas++;
        }
      });
    });
  });

  return total > 0 ? Math.round((concluidas / total) * 100) : 0;
};

const progressoFestaJunina = calcularProgressoModulo('festa-junina');
const progressoHipHop = calcularProgressoModulo('hip-hop');

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
<img
  src={currentAvatar}
  alt="Seu avatar"
  className="dashboard-avatar"
/>          <span className="username">{username}</span>
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
    <button onClick={() => navigate('/profile')}>Perfil</button>
    <button onClick={() => navigate('/settings')}>Configurações</button>
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
         <img
  src={imgDashboardRecomendado}
  alt="Módulo recomendado"
  className="recommended-img"
/>

<div className="card-info">
  <h3>Recomendado</h3>
  <p>Achamos que você vai gostar disso</p>
</div>
        </div>

        <div className="section-header">
          <h2 className="section-title">Progresso</h2>
          <button
  className="text-btn"
  onClick={() =>
    navigate('/profile', {
      state: { tab: 'modulos' }
    })
  }
>
  ver tudo
</button>
        </div>
        
        <div className="progress-list" role="list">
  <div
    className="progress-item"
    role="listitem"
    onClick={() => navigate('/festa-junina')}
  >
    <img
  src={imgFestaJunina}
  alt="Festa Junina"
  className="progress-module-img"
/>
    <div className="progress-info">
      <span className="progress-name">Festa Junina</span>

      <div
        className="progress-bar-container"
        aria-label={`Progresso Festa Junina ${progressoFestaJunina}%`}
      >
        <div
          className="progress-bar-fill"
          style={{ width: `${progressoFestaJunina}%` }}
        ></div>
      </div>

      <span className="progress-percent">{progressoFestaJunina}%</span>
    </div>
  </div>

  <div
    className="progress-item blue-bg"
    role="listitem"
    onClick={() => navigate('/hip-hop')}
  >
    <img
  src={imgHipHop}
  alt="Hip Hop"
  className="progress-module-img"
/>
    <div className="progress-info">
      <span className="progress-name">Hip Hop</span>

      <div
        className="progress-bar-container"
        aria-label={`Progresso Hip Hop ${progressoHipHop}%`}
      >
        <div
          className="progress-bar-fill"
          style={{ width: `${progressoHipHop}%` }}
        ></div>
      </div>

      <span className="progress-percent">{progressoHipHop}%</span>
    </div>
  </div>
</div>

        <div className="section-header">
          <h2 className="section-title">Próximas Conquistas</h2>
          <button
  className="text-btn"
  onClick={() =>
    navigate('/profile', {
      state: { tab: 'conquistas' }
    })
  }
>
  ver tudo
</button>
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
