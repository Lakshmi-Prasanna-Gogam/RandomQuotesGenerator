let quotesUsers = require('../models/userModel.js')
let bcrypt = require('bcrypt')
require('dotenv').config()

exports.registerAuth = async(req, res) => {
    try{
        const username = req.body.username?.trim();
        const email = req.body.email?.trim();
        const password = req.body.password?.trim();

        // To check if any field is empty
        if(!username || !password || !email)
            return res.status(400).json({"msg":"Missing fields"});

        // User already exist or not
        let checkUser = await quotesUsers.findOne({username})
        if(checkUser) return res.status(409).json({"msg":"User already exist"})

        let checkEmail = await quotesUsers.findOne({email})
        if(checkEmail) return res.status(409).json({"msg":"Email already exist"})

        // create the user and store in database.
        const hashedPassword = await bcrypt.hash(password, 10);
        await quotesUsers.create({username, password: hashedPassword, email})

        res.status(201).json({"msg":"Registration Successful..."})
    }
    catch(err){
        res.status(500).json({
            msg: err.message
        });
    }
}

exports.loginAuth = async(req, res) => {
    try{
        const {email, password} = req.body;

        // check for missing fields
        if(!email || !password){
            return res.status(400).json({"msg":"Missing fields."});
        }
        let checkEmail = await quotesUsers.findOne({email});

        // If no user found
        if(!checkEmail)return res.status(404).json({"msg":"User not found."});

        // Check is password matches.
        let isPassCorrect = await bcrypt.compare(password, checkEmail.password);
        if(!isPassCorrect)return res.status(401).json({"msg":"Email or password is invalid."});

        res.status(200).json({
            msg: "Login Successful...",
            userId: checkEmail._id,
            username: checkEmail.username
        });
    }
    catch(err){
        res.status(500).json({
            msg: err.message
        });
    }
}