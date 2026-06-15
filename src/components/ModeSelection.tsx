import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import './Levels.css';

interface ModeSelectionProps {
  titulo: string;
  opcoes: string[];
  rotaBase: string;
}

export default function ModeSelection({
  titulo,
  opcoes,
  rotaBase,
}: ModeSelectionProps) {
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

        <h1 className="modulos-title">{titulo}</h1>

        <div style={{ width: 24 }} />
      </header>

      <main className="levels-list">
  {opcoes.map((opcao) => (
    <button
      key={opcao}
      className="level-card"
      onClick={() =>
        navigate(
          `${rotaBase}/${opcao
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/\s+/g, '-')}`
        )
      }
    >
      <span className="level-title">
        {opcao}
      </span>

      <span className="level-status">
        Selecionar trilha
      </span>
    </button>
  ))}
</main>
    </section>
  );
}