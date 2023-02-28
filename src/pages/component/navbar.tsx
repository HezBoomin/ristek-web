import {Navbar} from "flowbite-react";
import {useSession, signIn} from "next-auth/react";
import {useAuth} from "@/pages/api/AuthContext";
import Link from "next/link";
import {useEffect, useState} from "react";
import {collection, onSnapshot, orderBy, query} from "@firebase/firestore";
import {db} from "../../../firebase";

export default function Navigation() {
    const {userD} = useAuth()
    const [user, setPosts] = useState([]);
    return(
            <nav className="bg-[#2B072A] px-4 sm:px-8 py-2  fixed w-screen z-20 top-0 left-0 ">
                <div className="container flex flex-wrap items-center justify-between mx-auto">
                    <a href="\" className="flex item-center">
                        <img src='/picture/necoarc.png' className="h-10 mr-13 sm:h-12 rounded-full" alt="neko-logo"/>
                        <span className="self-center text-4xl font-semibold whitespace-nowrap text-white">5chan</span>
                    </a>
                    <div>
                        {userD ? (<a href="/auth/createProfile" className="flex item-center">
                            <img src={userD.photoURL} className="w-12 h-9 mr-13 sm:h-12 rounded-full" alt="foto-kiel"/>
                            <span className="self-center text-lg sm:text-xl font-semibold whitespace-nowrap text-white pl-3">{userD.displayName}</span>
                        </a>
                        ) : (
                            <>
                                <button
                                        className=" float-right bg-slate-100 text-[#2B072A] px-2 py-1 rounded-lg font-bold hover:brightness-90 cursor-pointer disabled:opacity-40 disabled:cursor-auto">
                                    <Link href="/auth/login">Log in</Link>
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </nav>
    )
}