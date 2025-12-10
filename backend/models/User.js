import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone:{
        type: Number,
        required: true
    },
    emailVerified:{
        type:Boolean,
        default: false
    },
    phoneVerified:{
        type:Boolean,
        default:true
    },
    emailOTP: String,
    phoneOTP: String,
    emailOTPExpires: Date,
    phoneOTPExpires: Date,
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    avatarUrl: {
        type: String,
        default: ""
    },
    notifications: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Notification"
        },
    ],

},
{ timestamps: true }
);



export default mongoose.model("User", userSchema);