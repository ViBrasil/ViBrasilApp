import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

import imgHipHop from '../assets/images/módulos/DANÇA HIP HOP.png';

import './HipHop.css';

export default function HipHop() {
  const navigate = useNavigate();

  return (
    <section className="hiphop-container">
      <header className="hiphop-header">
        <button
          className="icon-btn"
          onClick={() => navigate('/modulos')}
          aria-label="Voltar para módulos"
        >
          <ArrowLeft size={24} color="#333" />
        </button>

        <h1 className="hiphop-title">Hip Hop</h1>

        <div style={{ width: 24 }} />
      </header>

      <main className="hiphop-content">
        <img
          src={imgHipHop}
          alt="Hip Hop"
          className="hiphop-image"
        />

        <button
          className="btn btn-outline"
          onClick={() => navigate('/hip-hop/modos')}
        >
          Iniciar módulo
        </button>

        <p className="hiphop-text">
          O Hip-Hop surgiu no Bronx, Nova York, no início dos anos 1970,
          criado por jovens negros e latinos como uma resposta cultural à
          violência e marginalização. Consolidado por DJ Kool Herc em 1973,
          o movimento baseia-se em quatro pilares principais: DJ, MC, break
          e grafite, funcionando como voz política e expressão artística
          periférica. O estilo evoluiu de festas de bairro para um fenômeno
          global.
        </p>
      </main>
    </section>
  );
}