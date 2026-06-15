import ModeSelection from './ModeSelection';

export default function FestaJuninaModes() {
  return (
    <ModeSelection
      titulo="Festa Junina"
      rotaBase="/festa-junina/levels"
      opcoes={[
        'Dama',
        'Cavalheiro',
        'Dupla',
      ]}
    />
  );
}