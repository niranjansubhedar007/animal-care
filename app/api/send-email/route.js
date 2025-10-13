// // pages/api/send-email.js or api/send-email/route.js (for App Router)
// import nodemailer from "nodemailer";

// export default async function handler(req, res) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ error: 'Method not allowed' });
//   }

//   try {
//     const { to, subject, text, html } = req.body;

//     const transporter = nodemailer.createTransport({
//       host: process.env.SMTP_HOST,
//       port: 587,
//       secure: false,
//       auth: {
//         user: process.env.SMTP_USER,
//         pass: process.env.SMTP_PASS,
//       },
//     });

//     await transporter.sendMail({
//       from: `"HOPE ANIMAL CARE" <${process.env.SMTP_FROM}>`,
//       to,
//       subject,
//       text,
//       html,
//     });

//     return res.status(200).json({ success: true, message: "Email sent!" });
//   } catch (error) {
//     console.error("Email error:", error);
//     return res.status(500).json({ success: false, error: error.message });
//   }
// }



import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const { to, subject, text, html } = await request.json();

    console.log("Email API called with:", { to, subject });

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

    // Check if environment variables are set
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.error("Missing SMTP environment variables");
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Email service not configured properly" 
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    console.log("Using ZeptoMail configuration:");
    console.log("Host:", process.env.SMTP_HOST);
    console.log("User:", process.env.SMTP_USER);
    console.log("From:", process.env.SMTP_FROM);

    // ZeptoMail specific configuration
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: 587, // ZeptoMail uses port 587
      secure: false, // TLS
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      // ZeptoMail requires these specific settings
      tls: {
        ciphers: 'SSLv3',
        rejectUnauthorized: false
      },
      connectionTimeout: 30000,
      greetingTimeout: 30000,
      socketTimeout: 30000,
    });

    // Verify connection configuration
    try {
      await transporter.verify();
      console.log("ZeptoMail SMTP connection verified successfully");
    } catch (verifyError) {
      console.error("ZeptoMail SMTP verification failed:", verifyError);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: `ZeptoMail connection failed: ${verifyError.message}` 
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Send email
    const mailOptions = {
      from: `"HOPE ANIMAL CARE" <${process.env.SMTP_FROM}>`,
      to: to,
      subject: subject,
      text: text,
      html: html || text,
    };

    console.log("Sending email with options:", {
      from: mailOptions.from,
      to: mailOptions.to,
      subject: mailOptions.subject
    });

    const result = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully via ZeptoMail:", result.messageId);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Email sent successfully!",
        messageId: result.messageId 
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error("ZeptoMail sending error:", error);
    
    let errorMessage = "Failed to send email via ZeptoMail";
    if (error.code === 'ECONNREFUSED') {
      errorMessage = `Cannot connect to ZeptoMail server (${error.address}:${error.port}). Check SMTP configuration.`;
    } else if (error.response) {
      errorMessage = `ZeptoMail server error: ${error.response}`;
    } else if (error.command && error.command === 'CONN') {
      errorMessage = "ZeptoMail connection error. Check credentials and server settings.";
    } else {
      errorMessage = error.message || "Unknown ZeptoMail error";
    }

    return new Response(
      JSON.stringify({ 
        success: false, 
        error: errorMessage,
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}





