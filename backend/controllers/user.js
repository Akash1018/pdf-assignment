import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import otpGenerator from 'otp-generator';
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import User from '../models/user.js'

dotenv.config();

const transporter = nodemailer.createTransport({
    service: process.env.SERVICE,
    auth: {
        user: process.env.MAIL,
        pass: process.env.PASS
    },
});

export const signin = async (req,res) => {
   const { email, password} = req.body;

   try {
        const existingUser = await User.findOne({ email });

        if(!existingUser) return res.status(404).json({ message: "User doesn't exist"});
        if(!existingUser.verified)return res.status(400).json({ message: "verify user first"});
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        
        if(!isPasswordCorrect) return res.status(400).json({message: "Invalid credentials"});

        const token = jwt.sign({ email: existingUser.email,id: existingUser._id}, process.env.TOKEN, { expiresIn: "1h"});

        res.status(200).json({ result: existingUser, token});
   } catch (error) {
        res.status(500).json({ message: 'Something went wrong'});
   }
}

export const signup = async (req,res) => {
    const { email,password,confirmPassword,firstName,lastName } = req.body;
    try {
        const existingUser = await User.findOne({ email });

        if (existingUser && existingUser.verified) {
            return res.status(400).json({ message: 'User already exists and verified.' });
        }

        if(existingUser)return res.status(400).json({ message:'User already exist' });
        if(password.length <8) return res.status(400).json({ message: 'Password should be of length 8 or more'})
        if(password !== confirmPassword) return res.status(400).json({message: "Password don't match"});

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await User.create({email,password: hashedPassword,name: `${firstName} ${lastName}`});
        const otp = otpGenerator.generate(6, { upperCase: false, specialChars: false });
        const otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000);
        const token = jwt.sign({ email: result.email,id: result._id}, process.env.TOKEN, { expiresIn: "1h"});
        await User.updateOne({ email }, { otp, otpExpiresAt, token }, { upsert: true });

        const mailOptions = {
            from: process.env.MAIL,
            to: email,
            subject: 'Hello your OTP',
            text:  `click on this url to verify yourself http://localhost:5000/users/verify?email=${email}&otp=${otp}`,
          };
          
          // Send the email
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error('Error sending email:', error);
            } else {
              console.log('Email sent:', info.response);
            }
          });
        res.status(200).json({result, token: token});
    } catch (error) {
        res.status(500).json({message:"Something went wrong"});
    }
}

export const verify = async (req, res) => {
    const { email, otp } = req.query;
    try {
      // Retrieve the user document
      const user = await User.findOne({ email });
      // Check if the OTP and its expiration time are valid
      if (user && user.otp === otp && user.otpExpiresAt > Date.now()) {
        // Mark email as verified
        user.verified = true;
        await user.save();

        res.send('Email verification successful.');
      } else {
        res.send('Invalid OTP or email.');
      }
    } catch (error) {
      res.status(500).json({ error: 'Email verification failed. Please try again later.' });
    }
}

export const forgot = async (req, res) => {
  try {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if(!user) return res.status(404).json({ message: "User doesn't exist"});

  const token = jwt.sign({ email: email}, process.env.TOKEN, { expiresIn: "1h"});
  const resetUrl = `http://localhost:3000/reset/${token}`;
  const mailOptions = {
    from: 'akash101811@gmail.com',
    to: email,
    subject: 'Password Reset',
    text: `Click the following link to reset your password ${resetUrl}`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
  res.status(200).json({message: "Mail sent"})
} catch (error) {
  res.status(500).json({ error: 'Failed' });
}
}

export const reset = async (req, res) => {
  const { newPassword, confirmPassword } = req.body.formData;
  const { token } = req.body;
  try {
    const decoded = jwt.verify(token, process.env.TOKEN);
    
    const { email } = decoded;
    const user = await User.findOne({ email });
    if(!user) return res.status(404).json({ message: "User doesn't exist"});
    if(newPassword.length <8) return res.status(400).json({ message: 'Password should be of length 8 or more'})
    if(newPassword !== confirmPassword) return res.status(400).json({message: "Password don't match"});

    const hashedPassword = await bcrypt.hash(newPassword, 12);
    await User.updateOne({ email }, { password: hashedPassword }, { upsert: true });
   

    res.status(200).json({ message: 'Password reset successful.' });
  } catch (error) {
    res.status(400).json(error);
  }
}