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
//       <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;"/>
//       <p style="color: #999; font-size: 12px; text-align: center;">
//         Hope Animal Care © 2021 <br/>
//         This is an automated message. Please do not reply directly to this email.
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
//           <strong style="color: #5E4FA2;">Reviewer:</strong> ${
//             reviewData.reviewerName
//           }
//         </div>
//         <div style="margin-bottom: 15px;">
//           <strong style="color: #5E4FA2;">Rating:</strong> 
//           <span style="color: #FFD700; font-size: 18px;">
//             ${"★".repeat(reviewData.rating)}${"☆".repeat(5 - reviewData.rating)}
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

//   // Use environment variable for admin email
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
//     emergency: "🚨 EMERGENCY",
//     urgent: "⚠️ URGENT",
//     "not urgent": "ℹ️ NOT URGENT",
//   };

//   const subject = `🐾 New Animal Rescue Request - ${
//     urgencyIcons[rescueData.urgency]
//   }`;

//   const htmlBody = `
//     <!DOCTYPE html>
//     <html>
//     <head>
//       <meta charset="utf-8">
//       <style>
//         body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
//         .container { max-width: 600px; margin: 0 auto; background: #ffffff; }
//         .header { background: #5E4FA2; padding: 20px; text-align: center; }
//         .urgency-banner { background: ${
//           urgencyColors[rescueData.urgency]
//         }; color: white; padding: 15px; text-align: center; font-weight: bold; }
//         .content { padding: 25px; }
//         .section { margin-bottom: 25px; }
//         .detail-row { display: flex; margin-bottom: 8px; padding: 8px 0; border-bottom: 1px solid #f0f0f0; }
//         .detail-label { font-weight: bold; width: 140px; color: #5E4FA2; }
//         .detail-value { flex: 1; }
//         .notes-box { background: #f8f9fa; padding: 15px; border-radius: 5px; border-left: 4px solid #5E4FA2; margin-top: 10px; }
//         .footer { background: #f5f5f5; padding: 20px; text-align: center; font-size: 12px; color: #666; }
//         .action-btn { display: inline-block; background: #5E4FA2; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; margin: 10px 5px; }
//       </style>
//     </head>
//     <body>
//       <div class="container">
//         <!-- Header -->
//         <div class="header">
//           <h1 style="color: white; margin: 0;">🐾 Hope Animal Care</h1>
//           <p style="color: white; margin: 5px 0 0 0; opacity: 0.9;">Animal Rescue Team</p>
//         </div>

//         <!-- Urgency Banner -->
//         <div class="urgency-banner">
//           ${urgencyIcons[rescueData.urgency]} - NEW RESCUE REQUEST RECEIVED
//         </div>

//         <!-- Main Content -->
//         <div class="content">
//           <div class="section">
//             <h2 style="color: #5E4FA2; margin-top: 0;">Animal Rescue Request Details</h2>
//             <p>A new animal rescue request has been submitted and requires your attention.</p>
//           </div>

//           <!-- Requester Information -->
//           <div class="section">
//             <h3 style="color: #5E4FA2; border-bottom: 2px solid #5E4FA2; padding-bottom: 8px;">👤 Requester Information</h3>
            
//             <div class="detail-row">
//               <div class="detail-label">Full Name:</div>
//               <div class="detail-value">${rescueData.name}</div>
//             </div>
            
//             <div class="detail-row">
//               <div class="detail-label">Phone Number:</div>
//               <div class="detail-value">
//                 <a href="tel:${
//                   rescueData.phone
//                 }" style="color: #5E4FA2; text-decoration: none;">
//                   📞 ${rescueData.phone}
//                 </a>
//               </div>
//             </div>
            
//             <div class="detail-row">
//               <div class="detail-label">Email:</div>
//               <div class="detail-value">
//                 ${
//                   rescueData.email
//                     ? `<a href="mailto:${rescueData.email}" style="color: #5E4FA2;">✉️ ${rescueData.email}</a>`
//                     : "Not provided"
//                 }
//               </div>
//             </div>
//           </div>

//           <!-- Rescue Details -->
//           <div class="section">
//             <h3 style="color: #5E4FA2; border-bottom: 2px solid #5E4FA2; padding-bottom: 8px;">📍 Rescue Details</h3>
            
//             <div class="detail-row">
//               <div class="detail-label">Location:</div>
//               <div class="detail-value">${rescueData.address}</div>
//             </div>
            
//             <div class="detail-row">
//               <div class="detail-label">Urgency Level:</div>
//               <div class="detail-value">
//                 <strong style="color: ${urgencyColors[rescueData.urgency]};">
//                   ${rescueData.urgency.toUpperCase()}
//                 </strong>
//               </div>
//             </div>
            
//             <div class="detail-row">
//               <div class="detail-label">Animal Photo:</div>
//               <div class="detail-value">
//                 ${
//                   rescueData.animalImage
//                     ? "✅ Provided (Check system for image)"
//                     : "❌ Not provided"
//                 }
//               </div>
//             </div>
//           </div>

//           <!-- Additional Notes -->
//           ${
//             rescueData.notes
//               ? `
//           <div class="section">
//             <h3 style="color: #5E4FA2; border-bottom: 2px solid #5E4FA2; padding-bottom: 8px;">📝 Additional Notes</h3>
//             <div class="notes-box">
//               "${rescueData.notes}"
//             </div>
//           </div>
//           `
//               : ""
//           }

        
     
//         </div>

//         <!-- Footer -->
//         <div class="footer">
//           <p style="margin: 0;">
//             <strong>Hope Animal Care Rescue Team</strong><br>
//             Emergency Line: +91 9136263344 (24/7)<br>
//             This is an automated notification. Please respond promptly.
//           </p>
//           <p style="margin: 10px 0 0 0; color: #999;">
//             © 2021 Hope Animal Care. All rights reserved.
//           </p>
//         </div>
//       </div>
//     </body>
//     </html>
//   `;

//   const textBody = `
// NEW ANIMAL RESCUE REQUEST RECEIVED
// ===================================

// URGENCY LEVEL: ${rescueData.urgency.toUpperCase()}

// REQUESTER INFORMATION:
// ----------------------
// Name: ${rescueData.name}
// Phone: ${rescueData.phone}
// Email: ${rescueData.email || "Not provided"}

// RESCUE DETAILS:
// ---------------
// Location: ${rescueData.address}
// Urgency: ${rescueData.urgency}
// Animal Photo: ${rescueData.animalImage ? "Provided" : "Not provided"}

// ${
//   rescueData.notes
//     ? `
// ADDITIONAL NOTES:
// -----------------
// ${rescueData.notes}
// `
//     : ""
// }

// SUBMISSION DETAILS:
// -------------------
// Submitted: ${new Date().toLocaleString()}

// Please take immediate action if this is an emergency!

// Hope Animal Care Rescue Team
// Emergency: +91 9136263344
//   `;

//   // Use environment variable for admin email
//   const adminEmail = process.env.NEXT_PUBLIC_SMTP_FROM;

//   return sendEmail({
//     to: adminEmail,
//     subject,
//     text: textBody,
//     html: htmlBody,
//   });
// };



// // Add these functions to your existing nodemailer.js file

// export const sendVolunteerApplicationNotification = async (volunteerData) => {
//   const subject = "🤝 New Volunteer Application - Hope Animal Care";

//   const htmlBody = `
//     <!DOCTYPE html>
//     <html>
//     <head>
//       <meta charset="utf-8">
//       <style>
//         body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
//         .container { max-width: 600px; margin: 0 auto; background: #ffffff; }
//         .header { background: #5E4FA2; padding: 20px; text-align: center; }
//         .welcome-banner { background: linear-gradient(135deg, #A294F9, #5E4FA2); color: white; padding: 20px; text-align: center; }
//         .content { padding: 25px; }
//         .section { margin-bottom: 25px; }
//         .detail-row { display: flex; margin-bottom: 10px; padding: 10px 0; border-bottom: 1px solid #f0f0f0; }
//         .detail-label { font-weight: bold; width: 150px; color: #5E4FA2; }
//         .detail-value { flex: 1; }
//         .highlight-box { background: #F5EFFF; padding: 20px; border-radius: 8px; border-left: 4px solid #A294F9; }
//         .footer { background: #f5f5f5; padding: 20px; text-align: center; font-size: 12px; color: #666; }
//         .action-btn { display: inline-block; background: #5E4FA2; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin: 5px; font-size: 14px; }
//         .badge { display: inline-block; background: #E8F5E8; color: #059669; padding: 4px 12px; border-radius: 15px; font-size: 12px; font-weight: bold; margin-left: 10px; }
//       </style>
//     </head>
//     <body>
//       <div class="container">
//         <!-- Header -->
//         <div class="header">
//           <h1 style="color: white; margin: 0;">🤝 Hope Animal Care</h1>
//           <p style="color: white; margin: 5px 0 0 0; opacity: 0.9;">Volunteer Program</p>
//         </div>

