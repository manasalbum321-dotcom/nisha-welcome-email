import nodemailer from "nodemailer";
import admin from "firebase-admin";

/* =========================================================
   FIREBASE ADMIN INITIALIZATION
   ========================================================= */

if (!admin.apps.length) {
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (
    !process.env.FIREBASE_PROJECT_ID ||
    !process.env.FIREBASE_CLIENT_EMAIL ||
    !privateKey
  ) {
    throw new Error("Firebase Admin environment variables are missing");
  }

  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey
    })
  });
}

const auth = admin.auth();

/* =========================================================
   GMAIL SMTP
   ========================================================= */

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_APP_PASSWORD
  },
  tls: {
    minVersion: "TLSv1.2"
  }
});

/* =========================================================
   HTML EMAIL
   ========================================================= */

function createWelcomeEmail(name) {
  const safeName = escapeHtml(name || "NISHA Customer");

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to NISHA</title>
</head>

<body style="
  margin:0;
  padding:0;
  background:#f3f0ea;
  font-family:Arial,Helvetica,sans-serif;
">

<table
  width="100%"
  cellpadding="0"
  cellspacing="0"
  border="0"
  style="background:#f3f0ea;padding:40px 15px;"
>
  <tr>
    <td align="center">

      <!-- MAIN CARD -->
      <table
        width="600"
        cellpadding="0"
        cellspacing="0"
        border="0"
        style="
          max-width:600px;
          width:100%;
          background:#ffffff;
          border:1px solid #e6dfd3;
        "
      >

        <!-- HEADER -->
        <tr>
          <td
            align="center"
            style="
              background:#151515;
              padding:35px 20px;
            "
          >
            <div style="
              font-family:Georgia,'Times New Roman',serif;
              font-size:42px;
              font-weight:bold;
              letter-spacing:5px;
              color:#d7bd8d;
            ">
              N
            </div>

            <div style="
              margin-top:8px;
              font-family:Georgia,'Times New Roman',serif;
              font-size:27px;
              letter-spacing:7px;
              color:#ffffff;
            ">
              NISHA
            </div>

            <div style="
              margin-top:10px;
              font-size:10px;
              letter-spacing:4px;
              color:#d7bd8d;
            ">
              PREMIUM • QUALITY • STYLE
            </div>
          </td>
        </tr>

        <!-- CONTENT -->
        <tr>
          <td style="padding:45px 40px 35px;">

            <div style="
              font-size:12px;
              letter-spacing:3px;
              color:#b38a4a;
              text-align:center;
              text-transform:uppercase;
            ">
              Welcome to NISHA
            </div>

            <h1 style="
              margin:18px 0 0;
              text-align:center;
              font-family:Georgia,'Times New Roman',serif;
              font-size:34px;
              font-weight:normal;
              color:#151515;
            ">
              Welcome, ${safeName}
            </h1>

            <div style="
              width:50px;
              height:1px;
              background:#b38a4a;
              margin:24px auto;
            "></div>

            <p style="
              margin:0 0 18px;
              text-align:center;
              color:#555555;
              font-size:16px;
              line-height:1.8;
            ">
              We're delighted to have you with us.
            </p>

            <p style="
              margin:0 0 28px;
              text-align:center;
              color:#666666;
              font-size:14px;
              line-height:1.8;
            ">
              Your NISHA account has been successfully created.
              Discover a carefully selected experience built around
              premium quality, timeless style and elegance.
            </p>

            <!-- BUTTON -->
            <table
              width="100%"
              cellpadding="0"
              cellspacing="0"
              border="0"
            >
              <tr>
                <td align="center">
                  <a
                    href="${escapeHtml(process.env.NISHA_WEBSITE_URL || "#")}"
                    style="
                      display:inline-block;
                      background:#151515;
                      color:#ffffff;
                      text-decoration:none;
                      padding:15px 35px;
                      font-size:12px;
                      letter-spacing:2px;
                      text-transform:uppercase;
                    "
                  >
                    Explore NISHA
                  </a>
                </td>
              </tr>
            </table>

          </td>
        </tr>

        <!-- DIVIDER -->
        <tr>
          <td style="padding:0 40px;">
            <div style="
              height:1px;
              background:#e8e2d9;
            "></div>
          </td>
        </tr>

        <!-- FOOTER MESSAGE -->
        <tr>
          <td
            align="center"
            style="padding:30px 35px;"
          >
            <p style="
              margin:0 0 10px;
              color:#777777;
              font-size:13px;
              line-height:1.7;
            ">
              Thank you for choosing NISHA.
            </p>

            <p style="
              margin:0;
              color:#999999;
              font-size:12px;
              line-height:1.7;
            ">
              Founded by Manas Kumar Prajapati
            </p>
          </td>
        </tr>

        <!-- BOTTOM -->
        <tr>
          <td
            align="center"
            style="
              background:#151515;
              padding:18px;
            "
          >
            <div style="
              color:#888888;
              font-size:10px;
              letter-spacing:1px;
            ">
              © ${new Date().getFullYear()} NISHA. All rights reserved.
            </div>
          </td>
        </tr>

      </table>

    </td>
  </tr>
</table>

</body>
</html>
`;
}

/* =========================================================
   HTML ESCAPE
   ========================================================= */

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/* =========================================================
   API
   ========================================================= */

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed"
    });
  }

  try {
    /*
      CLIENT MUST SEND:

      {
        "idToken": "Firebase ID token"
      }
    */

    const { idToken } = req.body || {};

    if (!idToken) {
      return res.status(401).json({
        success: false,
        message: "Firebase ID token is required"
      });
    }

    /* -------------------------------------------------------
       VERIFY FIREBASE USER
       ------------------------------------------------------- */

    const decodedToken = await auth.verifyIdToken(idToken);

    const user = await auth.getUser(decodedToken.uid);

    const userEmail = user.email;

    if (!userEmail) {
      return res.status(400).json({
        success: false,
        message: "Firebase user does not have an email address"
      });
    }

    /* -------------------------------------------------------
       DISPLAY NAME FROM FIREBASE AUTH
       ------------------------------------------------------- */

    const displayName =
      user.displayName?.trim() || "NISHA Customer";

    /* -------------------------------------------------------
       SEND EMAIL
       ------------------------------------------------------- */

    const info = await transporter.sendMail({
      from: `"NISHA" <${process.env.SMTP_EMAIL}>`,
      to: userEmail,

      subject: `Welcome to NISHA, ${displayName}!`,

      html: createWelcomeEmail(displayName),

      text: `Welcome to NISHA, ${displayName}!

We're delighted to have you with us.

Your NISHA account has been successfully created.

Visit NISHA:
${process.env.NISHA_WEBSITE_URL}

Founded by Manas Kumar Prajapati
`
    });

    return res.status(200).json({
      success: true,
      message: "Welcome email sent successfully",
      messageId: info.messageId
    });

  } catch (error) {
    console.error("WELCOME_EMAIL_ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to send welcome email"
    });
  }
}