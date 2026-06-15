import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import './Modulos.css';

// Importando as imagens dos módulos
import imgFestaJunina from '../assets/images/módulos/FESTA JUNINA.png';
import imgAfro from '../assets/images/módulos/DANÇA AFRO.png';
import imgHipHop from '../assets/images/módulos/DANÇA HIP HOP.png';
import imgGaucha from '../assets/images/módulos/DANÇA GAUCHA.png';

/**
 * Tela de Módulos — exibe os 4 estilos de dança disponíveis.
 * 
 * Cada card é um botão clicável que, futuramente, pode abrir
 * uma tela de detalhes/aulas daquele módulo.
 * 
 * Acessibilidade:
 * - Cada card usa role="button" e tabIndex para navegação por teclado.
 * - As imagens possuem alt descritivo.
 * - O botão de voltar possui aria-label.
 */

interface ModuloInfo {
  id: string;
  title: string;
  image: string;
  alt: string;
}

const modulos: ModuloInfo[] = [
  { id: 'festa-junina', title: 'Festa Junina', image: imgFestaJunina, alt: 'Ilustração de dançarinos de quadrilha em uma festa junina' },
  { id: 'afro', title: 'Afro-brasileiras', image: imgAfro, alt: 'Ilustração de dançarinos de danças afro-brasileiras com tambores' },
  { id: 'hip-hop', title: 'Hip Hop', image: imgHipHop, alt: 'Ilustração de dançarinos de hip hop em ambiente urbano' },
  { id: 'gaucha', title: 'Danças Gaúchas', image: imgGaucha, alt: 'Ilustração de casal dançando danças gaúchas' },
];

export default function Modulos() {
  const navigate = useNavigate();

  return (
    <section className="modulos-container" aria-labelledby="modulos-title">
      <header className="modulos-header">
        <button
          className="icon-btn"
          onClick={() => navigate(-1)}
          aria-label="Voltar para a tela anterior"
        >
          <ArrowLeft size={24} color="#333" />
        </button>
        <h1 id="modulos-title" className="modulos-title">Módulos</h1>
        <div style={{ width: 24 }} aria-hidden="true"></div>
      </header>

      <main className="modulos-list" role="list" aria-label="Lista de módulos de dança">
        {modulos.map((modulo) => (
          <div
            key={modulo.id}
            className="modulo-card"
            role="listitem"
          >
            <button
              className="modulo-card-btn"
              aria-label={`Abrir módulo ${modulo.title}`}
              onClick={() => navigate(`/${modulo.id}`)}
            >
              <img
                src={modulo.image}
                alt={modulo.alt}
                className="modulo-img"
                loading="lazy"
              />
              <span className="modulo-label">{modulo.title}</span>
            </button>
          </div>
        ))}
      </main>
    </section>
  );
}
