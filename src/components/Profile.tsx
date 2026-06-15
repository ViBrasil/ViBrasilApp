import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { ArrowLeft, Settings } from 'lucide-react';
import './Profile.css';

// Importando avatares
import avatar01 from '../assets/images/avatares/01.png';
import avatar02 from '../assets/images/avatares/02.png';
import avatar03 from '../assets/images/avatares/03.png';
import avatar04 from '../assets/images/avatares/04.png';
import avatar05 from '../assets/images/avatares/05.png';

// Importando imagens de conquistas
import imgCafe from '../assets/images/conquistas/CAFÉ.png';
import imgBone from '../assets/images/conquistas/BONÉ.png';
import imgCoroa from '../assets/images/conquistas/COROA.png';
import imgTambor from '../assets/images/conquistas/TAMBOR.png';
import imgGrafite from '../assets/images/conquistas/GRAFITE.png';
import imgBandeira from '../assets/images/conquistas/BANDEIRA.png';
import imgCuia from '../assets/images/conquistas/CUIA.png';
import imgFogueira from '../assets/images/conquistas/FOGUEIRA.png';

// Importando imagens de módulos (para a aba "Módulos" do perfil)
import imgGaucha from '../assets/images/módulos/DANÇA GAUCHA.png';
import imgHipHop from '../assets/images/módulos/DANÇA HIP HOP.png';

/**
 * Tela de Perfil — acessada ao clicar no avatar no Dashboard.
 *
 * Layout (conforme o design):
 * - Topo: fundo vermelho com avatar circular (clicável para trocar),
 *   username, nome real e estatísticas (Amigos, Seguindo, Seguidores).
 * - Abas: "Módulos" (progresso nos módulos) e "Conquistas" (lista de conquistas).
 * - Aba "Selos" foi removida conforme solicitação.
 *
 * Acessibilidade:
 * - Abas usam role="tablist" / role="tab" / role="tabpanel".
 * - Avatar possui aria-label indicando ação de troca.
 * - Conquistas possuem alt descritivo nas imagens.
 */

const avatarMap: Record<string, string> = {
  '01': avatar01,
  '02': avatar02,
  '03': avatar03,
  '04': avatar04,
  '05': avatar05,
};

type TabId = 'modulos' | 'conquistas';

interface ConquistaInfo {
  img: string;
  title: string;
  description: string;
  alt: string;
}

const conquistas: ConquistaInfo[] = [
  { img: imgCuia, title: 'Chula de Elite', description: 'Complete o módulo 2 de danças gaúchas', alt: 'Ilustração de cuia de chimarrão' },
  { img: imgGrafite, title: 'B-boy Pro', description: 'Complete o módulo 1 de hip hop', alt: 'Ilustração de muro grafitado' },
  { img: imgCoroa, title: 'Rei/Rainha do Xote', description: 'Complete todos os módulos de quadrilha', alt: 'Ilustração de coroa dourada' },
  { img: imgTambor, title: 'Orgulho Afro', description: 'Equipe um avatar do ritmo afro', alt: 'Ilustração de tambor africano' },
  { img: imgCafe, title: 'Pausa pro Café', description: 'Fique parado no menu principal por 30 minutos', alt: 'Ilustração de xícara de café' },
  { img: imgFogueira, title: 'Fogueira Acesa', description: 'Complete 7 dias seguidos de prática', alt: 'Ilustração de fogueira' },
  { img: imgBone, title: 'Estiloso', description: 'Troque de avatar 3 vezes', alt: 'Ilustração de boné' },
  { img: imgBandeira, title: 'Festeiro', description: 'Complete o módulo de Festa Junina', alt: 'Ilustração de bandeirinhas de festa junina' },
];

export default function Profile() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabId>('modulos');
  const [avatarId, setAvatarId] = useState('01');
  const [username, setUsername] = useState('mestredofrevo352');
  const [fullName, setFullName] = useState('João da Silva');

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const { data: profile } = await supabase
        .from('profiles')
        .select('username, avatar_id')
        .eq('id', session.user.id)
        .single();

      if (profile) {
        if (profile.username) setUsername(profile.username);
        if (profile.avatar_id) setAvatarId(profile.avatar_id);
      }

      // Nome real vindo do metadata do auth (se existir)
      if (session.user.user_metadata?.full_name) {
        setFullName(session.user.user_metadata.full_name);
      }
    };
    fetchProfile();
  }, []);

  const currentAvatar = avatarMap[avatarId] || avatar01;

  const tabs: { id: TabId; label: string }[] = [
    { id: 'modulos', label: 'Módulos' },
    { id: 'conquistas', label: 'Conquistas' },
  ];

  return (
    <section className="profile-container" aria-labelledby="profile-username">
      {/* Topo vermelho */}
      <header className="profile-header">
        <div className="profile-header-actions">
          <button
            className="icon-btn"
            onClick={() => navigate(-1)}
            aria-label="Voltar para a tela anterior"
          >
            <ArrowLeft size={22} color="#fff" />
          </button>
          <button className="icon-btn" aria-label="Configurações">
            <Settings size={22} color="#fff" />
          </button>
        </div>

        <button
          className="profile-avatar-btn"
          onClick={() => navigate('/avatar')}
          aria-label="Alterar avatar. Clique para escolher um novo avatar."
        >
          <img src={currentAvatar} alt="Seu avatar atual" className="profile-avatar-img" />
        </button>

        <h1 id="profile-username" className="profile-username">{username}</h1>
        <p className="profile-fullname">{fullName}</p>
      </header>

      {/* Estatísticas */}
      <div className="profile-stats" role="list" aria-label="Suas estatísticas">
        <div className="stat-item" role="listitem">
          <span className="stat-number">2</span>
          <span className="stat-label">Amigos</span>
        </div>
        <div className="stat-item" role="listitem">
          <span className="stat-number">3</span>
          <span className="stat-label">Seguindo</span>
        </div>
        <div className="stat-item" role="listitem">
          <span className="stat-number">2</span>
          <span className="stat-label">Seguidores</span>
        </div>
      </div>

      {/* Abas */}
      <div className="profile-tabs" role="tablist" aria-label="Seções do perfil">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            className={`profile-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Conteúdo das abas */}
      <main className="profile-tab-content">
        {/* Aba Módulos */}
        {activeTab === 'modulos' && (
          <div role="tabpanel" aria-label="Progresso nos módulos" className="tab-panel-modulos">
            <div className="profile-modulo-card">
              <img src={imgGaucha} alt="Dança Gaúcha" className="profile-modulo-img" />
              <div className="profile-modulo-overlay">
                <span className="profile-modulo-name">Gaúcha</span>
                <div className="progress-bar-container">
                  <div className="progress-bar-fill" style={{ width: '60%' }}></div>
                </div>
              </div>
            </div>
            <div className="profile-modulo-card">
              <img src={imgHipHop} alt="Hip Hop" className="profile-modulo-img" />
              <div className="profile-modulo-overlay">
                <span className="profile-modulo-name">Hip Hop</span>
                <div className="progress-bar-container">
                  <div className="progress-bar-fill" style={{ width: '30%' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Aba Conquistas */}
        {activeTab === 'conquistas' && (
          <div role="tabpanel" aria-label="Suas conquistas" className="tab-panel-conquistas">
            {conquistas.map((c, i) => (
              <div key={i} className="conquista-row">
                <img src={c.img} alt={c.alt} className="conquista-thumb" loading="lazy" />
                <div className="conquista-text">
                  <h3>{c.title}</h3>
                  <p>{c.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </section>
  );
}
