import { BiSearch } from "react-icons/bi"
import { Networkcall } from "../../networkcall"
import { useContext, useEffect, useState } from "react"
import { config } from "../../config"
import { TiTick } from "react-icons/ti";
import { GrFormClose } from "react-icons/gr";
import { BsArrowLeftSquareFill, BsArrowRightSquareFill } from "react-icons/bs";
import { ImageUpload } from "../profile/imageupload";
import { multiFileUpload } from "../../utilities";
import { Button } from "../../components";
import { AlertContext, ImageUploadFunction, stringAvatar } from "../../constant";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../router/routes";

export const GroupCreate = () => {
    const [list, setList] = useState([])
    const [selected, setSelected] = useState([])
    const [is_called, setIsCalled] = useState(false)
    const [step, setStep] = useState(0)
    const [loading, setLoading] = useState(false)


    const [state, setState] = useState({
        file: "",
        file_upload: "",
        name:""
    })

    const alert = useContext(AlertContext);
    const navigate = useNavigate();

    const searchFunction = (search) => {
        setTimeout(() => {
            getList(search?.target?.value)
        }, 2000)
    }
    const getList = (search) => {
        setIsCalled(true)

        Networkcall({
            url: `${config?.api_url}/users`,
            method: "POST",
            isAuthorized: true,
            body: {
                search: search ?? undefined
            }
        }).then((data) => {
            setList(data?.data)
        }).catch(() => {
            setIsCalled(false)

            alert.setSnack({
                ...alert,
                show: true,
                message: "Some thing went worng",
                type: "error"
            });
        })
    }

    const choose = (data) => {
        if (selected?.map((x) => x?.id).includes(data?.id)) {
            setSelected(selected?.filter((x) => x?.id !== data?.id))
        }
        else {
            setSelected([...selected, data])

        }
    }
    const onDelete = (data) => {
        setSelected(selected?.filter((x) => x?.id !== data?.id))

    }
    const ImageUploadFun = async (e) => {
        const image = await multiFileUpload(e?.target?.files[0])
        setState({
            ...state,
            file: image,
            file_upload: e?.target?.files[0]
        })

    }
    const deleteImg = () => {
        setState({
            ...state,
            file: "",
            file_upload: ""
        })

    }

    const groupCreate=async(image)=>{
             await Networkcall({
                url: `${config?.api_url}/message/group/create`,
                method: "POST",
                isAuthorized:true,
                body:{
                    name:state?.name,
                    logo:image ?? undefined,
                    users:selected?.map((x)=>x?.id)
                }
            }).then((data) => {
                if(data?.data?.type === "error"){
                    setLoading(false)
                    return  alert.setSnack({
                        ...alert,
                        show: true,
                        message: "Group already exists",
                        type: "error"
                    });
                }
                navigate(AppRoutes?.chat)
                setLoading(false)

            }).catch(() => {
                setLoading(false)
                alert.setSnack({
                    ...alert,
                    show: true,
                    message: "Some thing went worng",
                    type: "error"
                });
            })
    }
    const createGroup = async () => {
        if(validate()){
            setLoading(true)
            if(state?.file_upload){
                ImageUploadFunction(state?.file_upload , groupCreate , alert)
            }
            else{
                groupCreate()
            }
        }
        else{
            alert.setSnack({
                ...alert,
                show: true,
                message: "Name is required",
                type: "error"
            });
        }
        
    }
    const validate = () => {
        let is_validate = true
        if (!state?.name?.length) {
            is_validate = false
        }
        return is_validate
    }
    useEffect(() => {
        if (!is_called) {
            getList()
        }
    }, [])

    return (
        <div style={{ position: "relative" }}>
            <p className="antialiased m-0 text-xl text-secondary-200 font-regular pt-2 px-2">Create Group</p>

            {
                step === 0 ? <>
                    {

                        <div>
                            <div className="p-2" >
                                <div className="rounded-md relative bg-contract-100 flex items-center px-2">
                                    <BiSearch style={{ fontSize: "1.5rem", color: "#ff1d4e" }} />
                                    <input onChange={searchFunction} className="rounded-md w-full border-none px-3.5 py-2.5 text-sm bg-contract-100 text-primary-500 placeholder:text-sm font-regular focus: focus:ring-inset focus:none sm:text-sm  focus-visible:outline-none" placeholder="Search" />
                                </div>
                            </div>
                            <div style={{height:"calc(100vh - 603px)" , overflow:"auto"}}>
                            {
                                selected?.length > 0
                                &&
                                <div className="flex gap-3 p-2" style={{ overflowX: "auto" , overflowY:"hidden" , flexFlow:"wrap"}}>
                                    {
                                        selected?.map((x, i) => {
                                            return (
                                                <div key={i} className="relative">
 {
                                                    x?.image_url ? <img className="inline-block h-14 w-14 rounded-full" src={x?.image_url} alt="" /> : <div style={{backgroundColor:stringAvatar(x?.username)?.bgcolor , height:"60px" , width:"60px" , borderRadius:"50%" , color:"#fff"}} className="font-bold flex items-center justify-center">{stringAvatar(x?.username)?.children}</div>
                                                }
                                                                                                   <div style={{ background: "#ff1d4e", borderRadius: "50%", padding: "4px", position: "absolute", bottom: "-5px", right: "0px", cursor: "pointer" ,color:"#fff"}} id="delete_img" onClick={() => onDelete(x)}>
                                                        <GrFormClose style={{ color: "#fff important", fontSize: "1rem" }} />
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            }
                            </div>

                        </div>
                    }
                    <div className="p-2" style={{ height: 'calc(100vh - 224px)', overflow: "auto" }}>
                        {
                            list?.map((x, i) => {
                                return (
                                    <div className="p-2 bg-contract-100 mb-3 rounded-md flex items-center justify-between cursor-pointer" key={i} onClick={() => choose(x)}>
                                        <div className="flex items-center gap-4">
                                        {
                                                    x?.image_url ? <img className="inline-block h-8 w-8 rounded-full" src={x?.image_url} alt="" /> : <div style={{backgroundColor:stringAvatar(x?.username)?.bgcolor , height:"31px" , width:"31px" , borderRadius:"50%" , color:"#fff"}} className="font-bold flex items-center justify-center">{stringAvatar(x?.username)?.children}</div>
                                                }
                                               
                                            <div>
                                                <p className="font-regular text-secondary-200 text-sm">{x?.username}</p>
                                            </div>
                                        </div>
                                        <div>
                                            {
                                                selected?.map((v) => v?.id)?.includes(x?.id) ? <><TiTick style={{ fontSize: "1rem", color: "#ff1d4e" }} /></> : ""
                                            }
                                        </div>

                                    </div>
                                )
                            })
                        }
                    </div></> :
                    <div  className="p-2 relative" >
                        <ImageUpload value={state?.file} onChange={(e) => ImageUploadFun(e)} deleteImg={deleteImg} is_title={false} />
                        <div className="p-2" ></div>
                        <input onChange={(e)=>{
                            setState({
                                ...state,
                                name:e?.target?.value
                            })
                        }} className="rounded-md w-full border-none px-3.5 py-2.5 text-sm bg-contract-100 text-primary-500 placeholder:text-sm font-regular focus: focus:ring-inset focus:none sm:text-sm  focus-visible:outline-none" placeholder="Name" />
                        <div className="p-2" ></div>
                        <p className="antialiased m-0 text-sm text-secondary-200 font-regular flex items-center gap-1">Total Members <span className="antialiased m-0 text-xl text-secondary-200 font-regular">({selected?.length})</span></p>
                        <div className="p-2" style={{ overflow: "auto" ,height:'calc(100vh - 364px)'}}>
                            {
                                selected?.map((x, i) => {
                                    return (
                                        <div className="p-2 bg-contract-100 mb-3 rounded-md flex items-center justify-between cursor-pointer" key={i}>
                                            <div className="flex items-center gap-4">
                                                {
                                                    x?.image_url ? <img className="inline-block h-8 w-8 rounded-full" src={x?.image_url} alt="" /> : <div style={{backgroundColor:stringAvatar(x?.username)?.bgcolor , height:"31px" , width:"31px" , borderRadius:"50%" , color:"#fff"}} className="font-bold flex items-center justify-center">{stringAvatar(x?.username)?.children}</div>
                                                }
                                               
                                                <div>
                                                    <p className="font-regular text-secondary-200 text-sm">{x?.username}</p>
                                                </div>
                                            </div>

                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div style={{ position: "absolute", bottom: "8px", left: "12px" }}>
                            <BsArrowLeftSquareFill style={{ fontSize: '3rem', color: "#ff1d4e", cursor: "pointer" }} onClick={() =>{
                                    setStep(step - 1)
                                 }} />

                        </div>
                    </div>
            }
            {
                step === 0 ?
                    selected?.length > 0 &&
                    <div style={{ position: "absolute", bottom: "12px", right: "12px" }}>
                        <BsArrowRightSquareFill style={{ fontSize: '3rem', color: "#ff1d4e", cursor: "pointer" }} onClick={() => setStep(step + 1)} />

                    </div>
                    :
                    <div className="p-2">
                        <Button text={'create'} onClick={createGroup} loading={loading}/>
                    </div>
            }

        </div>
    )
}