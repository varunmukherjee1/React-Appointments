const express = require("express")
const router = express.Router();
const User = require("../model/userModel")
const Doctor = require("../model/doctorModel")
const authMiddleware = require("../middlewares/authMiddleware")

router.get("/get-all-doctors",authMiddleware,async (req,res) => {
    try{

        const doctors = await Doctor.find({})

        res
            .status(200)
            .send({
                success: true,
                message: "Successfully fetched doctors",
                data: doctors
            })
    }
    catch(err){
        console.log(err);
        res
            .status(500)
            .send({
                success: false,
                message: "Couldn't fetch doctors",
                error: err
            })
    }
})

router.get("/get-all-users",authMiddleware,async (req,res) => {
    try{

        const users = await User.find({})

        users.forEach((user) => {
            user.password = undefined;
        })

        reqUsers = users.filter((val) => (!val.isAdmin))

        res
            .status(200)
            .send({
                success: true,
                message: "Successfully fetched users",
                data: reqUsers
            })
    }
    catch(err){
        console.log(err);
        res
            .status(500)
            .send({
                success: false,
                message: "Couldn't fetch users",
                error: err
            })
    }
})

module.exports = router;