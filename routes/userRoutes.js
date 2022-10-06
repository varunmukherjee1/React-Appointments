const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/userModel.js")
const Doctor = require("../model/doctorModel");

const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();


router.post("/register",async (req,res) => {
    try {

        const iUser = await User.findOne({email: req.body.email});

        if(iUser){
            return res
                .status(200)
                .send({message: "User already exists", success: false})
        }

        const iPass = req.body.password;

        const hashedPassword = await bcrypt.hash(iPass,10);
        // console.log(iPass , hashedPassword);

        req.body.password = hashedPassword;

        const newUser = new User(req.body);

        await newUser.save();

        return res
            .status(200)
            .send({message: "User created successfully" , success: true})
        
    } catch (error) {
        
        console.log(error)

        return res
            .status(500)
            .send({message: "Error creating user", success: false , error})
    }
})

router.post("/login",async (req,res) => {
    try {

        const user = await User.findOne({email: req.body.email});

        if(!user){
            return res
                .status(200)
                .send({message: "User doesn't exist" , success: false})
        }

        const isMatch = await bcrypt.compare(req.body.password , user.password);

        if(!isMatch){
            return res
                .status(200)
                .send({message: "Incorrect Password" , success: false})
        }
        else{

            const token = await jwt.sign({id: user._id} , process.env.JWT_KEY , {
                expiresIn: "1d"
            });

            res
                .status(200)
                .send({message: "Login successful" , success: true , token})

        }

    } catch (error) {
        
        console.log(error);

        res
            .status(500)
            .send({message: "Error in logging in" , success: false})
    }
})

router.post("/get-user-info-by-id" ,authMiddleware, async (req,res) => {

    try {

        const user = await User.findOne({_id : req.body.userId});

        if(!user){
            return res
                .status(200)
                .send({message: "User doesn't exist" , success: false})
        }
        else{

            res
                .status(200)
                .send({message: "user found" , success: true , data: {
                    name: user.name,
                    email: user.email,
                    isDoctor: user.isDoctor,
                    isAdmin: user.isAdmin,
                    seenNotifications: user.seenNotifications,
                    unseenNotifications: user.unseenNotifications
                }})
        }
        
    } catch (error) {

        console.log(error);
        
        return res
            .status(500)
            .send({message: "Error in getting user" , success: false , error})
    }

})

router.post("/apply-doctor-account", async (req,res) => {
    try {

        const newDoc = new Doctor({...req.body,status: "pending"});
        newDoc.save();

        const userAdmin = await User.findOne({isAdmin: true});

        const unseenNotifications = userAdmin.unseenNotifications;

        unseenNotifications.push({
            type: "new-doctor-request",
            message: `${newDoc.name} has applied for doctor account`,
            data: {
                doctorId: newDoc._id,
                name: newDoc.name
            },
            onClickPath: "/admin/doctors"
        })

        await User.findByIdAndUpdate(userAdmin._id , {unseenNotifications});

        res
            .status(200)
            .send({
                success: true,
                message: "Applied for doctor account"
            })
        
    } catch (error) {
        console.log(error);

        res
            .status(500)
            .send(
                {
                    message: "Error applying doctor account",
                    success: false,
                    error
                })
    }
})

router.post("/mark-all-notifications-seen" , authMiddleware , async (req,res) => {

    try {

        const user = await User.findOne({_id: req.body.userId});
        
        const unseenNotifications = user.unseenNotifications;
        const seenNotifications = user.seenNotifications;
        seenNotifications.push(...unseenNotifications);

        user.seenNotifications = seenNotifications;
        user.unseenNotifications = [];
        
        const updatedUser = await user.save();
        
        res
            .status(200)
            .send({
                message: "All notifications marked as seen" , 
                success: true , 
                data: {
                    name: updatedUser.name,
                    email: updatedUser.email,
                    isDoctor: updatedUser.isDoctor,
                    isAdmin: updatedUser.isAdmin,
                    seenNotifications: updatedUser.seenNotifications,
                    unseenNotifications: updatedUser.unseenNotifications
                }
            })

    }
    catch(err){
        console.log(err)

        res
            .status(500)
            .send(
                {   success: false , 
                    message: "Action failed" , 
                    error: err
                })
    }
})

router.post("/delete-all-notifications" , authMiddleware , async (req,res) => {

    try {

        const user = await User.findOne({_id: req.body.userId});

        user.seenNotifications = [];

        const updatedUser = await user.save();

        res
            .status(200)
            .send({
                success: true,
                message: "Notifications deleted successfully",
                data: {
                    name: updatedUser.name,
                    email: updatedUser.email,
                    isDoctor: updatedUser.isDoctor,
                    isAdmin: updatedUser.isAdmin,
                    seenNotifications: updatedUser.seenNotifications,
                    unseenNotifications: updatedUser.unseenNotifications
                }
            })

        
    } catch (error) {
        
        console.log(error);

        res
            .status(500)
            .send({
                success: false,
                message: "Action failed",
                error: error
            })
    }
})

module.exports = router;