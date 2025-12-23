import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { asyncHandler } from '../utils/asyncHandler.js';
import generateOtp from '../utils/otpGenerate.js';
import sendMail from '../utils/sendMail.js';
import sendSMS from '../utils/sendSms.js'

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "15d" });
}

// REGISTER USER

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, phone, password } = req.body;
    //check user exist
    console.log(req.body);
    const userExist = await User.findOne({ email });
    if (userExist) {
        res.status(400);
        throw new Error("User already exists");
    }

    const emailOTP = generateOtp();
    console.log(`email otp is ${emailOTP}`);
    const phoneOTP = generateOtp();
    // console.log(`phone otp is ${phoneOTP}`);
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    const user = await User.create({ name, email, phone, password: hashedPass, emailOTP, phoneOTP, emailOTPExpires: new Date(Date.now() + 10 * 60 * 1000), phoneOTPExpires: new Date(Date.now() + 10 * 60 * 1000) });

    // await sendMail(email, "Email Verification Code", `Your OTP is ${emailOTP}`);
    // await sendSMS(phone, `Your OTP for phone verification is ${phoneOTP}`);
    res.status(201).json({
        success: true,
        message: "OTP sent to email & phone",
    });
});



const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        res.status(400);
        throw new Error("Invalid Email or Password");
    }
    if (!user.emailVerified) {
        res.status(400);
        throw new Error("Please verify your email first");
    }
    if (!user.phoneVerified) {
        res.status(400);
        throw new Error("Please verify your phone first");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        res.status(400);
        throw new Error("Invalid Email or Password");
    }
    const userData = user.toObject();
    console.log(userData);
    res.status(200).json({
        success: true,
        message: "Login Success",
        user: userData,
        token: generateToken(user._id),
    });
});





//verify email
const verifyEmail = asyncHandler(async (req, res) => {
    const { email, otp } = req.body;
    const user = await User.findOne({
        email,
        emailOTP: otp,
        emailOTPExpires: { $gt: Date.now() }
    });

    if (!user) {
        res.status(400).json({
            success: false,
            message: "Invalid or expired OTP",
        });
    };

    user.emailVerified = true;
    user.emailOTP = undefined;
    user.emailOTPExpires = undefined;
    await user.save();

    res.status(200).json({
        success: true,
        message: "Email verified successfully!"
    });

});



const verifyPhone = asyncHandler(async (req, res) => {
    const { phone, otp } = req.body;

    const user = await User.findOne({
        phone,
        phoneOTP: otp,
        phoneOTPExpires: { $gt: Date.now() }
    });

    if (!user) {
        return res.status(400).json({
            success: false,
            message: "Invalid or expired OTP"
        });
    }

    user.phoneVerified = true;
    user.phoneOTP = undefined;
    user.phoneOTPExpires = undefined;

    await user.save();
    res.status(200).json({
        success: true,
        message: "Phone verified successfully!"
    });
})

export { registerUser, loginUser, generateToken, verifyEmail, verifyPhone};