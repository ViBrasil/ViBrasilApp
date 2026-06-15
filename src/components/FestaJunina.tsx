import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

import imgFestaJunina from '../assets/images/módulos/FESTA JUNINA.png';

import './HipHop.css';

export default function FestaJunina() {
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

        <h1 className="hiphop-title">Festa Junina</h1>

        <div style={{ width: 24 }} />
      </header>

      <main className="hiphop-content">
        <img
          src={imgFestaJunina}
          alt="Festa Junina"
          className="hiphop-image"
        />

        <button
          className="btn btn-outline"
          onClick={() => navigate('/festa-junina/modos')}
        >
          Iniciar módulo
        </button>

        <p className="hiphop-text">
          A quadrilha junina surgiu a partir da dança europeia quadrille,
          trazida ao Brasil no século XIX e adaptada à cultura popular.
          Com o tempo, tornou-se um dos principais símbolos das festas
          juninas, marcada por comandos tradicionais, encenações como o
          casamento caipira e músicas como forró e baião. Hoje, representa
          uma importante expressão da identidade cultural brasileira.
        </p>
      </main>
    </section>
  );
}