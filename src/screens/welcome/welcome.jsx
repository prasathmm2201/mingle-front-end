import { Button, TextBox } from "../../components"
import { GoolgeComponent } from "../../assets"
import React, { useEffect, useState } from "react"
import { Networkcall } from "../../networkcall"
import { config } from "../../config"
import { AlertContext, LocalStoragekeys } from "../../constant"
import { useNavigate } from "react-router-dom"
import { AppRoutes } from "../../router/routes"

export const Welcome = () => {
    const alert = React.useContext(AlertContext);
    const navigate = useNavigate()
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const status = params.get('status');
    const [loading , setLoading]=useState(false)
    

    const [state, setState] = useState({
        email: "",
        password: ""
    })

    const updateState = (key, value) => {
        setState({ ...state, [key]: value })
    }
    const validate = () => {
        let is_validate = true
        if (!state?.email?.length) {
            is_validate = false
        }
        return is_validate
    }
    const goLogin = async () => {
        if (validate()) {
            console.log(state?.email , 'state?.email')
            setLoading(true)
            await Networkcall({
                url: `${config?.api_url}/auth/login`,
                method: "POST",
                body: {
                    username: state?.email,
                },
                isAuthorized:true
            }).then((data) => {
                setLoading(false)
                localStorage.setItem(LocalStoragekeys?.token, data?.data?.data)
                localStorage.setItem(LocalStoragekeys?.user_id, data?.data.user_id)
                if(!data?.data?.is_verified) return navigate(AppRoutes?.profile_create)
                navigate(AppRoutes?.chat)

            }).catch(() => {
                navigate(AppRoutes?.welcome)
                setLoading(false)
                alert.setSnack({
                    ...alert,
                    show: true,
                    message: "User or Email Don't Exists",
                    type: "error"
                });
            })


        }
        else {
            alert.setSnack({
                ...alert,
                show: true,
                message: "Enter a Email",
                type: "error"
            });
        }

    }
    const signUpWithGoogle = async () => {
        window.location.href = 'https://accounts.google.com/o/oauth2/auth?' +
            'client_id=469154705156-2jgt3b6ae00q6g9kesj28rfu4gq8a3nh.apps.googleusercontent.com' +
            '&redirect_uri=http://localhost:6060/google/callback' +
            '&response_type=code' +
            '&scope=openid%20email%20profile';
    }
    const register = () => {
        navigate(AppRoutes?.register)
    }

    useEffect(() => {
        if (status) {
            alert.setSnack({
                ...alert,
                show: true,
                message: status === "1" ? "Email Already Exists" : "Something Went Wrong",
                type: "error"
            });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status]);
  
    useEffect(() => {
        navigate({ search: "" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);



    return (
        <div className="h-full p-4 relative text-center">
            {/*  text */}
            <div className="text-left mt-4">
                <p className="antialiased m-0 text-3xl text-secondary-200 font-regular">Best Social App To</p>
                <p className="antialiased m-0 text-3xl text-secondary-200 font-regular">Make New Friends</p>

                <p className="antialiased m-0 text-sm text-secondary-500 font-regular">Find People With Same Interest As You</p>

            </div>
            <div className="flex justify-items-center items-center text-center my-4">
                <img src="/app_logo.png" className="w-50 mx-auto" />
            </div>


            <div className="flex flex-col space-y-2 my-4">
                <TextBox placeholder="Email address" value={state?.email} onChange={(e) => updateState('email', e.target.value)} />
                <Button onClick={goLogin} text={'Login'} loading={loading}/>
            </div>

            <div>
                <p className="antialiased m-0 text-xs text-secondary-100 font-regular">Don't have an account?<span className="antialiased text-xs text-primary-500 font-regular m-1 cursor-pointer" onClick={register}>Sign up</span></p>
            </div>

            {/* border */}
            <div className="flex flex-row  justify-between items-center my-4 ">
                <div className="border-b-2  border-secondary-300 h-0.5 w-full"></div>
                <span className="antialiased m-0 text-xs text-secondary-100 font-regular mx-1">or</span>
                <div className="border-b-2  border-secondary-300 h-0.5 w-full"></div>
            </div>

            {/* sign up */}
            <button className="text-center w-full px-3.5 py-2.5 bg-contract-100 rounded-md my-4" onClick={signUpWithGoogle}>
                <span className="flex space-x-2 text-center items-center  mx-auto w-fit">
                    <div className="w-4 h-4"><GoolgeComponent /></div>
                    <p className="antialiased m-0 text-xs text-secondary-100 font-regular mx-1">Continue with Google</p>
                </span>
            </button>
        </div>
    )
}