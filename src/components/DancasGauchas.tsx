import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

import imgGaucha from '../assets/images/módulos/DANÇA GAUCHA.png';

import './HipHop.css';

export default function DancasGauchas() {
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

        <h1 className="hiphop-title">Danças Gaúchas</h1>

        <div style={{ width: 24 }} />
      </header>

      <main className="hiphop-content">
        <img
          src={imgGaucha}
          alt="Danças Gaúchas"
          className="hiphop-image"
        />

        <button
          className="btn btn-outline"
          onClick={() => navigate('/gaucha/modos')}
        >
          Iniciar módulo
        </button>

        <p className="hiphop-text">
          A dança gaúcha é uma mistura de tradições europeias, africanas
          e indígenas, consolidada no século XIX. Caracterizada pelo
          sapateado forte, agilidade e pares enlaçados ou soltos, reflete
          o cotidiano campeiro e a cultura do sul do Brasil. Entre os
          estilos mais conhecidos estão Chula, Fandango, Chimarrita,
          Balaio, Pezinho e Vanerão.
        </p>
      </main>
    </section>
  );
}