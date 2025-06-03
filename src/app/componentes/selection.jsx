'use client';

import { useState } from 'react';

export default function Selection({ frase }) {
  const [expanded, setExpanded] = useState(false);
  const [form, setForm] = useState({ nombre: '', correo: '', fraseInput: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalFrase = frase || form.fraseInput;
    console.log('Formulario enviado:', {
      nombre: form.nombre,
      correo: form.correo,
      frase: finalFrase,
    });
    // Aquí puedes conectar a una API o manejar el envío como necesites
  };

  return (
    <div className="selection-container">
      {frase ? (
        <button
          className="selection-button"
          onClick={() => setExpanded(!expanded)}
        >
          {frase}
        </button>
      ) : (
        <>
          <input
            type="text"
            name="fraseInput"
            placeholder="Escribe una frase para el botón"
            value={form.fraseInput}
            onChange={handleChange}
            className="selection-frase-input"
          />
          <button
            className="selection-button"
            onClick={() => form.fraseInput && setExpanded(true)}
            disabled={!form.fraseInput}
          >
            Usar frase personalizada
          </button>
        </>
      )}

      {expanded && (
        <form className="selection-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="nombre"
            placeholder="Tu nombre"
            value={form.nombre}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="correo"
            placeholder="Tu correo"
            value={form.correo}
            onChange={handleChange}
            required
          />
          <button type="submit">Enviar</button>
        </form>
      )}
    </div>
  );
}
