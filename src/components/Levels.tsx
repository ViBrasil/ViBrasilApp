import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Lock } from 'lucide-react';
import './Levels.css';

interface LevelsProps {
  titulo: string;
}

export default function Levels({ titulo }: LevelsProps) {
  const navigate = useNavigate();
  const { modulo, modo } = useParams();

  const levels = [
    { id: 1, unlocked: true },
    { id: 2, unlocked: false },
    { id: 3, unlocked: false },
    { id: 4, unlocked: false },
  ];

  return (
    <section className="levels-container">
      <header className="modulos-header">
        <button
          className="icon-btn"
          onClick={() => navigate(-1)}
          aria-label="Voltar"
        >
          <ArrowLeft size={24} color="#333" />
        </button>

        <h1 className="modulos-title">
              {titulo} • {modo}
        </h1>

        <div style={{ width: 24 }} />
      </header>

      <main className="levels-list">
        {levels.map((level) => (
          <button
  key={level.id}
  className={`level-card ${!level.unlocked ? 'locked' : ''}`}
  disabled={!level.unlocked}
  onClick={() => {
    if (level.unlocked) {
      navigate(
        `/${modulo}/levels/${modo}/nivel-${level.id}`
      );
    }
  }}
>
            <span className="level-title">
              {!level.unlocked && <Lock size={16} />}
              Nível {level.id}
            </span>

            <span className="level-status">
              {level.unlocked ? 'Disponível' : 'Bloqueado'}
            </span>
          </button>
        ))}
      </main>
    </section>
  );
}