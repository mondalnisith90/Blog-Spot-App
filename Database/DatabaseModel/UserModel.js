const mongoose = require('mongoose');
const validator = require('validator');
const bscrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: [5, "Name length must be at least 5 characters."],
        maxlength: [20, "Name size must be maximum of 20 characters"],
        required: [true, "User name is required."],
        trim: true
    },
    email:{
        type: String,
        required: [true, "Email id is required."],
        unique: [true, "This email id already exist."],
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email address.");
            }
        }
    },
    password:{
        type: String,
        required: [true, "Password is required"],
        trim: true
    },
    address: {
        type: String,
        default: "unknown"
    },
    profission: {
        type: String,
        required: [true, "Profission is required."],
        trim: true
    },
    profile_pic:{
        type: String,
        required: [true, "Profile picture is required."],
        trim: true
    },
    status: {
        type: String,
        required: [true, "User status is required,"]
    },
    jwtTokens: {
        type: Array,
        default: []
    },
    date:{
        type : Date,
        default: new Date(Date.now())
    }
});

userSchema.pre("save", async function (next) {
    if(this.isModified("password")){
        try{
            const bcryptPassword = await bscrypt.hash(this.password, 12);
            this.password = bcryptPassword;
            next();
        }catch(error){
            throw new Error("Some server problem.");
        }        
    }
});


userSchema.methods.getJwtToken = async function () {
    try {
        const jwtToken = await jwt.sign({_id: this._id}, process.env.JWT_SECRET_KEY);
        this.jwtTokens.push(jwtToken);
        await this.save();
        return jwtToken;
    } catch (error) {
        console.log(error.message)
        throw new Error();
    }
}

const User = mongoose.model("User", userSchema);

module.exports = User;