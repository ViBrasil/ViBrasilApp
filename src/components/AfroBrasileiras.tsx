import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

import imgAfro from '../assets/images/módulos/DANÇA AFRO.png';

import './HipHop.css';

export default function AfroBrasileiras() {
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

        <h1 className="hiphop-title">Afro-brasileiras</h1>

        <div style={{ width: 24 }} />
      </header>

      <main className="hiphop-content">
        <img
          src={imgAfro}
          alt="Afro-brasileiras"
          className="hiphop-image"
        />

        <button
          className="btn btn-outline"
          onClick={() => navigate('/afro/modos')}
        >
          Iniciar módulo
        </button>

        <p className="hiphop-text">
          A dança afro no Brasil surgiu no período colonial com africanos
          escravizados, servindo como resistência, expressão de fé e
          preservação da ancestralidade. Misturando ritmos sudaneses e
          bantos com tradições locais, consolidou-se em danças religiosas
          e populares. Atualmente, é valorizada como arte, identidade
          cultural e resistência negra.
        </p>
      </main>
    </section>
  );
}