import { connect } from "../../../../dbConfig/dbConfig";
import User from "../../../../models/userModel.js"
import { NextRequest,NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import bcryptjs from "bcryptjs"
import { sendEmail } from "@/helpers/mailer";


connect()

export async function POST(request: NextRequest){
    
    try {
        const reqBody = await request.json()   
        const {username,email,password} = reqBody
        console.log(reqBody);
        const user = await User.findOne({email})    
        if(user){
            return NextResponse.json({error:"user already exists"},{status: 400})
        }else{

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password,salt)

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })
        const savedUser = await newUser.save()
        console.log(savedUser)

        //send verification email
        console.log("code works file till saving user")
        const result = await sendEmail({email,emailType: "VERIFY",userID: savedUser._id})
        console.log("email send successfully")
        console.log(result)

        return NextResponse.json({
            message: "user is created successfully",
            success: true,
            savedUser
        })}

    } catch (error: any) {
        return NextResponse.json({error: error.message}
            ,{status: 500})
    }
}