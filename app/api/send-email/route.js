import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const { to, subject, text, html } = await request.json();

    // Validate required fields
    if (!to || !subject || !text) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Missing required fields: to, subject, text" 
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"HOPE ANIMAL CARE" <${process.env.SMTP_FROM}>`,
      to,
      subject,
      text,
      html: html || text, // Use html if provided, otherwise use text
    });

    return new Response(
      JSON.stringify({ success: true, message: "Email sent successfully!" }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error("Email error:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || "Failed to send email" 
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

// Handle other methods
export async function GET() {
  return new Response(
    JSON.stringify({ error: "Method not allowed" }),
    { status: 405, headers: { 'Content-Type': 'application/json' } }
  );
}