import nodemailer from 'nodemailer';

export async function POST(req) {
  try {
    const body = await req.json();
    const { nombre, correo, frase, talla } = body;

    // Validación de variables de entorno
    if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS || !process.env.MAIL_TO) {
      console.error('❌ Faltan variables de entorno');
      return new Response(JSON.stringify({ ok: false, error: 'Missing env vars' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    // Email dinámico según si viene "frase" o "talla"
    const isFrase = !!frase;
    const asunto = isFrase
      ? `Nueva frase de ${nombre}`
      : `Selección de talla de ${nombre}`;

    const contenido = `
      <p><strong>Nombre:</strong> ${nombre}</p>
      <p><strong>Correo:</strong> ${correo}</p>
      ${
        isFrase
          ? `<p><strong>Frase:</strong> ${frase}</p>`
          : `<p><strong>Talla seleccionada:</strong> ${talla}</p>`
      }
    `;

    await transporter.sendMail({
      from: `"${nombre}" <${correo}>`,
      to: process.env.MAIL_TO,
      subject: asunto,
      html: contenido,
    });

    console.log('✉️ Correo enviado con éxito');
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('🛑 ERROR EN EL SERVIDOR:', error);
    return new Response(JSON.stringify({ ok: false, error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export const dynamic = 'force-dynamic';
