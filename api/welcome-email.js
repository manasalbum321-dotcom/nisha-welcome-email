import nodemailer from "nodemailer";
import admin from "firebase-admin";

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

  // Fashion / shopping image
  const heroImage =
    "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1400&q=85";

  // Luxury shopping store image
  const shoppingImage =
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=85";

  // Fashion accessories image
  const accessoryImage =
    "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=85";

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

<title>Welcome to NISHA</title>

<style>

  body {
    margin: 0 !important;
    padding: 0 !important;
    width: 100% !important;
    background: #ebe6dd;
  }

  table {
    border-collapse: collapse;
  }

  img {
    border: 0;
    display: block;
    max-width: 100%;
  }

  a {
    text-decoration: none;
  }

  @media only screen and (max-width: 640px) {

    .outer-padding {
      padding: 20px 8px !important;
    }

    .main-container {
      width: 100% !important;
    }

    .hero-padding {
      padding: 70px 24px !important;
    }

    .hero-title {
      font-size: 39px !important;
    }

    .content-padding {
      padding-left: 25px !important;
      padding-right: 25px !important;
    }

    .welcome-title {
      font-size: 29px !important;
    }

    .feature-padding {
      padding: 25px 20px !important;
    }

    .mobile-image {
      height: 180px !important;
    }

  }

</style>

</head>


<body>

<!-- ======================================================== -->
<!-- OUTER BACKGROUND -->
<!-- ======================================================== -->

<table
  width="100%"
  cellpadding="0"
  cellspacing="0"
  border="0"
  style="
    background:#ebe6dd;
    padding:42px 12px;
  "
>

<tr>

<td align="center">


<!-- ======================================================== -->
<!-- MAIN CONTAINER -->
<!-- ======================================================== -->

<table
  class="main-container"
  width="620"
  cellpadding="0"
  cellspacing="0"
  border="0"
  style="
    width:100%;
    max-width:620px;
    background:#fbfaf7;
    border:1px solid #d8cdbb;
    box-shadow:0 12px 35px rgba(0,0,0,.08);
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
</td>

</tr>


<!-- ======================================================== -->
<!-- HERO / BRAND HEADER -->
<!-- ======================================================== -->

<tr>

<td
  class="hero-padding"
  align="center"
  valign="middle"
  style="
    background-color:#151515;

    background-image:
      linear-gradient(
        rgba(10,10,10,.66),
        rgba(10,10,10,.82)
      ),
      url('${heroImage}');

    background-size:cover;
    background-position:center;

    padding:82px 35px 76px;
  "
>


<!-- N MONOGRAM -->

<div
  style="
    font-family:Georgia,'Times New Roman',serif;
    font-size:61px;
    line-height:1;
    font-weight:bold;
    letter-spacing:3px;
    color:#d7bd8d;
  "
>
N
</div>


<!-- SMALL GOLD LINE -->

<div
  style="
    width:46px;
    height:1px;
    background:#d7bd8d;
    margin:18px auto 20px;
  "
>
</div>


<!-- BRAND -->

<div
  style="
    font-family:Georgia,'Times New Roman',serif;
    font-size:34px;
    line-height:1;
    font-weight:normal;
    letter-spacing:11px;
    color:#ffffff;
  "
>
NISHA
</div>


<!-- TAGLINE -->

<div
  style="
    margin-top:18px;
    font-family:Arial,Helvetica,sans-serif;
    font-size:9px;
    line-height:1.5;
    letter-spacing:4px;
    color:#d7bd8d;
  "
>
PREMIUM &nbsp;•&nbsp; QUALITY &nbsp;•&nbsp; STYLE
</div>


<!-- HERO CAPTION -->

<div
  style="
    margin-top:30px;
    font-family:Georgia,'Times New Roman',serif;
    font-size:16px;
    font-style:italic;
    line-height:1.7;
    color:#eeeeee;
  "
>
Where timeless style meets modern elegance.
</div>


</td>

</tr>


<!-- ======================================================== -->
<!-- GOLD ORNAMENT -->
<!-- ======================================================== -->

<tr>

<td
  align="center"
  style="
    padding:28px 20px 3px;
  "
>

<table
  width="110"
  cellpadding="0"
  cellspacing="0"
  border="0"
>

<tr>

<td
  style="
    height:1px;
    background:#b38a4a;
    font-size:0;
  "
>
</td>

<td
  width="24"
  align="center"
  style="
    color:#b38a4a;
    font-size:13px;
  "
>
◆
</td>

<td
  style="
    height:1px;
    background:#b38a4a;
    font-size:0;
  "
>
</td>

</tr>

</table>

</td>

</tr>


<!-- ======================================================== -->
<!-- WELCOME -->
<!-- ======================================================== -->

<tr>

<td
  class="content-padding"
  align="center"
  style="
    padding:31px 50px 15px;
  "
>

