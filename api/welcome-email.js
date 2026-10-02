import nodemailer from "nodemailer";
import admin from "firebase-admin";
import { existsSync, readFileSync } from "fs";
import path from "path";

// ============================================================
// FIREBASE ADMIN INITIALIZATION
// ============================================================

if (!admin.apps.length) {
  const privateKey =
    process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (
    !process.env.FIREBASE_PROJECT_ID ||
    !process.env.FIREBASE_CLIENT_EMAIL ||
    !privateKey
  ) {
    throw new Error(
      "Firebase Admin environment variables are missing"
    );
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

// ============================================================
// CORS
// ============================================================

function setCorsHeaders(res) {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "*"
  );

  res.setHeader(
    "Access-Control-Allow-Methods",
    "POST, OPTIONS"
  );

  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
}

// ============================================================
// SMTP
// ============================================================

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",

  port: 587,

  secure: false,
  requireTLS: true,

  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_APP_PASSWORD
  },

  // Keep transporter access limited to SMTP only.
  disableFileAccess: true,
  disableUrlAccess: true,

  tls: {
    minVersion: "TLSv1.2"
  }
});

// ============================================================
// HTML ESCAPE
// ============================================================

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// ============================================================
// NISHA PROFESSIONAL LUXURY WELCOME EMAIL
// ============================================================

