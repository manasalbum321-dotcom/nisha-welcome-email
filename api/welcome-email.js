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

const transporter =
  nodemailer.createTransport({

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
// CLASSIC LUXURY WELCOME EMAIL
// ============================================================

function createWelcomeEmail(name) {

  const safeName =
    escapeHtml(
      name || "NISHA Customer"
    );

  const websiteURL =
    escapeHtml(
      process.env.NISHA_WEBSITE_URL || "#"
    );

  const year =
    new Date().getFullYear();


  return `

<!DOCTYPE html>

<html lang="en">

<head>

<meta charset="UTF-8">

<meta name="viewport"
content="width=device-width, initial-scale=1.0">

<title>Welcome to NISHA</title>

</head>


<body style="
margin:0;
padding:0;
background:#eee9df;
font-family:Arial,Helvetica,sans-serif;
color:#171717;
">


<!-- OUTER BACKGROUND -->

<table
width="100%"
cellpadding="0"
cellspacing="0"
border="0"
style="
background:#eee9df;
padding:45px 15px;
"
>

<tr>

<td align="center">


<!-- MAIN EMAIL -->

<table
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


<!-- ===================================================== -->
<!-- TOP GOLD LINE -->
<!-- ===================================================== -->

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


<!-- ===================================================== -->
<!-- BRAND HEADER -->
<!-- ===================================================== -->

<tr>

<td
align="center"
style="
background:#141414;
padding:42px 25px 38px;
"
>


<!-- N MONOGRAM -->

<div style="
font-family:Georgia,'Times New Roman',serif;
font-size:52px;
line-height:1;
font-weight:bold;
letter-spacing:2px;
color:#d7bd8d;
">

N

</div>


<!-- BRAND NAME -->

<div style="
margin-top:13px;
font-family:Georgia,'Times New Roman',serif;
font-size:31px;
line-height:1;
font-weight:normal;
letter-spacing:9px;
color:#ffffff;
">

NISHA

</div>


<!-- BRAND TAGLINE -->

<div style="
margin-top:17px;
font-family:Arial,Helvetica,sans-serif;
font-size:9px;
line-height:1.5;
letter-spacing:4px;
color:#cdb58b;
">

PREMIUM &nbsp;•&nbsp; QUALITY &nbsp;•&nbsp; STYLE

</div>


</td>

</tr>


<!-- ===================================================== -->
<!-- GOLD DETAIL -->
<!-- ===================================================== -->

<tr>

<td align="center" style="
padding:25px 20px 0;
">

<table
width="90"
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
width="18"
style="
text-align:center;
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


<!-- ===================================================== -->
<!-- WELCOME CONTENT -->
<!-- ===================================================== -->

<tr>

<td
align="center"
style="
padding:32px 48px 15px;
"
>


<div style="
font-family:Arial,Helvetica,sans-serif;
font-size:10px;
font-weight:bold;
letter-spacing:4px;
color:#a17b43;
text-transform:uppercase;
">

WELCOME BACK

</div>


<h1 style="
margin:18px 0 8px;
font-family:Georgia,'Times New Roman',serif;
font-size:37px;
line-height:1.25;
font-weight:normal;
letter-spacing:.5px;
color:#171717;
">

${safeName}

</h1>


<p style="
margin:0;
font-family:Georgia,'Times New Roman',serif;
font-size:17px;
font-style:italic;
color:#777064;
line-height:1.7;
">

Welcome to the world of NISHA.

</p>


</td>

</tr>


<!-- ===================================================== -->
<!-- MAIN MESSAGE -->
<!-- ===================================================== -->

<tr>

<td
align="center"
style="
padding:15px 55px 32px;
"
>


<p style="
margin:0;
font-size:14px;
line-height:2;
color:#5f5b54;
">

We're delighted to welcome you back.
Your NISHA account has been successfully accessed.

</p>


<p style="
margin:16px 0 0;
font-size:14px;
line-height:2;
color:#5f5b54;
">

Discover a carefully curated experience
where <strong style="color:#302d29;">quality</strong>,
<strong style="color:#302d29;">timeless style</strong>
and <strong style="color:#302d29;">elegance</strong>
come together.

</p>


</td>

</tr>


<!-- ===================================================== -->
<!-- BUTTON -->
<!-- ===================================================== -->

<tr>

<td align="center" style="
padding:0 20px 42px;
">


<a
href="${websiteURL}"
style="
display:inline-block;
background:#171717;
border:1px solid #171717;
color:#ffffff;
text-decoration:none;
font-family:Arial,Helvetica,sans-serif;
font-size:10px;
font-weight:bold;
letter-spacing:3px;
text-transform:uppercase;
padding:17px 36px;
"
>

EXPLORE NISHA

</a>


</td>

</tr>


<!-- ===================================================== -->
<!-- FOUNDER SECTION -->
<!-- ===================================================== -->

<tr>

<td style="
padding:0 35px;
">


<table
width="100%"
cellpadding="0"
cellspacing="0"
border="0"
style="
background:#f1ede5;
border:1px solid #ded4c5;
"
>

<tr>

<td
align="center"
style="
padding:30px 25px 27px;
"
>


<div style="
font-size:9px;
letter-spacing:4px;
color:#a17b43;
font-weight:bold;
text-transform:uppercase;
">

THE HOUSE OF NISHA

</div>


<div style="
width:35px;
height:1px;
background:#b38a4a;
margin:15px auto 18px;
">
</div>


<div style="
font-family:Georgia,'Times New Roman',serif;
font-size:13px;
letter-spacing:2px;
color:#777064;
text-transform:uppercase;
">

Founded by

</div>


<div style="
margin-top:8px;
font-family:Georgia,'Times New Roman',serif;
font-size:24px;
line-height:1.4;
color:#171717;
">

Manas Kumar Prajapati

</div>


<div style="
margin-top:8px;
font-family:Georgia,'Times New Roman',serif;
font-size:12px;
font-style:italic;
color:#8b8479;
">

Founder &nbsp;•&nbsp; NISHA

</div>


</td>

</tr>

</table>

</td>

</tr>


<!-- ===================================================== -->
<!-- CLOSING MESSAGE -->
<!-- ===================================================== -->

<tr>

<td
align="center"
style="
padding:35px 45px 38px;
"
>


<p style="
margin:0;
font-family:Georgia,'Times New Roman',serif;
font-size:17px;
font-style:italic;
line-height:1.8;
color:#4d4942;
">

"Style is timeless. Quality is remembered."

</p>


<div style="
margin-top:18px;
font-size:9px;
letter-spacing:3px;
color:#a17b43;
">

NISHA

</div>


</td>

</tr>


<!-- ===================================================== -->
<!-- DIVIDER -->
<!-- ===================================================== -->

<tr>

<td style="
padding:0 35px;
">

<div style="
height:1px;
background:#ddd5c8;
">
</div>

</td>

</tr>


<!-- ===================================================== -->
<!-- FOOTER -->
<!-- ===================================================== -->

<tr>

<td
align="center"
style="
padding:27px 25px 30px;
"
>


<p style="
margin:0 0 8px;
font-family:Georgia,'Times New Roman',serif;
font-size:13px;
color:#555149;
">

Thank you for choosing NISHA.

</p>


<p style="
margin:0;
font-size:10px;
letter-spacing:1px;
color:#999287;
">

PREMIUM &nbsp;•&nbsp; QUALITY &nbsp;•&nbsp; STYLE

</p>


</td>

</tr>


<!-- ===================================================== -->
<!-- BOTTOM BLACK FOOTER -->
<!-- ===================================================== -->

<tr>

<td
align="center"
style="
background:#141414;
padding:20px 15px;
"
>


<div style="
font-family:Georgia,'Times New Roman',serif;
font-size:18px;
letter-spacing:5px;
color:#d7bd8d;
">

NISHA

</div>


<div style="
margin-top:9px;
font-size:9px;
letter-spacing:1.5px;
color:#777777;
">

© ${year} NISHA. All rights reserved.

</div>


<div style="
margin-top:6px;
font-size:9px;
color:#666666;
">

Founded by Manas Kumar Prajapati

</div>


</td>

</tr>


<!-- BOTTOM GOLD LINE -->

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

<!-- END MAIN EMAIL -->


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
      await auth.verifyIdToken(
        idToken
      );


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
      "Sending NISHA luxury email:",
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
          `Welcome back to NISHA, ${displayName}!`,

        html:
          createWelcomeEmail(
            displayName
          ),

        text:
`Welcome back to NISHA, ${displayName}!

We're delighted to welcome you back.

Your NISHA account has been successfully accessed.

Discover a carefully curated experience where quality,
timeless style and elegance come together.

Explore NISHA:
${process.env.NISHA_WEBSITE_URL}

THE HOUSE OF NISHA

Founded by Manas Kumar Prajapati
Founder • NISHA

Thank you for choosing NISHA.

© ${new Date().getFullYear()} NISHA. All rights reserved.`

      });


    // --------------------------------------------------------
    // LOG
    // --------------------------------------------------------

    console.log(
      "NISHA LUXURY EMAIL SENT:",
      info.messageId
    );


    // --------------------------------------------------------
    // SUCCESS
    // --------------------------------------------------------

    return res.status(200).json({

      success: true,

      message:
        "NISHA luxury email sent successfully",

      messageId:
        info.messageId

    });

  }


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