//         <!-- Welcome Banner -->
//         <div class="welcome-banner">
//           <h2 style="margin: 0; font-size: 24px;">NEW VOLUNTEER APPLICATION</h2>
//           <p style="margin: 10px 0 0 0; opacity: 0.9;">A passionate individual wants to join our mission!</p>
//         </div>

//         <!-- Main Content -->
//         <div class="content">
//           <!-- Application Details -->
//           <div class="section">
//             <h3 style="color: #5E4FA2; margin-top: 0; border-bottom: 2px solid #5E4FA2; padding-bottom: 10px;">
//               📋 Application Details
//             </h3>
            
//             <div class="detail-row">
//               <div class="detail-label">Full Name:</div>
//               <div class="detail-value">
//                 <strong>${volunteerData.fullName}</strong>
//                 <span class="badge">NEW APPLICANT</span>
//               </div>
//             </div>
            
//             <div class="detail-row">
//               <div class="detail-label">📍 Location:</div>
//               <div class="detail-value">${volunteerData.location}</div>
//             </div>
            
//             <div class="detail-row">
//               <div class="detail-label">📞 Mobile:</div>
//               <div class="detail-value">
//                 <a href="tel:${volunteerData.mobile}" style="color: #5E4FA2; text-decoration: none; font-weight: bold;">
//                   ${volunteerData.mobile}
//                 </a>
//               </div>
//             </div>
            
//             <div class="detail-row">
//               <div class="detail-label">✉️ Email:</div>
//               <div class="detail-value">
//                 ${volunteerData.email ? 
//                   `<a href="mailto:${volunteerData.email}" style="color: #5E4FA2;">${volunteerData.email}</a>` : 
//                   '<span style="color: #999;">Not provided</span>'
//                 }
//               </div>
//             </div>
            
//             ${volunteerData.address ? `
//             <div class="detail-row">
//               <div class="detail-label">🏠 Address:</div>
//               <div class="detail-value">${volunteerData.address}</div>
//             </div>
//             ` : ''}
//           </div>

   
//           <!-- Application Info -->
//           <div class="section">
//             <div style="background: #E3F2FD; padding: 15px; border-radius: 5px; border-left: 4px solid #2196F3;">
//               <h4 style="color: #1565C0; margin-top: 0;">📊 Application Information</h4>
//               <table style="width: 100%; color: #1565C0; font-size: 14px;">
//                 <tr>
//                   <td style="padding: 5px 0;"><strong>Application ID:</strong></td>
//                   <td style="padding: 5px 0;">#VOL${Math.random().toString(36).substr(2, 6).toUpperCase()}</td>
//                 </tr>
//                 <tr>
//                   <td style="padding: 5px 0;"><strong>Submitted:</strong></td>
//                   <td style="padding: 5px 0;">${new Date().toLocaleString('en-IN', { 
//                     timeZone: 'Asia/Kolkata',
//                     dateStyle: 'full', 
//                     timeStyle: 'medium' 
//                   })}</td>
//                 </tr>
//                 <tr>
//                   <td style="padding: 5px 0;"><strong>Status:</strong></td>
//                   <td style="padding: 5px 0;">
//                     <span style="background: #FFF3CD; color: #856404; padding: 2px 8px; border-radius: 12px; font-size: 12px;">
//                       ⏳ Pending Review
//                     </span>
//                   </td>
//                 </tr>
//               </table>
//             </div>
//           </div>

//           <!-- Next Steps -->
//           <div class="section">
//             <h4 style="color: #5E4FA2; margin-bottom: 10px;">📝 Recommended Next Steps:</h4>
//             <ol style="color: #666; padding-left: 20px; margin: 0;">
//               <li>Contact applicant within 24-48 hours</li>
//               <li>Schedule orientation session</li>
//               <li>Assign volunteer coordinator</li>
//               <li>Provide training materials</li>
//             </ol>
//           </div>
//         </div>

//         <!-- Footer -->
//         <div class="footer">
//           <p style="margin: 0;">
//             <strong>Hope Animal Care Volunteer Team</strong><br>
//             Building a compassionate community, one volunteer at a time 🌟
//           </p>
//           <p style="margin: 10px 0 0 0; color: #999;">
//             © 2021 Hope Animal Care. All rights reserved.
//           </p>
//         </div>
//       </div>
//     </body>
//     </html>
//   `;

//   const textBody = `
// NEW VOLUNTEER APPLICATION RECEIVED
// ==================================

// APPLICANT DETAILS:
// ------------------
// Full Name: ${volunteerData.fullName}
// Location: ${volunteerData.location}
// Mobile: ${volunteerData.mobile}
// Email: ${volunteerData.email || 'Not provided'}
// ${volunteerData.address ? `Address: ${volunteerData.address}` : ''}

// APPLICATION INFORMATION:
// -----------------------
// Application ID: #VOL${Math.random().toString(36).substr(2, 6).toUpperCase()}
// Submitted: ${new Date().toLocaleString()}
// Status: Pending Review

// NEXT STEPS:
// -----------
// 1. Contact applicant within 24-48 hours
// 2. Schedule orientation session
// 3. Assign volunteer coordinator
// 4. Provide training materials

// Please reach out to welcome our new potential volunteer!

// Hope Animal Care Volunteer Team
//   `;

//   const adminEmail = process.env.NEXT_PUBLIC_SMTP_FROM;

//   return sendEmail({
//     to: adminEmail,
//     subject,
//     text: textBody,
//     html: htmlBody,
//   });
// };

// export const sendVolunteerApplicationConfirmation = async (volunteerData) => {
//   const subject = "🤝 Thank You for Your Volunteer Application - Hope Animal Care";

//   const htmlBody = `
//     <!DOCTYPE html>
//     <html>
//     <head>
//       <meta charset="utf-8">
//       <style>
//         body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
//         .container { max-width: 600px; margin: 0 auto; background: #ffffff; }
//         .header { background: #5E4FA2; padding: 20px; text-align: center; }
//         .welcome-banner { background: linear-gradient(135deg, #A294F9, #5E4FA2); color: white; padding: 25px; text-align: center; }
//         .content { padding: 25px; }
//         .section { margin-bottom: 25px; }
//         .highlight-box { background: #F5EFFF; padding: 20px; border-radius: 8px; margin: 20px 0; }
//         .footer { background: #f5f5f5; padding: 20px; text-align: center; font-size: 12px; color: #666; }
//         .step { display: flex; align-items: center; margin-bottom: 15px; padding: 15px; background: white; border-radius: 8px; border-left: 4px solid #A294F9; }
//         .step-number { background: #5E4FA2; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; margin-right: 15px; }
//       </style>
//     </head>
//     <body>
//       <div class="container">
//         <!-- Header -->
//         <div class="header">
//           <h1 style="color: white; margin: 0;">🤝 Hope Animal Care</h1>
//           <p style="color: white; margin: 5px 0 0 0; opacity: 0.9;">Volunteer Program</p>
//         </div>

//         <!-- Welcome Banner -->
//         <div class="welcome-banner">
//           <h2 style="margin: 0; font-size: 28px;">Welcome to Our Mission!</h2>
//           <p style="margin: 10px 0 0 0; opacity: 0.9; font-size: 18px;">
//             Thank you for your volunteer application, ${volunteerData.fullName}!
//           </p>
//         </div>

//         <!-- Main Content -->
//         <div class="content">
//           <div class="section">
//             <p style="font-size: 16px; color: #333;">
//               We're thrilled that you want to join our mission to create a compassionate world for street animals. 
//               Your application has been received and is currently under review.
//             </p>
//           </div>

//           <div class="highlight-box">
//             <h3 style="color: #5E4FA2; margin-top: 0;">📋 Application Summary</h3>
//             <table style="width: 100%; color: #333;">
//               <tr>
//                 <td style="padding: 8px 0; width: 120px;"><strong>Name:</strong></td>
//                 <td style="padding: 8px 0;">${volunteerData.fullName}</td>
//               </tr>
//               <tr>
//                 <td style="padding: 8px 0;"><strong>Location:</strong></td>
//                 <td style="padding: 8px 0;">${volunteerData.location}</td>
//               </tr>
//               <tr>
//                 <td style="padding: 8px 0;"><strong>Application ID:</strong></td>
//                 <td style="padding: 8px 0;">#VOL${Math.random().toString(36).substr(2, 6).toUpperCase()}</td>
//               </tr>
//               <tr>
//                 <td style="padding: 8px 0;"><strong>Status:</strong></td>
//                 <td style="padding: 8px 0;">
//                   <span style="background: #FFF3CD; color: #856404; padding: 4px 12px; border-radius: 15px; font-size: 12px; font-weight: bold;">
//                     ⏳ Under Review
//                   </span>
//                 </td>
//               </tr>
//             </table>
//           </div>

