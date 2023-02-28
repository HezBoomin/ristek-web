import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import {AuthContextProvider} from "@/pages/api/AuthContext";
import {useRouter} from "next/router";
import ProtectedRoute from '../pages/component/ProtectedRoute'
const noAuthRequired = ['/', '/auth/login', '/auth/signup', '/auth/createProfile']
import Head from "next/head";

export default function App({ Component, pageProps}: AppProps) {
    const router = useRouter()
    return (
      <AuthContextProvider>
          {noAuthRequired.includes(router.pathname) ? (
              <Component {...pageProps}/>
          ): (<ProtectedRoute>
              <Component {...pageProps}/>
          </ProtectedRoute>)}
      </AuthContextProvider>
  )
}
