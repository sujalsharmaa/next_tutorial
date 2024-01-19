    "use client";
    import Link from "next/link";
    import React, { useEffect } from "react";
    import {useRouter} from "next/navigation";
    import axios from "axios";
    import { toast } from "react-hot-toast/headless";

    export default function Signup(){
        const router = useRouter();
        const [user,setUser] = React.useState({
            email: "",
            password: "",
            username: "",
        })
        const [buttonDisabled,setButtonDisabled]= React.useState(false)
        const [loading,setLoading] = React.useState(false)

        const onSignup = async ()=>{
            try {
                setLoading(true)
                const response = await axios.post("/api/users/signup",user)
                console.log("signup success",response.data)
                router.push("/login")
        
                
            } catch (error:any) {
                console.log("signup failed",error.message);
                toast.error(error.message)
            }
            finally{
                setLoading(false)
            }
        }
        useEffect(()=>{
            if(user.email.length>0 && user.password.length >0 && user.username.length > 0 ){
                setButtonDisabled(false)
            }else{
                setButtonDisabled(true)
            }
        },[user])
        return (
            <div className="bg-slate-500 min-h-screen border-pink-500 border-8 flex flex-col items-center justify-center">
                <h1>{loading ? "processing" : "Signup"}</h1>
                <hr />
                <label htmlFor="username">username</label>
                <input type="text"
                        id="text"
                        value={user.username}
                        onChange={(e)=>setUser({...user,username:e.target.value
                        })}
                        placeholder="username"
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
                /><label htmlFor="email">email</label>
                <input type="email"
                        id="text"
                        value={user.email}
                        onChange={(e)=>setUser({...user,email:e.target.value
                        })}
                        placeholder="email"
                        className="border-4 border-black"
                />
                <button className="border-2 border-orange-600 mt-5 bg-red-400 p-1"
                onClick={onSignup}
                >{buttonDisabled ? "invalid credentials": "Signup"}</button>
                <Link href="./login">visit login</Link>
            </div>
        )
    }

