import nodemailer from "nodemailer";

// Configure Nodemailer transporter
export const createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    host: "email-smtp.us-east-1.amazonaws.com",
    port: 587,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

// Generate a random 6-digit OTP
export function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Send OTP email
export async function sendOTPEmail(email: string, otp: string) {
  const transporter = createTransporter();

  // Verify SMTP connection configuration
  try {
    await transporter.verify();
    console.log("SMTP connection verified successfully");
  } catch (error) {
    console.error("SMTP connection verification failed:", error);
    throw new Error("Failed to connect to email server");
  }

  const mailOptions = {
    from: `"Rokto Shetu" <${process.env.SMTP_USER}>`,
    to: email,
    subject: "Your Rokto Shetu Verification Code",
    text: `Your verification code is: ${otp}. This code will expire in 10 minutes.`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h1 style="color: #dc2626;">LifeFlow</h1>
          <p style="color: #4b5563;">Blood Donation Management System</p>
        </div>
        <div style="background-color: #f9fafb; padding: 20px; border-radius: 5px; margin-bottom: 20px;">
          <h2 style="color: #111827; margin-top: 0;">Your Verification Code</h2>
          <p style="color: #4b5563; margin-bottom: 15px;">Please use the following code to verify your account:</p>
          <div style="font-size: 32px; letter-spacing: 5px; font-weight: bold; text-align: center; padding: 15px; background-color: #f3f4f6; border-radius: 5px; margin-bottom: 15px;">
            ${otp}
          </div>
          <p style="color: #4b5563; font-size: 14px;">This code will expire in 10 minutes.</p>
        </div>
        <div style="text-align: center; color: #6b7280; font-size: 14px;">
          <p>If you didn't request this code, you can safely ignore this email.</p>
          <p>© ${new Date().getFullYear()} LifeFlow Blood Donation System. All rights reserved.</p>
        </div>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send verification email");
  }
}

// Send welcome email after successful registration
export async function sendWelcomeEmail(email: string, name: string) {
  const transporter = createTransporter();

  const mailOptions = {
    from: `"LifeFlow Blood Donation" <${process.env.SMTP_USER}>`,
    to: email,
    subject: "Welcome to LifeFlow Blood Donation System",
    text: `Hello ${name},\n\nWelcome to LifeFlow! Thank you for joining our community of blood donors. Your contribution can help save lives.\n\nBest regards,\nThe LifeFlow Team`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h1 style="color: #dc2626;">LifeFlow</h1>
          <p style="color: #4b5563;">Blood Donation Management System</p>
        </div>
        <div style="padding: 20px; border-radius: 5px; margin-bottom: 20px;">
          <h2 style="color: #111827; margin-top: 0;">Welcome to LifeFlow!</h2>
          <p style="color: #4b5563;">Hello ${name},</p>
          <p style="color: #4b5563;">Thank you for joining our community of blood donors. Your contribution can help save lives.</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${
              process.env.NEXTAUTH_URL
            }/appointments" style="background-color: #dc2626; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">Schedule Your First Donation</a>
          </div>
          <p style="color: #4b5563;">If you have any questions, feel free to contact our support team.</p>
          <p style="color: #4b5563;">Best regards,<br>The LifeFlow Team</p>
        </div>
        <div style="text-align: center; color: #6b7280; font-size: 14px;">
          <p>© ${new Date().getFullYear()} LifeFlow Blood Donation System. All rights reserved.</p>
        </div>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Welcome email sent successfully:", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending welcome email:", error);
    // Don't throw here, as this is not critical for the registration process
    return null;
  }
}

// Send appointment confirmation email
export async function sendAppointmentConfirmationEmail(
  email: string,
  name: string,
  appointmentDetails: {
    id: string;
    date: string;
    time: string;
    location: string;
  }
) {
  const transporter = createTransporter();

  const mailOptions = {
    from: `"LifeFlow Blood Donation" <${process.env.SMTP_USER}>`,
    to: email,
    subject: "Your Blood Donation Appointment Confirmation",
    text: `Hello ${name},\n\nYour blood donation appointment has been confirmed.\n\nAppointment Details:\nID: ${appointmentDetails.id}\nDate: ${appointmentDetails.date}\nTime: ${appointmentDetails.time}\nLocation: ${appointmentDetails.location}\n\nThank you for your contribution!\n\nBest regards,\nThe LifeFlow Team`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h1 style="color: #dc2626;">LifeFlow</h1>
          <p style="color: #4b5563;">Blood Donation Management System</p>
        </div>
        <div style="padding: 20px; border-radius: 5px; margin-bottom: 20px;">
          <h2 style="color: #111827; margin-top: 0;">Appointment Confirmation</h2>
          <p style="color: #4b5563;">Hello ${name},</p>
          <p style="color: #4b5563;">Your blood donation appointment has been confirmed.</p>
          
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #111827; margin-top: 0;">Appointment Details</h3>
            <p style="margin: 5px 0;"><strong>ID:</strong> ${
              appointmentDetails.id
            }</p>
            <p style="margin: 5px 0;"><strong>Date:</strong> ${
              appointmentDetails.date
            }</p>
            <p style="margin: 5px 0;"><strong>Time:</strong> ${
              appointmentDetails.time
            }</p>
            <p style="margin: 5px 0;"><strong>Location:</strong> ${
              appointmentDetails.location
            }</p>
          </div>
          
          <p style="color: #4b5563;">Thank you for your contribution!</p>
          <p style="color: #4b5563;">Best regards,<br>The LifeFlow Team</p>
        </div>
        <div style="text-align: center; color: #6b7280; font-size: 14px;">
          <p>© ${new Date().getFullYear()} LifeFlow Blood Donation System. All rights reserved.</p>
        </div>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(
      "Appointment confirmation email sent successfully:",
      info.messageId
    );
    return info;
  } catch (error) {
    console.error("Error sending appointment confirmation email:", error);
    return null;
  }
}
