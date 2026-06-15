import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Splash from './components/Splash';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Modulos from './components/Modulos';
import Grupos from './components/Grupos';
import Profile from './components/Profile';
import AvatarPicker from './components/AvatarPicker';
import HipHop from './components/HipHop';
import FestaJunina from './components/FestaJunina';
import AfroBrasileiras from './components/AfroBrasileiras';
import DancasGauchas from './components/DancasGauchas';
import HipHopLevels from './components/HipHopLevels';
import FestaJuninaLevels from './components/FestaJuninaLevels';
import AfroLevels from './components/AfroLevels';
import GauchaLevels from './components/GauchaLevels';
import HipHopModes from './components/HipHopModes';
import FestaJuninaModes from './components/FestaJuninaModes';
import AfroModes from './components/AfroModes';
import GauchaModes from './components/GauchaModes';

function App() {
  return (
    <Router>
      <main className="app-container" aria-label="Aplicativo ViBrasil">
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/modulos" element={<Modulos />} />
          <Route path="/hip-hop" element={<HipHop />} />
          <Route path="/hip-hop/modos" element={<HipHopModes />} />
          <Route path="/hip-hop/levels/:modo" element={<HipHopLevels />} />
          <Route path="/festa-junina" element={<FestaJunina />} />
          <Route path="/festa-junina/modos" element={<FestaJuninaModes />} />
          <Route path="/festa-junina/levels/:modo" element={<FestaJuninaLevels />} />
          <Route path="/afro" element={<AfroBrasileiras />} />
          <Route path="/afro/modos" element={<AfroModes />} />
          <Route path="/afro/levels/:modo" element={<AfroLevels />} />
          <Route path="/gaucha" element={<DancasGauchas />} />
          <Route path="/gaucha/modos" element={<GauchaModes />} />
          <Route path="/gaucha/levels/:modo" element={<GauchaLevels />} />
          <Route path="/grupos" element={<Grupos />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/avatar" element={<AvatarPicker />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
