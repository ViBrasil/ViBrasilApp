import ModeSelection from './ModeSelection';

export default function GauchaModes() {
  return (
    <ModeSelection
      titulo="Danças Gaúchas"
      rotaBase="/gaucha/levels"
      opcoes={[
        'Dama',
        'Cavalheiro',
        'Dupla',
      ]}
    />
  );
}