'use client';

import { addEmailToBoard } from "@/app/actions/boardAction";
import {useRouter } from "next/navigation";

export default function NewBoardAccess({boardId}:{boardId:string}){
    const router=useRouter();
    async function addEmail(formData:FormData){
        const email=formData.get('email')?.toString() || "";
        await addEmailToBoard(boardId,email)
        router.refresh();
    }
    return(
        <form action={addEmail} className='max-w-xs'>
            <label className='block mb-2 flex-col'>
                <div className="text-lg mb-2 ">Add email</div>
                <input type="text" placeholder="john@gmail.com" name="email"/>
            </label>
            <button type="submit" className='mt-2 w-full'>Give Access</button>
        </form>
    )
}