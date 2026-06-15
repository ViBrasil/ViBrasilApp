import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { aulas } from '../data/aulas';

export default function Lesson() {
  const navigate = useNavigate();

  const { modulo, modo, nivel, etapa } = useParams();

  const aulasData = aulas as Record<string, any>;

const aula =
  modulo && modo && nivel && etapa
    ? aulasData[modulo]?.[modo]?.[nivel]?.[etapa]
    : null;

  const videoDisponivel = Boolean(aula?.video);

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

        <button className="btn btn-outline">
          ✓ Concluir etapa
        </button>
      </main>
    </section>
  );
}