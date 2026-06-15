import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Lock } from 'lucide-react';
import './Levels.css';

export default function LevelSteps() {
  const navigate = useNavigate();
  const { modulo, modo, nivel } = useParams();

  const etapas = [
    { id: 'passo-1', nome: 'Passo 1' },
    { id: 'passo-2', nome: 'Passo 2' },
    { id: 'passo-3', nome: 'Passo 3' },
    { id: 'passo-4', nome: 'Passo 4' },
    { id: 'passo-5', nome: 'Passo 5' },
    { id: 'passo-6', nome: 'Passo 6' },
    { id: 'passo-7', nome: 'Coreografia Completa' },
  ];

  const getProgressKey = (etapaId: string) =>
    `vibrasil_completed_${modulo}_${modo}_${nivel}_${etapaId}`;

  const isUnlocked = (index: number) => {
    if (index === 0) return true;

    const previousStep = etapas[index - 1];
    return localStorage.getItem(getProgressKey(previousStep.id)) === 'true';
  };

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

        <h1 className="modulos-title">{nivel}</h1>

        <div style={{ width: 24 }} />
      </header>

      <main className="levels-list">
        {etapas.map((etapa, index) => {
          const unlocked = isUnlocked(index);
          const completed = localStorage.getItem(getProgressKey(etapa.id)) === 'true';

          return (
            <button
              key={etapa.id}
              onClick={() => {
                if (unlocked) {
                  navigate(etapa.id);
                }
              }}
              className={`level-card ${!unlocked ? 'locked' : ''}`}
              disabled={!unlocked}
            >
              <span className="level-title">
                {!unlocked && <Lock size={16} />}
                {etapa.nome}
              </span>

              <span className="level-status">
                {completed ? 'Concluído' : unlocked ? 'Disponível' : 'Bloqueado'}
              </span>
            </button>
          );
        })}
      </main>
    </section>
  );
}