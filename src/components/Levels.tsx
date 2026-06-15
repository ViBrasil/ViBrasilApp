import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Lock } from 'lucide-react';
import './Levels.css';

interface LevelsProps {
  titulo: string;
}

export default function Levels({ titulo }: LevelsProps) {
  const navigate = useNavigate();
  const { modo } = useParams();

 const levels = [
  { id: 'iniciante', nome: 'Iniciante', unlocked: true },
  { id: 'intermediario', nome: 'Intermediário', unlocked: false },
  { id: 'avancado', nome: 'Avançado', unlocked: false },
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
      navigate(level.id);
    }
  }}
>
            <span className="level-title">
  {!level.unlocked && <Lock size={16} />}
  {level.nome}
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