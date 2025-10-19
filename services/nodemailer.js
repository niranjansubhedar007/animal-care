
// import axios from "axios";

// /**
//  * @typedef {Object} EmailPayload
//  * @property {string} to
//  * @property {string} subject
//  * @property {string} [text]
//  * @property {string} [html]
//  */

// // Base email sender (calls API route)
// const sendEmail = async (payload) => {
//   try {
//     const res = await axios.post("/api/send-email", payload, {
//       headers: { "Content-Type": "application/json" },
//     });

//     return res.data;
//   } catch (error) {
//     console.error("Email send error:", error.response?.data || error.message);
//     return {
//       success: false,
//       error: error.response?.data?.error || error.message,
//     };
//   }
// };

// export const sendLoginEmail = async (email) => {
//   const subject = "🔐 Login Notification - Hope Animal Care";

//   const textBody = `Hello,

// Your Hope Animal Care account was just logged in successfully.  

// If this was NOT you, please contact our support team immediately.

// Best regards,
// Hope Animal Care Team
// `;

//   const htmlBody = `
//     <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 20px auto; background: #f9f9f9; border-radius: 8px; padding: 20px; border: 1px solid #ddd;">
//       <div style="text-align: center; margin-bottom: 20px;">
//         <img src="https://dummyimage.com/200x60/5E4FA2/ffffff&text=Hope+Animal+Care" alt="Hope Animal Care" style="max-width: 200px;"/>
//       </div>
//       <h2 style="color: #5E4FA2; text-align: center; margin-bottom: 20px;">🔐 Login Alert</h2>
//       <p style="color: #333; font-size: 16px;">
//         Hello,
//       </p>
//       <p style="color: #555; font-size: 15px; line-height: 1.6;">
//         Your Hope Animal Care account was just <strong>logged in successfully</strong>.
//       </p>
//       <p style="color: #555; font-size: 15px; line-height: 1.6;">
//         If this was <strong>NOT you</strong>, please <a href="mailto:info@hopeanimalcare.in" style="color:#5E4FA2;">contact our support team</a> immediately to secure your account.
//       </p>
//     </div>
//   `;

//   return sendEmail({
//     to: email,
//     subject,
//     text: textBody,
//     html: htmlBody,
//   });
// };

// export const sendReviewNotificationEmail = async (reviewData) => {
//   const subject = "⭐ New Review Received - Hope Animal Care";

//   const textBody = `New Review Received!

// Reviewer: ${reviewData.reviewerName}
// Rating: ${reviewData.rating}/5
// Date: ${reviewData.date}

// Review:
// "${reviewData.comment}"

// This review has been automatically added to your website.

// Best regards,
// Hope Animal Care System
// `;

//   const htmlBody = `
//     <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 20px auto; background: #f9f9f9; border-radius: 8px; padding: 20px; border: 1px solid #ddd;">

//       <h2 style="color: #5E4FA2; text-align: center; margin-bottom: 20px;">⭐ New Review Received</h2>
      
//       <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #A294F9;">
//         <div style="margin-bottom: 15px;">
//           <strong style="color: #5E4FA2;">Reviewer:</strong> ${reviewData.reviewerName}
//         </div>
//         <div style="margin-bottom: 15px;">
//           <strong style="color: #5E4FA2;">Rating:</strong> 
//           <span style="color: #FFD700; font-size: 18px;">
//             ${'★'.repeat(reviewData.rating)}${'☆'.repeat(5 - reviewData.rating)}
//           </span>
//           (${reviewData.rating}/5)
//         </div>
//         <div style="margin-bottom: 15px;">
//           <strong style="color: #5E4FA2;">Date:</strong> ${reviewData.date}
//         </div>
//         <div style="margin-bottom: 15px;">
//           <strong style="color: #5E4FA2;">Review:</strong>
//           <blockquote style="background: #F5EFFF; padding: 15px; border-radius: 5px; margin: 10px 0; font-style: italic; border-left: 3px solid #CDC1FF;">
//             "${reviewData.comment}"
//           </blockquote>
//         </div>
//       </div>

