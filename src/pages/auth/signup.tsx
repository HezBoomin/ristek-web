import Link from 'next/link'
import {useState} from "react";
import {useAuth} from "@/pages/api/AuthContext";
import {useRouter} from "next/router";


// @ts-ignore
const Signup = () => {
    const {userD, signup} = useAuth()
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState({
        email:"",
        password:"",
        })
    const handleSignup = async (e:any) => {
        e.preventDefault()
        try{
            await signup(data.email, data.password);
            router.push('/auth/createProfile')
        }
        catch (err) {
            if (window.confirm("Email already been used")) {
                setLoading(false)
            }
        }
    }
    return(
        <div className="container py-12 sm:py-20 flex flex-col items-center justify-center w-full">
            <img src='/picture/necoarc.png' className=" h-48" alt="neko-photo"/>
            <h1 className="text-white text-4xl"> Sign Up to join 5chan</h1>
            <form onSubmit={handleSignup}>
                <div className="flex-col center py-3">
                        <label className="block text-2xl text-white py-2">Email</label>
                        <input id="email" type="email" value={data.email} onChange={(e) => setData({...data, email: e.target.value})}
                               className="bg-[#6D2480] text-white border-l border-t border-r border-white border-b rounded-md focus:ring-white focus:border-white w-[340px]"
                               placeholder="Name@chanmail.com" required/>
                </div>
                <div className="flex-col center py-3">
                        <label className="block text-2xl text-white py-2">Password</label>
                        <input id="password" type="password" value={data.password} onChange={(e) => setData({...data, password: e.target.value})}
                               className="bg-[#6D2480] text-white border-l border-t border-r border-b border-white  rounded-md focus:ring-white focus:border-white w-[340px]"
                               placeholder="Use 7-12 character"
                               pattern="[a-zA-Z0-9]{7,12}"
                               title="Password should includes letters and numbers."
                               required/>
                        <p className="text-slate-200">Already have an account?
                            <Link href="/auth/login" className="cursor-pointer hover:underline hover:text-slate-200">
                                 Login here!
                            </Link></p>
                </div>
                <div className="flex item-start py-2">
                    <div className="flex item-center pt-1 ml-0.5">
                        <input type="checkbox" className="rounded-sm w-4 h-4"/>
                    </div>
                    <label className="text-white ml-2 ">Remember Me</label>
                </div>
                <div className="py-2 ml-0.5">
                    <button type='submit'
                            className="bg-slate-100 text-[#2B072A] px-2 py-0.5 rounded-xl font-bold hover:brightness-90 cursor-pointer disabled:opacity-40 disabled:cursor-auto text-lg">
                        Sign up
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Signup
