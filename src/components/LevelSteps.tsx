import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Lock } from 'lucide-react';
import './Levels.css';

export default function LevelSteps() {
  const navigate = useNavigate();

  const { nivel } = useParams();

  const etapas = [
    { id: 1, nome: 'Passo 1', unlocked: true },
    { id: 2, nome: 'Passo 2', unlocked: false },
    { id: 3, nome: 'Passo 3', unlocked: false },
    { id: 4, nome: 'Passo 4', unlocked: false },
    { id: 5, nome: 'Passo 5', unlocked: false },
    { id: 6, nome: 'Passo 6', unlocked: false },
    { id: 7, nome: 'Coreografia Completa', unlocked: false },
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
          {nivel}
        </h1>

        <div style={{ width: 24 }} />
      </header>

      <main className="levels-list">
        {etapas.map((etapa) => (
          <button
            key={etapa.id}
              onClick={() => {
                    if (etapa.unlocked) {
                        navigate(`passo-${etapa.id}`);
                    }
  }}
            className={`level-card ${!etapa.unlocked ? 'locked' : ''}`}
            disabled={!etapa.unlocked}
          >
            <span className="level-title">
              {!etapa.unlocked && <Lock size={16} />}
              {etapa.nome}
            </span>

            <span className="level-status">
              {etapa.unlocked ? 'Disponível' : 'Bloqueado'}
            </span>
          </button>
        ))}
      </main>
    </section>
  );
}