<div
  style="
    font-family:Arial,Helvetica,sans-serif;
    font-size:9px;
    font-weight:bold;
    letter-spacing:4px;
    color:#a17b43;
    text-transform:uppercase;
  "
>
WELCOME TO NISHA
</div>


<div
  class="welcome-title"
  style="
    margin-top:16px;
    font-family:Georgia,'Times New Roman',serif;
    font-size:35px;
    line-height:1.25;
    font-weight:normal;
    color:#171717;
  "
>
${safeName}
</div>


<div
  style="
    margin-top:10px;
    font-family:Georgia,'Times New Roman',serif;
    font-size:16px;
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
  class="content-padding"
  align="center"
  style="
    padding:12px 58px 32px;
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
Your account has been successfully accessed.
</p>


<p
  style="
    margin:16px 0 0;
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
<!-- SHOPPING IMAGE -->
<!-- ======================================================== -->

<tr>

<td
  class="content-padding"
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
    background:#171717;
    border:1px solid #d0c3af;
  "
>

<tr>

<td
  valign="middle"
  style="
    background-color:#171717;

    background-image:
      linear-gradient(
        rgba(15,15,15,.52),
        rgba(15,15,15,.70)
      ),
      url('${shoppingImage}');

    background-size:cover;
    background-position:center;

    padding:45px 25px;
  "
>


<div
  style="
    font-family:Arial,Helvetica,sans-serif;
    font-size:9px;
    letter-spacing:4px;
    color:#d7bd8d;
    font-weight:bold;
  "
>
THE NISHA EDIT
</div>


<div
  style="
    margin-top:12px;
    font-family:Georgia,'Times New Roman',serif;
    font-size:26px;
    line-height:1.3;
    color:#ffffff;
  "
>
Curated for<br>
your personal style.
</div>


<div
  style="
    margin-top:15px;
    width:38px;
    height:1px;
    background:#d7bd8d;
  "
>
</div>


<div
  style="
    margin-top:15px;
    font-family:Arial,Helvetica,sans-serif;
    font-size:11px;
    line-height:1.7;
    color:#e4e4e4;
  "
>
Discover fashion, beauty, watches and lifestyle
pieces selected with a timeless eye.
</div>


</td>

</tr>

</table>

</td>

</tr>


<!-- ======================================================== -->
<!-- FEATURES -->
<!-- ======================================================== -->

<tr>

<td
  class="content-padding"
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
    border:1px solid #ded4c5;
    background:#f5f1e9;
  "
>

<tr>

<td
  width="33%"
  align="center"
  valign="top"
  style="
    padding:24px 10px;
    border-right:1px solid #ddd3c4;
  "
>

<div
  style="
    font-family:Georgia,'Times New Roman',serif;
    font-size:22px;
    color:#b38a4a;
  "
>
◆
</div>

<div
  style="
    margin-top:10px;
    font-family:Arial,Helvetica,sans-serif;
    font-size:8px;
    font-weight:bold;
    letter-spacing:1.5px;
    color:#3e3a35;
  "
>
CURATED
</div>

<div
  style="
    margin-top:6px;
    font-size:9px;
    color:#888074;
    line-height:1.5;
  "
>
Thoughtfully selected
</div>

</td>


<td
  width="33%"
  align="center"
  valign="top"
  style="
    padding:24px 10px;
    border-right:1px solid #ddd3c4;
  "
>

<div
  style="
    font-family:Georgia,'Times New Roman',serif;
    font-size:22px;
    color:#b38a4a;
  "
>
N
</div>

<div
  style="
    margin-top:10px;
    font-family:Arial,Helvetica,sans-serif;
    font-size:8px;
    font-weight:bold;
    letter-spacing:1.5px;
    color:#3e3a35;
  "
>
NISHA
</div>

<div
  style="
    margin-top:6px;
    font-size:9px;
    color:#888074;
    line-height:1.5;
  "
>
Premium identity
</div>

</td>


<td
  width="33%"
  align="center"
  valign="top"
  style="
    padding:24px 10px;
  "
>

<div
  style="
    font-family:Georgia,'Times New Roman',serif;
    font-size:22px;
    color:#b38a4a;
  "
>
✦
</div>

<div
  style="
    margin-top:10px;
    font-family:Arial,Helvetica,sans-serif;
    font-size:8px;
    font-weight:bold;
    letter-spacing:1.5px;
    color:#3e3a35;
  "
>
STYLE
</div>

<div
  style="
    margin-top:6px;
    font-size:9px;
    color:#888074;
    line-height:1.5;
  "
>
Timeless elegance
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
    padding:5px 20px 43px;
  "
>

<a
  href="${websiteURL}"
  style="
    display:inline-block;
    background:#171717;
    border:1px solid #b38a4a;
    color:#ffffff;
    text-decoration:none;
    font-family:Arial,Helvetica,sans-serif;
    font-size:10px;
    font-weight:bold;
    letter-spacing:3px;
    text-transform:uppercase;
    padding:17px 38px;
  "
