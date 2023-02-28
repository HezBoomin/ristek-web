
import {useState} from "react";
import {addDoc, collection, doc, serverTimestamp, setDoc} from "@firebase/firestore";
import {db} from "../../../firebase"
import {useAuth} from "@/pages/api/AuthContext";
import {getAuth} from "firebase/auth";


export default function Input() {
    const {userD, signup} = useAuth()
    const [input, setInput] = useState("");
    const sendPost = async () => {
        await addDoc(collection(db, "posts"), {
            text: input,
            timestamp: serverTimestamp(),
            uid: userD.uid,
            username: userD.displayName,
            photoURL: userD.photoURL,
        })
        setInput("");
    };

    return (
        <div className="flex border-b border-l border-r border-t rounded-xl p-4 sm:w-full bg-[#6D2480]">
            <img src={userD.photoURL} className=" w-10 h-10 rounded-full cursor-pointer hover:brightness-90"
                 alt="user-photo"/>
            <div className="w-full divide-y divide-white">
                <div className="">
                        <textarea
                            className="w-full bg-[#6D2480] text-white border-0 rounded-xl focus:ring-0 tracking-wide"
                            rows='5' cols='65'
                            placeholder="What's Up" value={input} onChange={(e) => setInput(e.target.value)}></textarea>
                </div>
                <div className="text-right pt-2">
                    <button onClick={sendPost} disabled={!input.trim()}
                            className=" float-right bg-slate-100 text-[#2B072A] px-2 py-0.5 rounded-xl font-bold hover:brightness-90 cursor-pointer disabled:opacity-40 disabled:cursor-auto">
                        Post
                    </button>
                </div>
            </div>
        </div>
    )
}