//       <div style="background: #E8F5E8; padding: 15px; border-radius: 5px; margin-top: 20px; border: 1px solid #C8E6C9;">
//         <p style="margin: 0; color: #2E7D32; font-size: 14px;">
//           ✅ This review has been automatically added to your website and is now visible to visitors.
//         </p>
//       </div>
//     </div>
//   `;

//   const adminEmail = process.env.NEXT_PUBLIC_SMTP_FROM;

//   return sendEmail({
//     to: adminEmail,
//     subject,
//     text: textBody,
//     html: htmlBody,
//   });
// };

// export const sendRescueRequestNotification = async (rescueData) => {
//   const urgencyColors = {
//     emergency: "#DC2626",
//     urgent: "#EA580C",
//     "not urgent": "#059669",
//   };

//   const urgencyIcons = {
//     emergency: "🚨",
//     urgent: "⚠️",
//     "not urgent": "ℹ️",
//   };

//   const subject = `🐾 New Animal Rescue Request - ${urgencyIcons[rescueData.urgency]} ${rescueData.urgency.toUpperCase()}`;

//   const htmlBody = `
//     <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 20px auto; background: #f9f9f9; border-radius: 8px; padding: 20px; border: 1px solid #ddd;">

//       <h2 style="color: #5E4FA2; text-align: center; margin-bottom: 20px;">${urgencyIcons[rescueData.urgency]} New Rescue Request</h2>
      
//       <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid ${urgencyColors[rescueData.urgency]};">
//         <div style="margin-bottom: 15px;">
//           <strong style="color: #5E4FA2;">Requester:</strong> ${rescueData.name}
//         </div>
//         <div style="margin-bottom: 15px;">
//           <strong style="color: #5E4FA2;">Phone:</strong> 
//           <a href="tel:${rescueData.phone}" style="color: #5E4FA2; text-decoration: none;">
//             ${rescueData.phone}
//           </a>
//         </div>
//         ${rescueData.email ? `
//         <div style="margin-bottom: 15px;">
//           <strong style="color: #5E4FA2;">Email:</strong> 
//           <a href="mailto:${rescueData.email}" style="color: #5E4FA2;">${rescueData.email}</a>
//         </div>
//         ` : ''}
//         <div style="margin-bottom: 15px;">
//           <strong style="color: #5E4FA2;">Location:</strong> ${rescueData.address}
//         </div>
//         <div style="margin-bottom: 15px;">
//           <strong style="color: #5E4FA2;">Urgency:</strong> 
//           <span style="color: ${urgencyColors[rescueData.urgency]}; font-weight: bold;">
//             ${urgencyIcons[rescueData.urgency]} ${rescueData.urgency.toUpperCase()}
//           </span>
//         </div>
//         ${rescueData.animalImage ? `
//         <div style="margin-bottom: 15px;">
//           <strong style="color: #5E4FA2;">Animal Photo:</strong> ✅ Provided
//         </div>
//         ` : ''}
//         ${rescueData.notes ? `
//         <div style="margin-bottom: 15px;">
//           <strong style="color: #5E4FA2;">Notes:</strong>
//           <blockquote style="background: #F5EFFF; padding: 15px; border-radius: 5px; margin: 10px 0; font-style: italic; border-left: 3px solid #CDC1FF;">
//             "${rescueData.notes}"
//           </blockquote>
//         </div>
//         ` : ''}
//       </div>
//     </div>
//   `;

//   const textBody = `
// NEW ANIMAL RESCUE REQUEST

// Requester: ${rescueData.name}
// Phone: ${rescueData.phone}
// ${rescueData.email ? `Email: ${rescueData.email}` : ''}
// Location: ${rescueData.address}
// Urgency: ${rescueData.urgency.toUpperCase()}
// ${rescueData.animalImage ? 'Animal Photo: Provided' : ''}
// ${rescueData.notes ? `Notes: ${rescueData.notes}` : ''}

// Submitted: ${new Date().toLocaleString()}
//   `;

//   const adminEmail = process.env.NEXT_PUBLIC_SMTP_FROM;

//   return sendEmail({
//     to: adminEmail,
//     subject,
//     text: textBody,
//     html: htmlBody,
//   });
// };

