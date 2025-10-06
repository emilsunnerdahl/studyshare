// netlify/functions/sendEmail.js
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function handler(event) {
  try {
    const { name, email, message } = JSON.parse(event.body);

    await resend.emails.send({
      from: "StudyShare <contact@studyshare.se>", // måste vara en verifierad domän eller avsändare
      to: ["you@studyshare.se"], // mottagaradress (din)
      subject: `New message from ${name}`,
      text: `Email: ${email}\n\n${message}`,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: error.message }),
    };
  }
}
