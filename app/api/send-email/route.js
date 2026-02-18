import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const { subject, text, html } = await request.json();

    console.log("Email API called with:", { subject });

    // ✅ Automatically send to this email
    const to = "nishu.pwr49@gmail.com";
    // const to = "hopeanimalswelfarefoundation@gmail.com";
    // const to = "niranjansubhedar@gmail.com,nishu.pwr49@gmail.com";
    // const to = "niranjansubhedar@gmail.com";

    // Validate required fields
    if (!subject || !text) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Missing required fields: subject or text",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Check SMTP credentials
    if (
      !process.env.SMTP_HOST ||
      !process.env.SMTP_USER ||
      !process.env.SMTP_PASS ||
      !process.env.SMTP_FROM
    ) {
      console.error("Missing SMTP environment variables");
      return new Response(
        JSON.stringify({
          success: false,
          error: "Email service not configured properly",
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    console.log("Using ZeptoMail configuration:", {
      host: process.env.SMTP_HOST,
      from: process.env.SMTP_FROM,
    });

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});


    // Verify SMTP connection
    await transporter.verify();
    console.log("ZeptoMail SMTP verified successfully");

    // ✅ Compose email
    const mailOptions = {
      from: `"HOPE ANIMAL CARE" <${process.env.SMTP_FROM}>`,
      to, // always send to your Gmail
      subject,
      text,
      html: html || text,
    };

    console.log("Sending email to:", to);

    // Send email
    const result = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent:", result.messageId);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Email sent successfully!",
        messageId: result.messageId,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("❌ ZeptoMail error:", error);

    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || "Failed to send email",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