// export const sendVolunteerApplicationNotification = async (volunteerData) => {
//   const subject = "🤝 New Volunteer Application - Hope Animal Care";

//   const htmlBody = `
//     <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 20px auto; background: #f9f9f9; border-radius: 8px; padding: 20px; border: 1px solid #ddd;">

//       <h2 style="color: #5E4FA2; text-align: center; margin-bottom: 20px;">🤝 New Volunteer Application</h2>
      
//       <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #A294F9;">
//         <div style="margin-bottom: 15px;">
//           <strong style="color: #5E4FA2;">Name:</strong> ${volunteerData.fullName}
//         </div>
//         <div style="margin-bottom: 15px;">
//           <strong style="color: #5E4FA2;">Location:</strong> ${volunteerData.location}
//         </div>
//         <div style="margin-bottom: 15px;">
//           <strong style="color: #5E4FA2;">Phone:</strong> 
//           <a href="tel:${volunteerData.mobile}" style="color: #5E4FA2; text-decoration: none;">
//             ${volunteerData.mobile}
//           </a>
//         </div>
//         ${volunteerData.email ? `
//         <div style="margin-bottom: 15px;">
//           <strong style="color: #5E4FA2;">Email:</strong> 
//           <a href="mailto:${volunteerData.email}" style="color: #5E4FA2;">${volunteerData.email}</a>
//         </div>
//         ` : ''}
//         ${volunteerData.address ? `
//         <div style="margin-bottom: 15px;">
//           <strong style="color: #5E4FA2;">Address:</strong> ${volunteerData.address}
//         </div>
//         ` : ''}
//       </div>

//       <div style="background: #E8F5E8; padding: 15px; border-radius: 5px; margin-top: 20px; border: 1px solid #C8E6C9;">
//         <p style="margin: 0; color: #2E7D32; font-size: 14px;">
//           ✅ New volunteer application received and awaiting review.
//         </p>
//       </div>
//     </div>
//   `;

//   const textBody = `
// NEW VOLUNTEER APPLICATION

// Name: ${volunteerData.fullName}
// Location: ${volunteerData.location}
// Phone: ${volunteerData.mobile}
// ${volunteerData.email ? `Email: ${volunteerData.email}` : ''}
// ${volunteerData.address ? `Address: ${volunteerData.address}` : ''}

// Submitted: ${new Date().toLocaleString()}
//   `;

//   const adminEmail = process.env.NEXT_PUBLIC_SMTP_FROM;

//   return sendEmail({
//     to: adminEmail,
//     subject,
//     text: textBody,
//     html: htmlBody,
//   });
// };

// export const sendJobApplicationNotification = async (applicationData) => {
//   const subject = "💼 New Job Application - Hope Animal Care";

//   const htmlBody = `
//     <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 20px auto; background: #f9f9f9; border-radius: 8px; padding: 20px; border: 1px solid #ddd;">

//       <h2 style="color: #5E4FA2; text-align: center; margin-bottom: 20px;">💼 New Job Application</h2>
      
//       <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #A294F9;">
//         <div style="margin-bottom: 15px;">
//           <strong style="color: #5E4FA2;">Applicant:</strong> ${applicationData.name}
//         </div>
//         <div style="margin-bottom: 15px;">
//           <strong style="color: #5E4FA2;">Phone:</strong> 
//           <a href="tel:${applicationData.number}" style="color: #5E4FA2; text-decoration: none;">
//             ${applicationData.number}
//           </a>
//         </div>
//         <div style="margin-bottom: 15px;">
//           <strong style="color: #5E4FA2;">Email:</strong> 
//           <a href="mailto:${applicationData.email}" style="color: #5E4FA2;">${applicationData.email}</a>
//         </div>
//         <div style="margin-bottom: 15px;">
//           <strong style="color: #5E4FA2;">Education:</strong> ${applicationData.education}
//         </div>
//         <div style="margin-bottom: 15px;">
//           <strong style="color: #5E4FA2;">Address:</strong> ${applicationData.address}
//         </div>
//         <div style="margin-bottom: 15px;">
//           <strong style="color: #5E4FA2;">Resume:</strong> 
//           ${applicationData.resumeUrl ? '✅ Uploaded' : '❌ Not provided'}
//         </div>
//       </div>

