import { NextRequest } from "next/server";
import jwt from "jsonwebtoken"
// import dotenv from "../../.env";

console.log(process.env.TOKEN_SECRET)

export const getDatafromtoken = async (request:NextRequest)=>{
    try{
        const token = await request.cookies.get("token")?.value
        console.log(token)
        const decodedToken = jwt.verify(token,process.env.TOKEN_SECRET!);
        console.log(decodedToken.id)
        return decodedToken.id;
    } catch (error:any){
        throw new Error(error.message);
    }
}

