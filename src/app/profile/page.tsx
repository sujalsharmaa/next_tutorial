"use client";
import axios from "axios"
import Link from "next/link"
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function ProfilePage(){
const router = useRouter()
const [data,setData] = useState("nothing")
const Logout = async()=>{
    try {
        await axios.get("/api/users/logout")
        toast.success("logout successful")
        router.push('/login')
    } catch (error:any) {
        console.log(error.message)
        toast.error(error.message)
    }
}
const getUserDetails = async ()=>{
    console.log("get user details got used")
    const res = await axios.get('/api/users/me')
    console.log(res.data);
    setData(res.data.data._id)
}

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-orange-700">
            <h1>Profile</h1>
            <hr />
            <p>profile page</p>
            <h2 className="p-1 rounded bg-green-500">{data === 'nothing' ? "Nothing" : <Link href={`/profile/${data}`}>{data}
            </Link>}</h2>
          
            <button
            className="bg-blue-600 p-1 m-5 rounded-lg border border-white border-4 "
            onClick={Logout}
            >Logout</button>
            <button
            className="bg-pink-600 p-1 m-5 rounded-lg border border-white border-4 "
            onClick={getUserDetails}
            >get User Details</button>
        </div>
    )
}