>
EXPLORE NISHA
</a>

</td>

</tr>


<!-- ======================================================== -->
<!-- FOUNDER / HOUSE OF NISHA -->
<!-- ======================================================== -->

<tr>

<td
  class="content-padding"
  style="
    padding:0 35px 35px;
  "
>

<table
  width="100%"
  cellpadding="0"
  cellspacing="0"
  border="0"
  style="
    border:1px solid #b38a4a;
    background:#171717;
  "
>

<tr>

<td
  align="center"
  valign="middle"
  style="
    background-color:#171717;

    background-image:
      linear-gradient(
        rgba(15,15,15,.86),
        rgba(15,15,15,.91)
      ),
      url('${accessoryImage}');

    background-size:cover;
    background-position:center;

    padding:39px 25px 37px;
  "
>


<div
  style="
    font-family:Arial,Helvetica,sans-serif;
    font-size:9px;
    letter-spacing:4px;
    font-weight:bold;
    color:#d7bd8d;
  "
>
THE HOUSE OF NISHA
</div>


<div
  style="
    width:40px;
    height:1px;
    background:#b38a4a;
    margin:16px auto 19px;
  "
>
</div>


<div
  style="
    font-family:Georgia,'Times New Roman',serif;
    font-size:12px;
    letter-spacing:2px;
    text-transform:uppercase;
    color:#aaa49a;
  "
>
Founded by
</div>


<div
  style="
    margin-top:9px;
    font-family:Georgia,'Times New Roman',serif;
    font-size:25px;
    line-height:1.4;
    color:#ffffff;
  "
>
Manas Kumar Prajapati
</div>


<div
  style="
    margin-top:9px;
    font-family:Georgia,'Times New Roman',serif;
    font-size:12px;
    font-style:italic;
    color:#c9c1b5;
  "
>
Founder &nbsp;•&nbsp; NISHA
</div>


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
    padding:5px 40px 38px;
  "
>

<p
  style="
    margin:0;
    font-family:Georgia,'Times New Roman',serif;
    font-size:17px;
    font-style:italic;
    line-height:1.8;
    color:#4d4942;
  "
>
"Style is timeless. Quality is remembered."
</p>


<div
  style="
    margin-top:16px;
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
<!-- DIVIDER -->
<!-- ======================================================== -->

<tr>

<td
  style="
    padding:0 35px;
  "
>

<div
  style="
    height:1px;
    background:#ddd5c8;
  "
>
</div>

</td>

</tr>


<!-- ======================================================== -->
<!-- CLOSING -->
<!-- ======================================================== -->

<tr>

<td
  align="center"
  style="
    padding:29px 25px 31px;
  "
>

<div
  style="
    font-family:Georgia,'Times New Roman',serif;
    font-size:14px;
    color:#555149;
  "
>
Thank you for choosing NISHA.
</div>


<div
  style="
    margin-top:10px;
    font-family:Arial,Helvetica,sans-serif;
    font-size:9px;
    letter-spacing:2px;
    color:#999287;
  "
>
PREMIUM &nbsp;•&nbsp; QUALITY &nbsp;•&nbsp; STYLE
</div>

</td>

</tr>


<!-- ======================================================== -->
<!-- BLACK FOOTER -->
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
    font-size:20px;
    letter-spacing:6px;
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
    letter-spacing:1.5px;
    color:#777777;
  "
>
© ${year} NISHA. All rights reserved.
</div>


<div
  style="
    margin-top:7px;
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
      await auth.getUser(
        decodedToken.uid
      );


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
      "Sending NISHA professional welcome email:",
      {
        uid: user.uid,
        email: userEmail,
        displayName
      }
    );


    // --------------------------------------------------------
    // SEND EMAIL
    // --------------------------------------------------------

    const info =
      await transporter.sendMail({

        from:
          `"NISHA" <${process.env.SMTP_EMAIL}>`,

        to:
          userEmail,

        subject:
          `Welcome to NISHA, ${displayName}!`,

        html:
          createWelcomeEmail(
            displayName
          ),

        text:
`Welcome to NISHA, ${displayName}!

Your NISHA account has been successfully accessed.

Discover a carefully curated shopping experience where quality,
timeless style and elegance come together.

Explore NISHA:
${process.env.NISHA_WEBSITE_URL}

THE HOUSE OF NISHA

Founded by Manas Kumar Prajapati
Founder • NISHA

"Style is timeless. Quality is remembered."

Thank you for choosing NISHA.

© ${new Date().getFullYear()} NISHA. All rights reserved.`
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
        "NISHA professional welcome email sent successfully",

      messageId:
        info.messageId

    });

  }


  // ----------------------------------------------------------
  // ERROR
  // ----------------------------------------------------------

  catch (error) {

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
