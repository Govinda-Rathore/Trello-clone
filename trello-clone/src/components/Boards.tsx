'use server'
import getUserEmail from "@/lib/getUserEmail";
import { liveblocksClient } from "@/lib/liveblocksClient";
import BoardsTiles from "./BoardsTiles";


export default async function Boards(){
    const email=await getUserEmail();
    const {data:rooms}=await liveblocksClient.getRooms({userId:email});

    return (
        <BoardsTiles boards={rooms}/>
    )
}
