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

  // ==========================================================
  // REAL IMAGE URLS
  // IMPORTANT:
  // These are plain URLs, NOT Markdown links.
  // ==========================================================

  const heroImage =
    "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1400&q=85";

  const shoppingImage =
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=85";

  const accessoryImage =
    "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=85";

  const watchImage =
    "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=900&q=85";

  const beautyImage =
    "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=900&q=85";

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
    margin: 0 !important;
    padding: 0 !important;
    width: 100% !important;
    background: #ebe6dd;
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

    .hero-image {
      height: 260px !important;
      object-fit: cover !important;
    }

    .hero-brand {
      padding: 35px 20px 38px !important;
    }

    .hero-title {
      font-size: 30px !important;
      letter-spacing: 7px !important;
    }

    .content-padding {
      padding-left: 22px !important;
      padding-right: 22px !important;
    }

    .welcome-title {
      font-size: 29px !important;
    }

    .shopping-image {
      height: 210px !important;
      object-fit: cover !important;
    }

    .feature-table {
      width: 100% !important;
    }

    .feature-cell {
      display: block !important;
      width: 100% !important;
      border-right: 0 !important;
      border-bottom: 1px solid #ddd3c4 !important;
    }

    .feature-cell-last {
      border-bottom: 0 !important;
    }

    .founder-image {
      height: 210px !important;
      object-fit: cover !important;
    }

    .mobile-product {
      display: block !important;
      width: 100% !important;
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
    width:100%;
    background:#ebe6dd;
  "
>

<tr>

<td
  align="center"
  style="
    padding:42px 12px;
  "
>

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
<!-- HERO IMAGE -->
<!-- ======================================================== -->

<tr>

<td
  align="center"
  style="
    padding:0;
    margin:0;
    background:#151515;
  "
>

<img
  class="hero-image"
  src="${heroImage}"
  width="620"
  height="300"
  alt="NISHA Fashion Collection"
  style="
    display:block;
    width:100%;
    max-width:620px;
    height:300px;
    object-fit:cover;
    border:0;
  "
>

</td>

</tr>


<!-- ======================================================== -->
<!-- BRAND HEADER -->
<!-- ======================================================== -->

<tr>

<td
  class="hero-brand"
  align="center"
  style="
    background:#151515;
    padding:45px 25px 48px;
  "
>

<!-- N MONOGRAM -->

<div
  style="
    font-family:Georgia,'Times New Roman',serif;
    font-size:58px;
    line-height:1;
    font-weight:bold;
    letter-spacing:3px;
    color:#d7bd8d;
  "
>
N
</div>


<!-- GOLD LINE -->

<div
  style="
    width:46px;
    height:1px;
    background:#d7bd8d;
    margin:17px auto 20px;
  "
>
</div>


<!-- BRAND -->

<div
  class="hero-title"
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
    margin-top:27px;
    font-family:Georgia,'Times New Roman',serif;
    font-size:15px;
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
&nbsp;
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
&nbsp;
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
  style="
    padding:0;
    background:#171717;
  "
>

<img
  class="shopping-image"
  src="${shoppingImage}"
  width="548"
  height="250"
  alt="NISHA Luxury Shopping"
  style="
    display:block;
    width:100%;
    max-width:548px;
    height:250px;
    object-fit:cover;
  "
>

</td>

</tr>


<tr>

<td
  align="center"
  style="
    background:#171717;
    padding:30px 25px 34px;
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
    margin:15px auto 0;
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
<!-- SHOPPING COLLECTION -->
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
>

<tr>

<td
  align="center"
  style="
    padding-bottom:20px;
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
DISCOVER
</div>

<div
  style="
    margin-top:9px;
    font-family:Georgia,'Times New Roman',serif;
    font-size:25px;
    color:#171717;
  "
>
The NISHA Collection
</div>

</td>

</tr>

</table>


<!-- TWO PRODUCT IMAGES -->

<table
  width="100%"
  cellpadding="0"
  cellspacing="0"
  border="0"
>

<tr>

<td
  width="50%"
  valign="top"
  style="
    padding-right:6px;
  "
>

<img
  src="${accessoryImage}"
  width="265"
  height="220"
  alt="NISHA Fashion"
  style="
    display:block;
    width:100%;
    height:220px;
    object-fit:cover;
  "
>

<div
  style="
    padding:12px 5px 4px;
    text-align:center;
  "
>

<div
  style="
    font-family:Georgia,'Times New Roman',serif;
    font-size:16px;
    color:#292722;
  "
>
Fashion
</div>

<div
  style="
    margin-top:5px;
    font-family:Arial,Helvetica,sans-serif;
    font-size:8px;
    letter-spacing:2px;
    color:#9a9185;
  "
>
TIMELESS STYLE
</div>

</div>

</td>


<td
  width="50%"
  valign="top"
  style="
    padding-left:6px;
  "
>

<img
  src="${watchImage}"
  width="265"
  height="220"
  alt="NISHA Watches"
  style="
    display:block;
    width:100%;
    height:220px;
    object-fit:cover;
  "
>

<div
  style="
    padding:12px 5px 4px;
    text-align:center;
  "
>

<div
  style="
    font-family:Georgia,'Times New Roman',serif;
    font-size:16px;
    color:#292722;
  "
>
Watches
</div>

<div
  style="
    margin-top:5px;
    font-family:Arial,Helvetica,sans-serif;
    font-size:8px;
    letter-spacing:2px;
    color:#9a9185;
  "
>
CLASSIC DETAILS
</div>

</div>

</td>

</tr>

</table>


<!-- BEAUTY IMAGE -->

<table
  width="100%"
  cellpadding="0"
  cellspacing="0"
  border="0"
  style="
    margin-top:20px;
  "
>

<tr>

<td>

<img
  src="${beautyImage}"
  width="548"
  height="230"
  alt="NISHA Beauty"
  style="
    display:block;
    width:100%;
    height:230px;
    object-fit:cover;
  "
>

</td>

</tr>

<tr>

<td
  align="center"
  style="
    padding:13px 10px 3px;
  "
>

<div
  style="
    font-family:Georgia,'Times New Roman',serif;
    font-size:16px;
    color:#292722;
  "
>
Beauty & Lifestyle
</div>

<div
  style="
    margin-top:5px;
    font-family:Arial,Helvetica,sans-serif;
    font-size:8px;
    letter-spacing:2px;
    color:#9a9185;
  "
>
MODERN ELEGANCE
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
  class="feature-table"
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
  class="feature-cell"
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
  class="feature-cell"
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
  class="feature-cell feature-cell-last"
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
<!-- FOUNDER IMAGE -->
<!-- ======================================================== -->

<tr>

<td
  class="content-padding"
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
    border:1px solid #b38a4a;
    background:#171717;
  "
>

<tr>

<td>

<img
  class="founder-image"
  src="${accessoryImage}"
  width="548"
  height="220"
  alt="The House of NISHA"
  style="
    display:block;
    width:100%;
    height:220px;
    object-fit:cover;
  "
>

</td>

</tr>


<tr>

<td
  align="center"
  style="
    background:#171717;
    padding:35px 25px 38px;
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
    padding:38px 40px;
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
${process.env.NISHA_WEBSITE_URL || ""}

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
