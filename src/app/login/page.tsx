"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import 'tailwindcss/tailwind.css';


export default function LoginPage(){
    const Router = useRouter()
    const [buttonDisabled,setButtonDisabled] = useState(true)
    const [loading,setLoading] = useState(false)
    const [user,setUser] = React.useState({
        email: "",
        password: "",
       
    })

    const onLogin = async ()=>{
        try {
            setLoading(true);
            await axios.post("/api/users/login",user)
            console.log("login success");
            toast.success("login success")
            Router.push("/profile")
        } catch (error:any) {
            console.log("login failed",error.message)
            toast.error(error.message)
        }finally{
            setLoading(false);
        }
    }
    useEffect(()=>{
        if(user.email.length>0 && user.password.length>0){
            setButtonDisabled(false)
        }else{
            setButtonDisabled(true)
        }
    },[user])

    return (
        <div className="bg-slate-500 min-h-screen border-pink-500 border-8 flex flex-col items-center justify-center">
            <h1>{loading? "Processing":"Login"}</h1>
            <hr />
            <label htmlFor="email">email</label>
            <input type="email"
                    id="text"
                    value={user.email}
                    onChange={(e)=>setUser({...user,email:e.target.value
                    })}
                    placeholder="email"
                    className="border-4 border-black"
            />
            <label htmlFor="password">password</label>
            <input type="password"
                    id="text"
                    value={user.password}
                    onChange={(e)=>setUser({...user,password:e.target.value
                    })}
                    placeholder="password"
                    className="border-4 border-black"
            />
            <button className="border-2 border-orange-600 mt-5 bg-red-400 p-1"
            onClick={onLogin}
            >{buttonDisabled?"invalid credentials":"Login"}</button>
            <Link href="./signup">sign up here</Link>
       
        </div>
    )
}