//           <!-- Next Steps -->
//           <div class="section">
//             <h3 style="color: #5E4FA2; margin-bottom: 20px;">🎯 What Happens Next?</h3>
            
//             <div class="step">
//               <div class="step-number">1</div>
//               <div>
//                 <strong>Application Review</strong><br>
//                 <span style="color: #666; font-size: 14px;">Our team will review your application within 1-2 business days</span>
//               </div>
//             </div>
            
//             <div class="step">
//               <div class="step-number">2</div>
//               <div>
//                 <strong>Initial Contact</strong><br>
//                 <span style="color: #666; font-size: 14px;">We'll contact you at ${volunteerData.mobile} to discuss opportunities</span>
//               </div>
//             </div>
            
//             <div class="step">
//               <div class="step-number">3</div>
//               <div>
//                 <strong>Orientation Session</strong><br>
//                 <span style="color: #666; font-size: 14px;">Attend a virtual or in-person orientation to learn about our work</span>
//               </div>
//             </div>
            
//             <div class="step">
//               <div class="step-number">4</div>
//               <div>
//                 <strong>Start Volunteering</strong><br>
//                 <span style="color: #666; font-size: 14px;">Begin making a difference in animals' lives!</span>
//               </div>
//             </div>
//           </div>

//           <!-- Contact Info -->
//           <div class="section" style="background: #E8F5E8; padding: 20px; border-radius: 8px; border: 1px solid #C8E6C9;">
//             <h4 style="color: #2E7D32; margin-top: 0;">📞 Have Questions?</h4>
//             <p style="color: #2E7D32; margin: 0;">
//               Feel free to reach out to our volunteer coordinator at 
//               <a href="mailto:volunteer@hopeanimalcare.in" style="color: #2E7D32; font-weight: bold;">
//                 volunteer@hopeanimalcare.in
//               </a>
//               <br>
//               or call us at <strong>+91 9136263344</strong>
//             </p>
//           </div>
//         </div>

//         <!-- Footer -->
//         <div class="footer">
//           <p style="margin: 0;">
//             <strong>Welcome to the Hope Animal Care Family! 🌟</strong><br>
//             Together, we can create a better world for street animals.
//           </p>
//           <p style="margin: 10px 0 0 0; color: #999;">
//             © 2021 Hope Animal Care. All rights reserved.
//           </p>
//         </div>
//       </div>
//     </body>
//     </html>
//   `;

//   const textBody = `
// THANK YOU FOR YOUR VOLUNTEER APPLICATION!
// =========================================

// Dear ${volunteerData.fullName},

// Thank you for applying to become a volunteer with Hope Animal Care! 
// We're excited about your interest in joining our mission to help street animals.

// APPLICATION DETAILS:
// -------------------
// Name: ${volunteerData.fullName}
// Location: ${volunteerData.location}
// Application ID: #VOL${Math.random().toString(36).substr(2, 6).toUpperCase()}
// Status: Under Review

// WHAT HAPPENS NEXT?
// ------------------
// 1. Our team will review your application within 1-2 business days
// 2. We'll contact you at ${volunteerData.mobile} to discuss opportunities
// 3. You'll attend an orientation session
// 4. Start making a difference!

// If you have any questions, please contact our volunteer coordinator at volunteer@hopeanimalcare.in or call +91 9136263344.

// Thank you for your compassion and willingness to help animals in need!

// Warm regards,
// Hope Animal Care Volunteer Team
//   `;

//   return sendEmail({
//     to: volunteerData.email,
//     subject,
//     text: textBody,
//     html: htmlBody,
//   });
// };


// // Add these functions to your existing nodemailer.js file

// export const sendJobApplicationNotification = async (applicationData) => {
//   const subject = "💼 New Job Application Received - Hope Animal Care";

//   const htmlBody = `
//     <!DOCTYPE html>
//     <html>
//     <head>
//       <meta charset="utf-8">
//       <style>
//         body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
//         .container { max-width: 600px; margin: 0 auto; background: #ffffff; }
//         .header { background: #5E4FA2; padding: 20px; text-align: center; }
//         .application-banner { background: linear-gradient(135deg, #A294F9, #5E4FA2); color: white; padding: 20px; text-align: center; }
//         .content { padding: 25px; }
//         .section { margin-bottom: 25px; }
//         .detail-row { display: flex; margin-bottom: 12px; padding: 12px 0; border-bottom: 1px solid #f0f0f0; }
//         .detail-label { font-weight: bold; width: 140px; color: #5E4FA2; flex-shrink: 0; }
//         .detail-value { flex: 1; }
//         .highlight-box { background: #F5EFFF; padding: 20px; border-radius: 8px; margin: 20px 0; }
//         .footer { background: #f5f5f5; padding: 20px; text-align: center; font-size: 12px; color: #666; }
//         .action-btn { display: inline-block; background: #5E4FA2; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin: 5px; font-size: 14px; }
//         .badge { display: inline-block; background: #E8F5E8; color: #059669; padding: 4px 12px; border-radius: 15px; font-size: 12px; font-weight: bold; margin-left: 10px; }
//         .resume-info { background: #E3F2FD; padding: 15px; border-radius: 5px; border-left: 4px solid #2196F3; }
//       </style>
//     </head>
//     <body>
//       <div class="container">
//         <!-- Header -->
//         <div class="header">
//           <h1 style="color: white; margin: 0;">💼 Hope Animal Care</h1>
//           <p style="color: white; margin: 5px 0 0 0; opacity: 0.9;">Career Opportunities</p>
//         </div>

//         <!-- Application Banner -->
//         <div class="application-banner">
//           <h2 style="margin: 0; font-size: 24px;">NEW JOB APPLICATION</h2>
//           <p style="margin: 10px 0 0 0; opacity: 0.9;">Potential candidate applied for a position!</p>
//         </div>

//         <!-- Main Content -->
//         <div class="content">
//           <!-- Applicant Details -->
//           <div class="section">
//             <h3 style="color: #5E4FA2; margin-top: 0; border-bottom: 2px solid #5E4FA2; padding-bottom: 10px;">
//               👤 Applicant Information
//             </h3>
            
//             <div class="detail-row">
//               <div class="detail-label">Full Name:</div>
//               <div class="detail-value">
//                 <strong>${applicationData.name}</strong>
//                 <span class="badge">NEW APPLICANT</span>
//               </div>
//             </div>
            
//             <div class="detail-row">
//               <div class="detail-label">📞 Phone:</div>
//               <div class="detail-value">
//                 <a href="tel:${applicationData.number}" style="color: #5E4FA2; text-decoration: none; font-weight: bold;">
//                   ${applicationData.number}
//                 </a>
//               </div>
//             </div>
            
//             <div class="detail-row">
//               <div class="detail-label">✉️ Email:</div>
//               <div class="detail-value">
//                 <a href="mailto:${applicationData.email}" style="color: #5E4FA2;">${applicationData.email}</a>
//               </div>
//             </div>
            
//             <div class="detail-row">
//               <div class="detail-label">🎓 Education:</div>
//               <div class="detail-value">
//                 <strong>${applicationData.education}</strong>
//               </div>
//             </div>
            
//             <div class="detail-row">
//               <div class="detail-label">🏠 Address:</div>
//               <div class="detail-value">${applicationData.address}</div>
//             </div>
//           </div>

//           <!-- Resume Information -->
//           <div class="section">
//             <div class="resume-info">
//               <h4 style="color: #1565C0; margin-top: 0;">📄 Resume Details</h4>
//               <p style="margin: 0; color: #1565C0;">
//                 <strong>Resume:</strong> 
//                 ${applicationData.resumeUrl ? 
//                   '✅ Uploaded Successfully (Available in system)' : 
//                   '❌ Not uploaded'
//                 }
//               </p>
//               ${applicationData.resumeUrl ? `
//               <p style="margin: 10px 0 0 0; color: #1565C0;">
//                 <strong>File URL:</strong> 
//                 <a href="${applicationData.resumeUrl}" style="color: #1565C0; word-break: break-all;" target="_blank">
//                   View Resume
//                 </a>
//               </p>
//               ` : ''}
//             </div>
//           </div>

      

