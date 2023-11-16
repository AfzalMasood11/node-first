const { generateToken } = require('../config/jwtToken');
const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');

const createUser = asyncHandler(
    async (req, res) => {
        const email = req.body.email;
        const findUser = await User.findOne({email: email});
        if(!findUser){
            // Create new user
            const newUser = await User.create(req.body);
            res.json(newUser);
        }else{
            // User already exist
            // res.json({
            //     msg: "User already exist",
            //     success: false,
            // });
            throw new Error('User Already Exists.');
        }
    }
);

const loginUserCtrl = asyncHandler(
    async(req, res) => {
        const {email, password} = req.body;
        const findUser = await User.findOne({email});
        if(findUser && (await findUser.isPasswordMatched(password))){
            res.json({
                _id: findUser?._id,
                firstname: findUser?.firstname,
                lastname: findUser?.lastname,
                email: findUser?.email,
                mobile: findUser?.mobile,
                token: generateToken(findUser?._id)
            });
        } else {
            throw new Error('Invalid credentials');
        }
    }
);

const updateUserCtrl = asyncHandler(
    async(req, res) => {
        const { id } = req.params;
        console.log(id);
        try{
            const updatedUser = await User.findByIdAndUpdate(id, {
                firstname: req?.body?.firstname,
                lastname: req?.body?.lastname,
                mobile: req?.body?.mobile,
                email: req?.body?.email,
                },
                {
                    new: true
                }
            );
            res.json(updatedUser);
        }catch(error){
            throw new Error(error);
        }
    }
);

module.exports = { createUser, loginUserCtrl, updateUserCtrl };