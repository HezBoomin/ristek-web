import {createContext, useContext, useEffect, useState} from "react";
import {onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, getAuth} from "@firebase/auth";
import {auth, db} from "../../../firebase"
import { setDoc } from "firebase/firestore";
import {addDoc, collection, doc, query, DocumentData, CollectionReference} from "@firebase/firestore";
import {getDisplayName} from "next/dist/shared/lib/utils";

const AuthContext = createContext<any>(null)
export const useAuth = () => useContext(AuthContext)
export const AuthContextProvider = ({children}: {children: React.ReactNode}) => {
    const [userD, setUser] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (userD) => {
            if(userD){
                setUser({
                    uid: userD.uid,
                    email: userD.email,
                    displayName: userD.displayName,
                    photoURL: userD.photoURL,
                })
            }else{
                setUser(null)
            }
            setLoading(false)
        })

        return() => unsub()
    },[])


    const signup = (email: string, password: string) => {
        return createUserWithEmailAndPassword(auth, email, password).catch((error) => {})

    }
    const login = (email: string, password: string) => {
        return signInWithEmailAndPassword(auth, email, password).catch((error) => {});
    };
    const logout = async () => {
        setUser(null)
        await signOut(auth)
    }
    return <AuthContext.Provider value={{userD, login, signup, logout, setUser}}>{loading ?  null: children}</AuthContext.Provider>
}