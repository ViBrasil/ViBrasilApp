import ModeSelection from './ModeSelection';

export default function HipHopModes() {
  return (
    <ModeSelection
      titulo="Hip Hop"
      rotaBase="/hip-hop/levels"
      opcoes={[
        'Solo',
        'Dupla',
      ]}
    />
  );
}