import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import './ModuloDetalhe.css';

interface ModuloDetalheProps {
  titulo: string;
  imagem: string;
  texto: string;
  rotaLevels: string;
}

export default function ModuloDetalhe({
  titulo,
  imagem,
  texto,
  rotaLevels,
}: ModuloDetalheProps) {
  const navigate = useNavigate();

  return (
    <section className="modulo-detalhe-container">
      <header className="modulos-header">
        <button
          className="icon-btn"
          onClick={() => navigate('/modulos')}
          aria-label="Voltar para módulos"
        >
          <ArrowLeft size={24} color="#333" />
        </button>

        <h1 className="modulos-title">{titulo}</h1>

        <div style={{ width: 24 }} />
      </header>

      <main className="modulo-detalhe-content">
        <img
          src={imagem}
          alt={titulo}
          className="modulo-detalhe-img"
        />

        <button
          className="btn btn-outline"
          onClick={() => navigate(rotaLevels)}
        >
          Iniciar módulo
        </button>

        <p className="modulo-detalhe-texto">
          {texto}
        </p>
      </main>
    </section>
  );
}