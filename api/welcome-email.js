import nodemailer from "nodemailer";
import admin from "firebase-admin";
import { existsSync, readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

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
// ROBUST ASSET PATH
// ============================================================

// Important:
// Email images are stored in:
//
// assets/nisha-logo.jpg
// assets/manas-founder.jpg
//
// This resolves assets relative to the actual JS file,
// instead of depending only on process.cwd().

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const assetDirectories = [
  path.resolve(__dirname, "assets"),
  path.resolve(process.cwd(), "assets"),
  path.resolve(__dirname, "../assets"),
  path.resolve(__dirname, "../../assets")
];

function findAsset(filename) {
  for (const directory of assetDirectories) {
    const candidate = path.join(
      directory,
      filename
    );

    if (existsSync(candidate)) {
      console.log(
        `NISHA EMAIL ASSET FOUND: ${candidate}`
      );

      return candidate;
    }
  }

  console.warn(
    `NISHA EMAIL ASSET NOT FOUND: ${filename}`
  );

  return null;
}

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
// NISHA PROFESSIONAL COMPANY EMAIL
// ============================================================

function createWelcomeEmail(name) {

  const safeName = escapeHtml(
    name || "NISHA Customer"
  );

  const websiteURL = escapeHtml(
    process.env.NISHA_WEBSITE_URL || "#"
  );

  const year =
    new Date().getFullYear();

  // ==========================================================
  // FIND REAL EMAIL ASSETS
  // ==========================================================

  const logoPath =
    findAsset("nisha-logo.jpg");

  const founderPath =
    findAsset("manas-founder.jpg");

  const logoAvailable =
    Boolean(logoPath);

  const founderAvailable =
    Boolean(founderPath);

  // ==========================================================
  // LOGO
  // ==========================================================

  const logoBlock =
    logoAvailable
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

  // ==========================================================
  // FOUNDER PHOTO
  // ==========================================================

  const founderBlock =
    founderAvailable
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

  // ==========================================================
  // EMAIL HTML
  // ==========================================================

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

<title>Welcome to NISHA</title>

<style>

  body {
    margin:0 !important;
    padding:0 !important;
    width:100% !important;
    background:#ebe6dd;
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
    max-width:100%;
  }

  a {
    text-decoration:none;
  }

  @media only screen and (max-width:640px) {

    .outer-padding {
      padding:20px 8px !important;
    }

    .main-container {
      width:100% !important;
    }

    .hero-brand {
      padding:35px 20px 38px !important;
    }

    .hero-title {
      font-size:30px !important;
      letter-spacing:7px !important;
    }

    .content-padding {
      padding-left:22px !important;
      padding-right:22px !important;
    }

    .welcome-title {
      font-size:29px !important;
    }

    .feature-cell {
      display:block !important;
      width:100% !important;
      border-right:0 !important;
      border-bottom:1px solid #ddd3c4 !important;
    }

    .feature-cell-last {
      border-bottom:0 !important;
    }

    .founder-layout {
      display:block !important;
    }

    .founder-photo-cell {
      display:block !important;
      width:100% !important;
      text-align:center !important;
      padding-bottom:15px !important;
    }

    .founder-info-cell {
      display:block !important;
      width:100% !important;
      text-align:center !important;
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
  style="
    width:100%;
    background:#ebe6dd;
  "
>

<tr>

<td
  align="center"
  style="
    padding:35px 10px;
  "
>

<table
  class="main-container"
  width="620"
  cellpadding="0"
  cellspacing="0"
  border="0"
  style="
    width:100%;
    max-width:620px;
    background:#ffffff;
    border:1px solid #d8cdbb;
  "
>

<!-- ======================================================== -->
<!-- TOP GOLD LINE -->
<!-- ======================================================== -->

<tr>

<td
  style="
    height:5px;
    background:#b38a4a;
    font-size:0;
    line-height:0;
  "
>
&nbsp;
</td>

</tr>


<!-- ======================================================== -->
<!-- BRAND HEADER -->
<!-- ======================================================== -->

<tr>

<td
  align="center"
  style="
    background:#151515;
    padding:38px 25px 35px;
  "
>

${logoBlock}

<div
  style="
    margin-top:18px;
    width:42px;
    height:1px;
    background:#b38a4a;
  "
>
</div>

<div
  style="
    margin-top:20px;
    font-family:Georgia,'Times New Roman',serif;
    font-size:32px;
    line-height:1;
    letter-spacing:9px;
    color:#ffffff;
  "
>
NISHA
</div>

<div
  style="
    margin-top:15px;
    font-family:Arial,Helvetica,sans-serif;
    font-size:9px;
    line-height:1.5;
    letter-spacing:3px;
    color:#d7bd8d;
  "
>
PREMIUM &nbsp;•&nbsp; QUALITY &nbsp;•&nbsp; STYLE
</div>

</td>

</tr>


<!-- ======================================================== -->
<!-- WELCOME -->
<!-- ======================================================== -->

<tr>

<td
  align="center"
  style="
    padding:35px 40px 12px;
  "
>

<div
  style="
    font-family:Arial,Helvetica,sans-serif;
    font-size:9px;
    font-weight:bold;
    letter-spacing:4px;
    color:#a17b43;
  "
>
WELCOME TO NISHA
</div>

<div
  style="
    margin-top:15px;
    font-family:Georgia,'Times New Roman',serif;
    font-size:34px;
    line-height:1.25;
    color:#171717;
  "
>
${safeName}
</div>

<div
  style="
    margin-top:9px;
    font-family:Georgia,'Times New Roman',serif;
    font-size:15px;
    font-style:italic;
    line-height:1.7;
    color:#777064;
  "
>
Your NISHA experience begins here.
</div>

</td>

</tr>


<!-- ======================================================== -->
<!-- MAIN MESSAGE -->
<!-- ======================================================== -->

<tr>

<td
  align="center"
  style="
    padding:12px 55px 30px;
  "
>

<p
  style="
    margin:0;
    font-family:Arial,Helvetica,sans-serif;
    font-size:14px;
    line-height:2;
    color:#5f5b54;
  "
>
We're delighted to welcome you to NISHA.
Your account is now ready to use.
</p>

<p
  style="
    margin:15px 0 0;
    font-family:Arial,Helvetica,sans-serif;
    font-size:14px;
    line-height:2;
    color:#5f5b54;
  "
>
Discover a carefully curated shopping experience
where
<strong style="color:#302d29;">
quality
</strong>,
<strong style="color:#302d29;">
timeless style
</strong>
and
<strong style="color:#302d29;">
elegance
</strong>
come together.
</p>

</td>

</tr>


<!-- ======================================================== -->
<!-- ACCOUNT INFORMATION -->
<!-- ======================================================== -->

<tr>

<td
  style="
    padding:0 35px 30px;
  "
>

<table
  width="100%"
  cellpadding="0"
  cellspacing="0"
  border="0"
  style="
    background:#f8f5ef;
    border:1px solid #ddd3c4;
  "
>

<tr>

<td
  align="center"
  style="
    padding:24px 20px;
  "
>

<div
  style="
    font-family:Arial,Helvetica,sans-serif;
    font-size:9px;
    letter-spacing:3px;
    font-weight:bold;
    color:#a17b43;
  "
>
ACCOUNT STATUS
</div>

<div
  style="
    margin-top:9px;
    font-family:Georgia,'Times New Roman',serif;
    font-size:20px;
    color:#27231f;
  "
>
Your NISHA account is ready
</div>

<div
  style="
    margin-top:9px;
    font-family:Arial,Helvetica,sans-serif;
    font-size:11px;
    line-height:1.7;
    color:#777064;
  "
>
You can now sign in and continue your shopping experience.
</div>

</td>

</tr>

</table>

</td>

</tr>


<!-- ======================================================== -->
<!-- CTA -->
<!-- ======================================================== -->

<tr>

<td
  align="center"
  style="
    padding:2px 20px 40px;
  "
>

<a
  href="${websiteURL}"
  style="
    display:inline-block;
    background:#171717;
    border:1px solid #b38a4a;
    color:#ffffff;
    font-family:Arial,Helvetica,sans-serif;
    font-size:10px;
    font-weight:bold;
    letter-spacing:3px;
    padding:16px 36px;
  "
>
VISIT NISHA
</a>

</td>

</tr>


<!-- ======================================================== -->
<!-- FOUNDER SECTION -->
<!-- ======================================================== -->

<tr>

<td
  style="
    padding:0 35px;
  "
>

<table
  width="100%"
  cellpadding="0"
  cellspacing="0"
  border="0"
  style="
    background:#151515;
    border:1px solid #b38a4a;
  "
>

<tr>

<td
  align="center"
  style="
    padding:28px 25px 15px;
  "
>

<div
  style="
    font-family:Arial,Helvetica,sans-serif;
    font-size:8px;
    letter-spacing:3px;
    color:#d7bd8d;
    font-weight:bold;
  "
>
THE HOUSE OF NISHA
</div>

</td>

</tr>

<tr>

<td
  style="
    padding:5px 25px 28px;
  "
>

<table
  width="100%"
  cellpadding="0"
  cellspacing="0"
  border="0"
>

<tr>

<td
  class="founder-photo-cell"
  width="90"
  valign="middle"
  style="
    width:90px;
    padding-right:18px;
  "
>

${founderBlock}

</td>

<td
  class="founder-info-cell"
  valign="middle"
  style="
    padding-left:8px;
  "
>

<div
  style="
    font-family:Georgia,'Times New Roman',serif;
    font-size:10px;
    letter-spacing:2px;
    color:#aaa49a;
    text-transform:uppercase;
  "
>
Founded by
</div>

<div
  style="
    margin-top:5px;
    font-family:Georgia,'Times New Roman',serif;
    font-size:20px;
    color:#ffffff;
  "
>
Manas Kumar Prajapati
</div>

<div
  style="
    margin-top:6px;
    font-family:Georgia,'Times New Roman',serif;
    font-size:11px;
    font-style:italic;
    color:#c9c1b5;
  "
>
Founder&nbsp; • &nbsp;NISHA
</div>

</td>

</tr>

</table>

</td>

</tr>

</table>

</td>

</tr>


<!-- ======================================================== -->
<!-- QUOTE -->
<!-- ======================================================== -->

<tr>

<td
  align="center"
  style="
    padding:35px 40px;
  "
>

<p
  style="
    margin:0;
    font-family:Georgia,'Times New Roman',serif;
    font-size:16px;
    font-style:italic;
    line-height:1.8;
    color:#4d4942;
  "
>
"Style is timeless. Quality is remembered."
</p>

<div
  style="
    margin-top:13px;
    font-family:Arial,Helvetica,sans-serif;
    font-size:8px;
    letter-spacing:3px;
    color:#a17b43;
  "
>
NISHA
</div>

</td>

</tr>


<!-- ======================================================== -->
<!-- FOOTER -->
<!-- ======================================================== -->

<tr>

<td
  align="center"
  style="
    background:#141414;
    padding:25px 15px 27px;
  "
>

<div
  style="
    font-family:Georgia,'Times New Roman',serif;
    font-size:21px;
    letter-spacing:5px;
    color:#d7bd8d;
  "
>
NISHA
</div>

<div
  style="
    margin-top:10px;
    font-family:Arial,Helvetica,sans-serif;
    font-size:9px;
    color:#777777;
  "
>
© ${year} NISHA. All rights reserved.
</div>

<div
  style="
    margin-top:6px;
    font-family:Arial,Helvetica,sans-serif;
    font-size:9px;
    color:#666666;
  "
>
Founded by Manas Kumar Prajapati
</div>

</td>

</tr>


<!-- ======================================================== -->
<!-- BOTTOM GOLD LINE -->
<!-- ======================================================== -->

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
        message:
          "Firebase ID token is required"
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
        .slice(0, 100) ||
        "NISHA Customer";

    // --------------------------------------------------------
    // WEBSITE
    // --------------------------------------------------------

    const website =
      process.env.NISHA_WEBSITE_URL || "";

    // --------------------------------------------------------
    // PLAIN TEXT
    // --------------------------------------------------------

    const plainText =
`Welcome to NISHA — your account is ready.

Dear ${safeDisplayName},

Thank you for choosing NISHA.

We are pleased to welcome you to our online store.

Your NISHA account is ready to use.

You can now sign in and continue your shopping experience.

Visit NISHA:
${website}

You are receiving this service message because a NISHA account
is associated with this email address.

THE HOUSE OF NISHA

Manas Kumar Prajapati
Founder • NISHA

© ${new Date().getFullYear()} NISHA. All rights reserved.`;

    // --------------------------------------------------------
    // EMAIL ATTACHMENTS
    // --------------------------------------------------------

    const emailAttachments = [];

    const logoPath =
      findAsset("nisha-logo.jpg");

    const founderPath =
      findAsset("manas-founder.jpg");

    // --------------------------------------------------------
    // NISHA LOGO
    // --------------------------------------------------------

    if (logoPath) {

      emailAttachments.push({

        filename:
          "nisha-logo.jpg",

        content:
          readFileSync(logoPath),

        cid:
          "nisha-logo@nisha.email"

      });

      console.log(
        "NISHA LOGO ATTACHED:",
        logoPath
      );

    } else {

      console.warn(
        "NISHA LOGO NOT ATTACHED"
      );

    }

    // --------------------------------------------------------
    // FOUNDER PHOTO
    // --------------------------------------------------------

    if (founderPath) {

      emailAttachments.push({

        filename:
          "manas-founder.jpg",

        content:
          readFileSync(founderPath),

        cid:
          "manas-founder@nisha.email"

      });

      console.log(
        "NISHA FOUNDER PHOTO ATTACHED:",
        founderPath
      );

    } else {

      console.warn(
        "NISHA FOUNDER PHOTO NOT ATTACHED"
      );

    }

    // --------------------------------------------------------
    // SEND EMAIL
    // --------------------------------------------------------

    const info =
      await transporter.sendMail({

        // Same mailbox that authenticates with Gmail.
        from:
          `"NISHA" <${process.env.SMTP_EMAIL}>`,

        // Firebase user's real email.
        to: {
          name: safeDisplayName,
          address: userEmail
        },

        // Replies go to the authenticated mailbox.
        replyTo:
          process.env.SMTP_EMAIL,

        // SMTP envelope.
        envelope: {
          from:
            process.env.SMTP_EMAIL,

          to:
            userEmail
        },

        // Professional transactional subject.
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

        // IMPORTANT:
        // Logo + founder photo are embedded
        // inside the email using CID.
        attachments:
          emailAttachments,

        // Actual sending date.
        date:
          new Date(),

        // Automatically generated transactional mail.
        headers: {
          "Auto-Submitted":
            "auto-generated"
        }

      });

    // --------------------------------------------------------
    // LOG
    // --------------------------------------------------------

    console.log(
      "NISHA EMAIL SENT:",
      info.messageId
    );

    console.log(
      "NISHA EMAIL ATTACHMENTS:",
      emailAttachments.length
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
