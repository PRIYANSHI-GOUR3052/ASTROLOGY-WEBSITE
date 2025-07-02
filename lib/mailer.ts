const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendResetPasswordEmail({ to, resetUrl, astrologerName }: { to: string; resetUrl: string; astrologerName?: string }) {
  const subject = 'Reset Your Password - Nakshatra Gyaan';
  const html = `
    <div style="font-family: 'Segoe UI', 'Roboto', 'Arial', sans-serif; background: #f7f6fb; padding: 32px; color: #2d1e4a;">
      <div style="max-width: 480px; margin: 0 auto; background: #fff; border-radius: 16px; box-shadow: 0 2px 16px #e0d7f7; padding: 32px;">
        <div style="text-align: center;">
          <img src='https://nakshatragyaan.com/logo.svg' alt='Nakshatra Gyaan' style='height: 48px; margin-bottom: 16px;' />
          <h2 style="color: #7c3aed; margin-bottom: 8px;">Reset Your Password</h2>
        </div>
        <p>Hi${astrologerName ? ` ${astrologerName}` : ''},</p>
        <p>We received a request to reset your password for your Nakshatra Gyaan astrologer account.</p>
        <p style="margin: 24px 0; text-align: center;">
          <a href="${resetUrl}" style="background: linear-gradient(90deg, #7c3aed, #a78bfa); color: #fff; padding: 12px 32px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 16px;">Reset Password</a>
        </p>
        <p>If you did not request this, you can safely ignore this email.</p>
        <hr style="margin: 32px 0; border: none; border-top: 1px solid #eee;" />
        <p style="font-size: 13px; color: #888; text-align: center;">&copy; ${new Date().getFullYear()} Nakshatra Gyaan. All rights reserved.</p>
      </div>
    </div>
  `;
  return transporter.sendMail({
    from: `Nakshatra Gyaan <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
    to,
    subject,
    html,
  });
} 