//           <!-- Application Info -->
//           <div class="section">
//             <div style="background: #FFF3CD; padding: 15px; border-radius: 5px; border-left: 4px solid #FFC107;">
//               <h4 style="color: #856404; margin-top: 0;">📊 Application Information</h4>
//               <table style="width: 100%; color: #856404; font-size: 14px;">
//                 <tr>
//                   <td style="padding: 5px 0; width: 120px;"><strong>Application ID:</strong></td>
//                   <td style="padding: 5px 0;">#JOB${Math.random().toString(36).substr(2, 6).toUpperCase()}</td>
//                 </tr>
//                 <tr>
//                   <td style="padding: 5px 0;"><strong>Submitted:</strong></td>
//                   <td style="padding: 5px 0;">${new Date().toLocaleString('en-IN', { 
//                     timeZone: 'Asia/Kolkata',
//                     dateStyle: 'full', 
//                     timeStyle: 'medium' 
//                   })}</td>
//                 </tr>
//                 <tr>
//                   <td style="padding: 5px 0;"><strong>Status:</strong></td>
//                   <td style="padding: 5px 0;">
//                     <span style="background: #D1ECF1; color: #0C5460; padding: 4px 12px; border-radius: 15px; font-size: 12px; font-weight: bold;">
//                       ⏳ Under Review
//                     </span>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style="padding: 5px 0;"><strong>Department:</strong></td>
//                   <td style="padding: 5px 0;">Animal Care & Rescue</td>
//                 </tr>
//               </table>
//             </div>
//           </div>

//           <!-- Review Process -->
//           <div class="section">
//             <h4 style="color: #5E4FA2; margin-bottom: 10px;">📝 Review Process:</h4>
//             <ol style="color: #666; padding-left: 20px; margin: 0;">
//               <li>Review application and resume</li>
//               <li>Initial phone screening</li>
//               <li>Schedule in-person interview</li>
//               <li>Background check and references</li>
//               <li>Job offer and onboarding</li>
//             </ol>
//           </div>
//         </div>

//         <!-- Footer -->
//         <div class="footer">
//           <p style="margin: 0;">
//             <strong>Hope Animal Care HR Team</strong><br>
//             Building our team to save more lives! 🐾
//           </p>
//           <p style="margin: 10px 0 0 0; color: #999;">
//             © 2021 Hope Animal Care. All rights reserved.
//           </p>
//         </div>
//       </div>
//     </body>
//     </html>
//   `;

//   const textBody = `
// NEW JOB APPLICATION RECEIVED
// ============================

// APPLICANT DETAILS:
// ------------------
// Full Name: ${applicationData.name}
// Phone: ${applicationData.number}
// Email: ${applicationData.email}
// Education: ${applicationData.education}
// Address: ${applicationData.address}

// RESUME INFORMATION:
// -------------------
// Resume: ${applicationData.resumeUrl ? 'Uploaded Successfully' : 'Not uploaded'}
// ${applicationData.resumeUrl ? `Resume URL: ${applicationData.resumeUrl}` : ''}

// APPLICATION INFORMATION:
// ------------------------
// Application ID: #JOB${Math.random().toString(36).substr(2, 6).toUpperCase()}
// Submitted: ${new Date().toLocaleString()}
// Status: Under Review
// Department: Animal Care & Rescue

// REVIEW PROCESS:
// ---------------
// 1. Review application and resume
// 2. Initial phone screening
// 3. Schedule in-person interview
// 4. Background check and references
// 5. Job offer and onboarding

// Please review this application and contact the candidate soon!

// Hope Animal Care HR Team
//   `;

//   const adminEmail = process.env.NEXT_PUBLIC_SMTP_FROM;

//   return sendEmail({
//     to: adminEmail,
//     subject,
//     text: textBody,
//     html: htmlBody,
//   });
// };

// export const sendJobApplicationConfirmation = async (applicationData) => {
//   const subject = "💼 Application Received - Hope Animal Care";

//   const htmlBody = `
//     <!DOCTYPE html>
//     <html>
//     <head>
//       <meta charset="utf-8">
//       <style>
//         body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
//         .container { max-width: 600px; margin: 0 auto; background: #ffffff; }
//         .header { background: #5E4FA2; padding: 20px; text-align: center; }
//         .confirmation-banner { background: linear-gradient(135deg, #A294F9, #5E4FA2); color: white; padding: 25px; text-align: center; }
//         .content { padding: 25px; }
//         .section { margin-bottom: 25px; }
//         .highlight-box { background: #F5EFFF; padding: 20px; border-radius: 8px; margin: 20px 0; }
//         .footer { background: #f5f5f5; padding: 20px; text-align: center; font-size: 12px; color: #666; }
//         .step { display: flex; align-items: center; margin-bottom: 15px; padding: 15px; background: white; border-radius: 8px; border-left: 4px solid #A294F9; }
//         .step-number { background: #5E4FA2; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; margin-right: 15px; }
//         .application-summary { background: #E8F5E8; padding: 20px; border-radius: 8px; border: 1px solid #C8E6C9; }
//       </style>
//     </head>
//     <body>
//       <div class="container">
//         <!-- Header -->
//         <div class="header">
//           <h1 style="color: white; margin: 0;">💼 Hope Animal Care</h1>
//           <p style="color: white; margin: 5px 0 0 0; opacity: 0.9;">Career Opportunities</p>
//         </div>

//         <!-- Confirmation Banner -->
//         <div class="confirmation-banner">
//           <h2 style="margin: 0; font-size: 28px;">Application Received!</h2>
//           <p style="margin: 10px 0 0 0; opacity: 0.9; font-size: 18px;">
//             Thank you for your interest in joining our team, ${applicationData.name}!
//           </p>
//         </div>

//         <!-- Main Content -->
//         <div class="content">
//           <div class="section">
//             <p style="font-size: 16px; color: #333;">
//               We appreciate your interest in becoming part of the Hope Animal Care family. 
//               Your application has been successfully submitted and is now under review by our HR team.
//             </p>
//           </div>

//           <!-- Application Summary -->
//           <div class="application-summary">
//             <h3 style="color: #2E7D32; margin-top: 0;">📋 Application Summary</h3>
//             <table style="width: 100%; color: #333;">
//               <tr>
//                 <td style="padding: 8px 0; width: 120px;"><strong>Name:</strong></td>
//                 <td style="padding: 8px 0;">${applicationData.name}</td>
//               </tr>
//               <tr>
//                 <td style="padding: 8px 0;"><strong>Email:</strong></td>
//                 <td style="padding: 8px 0;">${applicationData.email}</td>
//               </tr>
//               <tr>
//                 <td style="padding: 8px 0;"><strong>Phone:</strong></td>
//                 <td style="padding: 8px 0;">${applicationData.number}</td>
//               </tr>
//               <tr>
//                 <td style="padding: 8px 0;"><strong>Education:</strong></td>
//                 <td style="padding: 8px 0;">${applicationData.education}</td>
//               </tr>
//               <tr>
//                 <td style="padding: 8px 0;"><strong>Application ID:</strong></td>
//                 <td style="padding: 8px 0;">#JOB${Math.random().toString(36).substr(2, 6).toUpperCase()}</td>
//               </tr>
//               <tr>
//                 <td style="padding: 8px 0;"><strong>Status:</strong></td>
//                 <td style="padding: 8px 0;">
//                   <span style="background: #FFF3CD; color: #856404; padding: 4px 12px; border-radius: 15px; font-size: 12px; font-weight: bold;">
//                     ⏳ Under Review
//                   </span>
//                 </td>
//               </tr>
//             </table>
//           </div>

//           <!-- Next Steps -->
//           <div class="section">
//             <h3 style="color: #5E4FA2; margin-bottom: 20px;">🎯 What Happens Next?</h3>
            
//             <div class="step">
//               <div class="step-number">1</div>
//               <div>
//                 <strong>Application Review</strong><br>
//                 <span style="color: #666; font-size: 14px;">Our HR team will review your application within 3-5 business days</span>
//               </div>
//             </div>
            
//             <div class="step">
//               <div class="step-number">2</div>
//               <div>
//                 <strong>Initial Contact</strong><br>
//                 <span style="color: #666; font-size: 14px;">If selected, we'll contact you at ${applicationData.number} for initial screening</span>
//               </div>
//             </div>
            
//             <div class="step">
//               <div class="step-number">3</div>
//               <div>
//                 <strong>Interview Process</strong><br>
//                 <span style="color: #666; font-size: 14px;">Schedule and attend interview sessions with our team</span>
//               </div>
//             </div>
            
//             <div class="step">
//               <div class="step-number">4</div>
//               <div>
//                 <strong>Final Decision</strong><br>
//                 <span style="color: #666; font-size: 14px;">Receive updates about your application status</span>
//               </div>
//             </div>
//           </div>

