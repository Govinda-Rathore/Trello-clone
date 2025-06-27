"use client"

// import { RoomProvider } from "@liveblocks/react"
import { SessionProvider } from "next-auth/react"

export function Providers({children}:{
    children:React.ReactNode
}){
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
)}
