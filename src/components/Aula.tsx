import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function Aula() {
  const navigate = useNavigate();

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
          Aula
        </h1>

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
        <h2>Hip Hop • Solo • Iniciante</h2>

        <p>
          Nesta aula você aprenderá os movimentos básicos
          necessários para iniciar sua jornada neste estilo.
        </p>

        <button className="btn btn-primary">
          ▶ Assistir vídeo
        </button>

        <button className="btn btn-outline">
          ✓ Concluir aula
        </button>
      </main>
    </section>
  );
}