//           <!-- Contact Info -->
//           <div class="section" style="background: #E3F2FD; padding: 20px; border-radius: 8px; border: 1px solid #BBDEFB;">
//             <h4 style="color: #1565C0; margin-top: 0;">📞 Need to Update Your Application?</h4>
//             <p style="color: #1565C0; margin: 0;">
//               If you need to update any information or have questions, please contact our HR team at<br>
//               <a href="mailto:careers@hopeanimalcare.in" style="color: #1565C0; font-weight: bold;">
//                 careers@hopeanimalcare.in
//               </a>
//               <br>or call us at <strong>+91 9136263344</strong>
//             </p>
//           </div>
//         </div>

//         <!-- Footer -->
//         <div class="footer">
//           <p style="margin: 0;">
//             <strong>Thank you for your interest in Hope Animal Care! 🌟</strong><br>
//             Together, we can make a difference in the lives of animals in need.
//           </p>
//           <p style="margin: 10px 0 0 0; color: #999;">
//             © 2021 Hope Animal Care. All rights reserved.
//           </p>
//         </div>
//       </div>
//     </body>
//     </html>
//   `;

//   const textBody = `
// APPLICATION RECEIVED - HOPE ANIMAL CARE
// ========================================

// Dear ${applicationData.name},

// Thank you for applying to join the Hope Animal Care team! 
// We have successfully received your application and it is now under review.

// APPLICATION SUMMARY:
// -------------------
// Name: ${applicationData.name}
// Email: ${applicationData.email}
// Phone: ${applicationData.number}
// Education: ${applicationData.education}
// Application ID: #JOB${Math.random().toString(36).substr(2, 6).toUpperCase()}
// Status: Under Review

// WHAT HAPPENS NEXT?
// ------------------
// 1. Our HR team will review your application within 3-5 business days
// 2. If selected, we'll contact you at ${applicationData.number} for initial screening
// 3. Schedule and attend interview sessions
// 4. Receive updates about your application status

// If you need to update any information or have questions, please contact our HR team at careers@hopeanimalcare.in or call +91 9136263344.

// We appreciate your interest in joining our mission to help animals in need!

// Best regards,
// Hope Animal Care HR Team
//   `;

//   return sendEmail({
//     to: applicationData.email,
//     subject,
//     text: textBody,
//     html: htmlBody,
//   });
// };


// // Add these functions to your existing nodemailer.js file

// export const sendContactFormNotification = async (contactData) => {
//   const subject = `📧 New Contact Form Submission - ${contactData.subject}`;

//   const htmlBody = `
//     <!DOCTYPE html>
//     <html>
//     <head>
//       <meta charset="utf-8">
//       <style>
//         body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
//         .container { max-width: 600px; margin: 0 auto; background: #ffffff; }
//         .header { background: #5E4FA2; padding: 20px; text-align: center; }
//         .contact-banner { background: linear-gradient(135deg, #A294F9, #5E4FA2); color: white; padding: 20px; text-align: center; }
//         .content { padding: 25px; }
//         .section { margin-bottom: 25px; }
//         .detail-row { display: flex; margin-bottom: 12px; padding: 12px 0; border-bottom: 1px solid #f0f0f0; }
//         .detail-label { font-weight: bold; width: 120px; color: #5E4FA2; flex-shrink: 0; }
//         .detail-value { flex: 1; }
//         .highlight-box { background: #F5EFFF; padding: 20px; border-radius: 8px; margin: 20px 0; }
//         .footer { background: #f5f5f5; padding: 20px; text-align: center; font-size: 12px; color: #666; }
//         .action-btn { display: inline-block; background: #5E4FA2; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin: 5px; font-size: 14px; }
//         .message-box { background: #FFF9E6; padding: 20px; border-radius: 8px; border-left: 4px solid #FFD700; margin: 20px 0; }
//         .subject-badge { display: inline-block; background: #E8F5E8; color: #059669; padding: 4px 12px; border-radius: 15px; font-size: 12px; font-weight: bold; margin-left: 10px; }
//       </style>
//     </head>
//     <body>
//       <div class="container">
//         <!-- Header -->
//         <div class="header">
//           <h1 style="color: white; margin: 0;">📧 Hope Animal Care</h1>
//           <p style="color: white; margin: 5px 0 0 0; opacity: 0.9;">Contact Form Submission</p>
//         </div>

//         <!-- Contact Banner -->
//         <div class="contact-banner">
//           <h2 style="margin: 0; font-size: 24px;">NEW CONTACT MESSAGE</h2>
//           <p style="margin: 10px 0 0 0; opacity: 0.9;">Someone has reached out through the website contact form</p>
//         </div>

//         <!-- Main Content -->
//         <div class="content">
//           <!-- Contact Details -->
//           <div class="section">
//             <h3 style="color: #5E4FA2; margin-top: 0; border-bottom: 2px solid #5E4FA2; padding-bottom: 10px;">
//               👤 Contact Information
//             </h3>
            
//             <div class="detail-row">
//               <div class="detail-label">Full Name:</div>
//               <div class="detail-value">
//                 <strong>${contactData.name}</strong>
//               </div>
//             </div>
            
//             <div class="detail-row">
//               <div class="detail-label">📞 Phone:</div>
//               <div class="detail-value">
//                 <a href="tel:${contactData.phone}" style="color: #5E4FA2; text-decoration: none; font-weight: bold;">
//                   ${contactData.phone}
//                 </a>
//               </div>
//             </div>
            
//             <div class="detail-row">
//               <div class="detail-label">✉️ Email:</div>
//               <div class="detail-value">
//                 ${contactData.email ? 
//                   `<a href="mailto:${contactData.email}" style="color: #5E4FA2;">${contactData.email}</a>` : 
//                   '<span style="color: #999;">Not provided</span>'
//                 }
//               </div>
//             </div>
            
//             <div class="detail-row">
//               <div class="detail-label">📋 Subject:</div>
//               <div class="detail-value">
//                 <strong>${contactData.subject}</strong>
//                 <span class="subject-badge">${contactData.subject.toUpperCase()}</span>
//               </div>
//             </div>
//           </div>

//           <!-- Message Content -->
//           ${contactData.message ? `
//           <div class="section">
//             <div class="message-box">
//               <h4 style="color: #856404; margin-top: 0;">💬 Message Content</h4>
//               <p style="color: #333; font-style: italic; margin: 0; line-height: 1.6;">
//                 "${contactData.message}"
//               </p>
//             </div>
//           </div>
//           ` : ''}

//           <!-- Submission Info -->
//           <div class="section">
//             <div style="background: #E3F2FD; padding: 15px; border-radius: 5px; border-left: 4px solid #2196F3;">
//               <h4 style="color: #1565C0; margin-top: 0;">📊 Submission Details</h4>
//               <table style="width: 100%; color: #1565C0; font-size: 14px;">
//                 <tr>
//                   <td style="padding: 5px 0; width: 100px;"><strong>Contact ID:</strong></td>
//                   <td style="padding: 5px 0;">#CON${Math.random().toString(36).substr(2, 6).toUpperCase()}</td>
//                 </tr>
//                 <tr>
//                   <td style="padding: 5px 0;"><strong>Submitted:</strong></td>
//                   <td style="padding: 5px 0;">${new Date().toLocaleString('en-IN', { 
//                     timeZone: 'Asia/Kolkata',
//                     dateStyle: 'full', 
//                     timeStyle: 'medium' 
//                   })}</td>
//                 </tr>
//                 <tr>
//                   <td style="padding: 5px 0;"><strong>Priority:</strong></td>
//                   <td style="padding: 5px 0;">
//                     <span style="background: ${contactData.subject === 'Adoption' ? '#FF5252' : contactData.subject === 'Volunteer' ? '#FF9800' : '#4CAF50'}; color: white; padding: 4px 12px; border-radius: 15px; font-size: 12px; font-weight: bold;">
//                       ${contactData.subject === 'Adoption' ? '🚨 HIGH' : contactData.subject === 'Volunteer' ? '⚠️ MEDIUM' : 'ℹ️ NORMAL'}
//                     </span>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style="padding: 5px 0;"><strong>Status:</strong></td>
//                   <td style="padding: 5px 0;">
//                     <span style="background: #FFF3CD; color: #856404; padding: 4px 12px; border-radius: 15px; font-size: 12px; font-weight: bold;">
//                       ⏳ Awaiting Response
//                     </span>
//                   </td>
//                 </tr>
//               </table>
//             </div>
//           </div>

