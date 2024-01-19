import { getDatafromtoken } from "@/helpers/getDataFromToken";
import { NextRequest,NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

connect()

export async function GET(request:NextRequest){
    console.log("hello get request got it")

    try {
        const userID = await getDatafromtoken(request);
        console.log(userID)
        const user = await User.findOne({_id:userID}).select("-password");
        console.log(user)
        return NextResponse.json({
            message: "user found",
            data: user,
        })


    } catch (error:any) {
        return NextResponse.json({error: error.message},
            {status: 400});
    }
}