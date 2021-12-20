const { createClient } = require("redis");
const nodemailer = require("nodemailer");
const { gmail, gmailPassword } = require("./config/env");

exports.sendRandomNumberAPI = async (req, res) => {
  const { email } = req.body;

  const randomNumber = Math.floor(Math.random() * 1000000);
  const client = createClient();

  try {
    client.on("error", (err) => console.log("Redis Client Error", err));
    await client.connect();
    // redis에 저장
    client.set(email, randomNumber, {
      EX: 181,
    });

    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: gmail,
        pass: gmailPassword,
      },
    });

    let info = await transporter.sendMail({
      from: `"SDC-병학" <${gmail}>`,
      to: email,
      subject: "[병학] 인증코드 전송",
      text: String(randomNumber),
      html: `<b>${randomNumber}</b>`,
    });

    res.status(200).json({
      success: true,
      msg: "email sent",
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      msg: "error",
    });
  } finally {
    client.quit();
  }
};