//           <!-- Response Guidelines -->
//           <div class="section">
//             <h4 style="color: #5E4FA2; margin-bottom: 10px;">📝 Response Guidelines:</h4>
//             <ul style="color: #666; padding-left: 20px; margin: 0;">
//               <li>Respond within 24 hours for better engagement</li>
//               <li>${contactData.subject === 'Adoption' ? 'Provide adoption process details and schedule visit' : contactData.subject === 'Volunteer' ? 'Share volunteer opportunities and next steps' : 'Address their specific inquiry'}</li>
//               <li>Follow up if no response in 3 days</li>
//               <li>Log response in CRM system</li>
//             </ul>
//           </div>
//         </div>

//         <!-- Footer -->
//         <div class="footer">
//           <p style="margin: 0;">
//             <strong>Hope Animal Care Support Team</strong><br>
//             Providing compassionate responses to every inquiry 🐾
//           </p>
//           <p style="margin: 10px 0 0 0; color: #999;">
//             © 2021 Hope Animal Care. All rights reserved.
//           </p>
//         </div>
//       </div>
//     </body>
//     </html>
//   `;

//   const textBody = `
// NEW CONTACT FORM SUBMISSION
// ===========================

// CONTACT INFORMATION:
// -------------------
// Name: ${contactData.name}
// Phone: ${contactData.phone}
// Email: ${contactData.email || 'Not provided'}
// Subject: ${contactData.subject}

// ${contactData.message ? `
// MESSAGE:
// --------
// ${contactData.message}
// ` : ''}

// SUBMISSION DETAILS:
// -------------------
// Submitted: ${new Date().toLocaleString()}
// Priority: ${contactData.subject === 'Adoption' ? 'HIGH' : contactData.subject === 'Volunteer' ? 'MEDIUM' : 'NORMAL'}
// Status: Awaiting Response

// RESPONSE GUIDELINES:
// --------------------
// • Respond within 24 hours
// • ${contactData.subject === 'Adoption' ? 'Provide adoption details' : contactData.subject === 'Volunteer' ? 'Share volunteer opportunities' : 'Address specific inquiry'}
// • Follow up if no response in 3 days
// • Log response in system

// Please contact ${contactData.name} at ${contactData.phone} soon!

// Hope Animal Care Support Team
//   `;

//   const adminEmail = process.env.NEXT_PUBLIC_SMTP_FROM;

//   return sendEmail({
//     to: adminEmail,
//     subject,
//     text: textBody,
//     html: htmlBody,
//   });
// };

// export const sendContactFormConfirmation = async (contactData) => {
//   const subject = "📧 Thank You for Contacting Hope Animal Care";

//   const htmlBody = `
//     <!DOCTYPE html>
//     <html>
//     <head>
//       <meta charset="utf-8">
//       <style>
//         body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
//         .container { max-width: 600px; margin: 0 auto; background: #ffffff; }
//         .header { background: #5E4FA2; padding: 20px; text-align: center; }
//         .confirmation-banner { background: linear-gradient(135deg, #A294F9, #5E4FA2); color: white; padding: 25px; text-align: center; }
//         .content { padding: 25px; }
//         .section { margin-bottom: 25px; }
//         .highlight-box { background: #F5EFFF; padding: 20px; border-radius: 8px; margin: 20px 0; }
//         .footer { background: #f5f5f5; padding: 20px; text-align: center; font-size: 12px; color: #666; }
//         .contact-info { background: #E8F5E8; padding: 20px; border-radius: 8px; border: 1px solid #C8E6C9; }
//         .step { display: flex; align-items: center; margin-bottom: 15px; padding: 15px; background: white; border-radius: 8px; border-left: 4px solid #A294F9; }
//         .step-number { background: #5E4FA2; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; margin-right: 15px; }
//       </style>
//     </head>
//     <body>
//       <div class="container">
//         <!-- Header -->
//         <div class="header">
//           <h1 style="color: white; margin: 0;">📧 Hope Animal Care</h1>
//           <p style="color: white; margin: 5px 0 0 0; opacity: 0.9;">We've Received Your Message</p>
//         </div>

//         <!-- Confirmation Banner -->
//         <div class="confirmation-banner">
//           <h2 style="margin: 0; font-size: 28px;">Thank You, ${contactData.name}!</h2>
//           <p style="margin: 10px 0 0 0; opacity: 0.9; font-size: 18px;">
//             We appreciate you reaching out to us regarding: <strong>${contactData.subject}</strong>
//           </p>
//         </div>

//         <!-- Main Content -->
//         <div class="content">
//           <div class="section">
//             <p style="font-size: 16px; color: #333;">
//               Thank you for contacting Hope Animal Care! We have successfully received your message and our team will get back to you shortly.
//             </p>
//           </div>

//           <!-- Message Summary -->
//           <div class="contact-info">
//             <h3 style="color: #2E7D32; margin-top: 0;">📋 Message Summary</h3>
//             <table style="width: 100%; color: #333;">
//               <tr>
//                 <td style="padding: 8px 0; width: 100px;"><strong>Name:</strong></td>
//                 <td style="padding: 8px 0;">${contactData.name}</td>
//               </tr>
//               ${contactData.email ? `
//               <tr>
//                 <td style="padding: 8px 0;"><strong>Email:</strong></td>
//                 <td style="padding: 8px 0;">${contactData.email}</td>
//               </tr>
//               ` : ''}
//               <tr>
//                 <td style="padding: 8px 0;"><strong>Phone:</strong></td>
//                 <td style="padding: 8px 0;">${contactData.phone}</td>
//               </tr>
//               <tr>
//                 <td style="padding: 8px 0;"><strong>Subject:</strong></td>
//                 <td style="padding: 8px 0;">${contactData.subject}</td>
//               </tr>
//               <tr>
//                 <td style="padding: 8px 0;"><strong>Reference ID:</strong></td>
//                 <td style="padding: 8px 0;">#CON${Math.random().toString(36).substr(2, 6).toUpperCase()}</td>
//               </tr>
//             </table>
//           </div>

//           <!-- What to Expect -->
//           <div class="section">
//             <h3 style="color: #5E4FA2; margin-bottom: 20px;">🎯 What Happens Next?</h3>
            
//             <div class="step">
//               <div class="step-number">1</div>
//               <div>
//                 <strong>Initial Review</strong><br>
//                 <span style="color: #666; font-size: 14px;">Our team will review your inquiry within 24 hours</span>
//               </div>
//             </div>
            
//             <div class="step">
//               <div class="step-number">2</div>
//               <div>
//                 <strong>Personalized Response</strong><br>
//                 <span style="color: #666; font-size: 14px;">
//                   ${contactData.subject === 'Adoption' ? 
//                     'We\'ll contact you to discuss adoption process and schedule a shelter visit' : 
//                   contactData.subject === 'Volunteer' ? 
//                     'We\'ll share volunteer opportunities and next steps to get involved' :
//                   contactData.subject === 'Donation' ? 
//                     'We\'ll provide donation information and answer any questions' :
//                     'We\'ll address your specific inquiry with detailed information'
//                   }
//                 </span>
//               </div>
//             </div>
            
//             <div class="step">
//               <div class="step-number">3</div>
//               <div>
//                 <strong>Follow-up</strong><br>
//                 <span style="color: #666; font-size: 14px;">We'll ensure all your questions are answered completely</span>
//               </div>
//             </div>
//           </div>

//           <!-- Emergency Contact -->
//           <div class="section">
//             <div style="background: #FFE8E8; padding: 20px; border-radius: 8px; border: 1px solid #FFCDD2;">
//               <h4 style="color: #D32F2F; margin-top: 0;">🚨 Emergency Animal Rescue?</h4>
//               <p style="color: #D32F2F; margin: 0;">
//                 If this is an emergency regarding an animal in distress, please call our rescue hotline immediately:<br>
//                 <strong style="font-size: 18px;">+91 9136263344</strong> (24/7 Available)
//               </p>
//             </div>
//           </div>

//           <!-- Additional Contact Info -->
//           <div class="section">
//             <div style="background: #E3F2FD; padding: 20px; border-radius: 8px; border: 1px solid #BBDEFB;">
//               <h4 style="color: #1565C0; margin-top: 0;">📞 Other Ways to Reach Us</h4>
//               <table style="width: 100%; color: #1565C0;">
//                 <tr>
//                   <td style="padding: 5px 0;"><strong>📍 Address:</strong></td>
//                   <td style="padding: 5px 0;">9 Shastri Nagar, Near Yashodhan School, Thane, Maharashtra 400606</td>
//                 </tr>
//                 <tr>
//                   <td style="padding: 5px 0;"><strong>📞 Phone:</strong></td>
//                   <td style="padding: 5px 0;">+91 9136263344</td>
//                 </tr>
//                 <tr>
//                   <td style="padding: 5px 0;"><strong>✉️ Email:</strong></td>
//                   <td style="padding: 5px 0;">info@hopeanimalcare.in</td>
//                 </tr>
//                 <tr>
//                   <td style="padding: 5px 0;"><strong>🕒 Hours:</strong></td>
//                   <td style="padding: 5px 0;">Monday-Saturday: 9:00 AM - 6:00 PM</td>
//                 </tr>
//               </table>
//             </div>
//           </div>
//         </div>