//       <div style="background: #E8F5E8; padding: 15px; border-radius: 5px; margin-top: 20px; border: 1px solid #C8E6C9;">
//         <p style="margin: 0; color: #2E7D32; font-size: 14px;">
//           ✅ New job application received and awaiting HR review.
//         </p>
//       </div>
//     </div>
//   `;

//   const textBody = `
// NEW JOB APPLICATION

// Applicant: ${applicationData.name}
// Phone: ${applicationData.number}
// Email: ${applicationData.email}
// Education: ${applicationData.education}
// Address: ${applicationData.address}
// Resume: ${applicationData.resumeUrl ? 'Uploaded' : 'Not provided'}

// Submitted: ${new Date().toLocaleString()}
//   `;

//   const adminEmail = process.env.NEXT_PUBLIC_SMTP_FROM;

//   return sendEmail({
//     to: adminEmail,
//     subject,
//     text: textBody,
//     html: htmlBody,
//   });
// };

// export const sendContactFormNotification = async (contactData) => {
//   const priorityColors = {
//     'Adoption': '#DC2626',
//     'Volunteer': '#EA580C',
//     'Donation': '#059669',
//     'Other': '#5E4FA2'
//   };

//   const subject = `📧 New Contact Message - ${contactData.subject}`;

//   const htmlBody = `
//     <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 20px auto; background: #f9f9f9; border-radius: 8px; padding: 20px; border: 1px solid #ddd;">

//       <h2 style="color: #5E4FA2; text-align: center; margin-bottom: 20px;">📧 New Contact Message</h2>
      
//       <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid ${priorityColors[contactData.subject] || '#5E4FA2'};">
//         <div style="margin-bottom: 15px;">
//           <strong style="color: #5E4FA2;">From:</strong> ${contactData.name}
//         </div>
//         <div style="margin-bottom: 15px;">
//           <strong style="color: #5E4FA2;">Phone:</strong> 
//           <a href="tel:${contactData.phone}" style="color: #5E4FA2; text-decoration: none;">
//             ${contactData.phone}
//           </a>
//         </div>
//         ${contactData.email ? `
//         <div style="margin-bottom: 15px;">
//           <strong style="color: #5E4FA2;">Email:</strong> 
//           <a href="mailto:${contactData.email}" style="color: #5E4FA2;">${contactData.email}</a>
//         </div>
//         ` : ''}
//         <div style="margin-bottom: 15px;">
//           <strong style="color: #5E4FA2;">Subject:</strong> 
//           <span style="color: ${priorityColors[contactData.subject] || '#5E4FA2'}; font-weight: bold;">
//             ${contactData.subject}
//           </span>
//         </div>
//         ${contactData.message ? `
//         <div style="margin-bottom: 15px;">
//           <strong style="color: #5E4FA2;">Message:</strong>
//           <blockquote style="background: #F5EFFF; padding: 15px; border-radius: 5px; margin: 10px 0; font-style: italic; border-left: 3px solid #CDC1FF;">
//             "${contactData.message}"
//           </blockquote>
//         </div>
//         ` : ''}
//       </div>
//     </div>
//   `;

//   const textBody = `
// NEW CONTACT MESSAGE

// From: ${contactData.name}
// Phone: ${contactData.phone}
// ${contactData.email ? `Email: ${contactData.email}` : ''}
// Subject: ${contactData.subject}
// ${contactData.message ? `Message: ${contactData.message}` : ''}

// Submitted: ${new Date().toLocaleString()}
//   `;

//   const adminEmail = process.env.NEXT_PUBLIC_SMTP_FROM;

//   return sendEmail({
//     to: adminEmail,
//     subject,
//     text: textBody,
//     html: htmlBody,
//   });
// };

import axios from "axios";

