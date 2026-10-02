import nodemailer from "nodemailer";
import admin from "firebase-admin";

// ============================================================
// NISHA — COMPANY WELCOME EMAIL
// Firebase Authentication + Nodemailer
// Premium Company Email Design
// ============================================================


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
// NISHA BRAND CONFIGURATION
// ============================================================

// Your real NISHA logo
const NISHA_LOGO_URL =
  "https://i.postimg.cc/VNZ8Y7qd/NISHA-Black-and-Gold-Wordmark.png";

// Your founder photo
const FOUNDER_PHOTO_URL =
  "https://lh3.googleusercontent.com/a/ACg8ocIEfjSWipzxFNj5O6ryD9YHVDZ1VIRAVyClTLnppzVJprAmKhY=s192-c-mo";


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

  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_APP_PASSWORD
  },

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
// NISHA WELCOME EMAIL
// ============================================================

function createWelcomeEmail(name) {

  const safeName = escapeHtml(
    name || "NISHA Customer"
  );

  const websiteURL = escapeHtml(
    process.env.NISHA_WEBSITE_URL || "#"
  );

  const year = new Date().getFullYear();

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

/* ==========================================================
   RESET
   ========================================================== */

html,
body {
  margin: 0 !important;
  padding: 0 !important;
  width: 100% !important;
}

body {
  background: #eee9e1;
  font-family:
    Arial,
    Helvetica,
    sans-serif;
}

table {
  border-collapse: collapse;
  border-spacing: 0;
}

img {
  border: 0;
  outline: none;
  text-decoration: none;
  display: block;
}

a {
  text-decoration: none;
}


/* ==========================================================
   MOBILE
   ========================================================== */

@media only screen and (max-width: 640px) {

  .outer {
    padding: 15px 7px !important;
  }

  .container {
    width: 100% !important;
  }

  .mobile-padding {
    padding-left: 22px !important;
    padding-right: 22px !important;
  }

  .welcome-title {
    font-size: 29px !important;
  }

  .hero-logo {
    width: 70px !important;
    max-width: 70px !important;
  }

  .founder-photo {
    width: 72px !important;
    height: 72px !important;
  }

  .button {
    width: 80% !important;
  }

  .footer-text {
    font-size: 9px !important;
  }

}


/* ==========================================================
   DARK MODE FRIENDLY
   ========================================================== */

</style>

</head>


<body>


<!-- ========================================================
     OUTER WRAPPER
     ======================================================== -->

<table
  width="100%"
  cellpadding="0"
  cellspacing="0"
  border="0"
  style="
    width:100%;
    background:#eee9e1;
  "
>

<tr>

<td
  align="center"
  class="outer"
  style="
    padding:38px 12px;
  "
>


<!-- ========================================================
     MAIN CONTAINER
     ======================================================== -->

<table
  class="container"
  width="620"
  cellpadding="0"
  cellspacing="0"
  border="0"
  style="
    width:100%;
    max-width:620px;
    background:#ffffff;
    border:1px solid #ddd4c6;
  "
>


<!-- ========================================================
     GOLD TOP LINE
     ======================================================== -->

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


<!-- ========================================================
     HEADER
     ======================================================== -->

<tr>

<td
  align="center"
  style="
    background:#151515;
    padding:35px 25px 34px;
  "
>


<!-- LOGO -->

<img
  class="hero-logo"
  src="${NISHA_LOGO_URL}"
  width="80"
  alt="NISHA"
  style="
    display:block;
    width:80px;
    max-width:80px;
    height:auto;
    margin:0 auto;
  "
>


<!-- BRAND -->

<div
  style="
    margin-top:18px;
    font-family:
      Georgia,
      'Times New Roman',
      serif;
    font-size:31px;
    line-height:1;
    letter-spacing:8px;
    color:#ffffff;
  "
>
NISHA
</div>


<!-- GOLD LINE -->

<div
  style="
    width:45px;
    height:1px;
    background:#d7bd8d;
    margin:18px auto;
  "
>
</div>


<!-- TAGLINE -->

<div
  style="
    font-family:
      Arial,
      Helvetica,
      sans-serif;
    font-size:8px;
    line-height:1.6;
    letter-spacing:3px;
    color:#d7bd8d;
  "
>
PREMIUM &nbsp;•&nbsp; QUALITY &nbsp;•&nbsp; STYLE
</div>


</td>

</tr>


<!-- ========================================================
     WELCOME LABEL
     ======================================================== -->

<tr>

<td
  align="center"
  class="mobile-padding"
  style="
    padding:
      43px
      45px
      12px;
  "
>


<div
  style="
    font-family:
      Arial,
      Helvetica,
      sans-serif;
    font-size:9px;
    font-weight:bold;
    letter-spacing:4px;
    color:#b38a4a;
  "
>
WELCOME TO NISHA
</div>


<div
  class="welcome-title"
  style="
    margin-top:15px;
    font-family:
      Georgia,
      'Times New Roman',
      serif;
    font-size:35px;
    line-height:1.25;
    font-weight:normal;
    color:#181818;
  "
>
${safeName}
</div>


<div
  style="
    margin-top:11px;
    font-family:
      Georgia,
      'Times New Roman',
      serif;
    font-size:15px;
    font-style:italic;
    line-height:1.7;
    color:#817a70;
  "
>
Your NISHA account is ready.
</div>


</td>

</tr>


<!-- ========================================================
     DIVIDER
     ======================================================== -->

<tr>

<td
  align="center"
  style="
    padding:15px 40px 28px;
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
  style="
    height:1px;
    background:#e1d9ce;
    font-size:0;
  "
>
&nbsp;
</td>

<td
  width="35"
  align="center"
  style="
    color:#b38a4a;
    font-size:10px;
  "
>
◆
</td>

<td
  style="
    height:1px;
    background:#e1d9ce;
    font-size:0;
  "
>
&nbsp;
</td>

</tr>

</table>

</td>

</tr>


<!-- ========================================================
     MAIN MESSAGE
     ======================================================== -->

<tr>

<td
  class="mobile-padding"
  style="
    padding:
      0
      55px
      15px;
  "
>

<div
  style="
    font-family:
      Arial,
      Helvetica,
      sans-serif;
    font-size:14px;
    line-height:2;
    color:#57524b;
  "
>

Hello ${safeName},

<br><br>

Thank you for choosing
<strong style="color:#26231f;">
NISHA
</strong>.

Your account has been successfully created and is now ready
for your shopping experience.

<br><br>

Explore carefully selected products across fashion,
watches, beauty and lifestyle — brought together with a
focus on quality and timeless style.

</div>

</td>

</tr>


<!-- ========================================================
     HIGHLIGHT BOX
     ======================================================== -->

<tr>

<td
  class="mobile-padding"
  style="
    padding:
      15px
      40px
      32px;
  "
>

<table
  width="100%"
  cellpadding="0"
  cellspacing="0"
  border="0"
  style="
    background:#f7f3ec;
    border:1px solid #e0d5c5;
  "
>

<tr>

<td
  align="center"
  style="
    padding:28px 20px;
  "
>


<div
  style="
    font-family:
      Georgia,
      'Times New Roman',
      serif;
    font-size:22px;
    color:#b38a4a;
  "
>
N
</div>


<div
  style="
    margin-top:10px;
    font-family:
      Arial,
      Helvetica,
      sans-serif;
    font-size:9px;
    font-weight:bold;
    letter-spacing:3px;
    color:#292621;
  "
>
THE NISHA EXPERIENCE
</div>


<div
  style="
    width:36px;
    height:1px;
    background:#b38a4a;
    margin:14px auto;
  "
>
</div>


<div
  style="
    font-family:
      Georgia,
      'Times New Roman',
      serif;
    font-size:14px;
    font-style:italic;
    line-height:1.7;
    color:#777066;
  "
>
Timeless style.
<br>
Thoughtfully selected.
<br>
Made for your journey.
</div>


</td>

</tr>

</table>

</td>

</tr>


<!-- ========================================================
     BENEFITS
     ======================================================== -->

<tr>

<td
  class="mobile-padding"
  style="
    padding:
      0
      40px
      34px;
  "
>

<table
  width="100%"
  cellpadding="0"
  cellspacing="0"
  border="0"
  style="
    border:1px solid #ded6ca;
  "
>

<tr>


<!-- ITEM 1 -->

<td
  width="33.33%"
  align="center"
  valign="top"
  style="
    padding:23px 9px;
    border-right:1px solid #ded6ca;
  "
>

<div
  style="
    font-family:Georgia,serif;
    font-size:20px;
    color:#b38a4a;
  "
>
◆
</div>

<div
  style="
    margin-top:9px;
    font-family:Arial,Helvetica,sans-serif;
    font-size:8px;
    font-weight:bold;
    letter-spacing:1.5px;
    color:#302d28;
  "
>
QUALITY
</div>

<div
  style="
    margin-top:6px;
    font-family:Arial,Helvetica,sans-serif;
    font-size:8px;
    line-height:1.5;
    color:#898177;
  "
>
Carefully selected
</div>

</td>


<!-- ITEM 2 -->

<td
  width="33.33%"
  align="center"
  valign="top"
  style="
    padding:23px 9px;
    border-right:1px solid #ded6ca;
  "
>

<div
  style="
    font-family:Georgia,serif;
    font-size:20px;
    color:#b38a4a;
  "
>
N
</div>

<div
  style="
    margin-top:9px;
    font-family:Arial,Helvetica,sans-serif;
    font-size:8px;
    font-weight:bold;
    letter-spacing:1.5px;
    color:#302d28;
  "
>
NISHA
</div>

<div
  style="
    margin-top:6px;
    font-family:Arial,Helvetica,sans-serif;
    font-size:8px;
    line-height:1.5;
    color:#898177;
  "
>
Premium identity
</div>

</td>


<!-- ITEM 3 -->

<td
  width="33.33%"
  align="center"
  valign="top"
  style="
    padding:23px 9px;
  "
>

<div
  style="
    font-family:Georgia,serif;
    font-size:20px;
    color:#b38a4a;
  "
>
✦
</div>

<div
  style="
    margin-top:9px;
    font-family:Arial,Helvetica,sans-serif;
    font-size:8px;
    font-weight:bold;
    letter-spacing:1.5px;
    color:#302d28;
  "
>
STYLE
</div>

<div
  style="
    margin-top:6px;
    font-family:Arial,Helvetica,sans-serif;
    font-size:8px;
    line-height:1.5;
    color:#898177;
  "
>
Timeless elegance
</div>

</td>


</tr>

</table>

</td>

</tr>


<!-- ========================================================
     CTA
     ======================================================== -->

<tr>

<td
  align="center"
  style="
    padding:
      5px
      25px
      42px;
  "
>

<a
  href="${websiteURL}"
  class="button"
  style="
    display:inline-block;
    background:#151515;
    border:1px solid #b38a4a;
    color:#ffffff;
    font-family:
      Arial,
      Helvetica,
      sans-serif;
    font-size:10px;
    font-weight:bold;
    letter-spacing:3px;
    padding:17px 38px;
    text-decoration:none;
  "
>
EXPLORE NISHA
</a>

</td>

</tr>


<!-- ========================================================
     FOUNDER SECTION
     ======================================================== -->

<tr>

<td
  class="mobile-padding"
  style="
    padding:
      0
      40px
      36px;
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
    padding:
      30px
      20px
      28px;
  "
>


<!-- FOUNDER PHOTO -->

<img
  class="founder-photo"
  src="${FOUNDER_PHOTO_URL}"
  width="78"
  height="78"
  alt="Manas Kumar Prajapati"
  style="
    display:block;
    width:78px;
    height:78px;
    border-radius:50%;
    object-fit:cover;
    border:2px solid #d7bd8d;
    margin:0 auto;
  "
>


<div
  style="
    margin-top:18px;
    font-family:
      Arial,
      Helvetica,
      sans-serif;
    font-size:8px;
    font-weight:bold;
    letter-spacing:3px;
    color:#d7bd8d;
  "
>
THE HOUSE OF NISHA
</div>


<div
  style="
    width:38px;
    height:1px;
    background:#b38a4a;
    margin:14px auto 16px;
  "
>
</div>


<div
  style="
    font-family:
      Georgia,
      'Times New Roman',
      serif;
    font-size:11px;
    color:#aaa49a;
    letter-spacing:1.5px;
  "
>
FOUNDED BY
</div>


<div
  style="
    margin-top:7px;
    font-family:
      Georgia,
      'Times New Roman',
      serif;
    font-size:23px;
    line-height:1.4;
    color:#ffffff;
  "
>
Manas Kumar Prajapati
</div>


<div
  style="
    margin-top:7px;
    font-family:
      Georgia,
      'Times New Roman',
      serif;
    font-size:11px;
    font-style:italic;
    color:#c7c0b5;
  "
>
Founder &nbsp;•&nbsp; NISHA
</div>


</td>

</tr>

</table>

</td>

</tr>


<!-- ========================================================
     FOUNDER MESSAGE
     ======================================================== -->

<tr>

<td
  align="center"
  class="mobile-padding"
  style="
    padding:
      5px
      48px
      35px;
  "
>

<div
  style="
    font-family:
      Georgia,
      'Times New Roman',
      serif;
    font-size:17px;
    font-style:italic;
    line-height:1.8;
    color:#4f4a43;
  "
>
“Style is timeless.
Quality is remembered.”
</div>


<div
  style="
    margin-top:12px;
    font-family:
      Arial,
      Helvetica,
      sans-serif;
    font-size:8px;
    font-weight:bold;
    letter-spacing:3px;
    color:#b38a4a;
  "
>
NISHA
</div>

</td>

</tr>


<!-- ========================================================
     CLOSING MESSAGE
     ======================================================== -->

<tr>

<td
  align="center"
  style="
    border-top:1px solid #e0d9cf;
    padding:
      30px
      25px
      32px;
  "
>

<div
  style="
    font-family:
      Georgia,
      'Times New Roman',
      serif;
    font-size:15px;
    color:#4f4a43;
  "
>
Thank you for choosing NISHA.
</div>


<div
  style="
    margin-top:10px;
    font-family:
      Arial,
      Helvetica,
      sans-serif;
    font-size:8px;
    letter-spacing:2px;
    color:#9b9489;
  "
>
PREMIUM &nbsp;•&nbsp; QUALITY &nbsp;•&nbsp; STYLE
</div>

</td>

</tr>


<!-- ========================================================
     FOOTER
     ======================================================== -->

<tr>

<td
  align="center"
  style="
    background:#151515;
    padding:
      27px
      20px
      29px;
  "
>


<div
  style="
    font-family:
      Georgia,
      'Times New Roman',
      serif;
    font-size:21px;
    letter-spacing:6px;
    color:#d7bd8d;
  "
>
NISHA
</div>


<div
  style="
    margin-top:11px;
    font-family:
      Arial,
      Helvetica,
      sans-serif;
    font-size:9px;
    line-height:1.7;
    color:#777777;
  "
>
© ${year} NISHA. All rights reserved.
</div>


<div
  class="footer-text"
  style="
    margin-top:5px;
    font-family:
      Arial,
      Helvetica,
      sans-serif;
    font-size:9px;
    color:#666666;
  "
>
Founded by Manas Kumar Prajapati
</div>


<div
  style="
    margin-top:13px;
    font-family:
      Arial,
      Helvetica,
      sans-serif;
    font-size:8px;
    line-height:1.6;
    color:#555555;
  "
>
This is an automated service email from NISHA.
</div>


</td>

</tr>


<!-- ========================================================
     BOTTOM GOLD LINE
     ======================================================== -->

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

<!-- END MAIN CONTAINER -->


</td>

</tr>

</table>

<!-- END OUTER -->


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
    // GET FIREBASE USER
    // --------------------------------------------------------

    const user =
      await auth.getUser(
        decodedToken.uid
      );


    const userEmail =
      user.email;


    // --------------------------------------------------------
    // EMAIL REQUIRED
    // --------------------------------------------------------

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
    // PLAIN TEXT VERSION
    // --------------------------------------------------------

    const plainText = `
Welcome to NISHA, ${displayName}!

Thank you for choosing NISHA.

Your NISHA account has been successfully created
and is now ready for your shopping experience.

Discover carefully selected products across
fashion, watches, beauty and lifestyle.

Explore NISHA:
${process.env.NISHA_WEBSITE_URL || ""}

THE HOUSE OF NISHA

Founded by Manas Kumar Prajapati
Founder • NISHA

"Style is timeless. Quality is remembered."

Thank you for choosing NISHA.

© ${new Date().getFullYear()} NISHA.
All rights reserved.

This is an automated service email from NISHA.
`.trim();


    // --------------------------------------------------------
    // SEND EMAIL
    // --------------------------------------------------------

    const info =
      await transporter.sendMail({

        from:
          `"NISHA" <${process.env.SMTP_EMAIL}>`,

        to: {
          name: displayName,
          address: userEmail
        },

        replyTo:
          process.env.SMTP_EMAIL,

        envelope: {
          from: process.env.SMTP_EMAIL,
          to: userEmail
        },

        subject:
          `Welcome to NISHA, ${displayName}!`,

        html:
          createWelcomeEmail(
            displayName
          ),

        text:
          plainText,

        date:
          new Date(),

        headers: {
          "Auto-Submitted":
            "auto-generated"
        }

      });


    // --------------------------------------------------------
    // LOG
    // --------------------------------------------------------

    console.log(
      "NISHA WELCOME EMAIL SENT:",
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
        "Failed to send welcome email",

      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : undefined

    });

  }

}
