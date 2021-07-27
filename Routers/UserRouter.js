const express = require('express');
const UserRouter = express.Router();
const User = require('../Database/DatabaseModel/UserModel.js');
const bscrypt = require('bcryptjs');
const UserAuth = require('../UserAuth/UserAuth.js');



UserRouter.get("/users/data", UserAuth, (req, res) => {
    //get user by JWT Token
   res.status(200).json(req.userData);
});

UserRouter.get("/users", async (req, res) => {
    //Get user info by user id
    try {
        //get the requested user id from query string of url
        const userId = req.query.uid;
        //get the user info from database
        const dbResponse = await User.findOne({_id: userId},{email: 0, password: 0, jwtTokens: 0, date: 0});
        if(dbResponse){
            //user data is available
            res.status(200).json(dbResponse);
            

        }else{
            //invalid user id
            throw new Error();
        }
    } catch (error) {
        res.status(400).json("User not found");
    }

});

UserRouter.put("/users", UserAuth, async (req, res) => {
    //Update user by id
    const {uid, ...data} = req.body;
    try {
        const dbResponse = await User.findByIdAndUpdate(uid, {...data}, {new: true});
        res.status(200).json(dbResponse)
    } catch (error) {
        res.status(400).json("Data not update");
    }
});


UserRouter.post("/users/register", async (req, res) => {
    const {name, email, password, address, profile_pic, profission, status} = req.body;
    if(!name || !email || !password || !address || !profile_pic || !profission || !status){
        res.status(420).json("Please fill input fields properly.");
    }else{
        //save user data in database
        try {
            //check if email id already exists in database or not
            const dbResponse = await User.findOne({email});
            if(dbResponse){
                //email is already exists in database
                res.status(420).json("This email address already exist.");
            }else{
            //email id not present in database
           const newUser = new User({name, email, password, address, profile_pic, profission, status});
           await newUser.save();
           res.status(201).json("User registration is successfull.");
        }
        } catch (error) {
            res.status(400).json("User Registration failed: "+error.message);
        }
    }
});

UserRouter.post("/users/login", async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password){
        res.status(420).json("Please fill input fields properly.")
    }else{
        try {
            const dbRespone = await User.findOne({email});
            if(dbRespone){
                //check user password
                const isPaswordMatched = await bscrypt.compare(password, dbRespone.password);
                if(isPaswordMatched){
                    //login successfull
                    const jwtToken = await dbRespone.getJwtToken();
                    res.cookie("user_token", jwtToken, {expires: (new Date(Date.now() + 2592000000)) ,httpOnly: true})
                    res.status(200).json("User login Successfull.");
                }else{
                    //Login failed
                    throw new Error();
                }
            }else{
                // res.status(400).json("Invalid login credentials.");
                throw new Error();
            }
        } catch (error) {
            console.log(error.message)
            res.status(400).json("Invalid login credentials.");
        }
    }
});

UserRouter.get("/users/logout", UserAuth, (req, res)=>{
    res.clearCookie("user_token");
    res.status(200).json("User logout successfull");
});



module.exports = UserRouter;