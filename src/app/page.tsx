import LoginView from "@/components/views/LoginView";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Boards from "@/components/Boards";

export default async function Home() {
  const session=await getServerSession(authOptions)
  
  if(!session){
    return(
      <LoginView></LoginView>
    )
  }
 
  return (
    <div >
      <h1 className='text-4xl mb-4'>Your Boards:</h1>
      <Boards></Boards>
      <div>
        <Link 
          className="btn primary inline-flex items-center gap-1"
          href={'/new-board'}>
          Create new board <FontAwesomeIcon className="h-5" icon={faArrowRight} />
        </Link>
      </div>
     </div>
  );
}
