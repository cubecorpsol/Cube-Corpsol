import nodemailer from "nodemailer";

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({
      message: "Method not allowed"
    });
  }

  const { name, email } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",

    auth: {
      user: "cubecorpsol@gmail.com",
      pass: process.env.EMAIL_PASS
    }
  });

  try {

    await transporter.sendMail({

      from: "cubecorpsol@gmail.com",

      to: email,

      subject: "Thank you for contacting Cube Corpsol",

      html: `
      <div style="font-family:Arial;padding:20px">

      <h2>Dear ${name},</h2>

      <p>
      Thank you for contacting Cube Corpsol.
      We have successfully received your enquiry
      and our team will get in touch with you shortly.
      </p>

      <p>
      Our team usually responds within 24 hours.
      </p>

      <br>

      <p>
      Regards,<br>
      Cube Corpsol<br>
      Recruitment | IT Training | Staffing | Corporate Solutions
      </p>

      <p>
      Contact: +91 88839 21424
      </p>

      </div>
      `
    });

    return res.status(200).json({
      message: "Email sent successfully"
    });

  } catch (error) {

    return res.status(500).json({
      error: error.message
    });
  }
}