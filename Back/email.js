const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({

    // service: "hotmail",
    host: "smtp.office365.com",
    port: 465,
    secure: true,
    auth: {
      user: "carpe-app",
      pass: "WqFnmR4aggHepWF*82qG"
    }
  });

  const options = {
    from: "carpe-app@outlook.com",
    to: "cookm353@gmail.com",
    subject: "Test",
    text: "Test email sent from Node.js"
  }

  transporter.sendMail(options, (err, info) => {
    if (err) {
        console.log(err)
        return
    }
    console.log("Sent:", info.response)
  })