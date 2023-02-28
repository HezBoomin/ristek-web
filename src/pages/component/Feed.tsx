import Input from "@/pages/component/Input";
import Post from "@/pages/component/Post";
import {useEffect, useState} from "react";
import {collection, onSnapshot, orderBy, query} from "@firebase/firestore";
import {db} from "../../../firebase"
import {useAuth} from "@/pages/api/AuthContext";

export default function Feed() {
    const [posts, setPosts] = useState([]);
    useEffect(() =>
        onSnapshot(
            query(collection(db, "posts"), orderBy("timestamp", "desc")),
            (snapshot) =>{setPosts(snapshot.docs);
            }
        ),[]);
    return(
            <div className="container py-40 flex flex-col items-center justify-center ">
                <div>
                    <Input/>
                    {posts.map((post)=>(
                        <Post key={post.id} post={post}/>
                    ))}
                </div>
            </div>
    )
}