/**
 * @typedef {Object} EmailPayload
 * @property {string} to
 * @property {string} subject
 * @property {string} [text]
 * @property {string} [html]
 * @property {Array} [attachments]
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
      error: error.response?.data?.error || error.message,
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
    </div>
  `;

  const adminEmail = process.env.NEXT_PUBLIC_SMTP_FROM;

  return sendEmail({
    to: adminEmail,
    subject,
    text: textBody,
    html: htmlBody,
  });
};

export const sendRescueRequestNotification = async (rescueData) => {
  const urgencyColors = {
    emergency: "#DC2626",
    urgent: "#EA580C",
    "not urgent": "#059669",
  };

  const urgencyIcons = {
    emergency: "🚨",
    urgent: "⚠️",
    "not urgent": "ℹ️",
  };

  const subject = `🐾 New Animal Rescue Request - ${urgencyIcons[rescueData.urgency]} ${rescueData.urgency.toUpperCase()}`;

  const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 20px auto; background: #f9f9f9; border-radius: 8px; padding: 20px; border: 1px solid #ddd;">

      <h2 style="color: #5E4FA2; text-align: center; margin-bottom: 20px;">${urgencyIcons[rescueData.urgency]} New Rescue Request</h2>
      
      <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid ${urgencyColors[rescueData.urgency]};">
        <div style="margin-bottom: 15px;">
          <strong style="color: #5E4FA2;">Requester:</strong> ${rescueData.name}
        </div>
        <div style="margin-bottom: 15px;">
          <strong style="color: #5E4FA2;">Phone:</strong> 
          <a href="tel:${rescueData.phone}" style="color: #5E4FA2; text-decoration: none;">
            ${rescueData.phone}
          </a>
        </div>
        ${rescueData.email ? `
        <div style="margin-bottom: 15px;">
          <strong style="color: #5E4FA2;">Email:</strong> 
          <a href="mailto:${rescueData.email}" style="color: #5E4FA2;">${rescueData.email}</a>
        </div>
        ` : ''}
        <div style="margin-bottom: 15px;">
          <strong style="color: #5E4FA2;">Location:</strong> ${rescueData.address}
        </div>
        <div style="margin-bottom: 15px;">
          <strong style="color: #5E4FA2;">Urgency:</strong> 
          <span style="color: ${urgencyColors[rescueData.urgency]}; font-weight: bold;">
            ${urgencyIcons[rescueData.urgency]} ${rescueData.urgency.toUpperCase()}
          </span>
        </div>
        ${rescueData.animalImage ? `
        <div style="margin-bottom: 15px;">
          <strong style="color: #5E4FA2;">Animal Photo:</strong>
        </div>
        <div style="text-align: center; margin: 15px 0;">
          <img src="${rescueData.animalImage}" alt="Animal in need of rescue" style="max-width: 100%; max-height: 300px; border-radius: 8px; border: 2px solid #CDC1FF;" />
          <p style="margin: 10px 0 0 0; color: #666; font-size: 12px;">
            <a href="${rescueData.animalImage}" target="_blank" style="color: #5E4FA2;">View full size image</a>
          </p>
        </div>
        ` : ''}
        ${rescueData.notes ? `
        <div style="margin-bottom: 15px;">
          <strong style="color: #5E4FA2;">Notes:</strong>
          <blockquote style="background: #F5EFFF; padding: 15px; border-radius: 5px; margin: 10px 0; font-style: italic; border-left: 3px solid #CDC1FF;">
            "${rescueData.notes}"
          </blockquote>
        </div>
        ` : ''}
      </div>
    </div>
  `;

  const textBody = `
NEW ANIMAL RESCUE REQUEST

Requester: ${rescueData.name}
Phone: ${rescueData.phone}
${rescueData.email ? `Email: ${rescueData.email}` : ''}
Location: ${rescueData.address}
Urgency: ${rescueData.urgency.toUpperCase()}
${rescueData.animalImage ? `Animal Photo: ${rescueData.animalImage}` : ''}
${rescueData.notes ? `Notes: ${rescueData.notes}` : ''}

Submitted: ${new Date().toLocaleString()}
  `;

  const adminEmail = process.env.NEXT_PUBLIC_SMTP_FROM;

  return sendEmail({
    to: adminEmail,
    subject,
    text: textBody,
    html: htmlBody,
  });
};

export const sendVolunteerApplicationNotification = async (volunteerData) => {
  const subject = "🤝 New Volunteer Application - Hope Animal Care";

  const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 20px auto; background: #f9f9f9; border-radius: 8px; padding: 20px; border: 1px solid #ddd;">

      <h2 style="color: #5E4FA2; text-align: center; margin-bottom: 20px;">🤝 New Volunteer Application</h2>
      
      <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #A294F9;">
        <div style="margin-bottom: 15px;">
          <strong style="color: #5E4FA2;">Name:</strong> ${volunteerData.fullName}
        </div>
        <div style="margin-bottom: 15px;">
          <strong style="color: #5E4FA2;">Location:</strong> ${volunteerData.location}
        </div>
        <div style="margin-bottom: 15px;">
          <strong style="color: #5E4FA2;">Phone:</strong> 
          <a href="tel:${volunteerData.mobile}" style="color: #5E4FA2; text-decoration: none;">
            ${volunteerData.mobile}
          </a>
        </div>
        ${volunteerData.email ? `
        <div style="margin-bottom: 15px;">
          <strong style="color: #5E4FA2;">Email:</strong> 
          <a href="mailto:${volunteerData.email}" style="color: #5E4FA2;">${volunteerData.email}</a>
        </div>
        ` : ''}
        ${volunteerData.address ? `
        <div style="margin-bottom: 15px;">
          <strong style="color: #5E4FA2;">Address:</strong> ${volunteerData.address}
        </div>
        ` : ''}
      </div>

      <div style="background: #E8F5E8; padding: 15px; border-radius: 5px; margin-top: 20px; border: 1px solid #C8E6C9;">
        <p style="margin: 0; color: #2E7D32; font-size: 14px;">
          ✅ New volunteer application received and awaiting review.
        </p>
      </div>
    </div>
  `;

  const textBody = `
NEW VOLUNTEER APPLICATION

Name: ${volunteerData.fullName}
Location: ${volunteerData.location}
Phone: ${volunteerData.mobile}
${volunteerData.email ? `Email: ${volunteerData.email}` : ''}
${volunteerData.address ? `Address: ${volunteerData.address}` : ''}

Submitted: ${new Date().toLocaleString()}
  `;

  const adminEmail = process.env.NEXT_PUBLIC_SMTP_FROM;

  return sendEmail({
    to: adminEmail,
    subject,
    text: textBody,
    html: htmlBody,
  });
};

export const sendJobApplicationNotification = async (applicationData) => {
  const subject = "💼 New Job Application - Hope Animal Care";

  // Prepare attachments if resume is provided
  let attachments = [];
  
  if (applicationData.resumeUrl) {
    // Extract filename from URL
    const fileName = applicationData.resumeUrl.split('/').pop() || 'resume.pdf';
    
    attachments = [
      {
        filename: fileName,
        path: applicationData.resumeUrl,
        contentType: 'application/pdf'
      }
    ];
  }

  const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 20px auto; background: #f9f9f9; border-radius: 8px; padding: 20px; border: 1px solid #ddd;">

      <h2 style="color: #5E4FA2; text-align: center; margin-bottom: 20px;">💼 New Job Application</h2>
      
      <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #A294F9;">
        <div style="margin-bottom: 15px;">
          <strong style="color: #5E4FA2;">Applicant:</strong> ${applicationData.name}
        </div>
        <div style="margin-bottom: 15px;">
          <strong style="color: #5E4FA2;">Phone:</strong> 
          <a href="tel:${applicationData.number}" style="color: #5E4FA2; text-decoration: none;">
            ${applicationData.number}
          </a>
        </div>
        <div style="margin-bottom: 15px;">
          <strong style="color: #5E4FA2;">Email:</strong> 
          <a href="mailto:${applicationData.email}" style="color: #5E4FA2;">${applicationData.email}</a>
        </div>
        <div style="margin-bottom: 15px;">
          <strong style="color: #5E4FA2;">Education:</strong> ${applicationData.education}
        </div>
        <div style="margin-bottom: 15px;">
          <strong style="color: #5E4FA2;">Address:</strong> ${applicationData.address}
        </div>
        <div style="margin-bottom: 15px;">
          <strong style="color: #5E4FA2;">Resume:</strong> 
          ${applicationData.resumeUrl ? 
            `📎 <a href="${applicationData.resumeUrl}" target="_blank" style="color: #5E4FA2; font-weight: bold;">View Resume PDF</a>` : 
            '❌ Not provided'
          }
        </div>
        ${applicationData.resumeUrl ? `
        <div style="background: #E3F2FD; padding: 10px; border-radius: 5px; margin-top: 10px;">
          <p style="margin: 0; color: #1565C0; font-size: 14px;">
            📄 Resume has been attached to this email and is also available at the link above.
          </p>
        </div>
        ` : ''}
      </div>

      <div style="background: #E8F5E8; padding: 15px; border-radius: 5px; margin-top: 20px; border: 1px solid #C8E6C9;">
        <p style="margin: 0; color: #2E7D32; font-size: 14px;">
          ✅ New job application received with resume.
        </p>
      </div>
    </div>
  `;

  const textBody = `
NEW JOB APPLICATION

Applicant: ${applicationData.name}
Phone: ${applicationData.number}
Email: ${applicationData.email}
Education: ${applicationData.education}
Address: ${applicationData.address}
Resume: ${applicationData.resumeUrl ? `Download from: ${applicationData.resumeUrl}` : 'Not provided'}

Submitted: ${new Date().toLocaleString()}
  `;

  const adminEmail = process.env.NEXT_PUBLIC_SMTP_FROM;

  return sendEmail({
    to: adminEmail,
    subject,
    text: textBody,
    html: htmlBody,
    attachments: attachments
  });
};

export const sendContactFormNotification = async (contactData) => {
  const priorityColors = {
    'Adoption': '#DC2626',
    'Volunteer': '#EA580C',
    'Donation': '#059669',
    'Other': '#5E4FA2'
  };

  const subject = `📧 New Contact Message - ${contactData.subject}`;

  const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 20px auto; background: #f9f9f9; border-radius: 8px; padding: 20px; border: 1px solid #ddd;">

      <h2 style="color: #5E4FA2; text-align: center; margin-bottom: 20px;">📧 New Contact Message</h2>
      
      <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid ${priorityColors[contactData.subject] || '#5E4FA2'};">
        <div style="margin-bottom: 15px;">
          <strong style="color: #5E4FA2;">From:</strong> ${contactData.name}
        </div>
        <div style="margin-bottom: 15px;">
          <strong style="color: #5E4FA2;">Phone:</strong> 
          <a href="tel:${contactData.phone}" style="color: #5E4FA2; text-decoration: none;">
            ${contactData.phone}
          </a>
        </div>
        ${contactData.email ? `
        <div style="margin-bottom: 15px;">
          <strong style="color: #5E4FA2;">Email:</strong> 
          <a href="mailto:${contactData.email}" style="color: #5E4FA2;">${contactData.email}</a>
        </div>
        ` : ''}
        <div style="margin-bottom: 15px;">
          <strong style="color: #5E4FA2;">Subject:</strong> 
          <span style="color: ${priorityColors[contactData.subject] || '#5E4FA2'}; font-weight: bold;">
            ${contactData.subject}
          </span>
        </div>
        ${contactData.message ? `
        <div style="margin-bottom: 15px;">
          <strong style="color: #5E4FA2;">Message:</strong>
          <blockquote style="background: #F5EFFF; padding: 15px; border-radius: 5px; margin: 10px 0; font-style: italic; border-left: 3px solid #CDC1FF;">
            "${contactData.message}"
          </blockquote>
        </div>
        ` : ''}
      </div>
    </div>
  `;

  const textBody = `
NEW CONTACT MESSAGE

From: ${contactData.name}
Phone: ${contactData.phone}
${contactData.email ? `Email: ${contactData.email}` : ''}
Subject: ${contactData.subject}
${contactData.message ? `Message: ${contactData.message}` : ''}

Submitted: ${new Date().toLocaleString()}
  `;

  const adminEmail = process.env.NEXT_PUBLIC_SMTP_FROM;

  return sendEmail({
    to: adminEmail,
    subject,
    text: textBody,
    html: htmlBody,
  });
};

