import { LuEdit2 } from "react-icons/lu"
import { useNavigate } from "react-router-dom"
import {AppRoutes}from '../../router/routes';

export const ProfileView=()=>{
    const navigate=useNavigate()
    return(
        <div>
        <div className="w-full relative">
        <span className="bg-contract-100 p-2 w-11 inline-flex items-baseline justify-center item-center cursor-pointer rounded-md absolute top-2 right-2" onClick={()=>navigate(AppRoutes?.profile_create)}><LuEdit2 style={{ fontSize: "1.2rem", color: "#ff1d4e" }} /></span>
            <img className="inline-block w-full" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" style={{ height: "16rem", borderBottomLeftRadius: "20px", borderBottomRightRadius: "20px" }} />
        </div>
      <div className="p-2">
      <div className="mt-3">
            <p className="font-regular text-secondary-200 text-2xl">Prasath , 20</p>
            <p className="font-regular text-secondary-100 text-md">chennai</p>
        </div>
         <div className="mt-3">
            <p className="font-regular text-secondary-200 text-md">About Me</p>
            <div className="mt-1">
                <span className="text-sm font-regular text-secondary-100">Music</span>
            </div>
        </div>
        <div className="mt-3">
            <p className="font-regular text-secondary-200 text-md">Gender</p>
            <div className="mt-1">
                <span className="text-sm font-regular bg-primary-100 rounded-lg p-2 text-secondary-100">Male</span>
            </div>
        </div>
        <div className="mt-3">
            <p className="font-regular text-secondary-200 text-md">Interests</p>
            <div className="mt-1">
                <span className="text-sm font-regular text-secondary-100">Music</span>
            </div>
        </div>
        <div className="mt-3">
            <p className="font-regular text-secondary-200 text-md">Location</p>
            <div className="mt-1">
                <span className="text-sm font-regular text-secondary-100">Music</span>
            </div>
        </div>
      </div>

    </div>
    )
}