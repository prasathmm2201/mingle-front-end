/* eslint-disable no-unsafe-optional-chaining */
import { useState } from "react"
import { ImageUpload } from "./imageupload"
import { Button } from "../../components";
import { multiFileUpload } from "../../utilities";
import { ImageUploadFunction, LocalStoragekeys } from "../../constant";
import { Networkcall } from "../../networkcall";
import { config } from "../../config";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../router/routes";
import { RiLoader2Line } from "react-icons/ri";



export const ProfileCreation = () => {
    const navigate = useNavigate()
    const [state, setState] = useState({
        gender: "Male",
        step: 1,
        file: "",
        file_upload: "",
        categories: [],
        location: {}
    })
    const [loading, setLoading] = useState(false)


    const ImageUploadFun = async (e) => {
        const image = await multiFileUpload(e?.target?.files[0])
        setState({
            ...state,
            file: image,
            file_upload: e?.target?.files[0]
        })

    }

    const signUp = async (image) => {
        setLoading(true)
    
        await Networkcall({
            url: `${config?.api_url}/auth/sign_up`,
            method: "POST",
            body: {
                id: localStorage.getItem(LocalStoragekeys?.user_id),
                image_url: image ?? null,
                is_verified: true,
                is_token:true
            },
            isAuthorized: true

        }).then((data) => {
            setLoading(false)
            if (data?.data?.type === "success") {
                localStorage.setItem(LocalStoragekeys?.token, data?.data?.data)
                navigate(AppRoutes?.chat)
            }
            else {
                navigate(AppRoutes?.welcome)

            }
        }).catch((err) => {
            setLoading(false)
            console.log(err)

        })




    }




    const updateProfile = async () => {
        if (localStorage.getItem(LocalStoragekeys?.user_id)) {
            if (state?.file) {
                setLoading(true)
                ImageUploadFunction(state?.file_upload, signUp)
            }
            else {
                navigate(AppRoutes?.chat)
            }

        }


    }

    const deleteImg = () => {
        setState({
            ...state,
            file: "",
            file_upload: ""
        })

    }
    return (
        <div className="relative">
            <div className="flex justify-end items-center p-2  w-full top-0 left-0 right-0 bg-primary-100">
                {
                    loading ? <RiLoader2Line style={{color:"#ff1d4e",fontSize:"1rem"}}/> :  <p className="text-primary-500 font-bold text-xs float-right flex cursor-pointer" onClick={()=>signUp()}>Skip</p>

                }


            </div>
            <div className="profile_section p-2">
                <ImageUpload value={state?.file} onChange={(e) => ImageUploadFun(e)} deleteImg={deleteImg} />
            </div>
            {
                state?.file &&
                <div className="p-2  w-full bottom-0 left-0 right-0 bg-primary-100">
                    <Button text={'Submit'} onClick={updateProfile} loading={loading} />


                </div>
            }

        </div>
    )
}