//         <!-- Footer -->
//         <div class="footer">
//           <p style="margin: 0;">
//             <strong>Thank you for supporting Hope Animal Care! 🌟</strong><br>
//             Together, we can make a difference in the lives of animals in need.
//           </p>
//           <p style="margin: 10px 0 0 0; color: #999;">
//             © 2021 Hope Animal Care. All rights reserved.
//           </p>
//         </div>
//       </div>
//     </body>
//     </html>
//   `;

//   const textBody = `
// THANK YOU FOR CONTACTING HOPE ANIMAL CARE
// ==========================================

// Dear ${contactData.name},

// Thank you for reaching out to Hope Animal Care regarding: ${contactData.subject}

// We have successfully received your message and our team will review it within 24 hours.

// MESSAGE SUMMARY:
// ---------------
// Name: ${contactData.name}
// ${contactData.email ? `Email: ${contactData.email}` : ''}
// Phone: ${contactData.phone}
// Subject: ${contactData.subject}
// Reference ID: #CON${Math.random().toString(36).substr(2, 6).toUpperCase()}

// WHAT TO EXPECT:
// ---------------
// 1. Initial review within 24 hours
// 2. Personalized response from our team
// 3. Follow-up to ensure all questions are answered

// EMERGENCY ANIMAL RESCUE?
// -------------------------
// If this is an emergency regarding an animal in distress, please call our rescue hotline immediately:
// +91 9136263344 (24/7 Available)

// OTHER CONTACT INFORMATION:
// --------------------------
// Address: 9 Shastri Nagar, Near Yashodhan School, Thane, Maharashtra 400606
// Phone: +91 9136263344
// Email: info@hopeanimalcare.in
// Hours: Monday-Saturday: 9:00 AM - 6:00 PM

// Thank you for your support and for caring about animals in need!

// Warm regards,
// Hope Animal Care Team
//   `;

//   return sendEmail({
//     to: contactData.email,
//     subject,
//     text: textBody,
//     html: htmlBody,
//   });
// };

// export const sendRescueRequestConfirmation = async (userData) => {
//   const urgencyColors = {
//     'emergency': '#DC2626',
//     'urgent': '#EA580C', 
//     'not urgent': '#059669'
//   };

//   const urgencyIcons = {
//     'emergency': '🚨',
//     'urgent': '⚠️',
//     'not urgent': '✅'
//   };

//   const subject = `${urgencyIcons[userData.urgency]} Animal Rescue Request Confirmation - Hope Animal Care`;

//   const htmlBody = `
//     <!DOCTYPE html>
//     <html>
//     <head>
//       <meta charset="utf-8">
//       <style>
//         body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
//         .container { max-width: 600px; margin: 0 auto; background: #ffffff; }
//         .header { background: #5E4FA2; padding: 25px; text-align: center; }
//         .urgency-banner { background: ${urgencyColors[userData.urgency]}; color: white; padding: 20px; text-align: center; font-weight: bold; font-size: 18px; }
//         .content { padding: 30px; }
//         .section { margin-bottom: 25px; }
//         .detail-card { background: #F8FAFC; padding: 20px; border-radius: 8px; border-left: 4px solid #5E4FA2; margin: 20px 0; }
//         .detail-row { display: flex; margin-bottom: 12px; padding: 10px 0; border-bottom: 1px solid #E2E8F0; }
//         .detail-label { font-weight: bold; width: 150px; color: #5E4FA2; flex-shrink: 0; }
//         .detail-value { flex: 1; color: #4A5568; }
//         .emergency-contact { background: #FEF2F2; padding: 20px; border-radius: 8px; border: 2px solid #FECACA; margin: 25px 0; }
//         .next-steps { background: #F0FFF4; padding: 20px; border-radius: 8px; border: 1px solid #C6F6D5; }
//         .footer { background: #F7FAFC; padding: 25px; text-align: center; font-size: 12px; color: #718096; border-top: 1px solid #E2E8F0; }
//         .step { display: flex; align-items: flex-start; margin-bottom: 20px; }
//         .step-number { background: #5E4FA2; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; margin-right: 15px; flex-shrink: 0; }
//         .step-content { flex: 1; }
//         .thank-you { background: linear-gradient(135deg, #A294F9, #5E4FA2); color: white; padding: 25px; border-radius: 8px; text-align: center; margin-bottom: 25px; }
//       </style>
//     </head>
//     <body>
//       <div class="container">
//         <!-- Header -->
//         <div class="header">
//           <h1 style="color: white; margin: 0; font-size: 28px;">🐾 Hope Animal Care</h1>
//           <p style="color: white; margin: 8px 0 0 0; opacity: 0.9; font-size: 16px;">Animal Rescue & Welfare</p>
//         </div>

//         <!-- Urgency Banner -->
//         <div class="urgency-banner">
//           ${urgencyIcons[userData.urgency]} RESCUE REQUEST CONFIRMED - ${userData.urgency.toUpperCase()}
//         </div>

//         <!-- Main Content -->
//         <div class="content">
//           <!-- Thank You Message -->
//           <div class="thank-you">
//             <h2 style="margin: 0 0 10px 0; font-size: 24px;">Thank You, ${userData.name}!</h2>
//             <p style="margin: 0; opacity: 0.9; font-size: 16px;">
//               Your compassion can save a life. We've received your rescue request and our team is on it.
//             </p>
//           </div>

//           <!-- Request Details -->
//           <div class="section">
//             <h3 style="color: #5E4FA2; margin-top: 0; border-bottom: 2px solid #5E4FA2; padding-bottom: 10px; font-size: 20px;">
//               📋 Rescue Request Details
//             </h3>
            
//             <div class="detail-card">
         
//               <div class="detail-row">
//                 <div class="detail-label">Submitted By:</div>
//                 <div class="detail-value">${userData.name}</div>
//               </div>
              
//               <div class="detail-row">
//                 <div class="detail-label">Contact Number:</div>
//                 <div class="detail-value">
//                   <strong style="color: #5E4FA2;">${userData.phone}</strong>
//                 </div>
//               </div>
              
//               ${userData.email ? `
//               <div class="detail-row">
//                 <div class="detail-label">Email Address:</div>
//                 <div class="detail-value">${userData.email}</div>
//               </div>
//               ` : ''}
              
//               <div class="detail-row">
//                 <div class="detail-label">Rescue Location:</div>
//                 <div class="detail-value">${userData.address}</div>
//               </div>
              
//               <div class="detail-row">
//                 <div class="detail-label">Urgency Level:</div>
//                 <div class="detail-value">
//                   <span style="background: ${urgencyColors[userData.urgency]}; color: white; padding: 4px 12px; border-radius: 15px; font-size: 12px; font-weight: bold;">
//                     ${urgencyIcons[userData.urgency]} ${userData.urgency.toUpperCase()}
//                   </span>
//                 </div>
//               </div>
              
//               ${userData.notes ? `
//               <div class="detail-row">
//                 <div class="detail-label">Additional Notes:</div>
//                 <div class="detail-value" style="font-style: italic;">"${userData.notes}"</div>
//               </div>
//               ` : ''}
              
//               <div class="detail-row" style="border-bottom: none;">
//                 <div class="detail-label">Submission Time:</div>
//                 <div class="detail-value">${new Date().toLocaleString('en-IN', { 
//                   timeZone: 'Asia/Kolkata',
//                   dateStyle: 'full', 
//                   timeStyle: 'medium' 
//                 })}</div>
//               </div>
//             </div>
//           </div>

//           <!-- Emergency Contact -->
//           <div class="emergency-contact">
//             <h3 style="color: #DC2626; margin-top: 0; font-size: 18px;">🚨 Emergency Rescue Hotline</h3>
//             <p style="color: #DC2626; margin: 10px 0; font-size: 14px;">
//               If the animal's condition worsens or this is a life-threatening emergency, 
//               call our 24/7 rescue hotline immediately:
//             </p>
//             <div style="text-align: center; margin: 20px 0;">
//               <a href="tel:+919136263344" style="background: #DC2626; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-size: 20px; font-weight: bold; display: inline-block;">
//                 📞 +91 9136263344
//               </a>
//             </div>
//             <p style="color: #DC2626; margin: 10px 0 0 0; font-size: 12px; text-align: center;">
//               Available 24 hours, 7 days a week for emergency rescues
//             </p>
//           </div>

