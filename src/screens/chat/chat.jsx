import { BiSearch } from "react-icons/bi"
// import { AppRoutes } from "../../router/routes"
import { Networkcall } from "../../networkcall";
import { config } from "../../config";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../router/routes";
import { AlertContext, LocalStoragekeys, TimeDiffBetweenDates, stringAvatar } from "../../constant";
import { useSocket } from "../../socket";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { Button, Loader } from "../../components";
import { VideCallPopUp } from "../../components/videoCallPopup";
import jwtDecode from "jwt-decode";

export const Chat = () => {
    const navigate = useNavigate();
    const alert = React.useContext(AlertContext);
    const socket = useSocket();
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(false)
    const [newMessage, setNewMessage] = useState([])
    const [newMessageData, setNewMessageData] = useState([])
    const [isVideoCall, setVideoCall] = useState({
        data: null,
        bool: false,
        type: ""
    });
    const [isOnline, setIsOnline] = useState([])
    const [searchText, setSearchText] = useState("")
    const use_data = jwtDecode(localStorage.getItem(LocalStoragekeys?.token))

    const orderBy = (id) => {
        const movedObjectIndex = list.findIndex(item => item.id === id);
        console.log(movedObjectIndex, 'movedObjectIndex')

        if (movedObjectIndex !== -1) {
            const movedObject = list.splice(movedObjectIndex, 1)[0];
            list.unshift(movedObject);
        }
    }
    const gotoChat = (data) => {
        navigate(AppRoutes?.chatpage, { state: data })
    }
    const createGroup = () => {
        navigate(AppRoutes?.group_create)

    }
    const getList = (search) => {
        setLoading(true)
        Networkcall({
            url: `${config?.api_url}/message/get_all_message`,
            method: "POST",
            isAuthorized: true,
            body: {
                search: search ?? undefined
            }
        }).then((data) => {
            setLoading(false)
            setList(data?.data)

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

    const searchFunction = (search) => {
        setSearchText(search?.target?.value)
    }

    const disconnect = ()=>{
        // socket.disconnect()
        socket.emit('disconnect_online', localStorage.getItem(LocalStoragekeys?.user_id))

    }

    useEffect(() => {
        if (socket) {
            socket.emit('setNickname', localStorage.getItem(LocalStoragekeys?.token));
            socket.on("user_connected", (data) => {
                console.log(data, 'data')
                setIsOnline(data)
            })
            socket.on("user_disconnected", (data) => {
                setIsOnline(data)
            })
            socket.on('privateMessage', (data) => {
                setNewMessage((prevMessages) => [...prevMessages, data?.user?.user_id]);
                setNewMessageData((prevMessages) => [...prevMessages, data])
                orderBy(data?.user?.user_id)
            });
            socket.on("groupMessageChat", (data) => {
                setNewMessage((prevMessages) => [...prevMessages, data?.user_id]);
                setNewMessageData((prevMessages) => [...prevMessages, data])
                orderBy(data?.user?.user_id)
            })
            socket.on('createGroup', (data) => {
                console.log(data, 'data')
                setList((prevMessages) => [data, ...prevMessages])

            })
            socket.on('live-call', (data) => {
                setVideoCall({
                    data: data,
                    bool: true,
                    type: "accept"
                })
            })

        }
        return () => {
            if (socket) {
                disconnect()
            }
        };
    }, [socket]);


    React.useLayoutEffect(() => {
        getList()
    }, [])

    const onAccept = () => {
        navigate(AppRoutes?.chatpage, { state: { ...isVideoCall?.data?.send_state, is_page: true } })

    }

    const decline = () => {
        socket.emit('end_call', { user: use_data, peer_id: "", room_id: isVideoCall?.data?.sender, type: "decline" })
        setVideoCall({
            bool: false,
            data: null,
            type: ""
        })
    }
    const logout =()=>{
        navigate(AppRoutes?.welcome)

        localStorage.clear();

    }

    // console.log(isOnline , 'isOnline')
    return (
        <div style={{ position: "relative" }}>
            <p className="antialiased m-0 text-xl text-secondary-200 font-regular pt-2 px-2">Conversations</p>
            <Button text={'Log Out'} onClick={logout}/>

            <div className="p-2" >
                <div className="rounded-md relative bg-contract-100 flex items-center px-2">
                    {/* <button onClick={disconnect}>sss</button> */}
                    <BiSearch style={{ fontSize: "1.5rem", color: "#ff1d4e" }} />
                    <input onChange={searchFunction} className="rounded-md w-full border-none px-3.5 py-2.5 text-sm bg-contract-100 text-primary-500 placeholder:text-sm font-regular focus: focus:ring-inset focus:none sm:text-sm  focus-visible:outline-none" placeholder="Search" />
                </div>
            </div>
            {
                loading ?
                    <div className="border-b-1 border-secondary-500 p-4">
                        <Loader height={`calc(100vh - 127px)`} />
                    </div >
                    :
                    <div className="border-b-1 border-secondary-500 p-4" id="chat_border" >
                        {
                            list?.length ? list?.filter(_ => _.username.toLowerCase().includes(searchText?.toLowerCase())).map((x, i) => {
                                return (
                                    <div className="p-2 bg-contract-100 mb-3 rounded-md flex items-center justify-between cursor-pointer" key={i} onClick={() => gotoChat(x)}>
                                        <div className="flex items-center gap-4">
                                            <div className="relative">
                                                {
                                                    x?.image_urls ? <img className="inline-block h-8 w-8 rounded-full" src={x?.image_urls} alt="" /> : <div style={{ backgroundColor: stringAvatar(x?.username)?.bgcolor, height: "31px", width: "31px", borderRadius: "50%", color: "#fff" }} className="font-bold flex items-center justify-center">{stringAvatar(x?.username)?.children}</div>

                                                }
                                                {
                                                    isOnline?.includes(x?.id) ? <div style={{background:"green", borderRadius:"50%" , width:"10px" , height:"10px" , position:"absolute" ,right:"0px" , bottom:"0px"}}></div> : <div style={{border:"1px solid grey" , borderRadius:"50%" , width:"10px" , height:"10px" , position:"absolute" ,right:"0px" , bottom:"0px" , background:"#fff"}}></div>
                                                }
                                            </div>

                                            <div>
                                                <p className="font-regular text-secondary-200 text-sm">{x?.username}</p>
                                                <p className="font-regular text-secondary-100 text-xs">{x?.previous_message}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-primary-500 font-regular text-xs">{newMessage.includes(x?.id) ? TimeDiffBetweenDates(new Date(newMessageData?.find((v) => v?.user?.user_id || x?.user_id === x?.id)?.created_at), new Date()) : x?.created_at ? TimeDiffBetweenDates(new Date(x?.created_at), new Date()) : ""}</p>
                                            {
                                                newMessage.includes(x?.id) ? (
                                                    <div className="rounded-full w-5 h-5 font-bold text-xs bg-primary-500 text-contract-100 flex items-center justify-center m-auto">
                                                        {Number(x?.count ?? 0) + newMessage?.filter((v) => v === x?.id)?.length}
                                                    </div>
                                                ) : x?.count > 0 && (
                                                    <div className="rounded-full w-5 h-5 font-bold text-xs bg-primary-500 text-contract-100 flex items-center justify-center m-auto">
                                                        {x?.count}
                                                    </div>
                                                )

                                            }
                                        </div>
                                    </div>
                                )
                            }) : ""
                        }
                    </div>
            }

            <div style={{ position: "absolute", bottom: "12px", right: "12px", background: "#ff1d4e", borderRadius: "50%", padding: "12px", cursor: "pointer" }} onClick={createGroup}>
                <AiOutlineUsergroupAdd style={{ fontSize: "2rem", color: "#fff" }} />
            </div>

            {
                isVideoCall?.bool &&
                <VideCallPopUp
                    decline={decline}
                    text={"is invited a video call"}
                    onAccept={onAccept} type={isVideoCall?.type}
                    bool={isVideoCall?.bool} data={isVideoCall?.data?.use_data || isVideoCall?.data} onOpen={() => {
                        setVideoCall({
                            bool: false,
                            data: null,
                            type: ""
                        })
                    }} />
            }

        </div>

    )
}