function createWelcomeEmail(name) {
  const safeName = escapeHtml(
    name || "NISHA Customer"
  );

  const websiteURL = escapeHtml(
    process.env.NISHA_WEBSITE_URL || "#"
  );

  const year = new Date().getFullYear();

  const logoAvailable = existsSync(
    path.resolve(
      process.cwd(),
      "assets/nisha-logo.jpg"
    )
  );

  const founderAvailable = existsSync(
    path.resolve(
      process.cwd(),
      "assets/manas-founder.jpg"
    )
  );

  const logoBlock = logoAvailable
    ? `
      <img
        src="cid:nisha-logo@nisha.email"
        width="132"
        height="132"
        alt="NISHA"
        style="
          display:block;
          width:132px;
          height:132px;
          margin:0 auto;
          border:0;
          border-radius:50%;
        "
      >
    `
    : `
      <div
        style="
          font-family:Georgia,'Times New Roman',serif;
          font-size:42px;
          line-height:1;
          letter-spacing:7px;
          color:#b38a4a;
        "
      >
        NISHA
      </div>
    `;

  const founderBlock = founderAvailable
    ? `
      <img
        src="cid:manas-founder@nisha.email"
        width="74"
        height="74"
        alt="Manas Kumar Prajapati, Founder of NISHA"
        style="
          display:block;
          width:74px;
          height:74px;
          border:2px solid #b38a4a;
          border-radius:50%;
          object-fit:cover;
          margin:0;
        "
      >
    `
    : `
      <div
        style="
          width:74px;
          height:74px;
          border:2px solid #b38a4a;
          border-radius:50%;
          background:#f5f1e9;
          text-align:center;
          line-height:74px;
          font-family:Georgia,'Times New Roman',serif;
          font-size:24px;
          color:#b38a4a;
        "
      >
        M
      </div>
    `;

  return `
<!DOCTYPE html>

<html lang="en">

<head>

  <meta charset="UTF-8">

  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  >

  <meta
    name="x-apple-disable-message-reformatting"
  >

  <meta
    name="format-detection"
    content="telephone=no"
  >

  <title>Your NISHA account is ready</title>

  <style>

    body {
      margin:0 !important;
      padding:0 !important;
      width:100% !important;
      background:#f2eee7;
      color:#24211d;
    }

    table {
      border-collapse:collapse;
      border-spacing:0;
    }

    img {
      border:0;
      outline:none;
      text-decoration:none;
      display:block;
    }

    a {
      text-decoration:none;
    }

    @media only screen and (max-width:640px) {

      .outer {
        padding:18px 8px !important;
      }

      .container {
        width:100% !important;
      }

      .content {
        padding-left:24px !important;
        padding-right:24px !important;
      }

      .hero {
        padding:28px 20px !important;
      }

      .welcome-title {
        font-size:28px !important;
      }

      .founder-photo {
        width:64px !important;
        height:64px !important;
      }

      .founder-name {
        font-size:16px !important;
      }

    }

  </style>

</head>

<body>

  <table
    width="100%"
    cellpadding="0"
    cellspacing="0"
    border="0"
    role="presentation"
    style="
      width:100%;
      background:#f2eee7;
    "
  >

    <tr>

      <td
        class="outer"
        align="center"
        style="padding:34px 12px;"
      >

        <table
          class="container"
          width="600"
          cellpadding="0"
          cellspacing="0"
          border="0"
          role="presentation"
          style="
            width:100%;
            max-width:600px;
            background:#ffffff;
            border:1px solid #ddd5c8;
          "
        >

          <!-- ================================================= -->
          <!-- GOLD TOP LINE -->
          <!-- ================================================= -->

          <tr>

            <td
              style="
                height:4px;
                background:#b38a4a;
                font-size:0;
                line-height:0;
              "
            >
              &nbsp;
            </td>

          </tr>


          <!-- ================================================= -->
          <!-- BRAND HEADER -->
          <!-- ================================================= -->

          <tr>

            <td
              class="hero"
              align="center"
              style="
                padding:30px 25px 25px;
                background:#ffffff;
              "
            >

              ${logoBlock}

              <div
                style="
                  margin-top:17px;
                  font-family:Arial,Helvetica,sans-serif;
                  font-size:9px;
                  line-height:1.5;
                  letter-spacing:3.5px;
                  font-weight:bold;
                  color:#8b6a39;
                "
              >
                PREMIUM &nbsp;•&nbsp; QUALITY &nbsp;•&nbsp; STYLE
              </div>

            </td>

          </tr>


          <!-- ================================================= -->
          <!-- DIVIDER -->
          <!-- ================================================= -->

          <tr>

            <td style="padding:0 34px;">

              <div
                style="
                  height:1px;
                  background:#e7e0d6;
                  font-size:0;
                  line-height:0;
                "
              ></div>

            </td>

          </tr>


          <!-- ================================================= -->
          <!-- WELCOME -->
          <!-- ================================================= -->

          <tr>

            <td
              class="content"
              align="center"
              style="padding:42px 54px 12px;"
            >

              <div
                style="
                  font-family:Arial,Helvetica,sans-serif;
                  font-size:9px;
                  line-height:1.5;
                  letter-spacing:3px;
                  font-weight:bold;
                  color:#a17b43;
                "
              >
                WELCOME TO NISHA
              </div>

              <div
                class="welcome-title"
                style="
                  margin-top:13px;
                  font-family:Georgia,'Times New Roman',serif;
                  font-size:34px;
                  line-height:1.25;
                  font-weight:normal;
                  color:#171717;
                "
              >
                Hello ${safeName}
              </div>

              <div
                style="
                  margin-top:10px;
                  font-family:Georgia,'Times New Roman',serif;
                  font-size:16px;
                  line-height:1.7;
                  font-style:italic;
                  color:#756f66;
                "
              >
                Your NISHA account is ready to use.
              </div>

            </td>

          </tr>


          <!-- ================================================= -->
          <!-- MAIN MESSAGE -->
          <!-- ================================================= -->

          <tr>

            <td
              class="content"
              style="padding:18px 54px 34px;"
            >

              <p
                style="
                  margin:0;
                  font-family:Arial,Helvetica,sans-serif;
                  font-size:14px;
                  line-height:1.9;
                  color:#555149;
                "
              >
                Dear ${safeName},
              </p>

              <p
                style="
                  margin:14px 0 0;
                  font-family:Arial,Helvetica,sans-serif;
                  font-size:14px;
                  line-height:1.9;
                  color:#555149;
                "
              >
                Thank you for choosing NISHA. We are pleased to
                welcome you to our online store, where carefully
                selected products meet timeless style and everyday
                elegance.
              </p>

              <p
                style="
                  margin:14px 0 0;
                  font-family:Arial,Helvetica,sans-serif;
                  font-size:13px;
                  line-height:1.8;
                  color:#777168;
                "
              >
                This is a service message from NISHA regarding the
                account associated with this email address.
              </p>

            </td>

          </tr>


          <!-- ================================================= -->
          <!-- ACCOUNT STATUS -->
          <!-- ================================================= -->

          <tr>

            <td
              class="content"
              style="padding:0 42px 34px;"
            >

              <table
                width="100%"
                cellpadding="0"
                cellspacing="0"
                border="0"
                role="presentation"
                style="
                  width:100%;
                  background:#faf8f4;
                  border:1px solid #e3dbcf;
                "
              >

                <tr>

                  <td
                    style="
                      padding:22px 24px;
                      border-left:3px solid #b38a4a;
                    "
                  >

                    <div
                      style="
                        font-family:Arial,Helvetica,sans-serif;
                        font-size:9px;
                        line-height:1.5;
                        letter-spacing:2px;
                        font-weight:bold;
                        color:#a17b43;
                      "
                    >
                      ACCOUNT STATUS
                    </div>

                    <div
                      style="
                        margin-top:8px;
                        font-family:Georgia,'Times New Roman',serif;
                        font-size:20px;
                        line-height:1.4;
                        color:#24211d;
                      "
                    >
                      Active &amp; ready
                    </div>

                    <div
                      style="
                        margin-top:6px;
                        font-family:Arial,Helvetica,sans-serif;
                        font-size:12px;
                        line-height:1.7;
                        color:#777168;
                      "
                    >
                      You can now sign in and continue your NISHA
                      shopping experience.
                    </div>

                  </td>

                </tr>

              </table>

            </td>

          </tr>


          <!-- ================================================= -->
          <!-- CTA -->
          <!-- ================================================= -->

          <tr>

            <td
              align="center"
              style="padding:0 25px 42px;"
            >

              <a
                href="${websiteURL}"
                target="_blank"
                style="
                  display:inline-block;
                  background:#171717;
                  border:1px solid #b38a4a;
                  color:#ffffff;
                  font-family:Arial,Helvetica,sans-serif;
                  font-size:10px;
                  line-height:1;
                  font-weight:bold;
                  letter-spacing:2.5px;
                  text-transform:uppercase;
                  padding:16px 30px;
                "
              >
                VISIT NISHA
              </a>

            </td>

          </tr>


          <!-- ================================================= -->
          <!-- SERVICE NOTE -->
          <!-- ================================================= -->

          <tr>

            <td
              class="content"
              style="
                padding:0 48px 35px;
              "
            >

              <table
                width="100%"
                cellpadding="0"
                cellspacing="0"
                border="0"
                role="presentation"
              >

                <tr>

                  <td
                    style="
                      padding:18px 20px;
                      background:#ffffff;
                      border-top:1px solid #e6dfd5;
                      border-bottom:1px solid #e6dfd5;
                    "
                  >

                    <div
                      style="
                        font-family:Arial,Helvetica,sans-serif;
                        font-size:11px;
                        line-height:1.8;
                        color:#6e685f;
                        text-align:center;
                      "
                    >
                      You are receiving this email because a NISHA
                      account is associated with this email address.
                      If you did not expect this message, you can
                      contact NISHA for assistance.
                    </div>

                  </td>

                </tr>

              </table>

            </td>

          </tr>


          <!-- ================================================= -->
          <!-- FOUNDER SIGNATURE -->
          <!-- ================================================= -->

          <tr>

            <td
              style="
                padding:0 38px 34px;
              "
            >

              <table
                width="100%"
                cellpadding="0"
                cellspacing="0"
                border="0"
                role="presentation"
                style="
                  width:100%;
                  background:#171717;
                  border:1px solid #b38a4a;
                "
              >

                <tr>

                  <td
                    width="82"
                    valign="middle"
                    style="padding:20px 0 20px 20px;"
                  >

                    <div class="founder-photo">

                      ${founderBlock}

                    </div>

                  </td>


                  <td
                    valign="middle"
                    style="padding:20px 18px 20px 14px;"
                  >

                    <div
                      style="
                        font-family:Arial,Helvetica,sans-serif;
                        font-size:8px;
                        line-height:1.5;
                        letter-spacing:2.5px;
                        font-weight:bold;
                        color:#d7bd8d;
                      "
                    >
                      THE HOUSE OF NISHA
                    </div>

                    <div
                      class="founder-name"
                      style="
                        margin-top:6px;
                        font-family:Georgia,'Times New Roman',serif;
                        font-size:19px;
                        line-height:1.4;
                        color:#ffffff;
                      "
                    >
                      Manas Kumar Prajapati
                    </div>

                    <div
                      style="
                        margin-top:3px;
                        font-family:Arial,Helvetica,sans-serif;
                        font-size:10px;
                        line-height:1.5;
                        color:#c8c0b4;
                      "
                    >
                      Founder &nbsp;•&nbsp; NISHA
                    </div>

                  </td>

                </tr>

              </table>

            </td>

          </tr>


          <!-- ================================================= -->
          <!-- FOOTER -->
          <!-- ================================================= -->

          <tr>

            <td
              align="center"
              style="
                padding:27px 25px 30px;
                background:#f6f3ed;
                border-top:1px solid #e2dbd0;
              "
            >

              <div
                style="
                  font-family:Georgia,'Times New Roman',serif;
                  font-size:19px;
                  line-height:1.4;
                  letter-spacing:5px;
                  color:#b38a4a;
                "
              >
                NISHA
              </div>

              <div
                style="
                  margin-top:9px;
                  font-family:Arial,Helvetica,sans-serif;
                  font-size:9px;
                  line-height:1.6;
                  letter-spacing:1.5px;
                  color:#817a70;
                "
              >
                PREMIUM &nbsp;•&nbsp; QUALITY &nbsp;•&nbsp; STYLE
              </div>

              <div
                style="
                  margin-top:13px;
                  font-family:Arial,Helvetica,sans-serif;
                  font-size:9px;
                  line-height:1.7;
                  color:#989188;
                "
              >
                © ${year} NISHA. All rights reserved.
              </div>

              <div
                style="
                  margin-top:4px;
                  font-family:Arial,Helvetica,sans-serif;
                  font-size:9px;
                  line-height:1.7;
                  color:#989188;
                "
              >
                Founded by Manas Kumar Prajapati
              </div>

            </td>

          </tr>


          <!-- ================================================= -->
          <!-- GOLD BOTTOM LINE -->
          <!-- ================================================= -->

          <tr>

            <td
              style="
                height:4px;
                background:#b38a4a;
                font-size:0;
                line-height:0;
              "
            >
              &nbsp;
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

// ============================================================
// API HANDLER
// ============================================================

export default async function handler(req, res) {

  // ----------------------------------------------------------
  // CORS
  // ----------------------------------------------------------

  setCorsHeaders(res);

  // ----------------------------------------------------------
  // OPTIONS
  // ----------------------------------------------------------

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  // ----------------------------------------------------------
  // ONLY POST
  // ----------------------------------------------------------

  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed"
    });
  }

  // ----------------------------------------------------------
  // MAIN
  // ----------------------------------------------------------

  try {

    const {
      idToken
    } = req.body || {};

    // --------------------------------------------------------
    // TOKEN REQUIRED
    // --------------------------------------------------------

    if (!idToken) {
      return res.status(401).json({
        success: false,
        message: "Firebase ID token is required"
      });
    }

    // --------------------------------------------------------
    // VERIFY FIREBASE TOKEN
    // --------------------------------------------------------

    const decodedToken =
      await auth.verifyIdToken(idToken);

    // --------------------------------------------------------
    // GET REAL FIREBASE USER
    // --------------------------------------------------------

    const user =
      await auth.getUser(decodedToken.uid);

    const userEmail =
      user.email;

    if (!userEmail) {
      return res.status(400).json({
        success: false,
        message:
          "Firebase user does not have an email address"
      });
    }

    // --------------------------------------------------------
    // DISPLAY NAME
    // --------------------------------------------------------

    const displayName =
      user.displayName?.trim() ||
      "NISHA Customer";

    console.log(
      "Sending NISHA welcome email:",
      {
        uid: user.uid,
        email: userEmail,
        displayName
      }
    );

    // --------------------------------------------------------
    // SAFE DISPLAY NAME
    // --------------------------------------------------------

    const safeDisplayName =
      String(displayName)
        .replace(/[\r\n]/g, " ")
        .trim()
        .slice(0, 100) || "NISHA Customer";

    // --------------------------------------------------------
    // WEBSITE
    // --------------------------------------------------------

    const website =
      process.env.NISHA_WEBSITE_URL || "";

    // --------------------------------------------------------
    // PLAIN TEXT VERSION
    // --------------------------------------------------------

    const plainText =
`Welcome to NISHA — your account is ready.

Dear ${safeDisplayName},

Thank you for choosing NISHA. We are pleased to welcome you
to our online store.

Your NISHA account is ready to use. You can now sign in and
continue your shopping experience.

Visit NISHA:
${website}

You are receiving this service message because a NISHA account
is associated with this email address.

THE HOUSE OF NISHA

Manas Kumar Prajapati
Founder • NISHA

© ${new Date().getFullYear()} NISHA. All rights reserved.`;

    // --------------------------------------------------------
    // EMAIL IMAGE ATTACHMENTS
    // --------------------------------------------------------

    const emailAttachments = [];

    const logoPath =
      path.resolve(
        process.cwd(),
        "assets/nisha-logo.jpg"
      );

    const founderPath =
      path.resolve(
        process.cwd(),
        "assets/manas-founder.jpg"
      );

    if (existsSync(logoPath)) {
      emailAttachments.push({
        filename: "nisha-logo.jpg",
        content: readFileSync(logoPath),
        cid: "nisha-logo@nisha.email"
      });
    }

    if (existsSync(founderPath)) {
      emailAttachments.push({
        filename: "manas-founder.jpg",
        content: readFileSync(founderPath),
        cid: "manas-founder@nisha.email"
      });
    }

    // --------------------------------------------------------
    // SEND EMAIL
    // --------------------------------------------------------

    const info =
      await transporter.sendMail({

        // The visible sender must be the same mailbox
        // authenticated through Gmail SMTP.
        from:
          `"NISHA" <${process.env.SMTP_EMAIL}>`,

        // Recipient is taken directly from Firebase Auth.
        to: {
          name: safeDisplayName,
          address: userEmail
        },

        // Replies go back to the authenticated mailbox.
        replyTo:
          process.env.SMTP_EMAIL,

        // Keep SMTP envelope sender aligned with visible sender.
        envelope: {
          from: process.env.SMTP_EMAIL,
          to: userEmail
        },

        // Clear, non-promotional transactional subject.
        subject:
          "Welcome to NISHA — your account is ready",

        // HTML version.
        html:
          createWelcomeEmail(
            safeDisplayName
          ),

        // Plain-text fallback.
        text:
          plainText,

        // Small local CID images.
        attachments:
          emailAttachments,

        // Actual sending date.
        date:
          new Date(),

        // Identifies this as automatically generated mail.
        headers: {
          "Auto-Submitted": "auto-generated"
        }

      });

    // --------------------------------------------------------
    // LOG
    // --------------------------------------------------------

    console.log(
      "NISHA PROFESSIONAL EMAIL SENT:",
      info.messageId
    );

    // --------------------------------------------------------
    // SUCCESS
    // --------------------------------------------------------

    return res.status(200).json({

      success: true,

      message:
        "NISHA welcome email sent successfully",

      messageId:
        info.messageId

    });

  } catch (error) {

    // --------------------------------------------------------
    // ERROR
    // --------------------------------------------------------

    console.error(
      "WELCOME_EMAIL_ERROR:",
      error
    );

    return res.status(500).json({

      success: false,

      message:
        "Failed to send welcome email"

    });

  }

}
