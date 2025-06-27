'use client'

import { useParams, useRouter } from "next/navigation";
import CardModalBody from "@/components/CardModalBody";
import { useEffect } from "react";
import { useUpdateMyPresence } from "@/app/liveblocks.config";


export default function CardModal(){
    const router=useRouter();
    const params=useParams();
    const updateMyPresence=useUpdateMyPresence();

    function handleBackDropClick(){    
        router.back()
    }

    useEffect(()=>{
        if(params.cardId){
            updateMyPresence({cardId:params.cardId.toString()});
        }
    },[params])


    return(
        <>
        <div className="fixed inset-0 bg-black/70 z-10">
        </div>

        <div className="absolute inset-0 z-20 w-full" onClick={handleBackDropClick}>
          <div>

            <div className="bg-white max-w-sm my-8 px-4 p-1 mx-auto rounded-md">
              <div onClick={ev => ev.stopPropagation()}>
                <CardModalBody/>
              </div>
            </div>

            <div>&nbsp;</div>
          </div>
        </div>
      </>
    )
}