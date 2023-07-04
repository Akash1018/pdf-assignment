import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type:String,
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
    verified: {
        type: Boolean,
        default: false,
      },
    otp: {
        type: String,
    },
    otpExpiresAt: {
        type: Date,
    },
    token: {
        type: String
    },
    id: {type: String}
});

const user = mongoose.model('userDetails', userSchema);

export default user;