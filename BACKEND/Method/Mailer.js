const {transporter} = require('../Config/email')

exports.mail = async (type, email, extra) => {
  let html = ""
  let subject = ""

  if (type == "verification") {
    subject = "CrowdTix   Verification mail"
    html = `<html>Click <a href="http://localhost:5000/verifyToken/${extra.token}" target="_blank">here</a>
    to verify your mailId.
    </html>`
  }
//   if(type=="forgot password"){
//     subject = "Placexp  Forgot Password"
//     html = `<html>Click <a href="http://localhost:5000/forgotpwd/verifyToken/${extra.token}" target="_blank">here</a>
//     to reset your password.
//     </html>`
//   }
//   if(type=="contact"){
//     subject="Placexp Contact";
//     html=`<html>This is your contact ticket ${extra.comments} </html>`;

//   }
//   if(type=="post")
//   {
//     subject="Placexp Post Submission";
//     html=`<html> ${extra.comments} </html>`;
//   }


  var mailOptions = {
    from: "crowdtix@zohomail.in",
    to: email,
    subject: subject,
    html: html,
  }
  const info = await transporter.sendMail(mailOptions)
  console.log("Email sent: " + info.response)
  return true

}