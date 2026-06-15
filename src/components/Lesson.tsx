import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { aulas } from '../data/aulas';

export default function Lesson() {
  const navigate = useNavigate();

  const { modulo, modo, nivel, etapa } = useParams();

  const aulasData = aulas as Record<string, any>;

  const [showAchievement, setShowAchievement] = useState(false);

const aula =
  modulo && modo && nivel && etapa
    ? aulasData[modulo]?.[modo]?.[nivel]?.[etapa]
    : null;

  const videoDisponivel = Boolean(aula?.video);

  return (
    <section className="levels-container">
      {showAchievement && (
  <button
    className="achievement-toast"
    onClick={() => navigate('/notifications')}
  >
    <strong>🏆 Conquista desbloqueada!</strong>
    <span>Nova etapa concluída</span>
  </button>
)}
      <header className="modulos-header">
        <button
          className="icon-btn"
          onClick={() => navigate(-1)}
          aria-label="Voltar"
        >
          <ArrowLeft size={24} color="#333" />
        </button>

        <h1 className="modulos-title">Aula</h1>

        <div style={{ width: 24 }} />
      </header>

      <main
        style={{
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}
      >
        <h2>
          {modo} • {nivel}
        </h2>

        <h3>
          {aula?.titulo || etapa}
        </h3>

        <p>
          Nesta etapa você aprenderá os movimentos necessários para avançar no módulo.
        </p>

        {videoDisponivel ? (
          <button
            className="btn btn-primary"
           onClick={() => {
  if (aula?.video) {
    window.open(aula.video, '_blank');
  }
}}
          >
            ▶ Assistir vídeo
          </button>
        ) : (
          <div
            style={{
              padding: '16px',
              border: '1px solid #ddd',
              borderRadius: '12px',
              textAlign: 'center'
            }}
          >
            ⏳ Conteúdo em preparação
          </div>
        )}

        <button
  className="btn btn-outline"
  onClick={() => {
    const progressKey = `vibrasil_completed_${modulo}_${modo}_${nivel}_${etapa}`;
    localStorage.setItem(progressKey, 'true');

    const notifications = JSON.parse(
      localStorage.getItem('vibrasil_notifications') || '[]'
    );

    notifications.unshift({
      title: 'Conquista desbloqueada',
      message: `Você concluiu ${aula?.titulo || etapa} em ${nivel}.`,
      type: 'achievement',
      date: new Date().toISOString(),
    });

    localStorage.setItem(
      'vibrasil_notifications',
      JSON.stringify(notifications)
    );

    setShowAchievement(true);
    setTimeout(() => setShowAchievement(false), 3500);
  }}
>
  ✓ Concluir etapa
</button>
      </main>
    </section>
  );
}