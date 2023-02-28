import {useAuth} from "@/pages/api/AuthContext";
import {useRouter} from "next/router";
import {useEffect} from "react";

const ProtectedRoute = ({children}: {children: React.ReactNode}) =>
{
    const {userD} = useAuth()
    const router = useRouter()

    useEffect(() => {
        if(!userD){
            router.push('/auth/login')
            }
        }, [router, userD])
    return <>{userD ? children : null}</>
    return(
        children
    )
}