import { connect } from "@/dbConfig/dbConfig";
import { NextRequest,NextResponse } from "next/server";
import User from "@/models/userModel";

connect();

export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json()
        const {token} = reqBody
        console.log(token)
        
        const user = await User.findOne({verifyToken: token,
        verifyTokenExpiry: {$gt: Date.now()}
        })
        console.log(user)
        if(!user){
            return NextResponse.json({error: "user not found"},
            {status: 400})
        }
        console.log(user)

        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        console.log("code works fine till saving isVerified = true")
        await user.save()

        return NextResponse.json({message: "email verified"},
        {status: 400})


    } catch (error:any) {
        NextResponse.json({error: error.message},
            {status:500})
    }
}