
// vercel/functions/send-email.js
import nodemailer from "nodemailer";

export async function handler(event, context) {
  try {
    const { to, subject, text, html } = JSON.parse(event.body);

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER, // Netlify env variable
        pass: process.env.SMTP_PASS, // Netlify env variable
      },
    });

    await transporter.sendMail({
      from: `"HOPE ANIMAL CARE" <${process.env.SMTP_FROM}>`, // Changed this line
      to,
      subject,
      text,
      html,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: "Email sent!" }),
    };
  } catch (error) {
    console.error("Email error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: error.message }),
    };
  }
}