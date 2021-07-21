const jwt = require('jsonwebtoken');
const User = require('../Database/DatabaseModel/UserModel.js');

const UserAuth = async (req, res, next) => {
    try {
        const userToken = req.cookies.user_token;
        const userId = await jwt.verify(userToken, process.env.JWT_SECRET_KEY);
        const _id = userId._id;
        const dbResponse = await User.findOne({_id, jwtTokens: {$in: [userToken]}});
        if(dbResponse){
            //it's a valid user
            req.userData = {
                id : _id,
                name : dbResponse.name,
                address : dbResponse.address,
                status : dbResponse.status,
                profie_pic : dbResponse.profile_pic,
                profission : dbResponse.profission
            }
            next();
        }else{
            //invalid user
            throw new Error();
        }

    } catch (error) {
        res.status(401).json("unauthorized user. First Login or SignIn.");
    }
} 

module.exports = UserAuth;