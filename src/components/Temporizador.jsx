import { useEffect, useState } from 'react';

function formatear(segundos) {
  const m = Math.floor(segundos / 60);
  const s = segundos % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

function Temporizador({ minutos }) {
  const [segundos, setSegundos] = useState(minutos * 60);
  const [corriendo, setCorriendo] = useState(false);

  useEffect(() => {
  if (!corriendo) return;

  if (segundos === 0) {
    setCorriendo(false);
    return;
  }

  const intervalo = setInterval(() => {
    setSegundos(s => Math.max(0, s - 1));
  }, 1000);

  return () => clearInterval(intervalo);
}, [corriendo, segundos]);

  return (
    <section className="temporizador">
      <h2>Temporizador</h2>
      <p className="tiempo" aria-label="Tiempo restante">{formatear(segundos)}</p>
      <button onClick={() => setCorriendo(!corriendo)}>
        {corriendo ? 'Pausar' : 'Iniciar'}
      </button>
      <button
        onClick={() => {
          setCorriendo(false);
          setSegundos(minutos * 60);
        }}
      >
        Reiniciar
      </button>
    </section>
  );
}

export default Temporizador;
