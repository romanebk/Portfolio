import nodemailer from 'nodemailer';

export async function POST({ request }) {
  try {
    const formData = await request.formData();
    const name = formData.get('name') || '';
    const email = formData.get('email') || '';
    const subject = formData.get('subject') || '';
    const message = formData.get('message') || '';

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: 'Champs obligatoires manquants' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const transporter = nodemailer.createTransport({
      host: import.meta.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(import.meta.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: import.meta.env.SMTP_USER,
        pass: import.meta.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"${name}" <${import.meta.env.SMTP_USER}>`,
      replyTo: email,
      to: import.meta.env.CONTACT_EMAIL || import.meta.env.SMTP_USER,
      subject: `[Portfolio] ${subject || 'Nouveau message'}`,
      html: `
        <h2>Nouveau message depuis le portfolio</h2>
        <p><strong>Nom :</strong> ${name}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Sujet :</strong> ${subject || '—'}</p>
        <p><strong>Message :</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: 'Erreur lors de l\'envoi' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
