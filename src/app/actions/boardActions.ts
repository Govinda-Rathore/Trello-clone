'use server'
import {  getServerSession } from "next-auth";
import { Liveblocks,RoomData} from "@liveblocks/node";
import uniqid from 'uniqid'
import { authOptions } from "@/lib/authOptions";
// import { useRoomInfo } from "@liveblocks/react";
import { liveblocksClient } from "@/lib/liveblocksClient";
// import { userAgent } from "next/server";
// import { Room } from "@liveblocks/client";

type UpdateRoomOptions = {
  metadata?: {
    boardName?: string;
    [key: string]: any;
  };
};

export async function createBoard(name:string):Promise<false | RoomData>{
    const liveblocksClient=new Liveblocks({
        secret:process.env.LIVEBLOCKS_SECRET_KEY || ""
    });

    const session=await getServerSession(authOptions);
    const email=session?.user?.email || '';
    if(email){
        const roomId=uniqid.time();
        return await liveblocksClient.createRoom(roomId,{
            defaultAccesses:[],
            usersAccesses:{
                [email]:["room:write"]
            },
            metadata:{
                boardName:name
            }
        });
    }
    return false;
}

export async function updateBoard(boardId:string,updateData:UpdateRoomOptions):Promise<boolean>{
    await liveblocksClient.updateRoom(boardId,updateData);
    return true;
}


export async function addEmailToBoard(boardId:string,email:string){
    const room=await liveblocksClient.getRoom(boardId);
    const usersAccesses=room.usersAccesses;
    usersAccesses[email]=['room:write'];
    await liveblocksClient.updateRoom(boardId,{usersAccesses});
    return true;
  }

export async function removeEmailFromBoard(boardId:string,email:string){
    console.log(email)
    const room=await liveblocksClient.getRoom(boardId);
    const usersAccesses:any=room.usersAccesses;
    console.log(usersAccesses)
    if(usersAccesses){
        delete usersAccesses[email];
        usersAccesses[email]=null;
    }

    await liveblocksClient.updateRoom(boardId,{usersAccesses:usersAccesses});
    console.log(usersAccesses)
    return true;
}

export async function deleteBoard(boardId:string){
    await liveblocksClient.deleteRoom(boardId);
    return true;
}
  