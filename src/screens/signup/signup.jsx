import { useContext, useState } from "react";
import { Button, TextBox } from "../../components"
import { config } from "../../config";
import { AlertContext } from "../../constant";
import { Networkcall } from "../../networkcall";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../router/routes";

export const SignUp=()=>{
    const alert = useContext(AlertContext);
    const navigate = useNavigate()
    const [state , setState]=useState({
        email:"",
        password:"",
        username:""
    })
    const [loading, setLoading] = useState(false)



    const updateState=(key , value)=>{
        setState({...state , [key]:value})
    }

    const validate=()=>{
      let is_validate = true
      if(!state?.email?.length){
        is_validate=false
      }
      if(!state?.password?.length){
        is_validate=false
      }
      if(!state?.username?.length){
        is_validate=false
      }
      return is_validate
    }

    const goLogin = async () => {
        if(validate()){
            setLoading(true)
            await Networkcall({
                    url:`${config?.api_url}/auth/sign_up`,
                    method:"POST",
                    body:{
                        username:state?.username,
                        password:state?.password,
                        email_id:state?.email
                    },
                    isAuthorized:true

                }).then(()=>{
                    setLoading(false)
                        navigate(AppRoutes?.welcome)                    
                }).catch((err)=>{
                    console.log(err)
                    setLoading(false)
                    alert.setSnack({
                        ...alert,
                        show: true,
                        message: "Enter all felids",
                        type:"error"
                      });
                })
                
          
        }
        else{
            alert.setSnack({
                ...alert,
                show: true,
                message: "Enter all felids",
                type:"error"
              });
        }
      
    }

    return(
        <div className="h-full p-4 relative text-center">
      
        <div className="flex justify-items-center items-center text-center">
            <img src="/signup.jpg" className="w-50 mx-auto" />
        </div>
        <div className="text-left ">
            <p className="antialiased m-0 text-xl text-secondary-200 font-bold">Register</p>
            <p className="antialiased m-0 text-sm text-secondary-500 font-regular">Create your account</p>

        </div>


        <div className="flex flex-col space-y-2 my-4">
            <TextBox placeholder="User Name" value={state?.username} onChange={(e)=>updateState('username',e.target.value)}/>
            <TextBox placeholder="Email address" value={state?.email} onChange={(e)=>updateState('email',e.target.value)}/>
            <TextBox placeholder="Password" type="password" value={state?.password} onChange={(e)=>updateState('password',e.target.value)}/>

            <Button onClick={goLogin} text={'Register'} loading={loading}/>
        </div>
    </div>
    )
}