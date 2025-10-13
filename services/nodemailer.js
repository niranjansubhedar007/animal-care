import axios from "axios";

/**
 * @typedef {Object} EmailPayload
 * @property {string} to
 * @property {string} subject
 * @property {string} [text]
 * @property {string} [html]
 */

// Base email sender (calls API route)
const sendEmail = async (payload) => {
  try {
    const res = await axios.post("/api/send-email", payload, {
      headers: { "Content-Type": "application/json" },
    });

    return res.data;
  } catch (error) {
    console.error("Email send error:", error.response?.data || error.message);
    return { 
      success: false, 
      error: error.response?.data?.error || error.message 
    };
  }
};

export const sendLoginEmail = async (email) => {
  const subject = "🔐 Login Notification - Hope Animal Care";

  const textBody = `Hello,

Your Hope Animal Care account was just logged in successfully.  

If this was NOT you, please contact our support team immediately.

Best regards,
Hope Animal Care Team
`;

  const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 20px auto; background: #f9f9f9; border-radius: 8px; padding: 20px; border: 1px solid #ddd;">
      <div style="text-align: center; margin-bottom: 20px;">
        <img src="https://dummyimage.com/200x60/5E4FA2/ffffff&text=Hope+Animal+Care" alt="Hope Animal Care" style="max-width: 200px;"/>
      </div>
      <h2 style="color: #5E4FA2; text-align: center; margin-bottom: 20px;">🔐 Login Alert</h2>
      <p style="color: #333; font-size: 16px;">
        Hello,
      </p>
      <p style="color: #555; font-size: 15px; line-height: 1.6;">
        Your Hope Animal Care account was just <strong>logged in successfully</strong>.
      </p>
      <p style="color: #555; font-size: 15px; line-height: 1.6;">
        If this was <strong>NOT you</strong>, please <a href="mailto:info@hopeanimalcare.in" style="color:#5E4FA2;">contact our support team</a> immediately to secure your account.
      </p>
      <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;"/>
      <p style="color: #999; font-size: 12px; text-align: center;">
        Hope Animal Care © ${new Date().getFullYear()} <br/>
        This is an automated message. Please do not reply directly to this email.
      </p>
    </div>
  `;

  return sendEmail({
    to: email,
    subject,
    text: textBody,
    html: htmlBody,
  });
};

export const sendReviewNotificationEmail = async (reviewData) => {
  const subject = "⭐ New Review Received - Hope Animal Care";

  const textBody = `New Review Received!

Reviewer: ${reviewData.reviewerName}
Rating: ${reviewData.rating}/5
Date: ${reviewData.date}

Review:
"${reviewData.comment}"

This review has been automatically added to your website.

Best regards,
Hope Animal Care System
`;

  const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 20px auto; background: #f9f9f9; border-radius: 8px; padding: 20px; border: 1px solid #ddd;">

      <h2 style="color: #5E4FA2; text-align: center; margin-bottom: 20px;">⭐ New Review Received</h2>
      
      <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #A294F9;">
        <div style="margin-bottom: 15px;">
          <strong style="color: #5E4FA2;">Reviewer:</strong> ${reviewData.reviewerName}
        </div>
        <div style="margin-bottom: 15px;">
          <strong style="color: #5E4FA2;">Rating:</strong> 
          <span style="color: #FFD700; font-size: 18px;">
            ${'★'.repeat(reviewData.rating)}${'☆'.repeat(5 - reviewData.rating)}
          </span>
          (${reviewData.rating}/5)
        </div>
        <div style="margin-bottom: 15px;">
          <strong style="color: #5E4FA2;">Date:</strong> ${reviewData.date}
        </div>
        <div style="margin-bottom: 15px;">
          <strong style="color: #5E4FA2;">Review:</strong>
          <blockquote style="background: #F5EFFF; padding: 15px; border-radius: 5px; margin: 10px 0; font-style: italic; border-left: 3px solid #CDC1FF;">
            "${reviewData.comment}"
          </blockquote>
        </div>
      </div>

      <div style="background: #E8F5E8; padding: 15px; border-radius: 5px; margin-top: 20px; border: 1px solid #C8E6C9;">
        <p style="margin: 0; color: #2E7D32; font-size: 14px;">
          ✅ This review has been automatically added to your website and is now visible to visitors.
        </p>
      </div>

      <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;"/>
      <p style="color: #999; font-size: 12px; text-align: center;">
        Hope Animal Care © 2021 <br/>
        This is an automated notification. Please do not reply directly to this email.
      </p>
    </div>
  `;

  // Use environment variable for admin email
  const adminEmail = process.env.NEXT_PUBLIC_SMTP_FROM ;

  return sendEmail({
    to: adminEmail,
    subject,
    text: textBody,
    html: htmlBody,
  });
};