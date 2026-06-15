import ModeSelection from './ModeSelection';

export default function AfroModes() {
  return (
    <ModeSelection
      titulo="Afro-brasileiras"
      rotaBase="/afro/levels"
      opcoes={[
        'Solo',
        'Dupla',
      ]}
    />
  );
}