//           <!-- Next Steps -->
//           <div class="next-steps">
//             <h3 style="color: #059669; margin-top: 0; font-size: 18px;">🎯 What Happens Next?</h3>
            
//             <div class="step">
//               <div class="step-number">1</div>
//               <div class="step-content">
//                 <strong style="color: #059669;">Immediate Review</strong>
//                 <p style="color: #059669; margin: 5px 0 0 0; font-size: 14px;">
//                   Our rescue team is reviewing your request right now. 
//                   ${userData.urgency === 'emergency' ? 
//                     'For emergency cases, we aim to respond within 30 minutes.' : 
//                   userData.urgency === 'urgent' ? 
//                     'For urgent cases, we aim to respond within 2 hours.' : 
//                     'We will contact you within 4-6 hours during operational hours.'
//                   }
//                 </p>
//               </div>
//             </div>
            
//             <div class="step">
//               <div class="step-number">2</div>
//               <div class="step-content">
//                 <strong style="color: #059669;">Team Dispatch</strong>
//                 <p style="color: #059669; margin: 5px 0 0 0; font-size: 14px;">
//                   If rescue is required, our trained team will be dispatched to the location with necessary equipment.
//                 </p>
//               </div>
//             </div>
            
//             <div class="step">
//               <div class="step-number">3</div>
//               <div class="step-content">
//                 <strong style="color: #059669;">On-site Assessment</strong>
//                 <p style="color: #059669; margin: 5px 0 0 0; font-size: 14px;">
//                   Our team will assess the animal's condition and provide immediate first aid if needed.
//                 </p>
//               </div>
//             </div>
            
//             <div class="step">
//               <div class="step-number">4</div>
//               <div class="step-content">
//                 <strong style="color: #059669;">Transport & Care</strong>
//                 <p style="color: #059669; margin: 5px 0 0 0; font-size: 14px;">
//                   The animal will be safely transported to our shelter for medical care and rehabilitation.
//                 </p>
//               </div>
//             </div>
            
//             <div class="step">
//               <div class="step-number">5</div>
//               <div class="step-content">
//                 <strong style="color: #059669;">Updates & Follow-up</strong>
//                 <p style="color: #059669; margin: 5px 0 0 0; font-size: 14px;">
//                   We'll keep you informed about the animal's progress and recovery journey.
//                 </p>
//               </div>
//             </div>
//           </div>

//           <!-- Important Instructions -->
//           <div class="section">
//             <div style="background: #EFF6FF; padding: 20px; border-radius: 8px; border: 1px solid #BFDBFE;">
//               <h4 style="color: #1E40AF; margin-top: 0;">📝 Important Instructions</h4>
//               <ul style="color: #1E40AF; padding-left: 20px; margin: 0;">
//                 <li>Please keep your phone ${userData.phone} accessible for our call</li>
//                 <li>If possible, stay near the location to guide our rescue team</li>
//                 <li>Do not attempt to handle injured or scared animals yourself</li>
//                 <li>Keep children and other pets at a safe distance</li>
//                 <li>If the animal moves, note the new location and update us</li>
//               </ul>
//             </div>
//           </div>
//         </div>

//         <!-- Footer -->
//         <div class="footer">
//           <p style="margin: 0 0 15px 0;">
//             <strong>Hope Animal Care Rescue Team</strong><br>
//             <span style="color: #5E4FA2;">9 Shastri Nagar, Near Yashodhan School, Thane, Maharashtra 400606</span>
//           </p>
//           <p style="margin: 0 0 10px 0;">
//             📞 <strong>Rescue Hotline:</strong> +91 9136263344 (24/7) | 
//             ✉️ <strong>Email:</strong> info@hopeanimalcare.in
//           </p>
//           <p style="margin: 0; font-size: 11px; color: #A0AEC0;">
//             This is an automated confirmation. Please do not reply to this email.<br>
//             © 2021 Hope Animal Care. All rights reserved.
//           </p>
//         </div>
//       </div>
//     </body>
//     </html>
//   `;

//   const textBody = `
// ANIMAL RESCUE REQUEST CONFIRMATION - HOPE ANIMAL CARE
// =====================================================

// Dear ${userData.name},

// Thank you for reporting an animal in need! Your compassion can save a life.

// RESCUE REQUEST DETAILS:
// -----------------------
// Name: ${userData.name}
// Phone: ${userData.phone}
// ${userData.email ? `Email: ${userData.email}` : ''}
// Location: ${userData.address}
// Urgency Level: ${userData.urgency.toUpperCase()}
// ${userData.notes ? `Notes: ${userData.notes}` : ''}
// Submitted: ${new Date().toLocaleString()}

// CONTACT INFORMATION:
// --------------------
// Hope Animal Care Rescue Team
// Address: 9 Shastri Nagar, Near Yashodhan School, Thane, Maharashtra 400606
// 24/7 Rescue Hotline: +91 9136263344
// Email: info@hopeanimalcare.in
// Website: hopeanimalcare.in

// Thank you for helping animals in need! Together we can make a difference.

// Best regards,
// Hope Animal Care Rescue Team
//   `;

//   return sendEmail({
//     to: userData.email,
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
          <strong style="color: #5E4FA2;">Animal Photo:</strong> ✅ Provided
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
${rescueData.animalImage ? 'Animal Photo: Provided' : ''}
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
          ${applicationData.resumeUrl ? '✅ Uploaded' : '❌ Not provided'}
        </div>
      </div>

      <div style="background: #E8F5E8; padding: 15px; border-radius: 5px; margin-top: 20px; border: 1px solid #C8E6C9;">
        <p style="margin: 0; color: #2E7D32; font-size: 14px;">
          ✅ New job application received and awaiting HR review.
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
Resume: ${applicationData.resumeUrl ? 'Uploaded' : 'Not provided'}

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

export const sendRescueRequestConfirmation = async (userData) => {
  const urgencyColors = {
    'emergency': '#DC2626',
    'urgent': '#EA580C', 
    'not urgent': '#059669'
  };

  const urgencyIcons = {
    'emergency': '🚨',
    'urgent': '⚠️',
    'not urgent': '✅'
  };

  const subject = `${urgencyIcons[userData.urgency]} Rescue Request Received - Hope Animal Care`;

  const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 20px auto; background: #f9f9f9; border-radius: 8px; padding: 20px; border: 1px solid #ddd;">

      <h2 style="color: #5E4FA2; text-align: center; margin-bottom: 20px;">${urgencyIcons[userData.urgency]} Rescue Request Received</h2>
      
      <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid ${urgencyColors[userData.urgency]};">
        <div style="margin-bottom: 15px;">
          <strong style="color: #5E4FA2;">Thank you, ${userData.name}!</strong>
        </div>
        <div style="margin-bottom: 15px;">
          <strong style="color: #5E4FA2;">We've received your rescue request for:</strong> ${userData.address}
        </div>
        <div style="margin-bottom: 15px;">
          <strong style="color: #5E4FA2;">Urgency Level:</strong> 
          <span style="color: ${urgencyColors[userData.urgency]}; font-weight: bold;">
            ${urgencyIcons[userData.urgency]} ${userData.urgency.toUpperCase()}
          </span>
        </div>
        ${userData.notes ? `
        <div style="margin-bottom: 15px;">
          <strong style="color: #5E4FA2;">Your Notes:</strong>
          <blockquote style="background: #F5EFFF; padding: 15px; border-radius: 5px; margin: 10px 0; font-style: italic; border-left: 3px solid #CDC1FF;">
            "${userData.notes}"
          </blockquote>
        </div>
        ` : ''}
      </div>

      <div style="background: #E8F5E8; padding: 15px; border-radius: 5px; margin-top: 20px; border: 1px solid #C8E6C9;">
        <p style="margin: 0; color: #2E7D32; font-size: 14px;">
          ✅ Our rescue team has been notified and will contact you at <strong>${userData.phone}</strong> soon.
        </p>
        <p style="margin: 10px 0 0 0; color: #2E7D32; font-size: 14px;">
          🚨 Emergency? Call our 24/7 hotline: <strong>+91 9136263344</strong>
        </p>
      </div>
    </div>
  `;

  const textBody = `
RESCUE REQUEST CONFIRMED

Thank you, ${userData.name}!

We've received your rescue request for: ${userData.address}
Urgency Level: ${userData.urgency.toUpperCase()}
${userData.notes ? `Your Notes: ${userData.notes}` : ''}

Our rescue team has been notified and will contact you at ${userData.phone} soon.

Emergency? Call our 24/7 hotline: +91 9136263344
  `;

  return sendEmail({
    to: userData.email,
    subject,
    text: textBody,
    html: htmlBody,
  });
};