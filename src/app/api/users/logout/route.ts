import { NextRequest, NextResponse } from "next/server";
import { cookies } from 'next/headers'

export async function GET() {
    try {
        const response = await NextResponse.json({message: "logout succcessfully"})
        await response.cookies.set("token", "", 
        { httpOnly: true, expires: new Date(0) 
        });
        return response
       
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
        
    }


