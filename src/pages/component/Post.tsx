import {BiPencil, BiTrash} from 'react-icons/bi'
import Moment from "react-moment";
import {addDoc, collection, deleteDoc, doc, serverTimestamp, updateDoc} from "@firebase/firestore";
import {db} from "../../../firebase"
import {useState, useEffect} from "react";
import {useAuth} from "@/pages/api/AuthContext";
import {getAuth} from "firebase/auth";


// @ts-ignore
export default function Post({post}) {
    const auth = getAuth().currentUser
    const {userD} = useAuth()
    const [isEdit, setIsEdit] = useState(false);
    const inputData = post.data().text;
    const [editedInput, setEditedInput] = useState(inputData);
    const data = {
        text: editedInput
    }

    async function updatedPost() {
        await updateDoc(doc(db,"posts", post.id), data);
    }
    async function deletePost() {
        if (window.confirm("Are you sure you want to delete this post?")) {
            deleteDoc(doc(db,"posts", post.id));
    }}



    return(
        <div className=" bg-[#6D2480] text-white flex p-2 my-5 border-b border-l border-t border-r rounded-lg w-screen sm:w-[610.5px]">
            {/* User images*/}
            <img  src={post.data().photoURL} className="h-10 w-10 rounded-full mr-4 cursor-pointer" alt="user-images"/>
            {/*Right Side*/}
            <div>
                {/*Header*/}
                <div className="flex item-center justify-between">
                    {/*Post User Info*/}
                    <div className="flex space-x-1 whitespace-nowrap">
                        <h4 className="font-bold text-md sm:text-lg hover:underline cursor-pointer">{post.data().username}</h4>
                        <p>-</p>
                        <span className="text-sm sm:text-md pt-1 text-gray-400">
                            <Moment format="DD-MM-YYYY">{post?.timestamp?.toDate()}</Moment>
                        </span>
                    </div>
                </div>
                {/*Post Text*/}
                <div className="w-[500px]">
                    {isEdit ? (
                        <div className="w-full divide-y divide-white">
                            <div>
                                <textarea className=" bg-[#6D2480] text-white border-0 rounded-xl focus:ring-0 tracking-wide"
                                         onChange={(e) => setEditedInput(e.target.value)}   rows='4' cols='65' value={editedInput} data-placeholder={inputData}>
                                </textarea>
                            </div>
                            <div className="text-right pt-2">
                                <button onClick={() => {{updatedPost()}
                                        setIsEdit(false)}} disabled={!editedInput.trim()}
                                        className=" float-right bg-slate-100 text-[#2B072A] px-2 py-0.5 rounded-xl font-bold hover:brightness-90 cursor-pointer disabled:opacity-40 disabled:cursor-auto">
                                    Post
                                </button>
                            </div>
                        </div>)
                        :(<p className="text-md mb-4 max-w-fit break-all">{inputData}</p>)}
                </div>

                {/*Icon*/}
                    <div className="flex">
                        <BiTrash onClick={deletePost} className=" w-5 h-5 mr-10 hoverEffect hover:brightness-90 cursor-pointer text-red-500 cursor-pointer"/>
                        <BiPencil onClick={() => setIsEdit(true)}  className=" w-5 h-5 hoverEffect hover:brightness-90 cursor-pointer cursor-pointer"/>
                    </div>
            </div>
        </div>
    )
}