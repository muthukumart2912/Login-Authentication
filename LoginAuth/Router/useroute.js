const express = require("express");
const router = express.Router();
const Users = require("../Models/usermodel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    //check user is registered or not
    const user = await Users.findOne({ email });
    if (user) {
      return res.status(422).json({ message: "user already registered" });
    }

    //if hash the password
    const hashedPass = await bcrypt.hash(password, 10);

    const newUser = new Users({
      username,
      email,
      password: hashedPass,
    });
    //save the user
    await newUser.save();

    return res
      .status(201)
      .json({ message: "user registered successfully", user: username });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal server error" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    //check email for already registered or not
    const user = await Users.findOne({ email });

    if (!user) {
      return res.status(422).json({ message: "user doesnt exists" });
    }
    //compare password
    const validatePassword = bcrypt.compare(password, user.password);
    //validate password
    if (!validatePassword) {
      return res.status(401).json({ message: "invalid username or password" });
    }

    //if valid generate token

    const token = jwt.sign({ id: user._id }, process.env.KEY, {
      expiresIn: "30m",
    });

    //set token as cookie
    res.cookie("token", token, { httpOnly: true, maxAge: 360000 });

    //return message
    return res
      .status(200)
      .json({ message: "login successfull", user: user.username });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal server error" });
  }
});

router.get("/logout", async (req, res) => {
  res.clearCookie("token");
  return res.status(200).json({ status: true, message: "logout successfully" });
});

router.post("/forgotpass", async (req, res) => {
  //destructure the data
  const { email } = req.body;

  try {
    //find email is present or not
    const user = await Users.findOne({ email });

    //validate
    if (!email) {
      return res.status(404).json({ message: "email doesnot exists" });
    }

    //generate token to reset password and send to mail

    const token = jwt.sign({ id: user._id }, process.env.KEY, {
      expiresIn: "5m",
    });

    //send mail
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "kumarhellguys99@gmail.com",
        pass: "bjvv pqnl gmdi rgcp",
      },
    });

    var mailOptions = {
      from: "kumarhellguys99@gmail.com",
      to: email,
      subject: "reset password",
      text: `http://localhost:3000/resetpass/${token}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return res.status(422).json({ message: "Email not sent" });
      } else {
        console.log("Email sent: " + info.response);
        return res.status(200).json({ message: "Email sent successfully" });
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal server error" });
  }
});

router.post("/resetpassword/:token", async (req, res) => {
  const token = req.params.token;
  const { password } = req.body;

  try {
    //verify the token
    const decode = jwt.verify(token, process.env.KEY);
    const id = decode.id;

    //hash the password
    const hashedPass = await bcrypt.hash(password, 10);

    //insert into the Users table
    await Users.findByIdAndUpdate({ _id: id }, { password: hashedPass });

    return res.status(200).json({ message: "password updated" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

const verifyUser = (req, res, next) => {
  try {
    const token = req.cookie.token;
    if (!token) {
      return res.json(422).json({ message: "no token" });
    }
    jwt.verify(token, process.env.KEY);

    next();
  } catch (error) {}
};

router.get('/home',verifyUser,async (req,res)=>{
  
  return res.status(200).json({status:true,message:"authorized"})
})

module.exports = router;
