'use client';

import { useState } from 'react';

export default function SizeSelector() {
  const [tallaSeleccionada, setTallaSeleccionada] = useState('');
  const [form, setForm] = useState({ nombre: '', correo: '' });

  const handleSelect = (talla) => {
    setTallaSeleccionada(talla);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formulario enviado:', {
      talla: tallaSeleccionada,
      ...form,
    });
    // Aquí puedes enviar datos a un endpoint
  };

  return (
    <div className="size-container">
      <div className="size-buttons">
        {['S', 'M', 'L', 'XL'].map((t) => (
          <button
            key={t}
            className={`size-button ${tallaSeleccionada === t ? 'active' : ''}`}
            onClick={() => handleSelect(t)}
          >
            {t}
          </button>
        ))}
      </div>

      {tallaSeleccionada && (
  <>
    {/* <div className="size-selected">
      Has seleccionado la talla: <strong>{tallaSeleccionada}</strong>
    </div> */}

    <form className="size-form" onSubmit={handleSubmit}>

       <input
        type="text"
        name="talla"
        value={`talla ${tallaSeleccionada}`}
        readOnly
      />
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
  </>
)}

    </div>
  );
}
