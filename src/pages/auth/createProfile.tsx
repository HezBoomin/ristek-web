
import {useState, createContext, useContext, useRef, useEffect,} from "react";
import {addDoc, collection} from "@firebase/firestore";
import {db, storage} from "../../../firebase";
import {useRouter} from "next/router";
import {useAuth} from "@/pages/api/AuthContext";
import {updateProfile} from "@firebase/auth";
import {getAuth} from "firebase/auth";
import {ref, uploadBytes, listAll, getDownloadURL, uploadBytesResumable} from "@firebase/storage";
import {mockSession} from "next-auth/client/__tests__/helpers/mocks";
import user = mockSession.user;
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;


const CreateProfile = () => {
    const router = useRouter()
    const {userD} = useAuth()
    const photo = userD.photoURL
    const [selectedFile, setSelectedFile] = useState(null);
    const [userData, sendUserData] = useState({
            username:'',
            bio: ''
        })
    const [imageUrl, setImageUrl] = useState("");
    const auth = getAuth()
    const handleData = async (e:any) => {
        e.preventDefault();
        await updateProfile(auth.currentUser, {
            displayName: userData.username, photoURL: imageUrl
        }).then(()=>{})
        router.push("/")

    };
    useEffect(()=>{
        const uploadFile = ()=> {
            const name = new Date().getTime() + selectedFile.name
            const storageRef = ref(storage, name)
            const uploadTask = uploadBytesResumable(storageRef, selectedFile)
            uploadTask.on("state_changed", (snapshot) => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log("Upload is " + progress + "% done");
                    switch (snapshot.state) {
                        case "paused":
                            console.log("Upload is paused");
                            break;
                        case "running":
                            console.log("Upload is running");
                            break;
                        default:
                            break;
                    }
                }, (error) => {
                    console.log(error)
                }, () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setImageUrl(downloadURL)
                    })
                }
            );
        }
        selectedFile && uploadFile();
    },[selectedFile])

    return(
    <div className="container py-20 flex flex-col items-center justify-between">
        <div className="text-center">
            <h1 className="text-5xl">Hello there 5channers!</h1>
            <h2 className="text-2xl">Create or edit your profile below</h2>
        </div>
        <div className="flex justify-between item-center my-10">
                <div className="flex-col item-center">
                    <h1 className="text-xl mb-4 text-center">Add avatar here</h1>
                    <img className="w-52 ml-16 rounded-full border-b border-l border-r border-t" src={imageUrl}/>
                    <div className="flex flex-col item-center mt-4 ml-4">
                        <input onChange={(e) => setSelectedFile(e.target.files[0])}
                               type="file" className="text-white bg-[#6D2480] text-[#2B072A] p-1.5 rounded-md font-bold hover:brightness-90 cursor-pointer text-md"/>
                    </div>
                </div>
                <form onSubmit={handleData}>
                <div className="flex ml-4">
                    <div className="flex-col mt-16">
                        <label className="block text-xl text-white py-4">Username</label>
                        <input type="text"
                               className="bg-[#6D2480] text-white border-l border-t border-r border-white border-b rounded-md focus:ring-white focus:border-white w-28 sm:w-96"
                               placeholder="Use 4-10 character"
                               minLength={4}
                               maxLength={10}
                               value={userData.username}
                               onChange={(e) => sendUserData({...userData, username: e.target.value})}
                               required/>
                    </div>
                    <div className="mt-[7.8rem] ml-2 text-right">
                        <button type='submit'
                                className="bg-slate-100 text-[#2B072A]  px-2 py-1.5 rounded-xl font-bold hover:brightness-90 cursor-pointer text-lg">
                            Submit
                        </button>
                    </div>
                </div>
                </form>
        </div>
    </div>
    )

}

export default CreateProfile

// const addImage= () =>
// {
//     if (selectedFile == null)return;
//     const imageref = ref(storage, `images/${selectedFile}`)
//     uploadBytes(imageref, selectedFile).then((snapshot)=>{
//     getDownloadURL(snapshot.ref).then((url) => {
//         setImageUrl(url)
//     })})
// }
