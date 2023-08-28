import { IoIosCall, IoMdSend } from "react-icons/io";
import { HiArrowSmallLeft } from "react-icons/hi2";
import { FaVideo } from "react-icons/fa";
import { BsEmojiSmile, BsPaperclip, BsStopCircle } from "react-icons/bs";
import { AiFillAudio, AiFillDelete } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";
import { AppRoutes } from "../../router/routes";
import { useContext, useEffect, useRef, useState } from "react";
import { AlertContext, LocalStoragekeys, stringAvatar } from "../../constant";
import jwtDecode from "jwt-decode";
import { getTime } from "../../utilities/helper";
import { useSocket } from "../../socket";
import { config } from "../../config";
import { Networkcall } from "../../networkcall";
import { AudioPlayer, Button, Loader } from "../../components";
import { RiLoader2Line } from "react-icons/ri";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import Peer from 'peerjs';
import { VideCallPopUp } from "../../components/videoCallPopup";
import { MdCameraswitch } from "react-icons/md";

export const ChatPage = () => {
    const navigate = useNavigate()
    const peers = {}
    const alert = useContext(AlertContext);
    const socket = useSocket();
    const { state } = useLocation();
    const [msg, setMsg] = useState("")
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState([]);
    const [offset, setOffset] = useState({
        offset: 0,
        scroll: 0
    })
    const [isLoading, setIsLoading] = useState({
        initial: false,
        isLoading: false
    });
    const [currentTime, setCurrentTime] = useState(0);
    const contentContainerRef = useRef();
    const [bool, setBool] = useState(false);
    const [recording, setRecording] = useState(false);
    const [audioBlob, setAudioBlob] = useState(null);
    const mediaRecorderRef = useRef(null);
    const intervalRef = useRef(null);
    const [recordingTime, setRecordingTime] = useState(0);
    const [isVideoCall, setVideoCall] = useState({
        data: null,
        bool: false,
        type: ""
    });
    const peerInstance = useRef(null);
    const [connectionID, setConnectionID] = useState(null);
    const [isvideo, setIsVideo] = useState(false);
    const [videoElements, setVideoElements] = useState([]);
    const videoGridRef = useRef();
    const [cameraStream, setCameraStream] = useState(null);
    const use_data = jwtDecode(localStorage.getItem(LocalStoragekeys?.token))
    const [facingMode, setFacingMode] = useState('user'); // 'user' for front camera, 'environment' for back camera
    const [peerID, setPeerID] = useState(null);

    const sendMessage = () => {
        socket.emit('privateMessage', { user_id: state?.id, user: use_data, message: msg, created_at: Date.now(), audio: audioBlob });
        setMessages([...messages, { user_id: state?.id, user: use_data, message: msg, created_at: Date.now(), audio: audioBlob }]);
        setMsg("")
        setAudioBlob(null)
        scrollPage()
        createMessage({ receivers: [state?.id], user: use_data, message: msg, created_at: new Date(), audio: audioBlob })
    }

    const createGroupChat = () => {
        setRecording(false)
        socket.emit('groupchatMessage', { user_id: state?.id, message: msg, user: use_data, created_at: Date.now(), members: state?.members?.map((x) => x?.user), audio: audioBlob });
        // setMessages([...messages, { user_id: state?.id, user: use_data, message: msg, created_at: Date.now() }]);
        setMsg("")
        setAudioBlob(null)
        scrollPage()
        createMessage({ group_id: state?.id, message: msg, user: use_data, created_at: new Date(), audio: audioBlob })
    }

    const createMessage = (data) => {
        Networkcall({
            url: `${config?.api_url}/message/create`,
            method: "POST",
            isAuthorized: true,
            body: data
        }).then((data) => {
            console.log(data?.data)

        }).catch(() => {
            alert.setSnack({
                ...alert,
                show: true,
                message: "Some thing went worng",
                type: "error"
            });
        })
    }

    const getMessage = async (payload) => {
        setIsLoading({
            initial: payload?.initial ? true : false,
            isLoading: payload?.initial ? false : true
        })
        await Networkcall({
            url: `${config?.api_url}/message/get_message`,
            method: "POST",
            isAuthorized: true,
            body: {
                receiver_id: [state?.id],
                offset: payload?.offset
            }
        }).then((data) => {
            setIsLoading({
                initial: false,
                isLoading: false
            })
            setMessages(messages?.concat(data?.data))
            setNewMessage(data?.data)
            if (payload?.initial) scrollPage()

        }).catch((err) => {
            console.log(err, 'err')

            setIsLoading({
                initial: false,
                isLoading: false
            })
            alert.setSnack({
                ...alert,
                show: true,
                message: "Some thing went worng",
                type: "error"
            });
        })
    }
    const getGroupMessage = async (payload) => {
        setIsLoading({
            initial: payload?.initial ? true : false,
            isLoading: payload?.initial ? false : true
        })
        await Networkcall({
            url: `${config?.api_url}/message/get_group_message`,
            method: "POST",
            isAuthorized: true,
            body: {
                group_id: state?.id,
                offset: payload?.offset
            }
        }).then((data) => {
            setIsLoading({
                initial: false,
                isLoading: false
            })
            setMessages(messages?.concat(data?.data))
            setNewMessage(data?.data)
            if (payload?.initial) scrollPage()


        }).catch((err) => {
            console.log(err, 'err')
            setIsLoading({
                initial: false,
                isLoading: false
            })
            alert.setSnack({
                ...alert,
                show: true,
                message: "Some thing went worng",
                type: "error"
            });
        })
    }

    const unreadMessage = () => {

        Networkcall({
            url: `${config?.api_url}/message/create`,
            method: "POST",
            isAuthorized: true,
            body: {
                is_unread: newMessage?.filter((x) => x?.is_unread === true)?.map((x) => {
                    return {
                        message: x?.id,
                        user: localStorage.getItem(LocalStoragekeys?.user_id)
                    }
                })
            }
        }).then((data) => {
            console.log(data)
            //   window.scrollTo(0, document.body.scrollHeight);
        }).catch(() => {
            alert.setSnack({
                ...alert,
                show: true,
                message: "Some thing went worng",
                type: "error"
            });
        })
    }
    const scrollPage = () => {
        console.log(contentContainerRef.current, "ldldld")
        if (contentContainerRef.current) {
            const maxScrollPosition = contentContainerRef.current.scrollHeight - (contentContainerRef.current.clientHeight + 10);
            contentContainerRef.current.scrollTop = maxScrollPosition;
            // setScrollPosition(maxScrollPosition);

            // console.log('scrollPage')
            // const myDiv = document?.getElementById('content');
            // const maxScrollPosition = myDiv.scrollHeight - (myDiv.clientHeight + 10);
            // myDiv.scrollTop = maxScrollPosition;
        }

    }

    useEffect(() => {
        console.log(newMessage?.filter((x) => x?.is_unread === true)?.length > 0, 'newMessage?.filter((x)=>x?.is_unread === true)?.length > 0')
        if (newMessage?.filter((x) => x?.is_unread === true)?.length > 0) {
            unreadMessage()

        }
    }, [newMessage])

    useEffect(() => {
        if (state?.is_group) {
            getGroupMessage({
                initial: true
            })
            setIsVideo(state?.is_page ? true : false)
        } else {
            getMessage({
                initial: true
            })
            setIsVideo(state?.is_page ? true : false)
        }
    }, [state])

    useEffect(() => {
        if (socket) {
            if (state?.is_group) {
                socket.emit('setNickname', localStorage.getItem(LocalStoragekeys?.token));

                socket.emit('joinRoom', state?.id);

                socket.on('roomJoined', (room) => {
                    console.log(`Joined room: ${room}`);
                });

                socket.on('groupchatMessage', (data) => {
                    scrollPage()
                    setMessages((prevMessages) => [...prevMessages, data]);

                });

            }
            else {
                socket.emit('setNickname', localStorage.getItem(LocalStoragekeys?.token));
                socket.on("user_connected", (data) => {
                    console.log(data, 'user_connected')
                })
                socket.on("user_disconnected", (data) => {
                    console.log(data, 'user_disconnected')
                })
                socket.on('privateMessage', (data) => {
                    scrollPage()
                    setMessages((prevMessages) => [...prevMessages, data]);

                });
            }
            socket.on('user-disconnected', ({ peer_id, user, type }) => {
                console.log(isvideo, 'isvideo')
                    if (isvideo) {
                        setVideoCall({
                            data: user,
                            bool: true,
                            type: type ? "decline" : "call_end",
                        })
                        if (peers[peer_id]) peers[peer_id].close()
                    }
                

            })
            socket.on("live-call", (data) => {
                setConnectionID(data?.sender)
                setVideoCall({
                    data: data,
                    bool: true,
                    type: "accept"
                })
            })
        }
    }, [socket]);


    const fetchData = (offset) => {
        console.log(offset, '--->')
        if (state?.is_group) {
            getGroupMessage({
                offset: offset
            })
        } else {
            getMessage({
                offset: offset
            })

        }
    };

    const handleScroll = () => {
        const container = contentContainerRef.current;
        if (container.scrollTop === 0) {
            if (container.scrollHeight !== offset?.scroll) {
                fetchData(offset?.offset + 10);
                setOffset({
                    offset: offset?.offset + 10,
                    scroll: container.scrollHeight
                })
            }
        }
    };
    const onChange = (v) => {
        setBool(!bool)
        setMsg(msg + v.native);
    }
    const startRecording = () => {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then((stream) => {
                const mediaRecorder = new MediaRecorder(stream);
                mediaRecorderRef.current = mediaRecorder;

                const audioChunks = [];

                mediaRecorder.ondataavailable = (event) => {
                    if (event.data.size > 0) {
                        audioChunks.push(event.data);
                    }
                };

                mediaRecorder.onstop = async () => {
                    const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
                    const arrayBuffer = await audioBlob.arrayBuffer();
                    const base64Data = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
                    setAudioBlob(base64Data);
                };

                mediaRecorder.start();
                setRecording(true);
                intervalRef.current = setInterval(updateRecordingTime, 1000);

            })
            .catch((error) => {
                console.error('Error accessing microphone:', error)
                alert.setSnack({
                    ...alert,
                    show: true,
                    message: "Doesn't accessing microphone",
                    type: "error"
                });
            });
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
            mediaRecorderRef.current.stop();
            setRecording(false);
        }
    };
    const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    };

    const updateRecordingTime = () => {
        setRecordingTime((prevTime) => prevTime + 1);
    };

    const clickVideoCall = () => {
        setIsVideo(true)
        socket.emit('live-call', { sender: state?.id, use_data, is_group: state?.is_group, members: state?.members?.map((x) => x?.user), send_state: state })
    }


    function connectToNewUser(userId, stream) {
        const call = peerInstance?.current?.call(userId, stream)
        const video = document.createElement('video')
        call.on('stream', userVideoStream => {
            addVideoStream(video, userVideoStream, false, userId)
        })
        call.on('close', () => {
            console.log("close")
            video.remove()
        })

        peers[userId] = call
    }

    function addVideoStream(video, stream, is_current_user, peer_id) {
        video.srcObject = stream;
        video.addEventListener('loadedmetadata', () => {
            video.play();
        });
        setVideoElements(prevVideoElements => [...prevVideoElements, { video, is_current_user: is_current_user ?? false, peer_id }]);
        // videoGridRef.current.appendChild(video);
    }

    const onAccept = () => {
        setVideoCall({
            data: "",
            bool: false,
            type: ""
        })
        setIsVideo(true)
    }

    const decline = () => {
        socket.emit('end_call', { user: use_data, peer_id: peerID, room_id: connectionID ? connectionID : state?.id, type: "decline" })
        setVideoCall({
            data: "",
            bool: false,
            type: ""
        })
        setIsVideo(false)
    }

    const handleDisconnectClick = () => {
        socket.emit('end_call', { user: use_data, peer_id: peerID, room_id: connectionID ? connectionID : state?.id })
        setIsVideo(!isvideo)
        setVideoElements([])
        if (peerInstance.current) {
            peerInstance.current.destroy();
            peerInstance.current = null;
        }
        if (cameraStream) {
            const tracks = cameraStream.getTracks();
            if (tracks.length > 0) {
                tracks.forEach(track => track.stop());
                setCameraStream(null);
            }
        }
        setIsVideo(false)
        navigate(AppRoutes?.chat)
    }
    const okFunction = () => {
        setIsVideo(false)
        setVideoElements([])
        setVideoCall({
            bool: false,
            data: null,
            type: ""
        })
        if (peerInstance.current) {
            peerInstance.current.destroy();
            peerInstance.current = null;
        }
        if (cameraStream) {
            const tracks = cameraStream.getTracks();
            if (tracks.length > 0) {
                tracks.forEach(track => track.stop());
                setCameraStream(null);
            }
        }
        navigate(AppRoutes?.chat)

    }
    const styleFun = (video) => {
        if (video?.length === 3) {
            return "user2"
        }
        else if (video?.length === 4) {
            return "user_3"
        }
        else {
            return "user_4"
        }

    }
    const styleFun1 = (video) => {
        if (video?.length === 3) {
            return "heigth_3"
        }
        else if (video?.length === 4) {
            return "heigth_4"
        }
        else {
            return "auto_heigth"
        }

    }

    useEffect(() => {
        if (isvideo) {
            const myVideo = document.createElement('video')
            myVideo.muted = true
            const peer = new Peer();

            peer.on('open', id => {
                setPeerID(id)
                socket.emit('join-room', connectionID ? connectionID : state?.id, id)
            })


            navigator.mediaDevices.getUserMedia({
                video: {
                    facingMode: facingMode // Use the selected facing mode
                },
                audio: true
            }).then(stream => {
                setCameraStream(stream)
                addVideoStream(myVideo, stream, true, peerID)

                peer.on('call', call => {
                    console.log('call')
                    call.answer(stream)
                    const video = document.createElement('video')
                    call.on('stream', userVideoStream => {
                        addVideoStream(video, userVideoStream)
                    })
                })

                socket.on('user-connected', userId => {
                    console.log(userId + 'connected')
                    connectToNewUser(userId, stream)
                })
                peerInstance.current = peer;

            }).catch((err) => {
                console.log(err, 'dldl')

            })

        }
    }, [isvideo, socket])

    const textObj = {
        "accept": "is invited a video call",
        "decline": "is Decline Your call",
        "call_end": "is Leave the call"
    }

    console.log(isvideo , 'isvideo')

    const updateTime = (audioRef) => {
        setInterval(setCurrentTime(audioRef), 1000)
    }; return (
        <div>
            {
                isLoading?.initial ?
                    <div >
                        <Loader height={'calc(100vh - 117px)'} />
                    </div> :
                    isvideo ? <div>

                        <div ref={videoGridRef} style={{ height: videoElements?.length === 1 ? "calc(100vh - 53px)" : styleFun1(videoElements), position: "relative", display: videoElements?.length === 7 ? "flex" : "block" }}>
                            {videoElements.map((video, index) => (
                                <div key={index} ref={element => element && element.appendChild(video?.video)} id={video?.is_current_user ? "current_user" : videoElements?.length === 2 ? "new_user" : styleFun(videoElements)} />
                            ))}
                        </div>
                        <div className="p-2 bg-contract-100 flex items-center text-center justify-between absolute w-full bottom-0">
                            <span></span>
                            <span className="bg-primary-500 p-2 rounded-lg cursor-pointer" style={{ borderRadius: "50%" }} onClick={handleDisconnectClick}><IoIosCall style={{ fontSize: "1.2rem", color: "#fff" }} /></span>
                            <span className="border-primary-500 border p-2 rounded-lg cursor-pointer" style={{ borderRadius: "50%" }} onClick={() => setFacingMode(facingMode === 'user' ? 'environment' : 'user')}><MdCameraswitch style={{ fontSize: "1.2rem", color: "#ff1d4e" }} /></span>

                        </div>
                    </div> :
                        <div>
                            <div className="flex items-center px-2 py-3 gap-3 justify-between bg-contract-100">
                                <div className="flex items-center gap-3">
                                    <HiArrowSmallLeft style={{ fontSize: "1.4rem", cursor: "pointer", color: "#ff1d4e" }} onClick={() => navigate(AppRoutes?.chat)} />
                                    {
                                        state?.image_urls ?                                     <img className="inline-block h-8 w-8 rounded-full" src={state?.image_urls} alt="" />
                                        : <div style={{backgroundColor:stringAvatar(state?.username)?.bgcolor , height:"31px" , width:"31px" , borderRadius:"50%" , color:"#fff"}} className="font-bold flex items-center justify-center">{stringAvatar(state?.username)?.children}</div>
                                    }
                                    <div>
                                        <p className="text-sm font-regular text-secondary-200">{state?.username}</p>
                                        {/* <p className="text-xs font-regular text-secondary-100">chennai</p> */}
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    {/* <span className="bg-primary-100 p-2 rounded-md cursor-pointer"><IoIosCall style={{ fontSize: "1.2rem", color: "#ff1d4e" }} /></span> */}
                                    <span className="bg-primary-100 p-2 rounded-md cursor-pointer" onClick={clickVideoCall}><FaVideo style={{ fontSize: "1.2rem", color: "#ff1d4e" }} /></span>
                                </div>
                            </div>
                            <div className="px-2"
                                id="content"
                                ref={contentContainerRef}
                                onScroll={handleScroll}>
                                {isLoading?.isLoading && <div className="flex items-center justify-center pt-2"><RiLoader2Line style={{ color: "#ff1d4e", fontSize: "2rem" }} /></div>
                                }

                                {
                                    messages?.map((x, i) => {
                                        return (
                                            <div key={i}>
                                                {
                                                    (x?.user?.user_id || x?.user_id) === localStorage.getItem(LocalStoragekeys?.user_id) ?


                                                        <div className="flex items-center justify-start gap-2 p-2" style={{ direction: "rtl" }}>
                                                            {
                                                               (x?.user?.logo || x?.logo) ?  <img className="inline-block h-8 w-8 rounded-full" src={x?.user?.logo || x?.logo} alt="" /> :<div style={{backgroundColor:stringAvatar(x?.user?.name || x?.username)?.bgcolor , height:"31px" , width:"31px" , borderRadius:"50%" , color:"#fff"}} className="font-bold flex items-center justify-center">{stringAvatar(x?.user?.name || x?.username)?.children}</div>
                                                            }
                                                           
                                                            <div>
                                                                <span className="text-xs font-regular text-secondary-100 pb-1">You<span className="text-xs font-regular text-secondary-100 pb-1 ml-1"></span>{x?.created_at ? getTime(x?.created_at) : ""}</span>
                                                                <div className="text-sm font-regular text-contract-100 p-2 bg-primary-500 w-fit" id="my_msg">
                                                                    {x?.audio?.length ? <AudioPlayer audioBlob={x?.audio} color={'#fff'} /> : x?.message}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        :
                                                        <div className="flex items-center justify-start gap-2 p-2">
                                                              {
                                                               (x?.user?.logo || x.logo) ?  <img className="inline-block h-8 w-8 rounded-full" src={x?.user?.logo || x.logo} alt="" /> :<div style={{backgroundColor:stringAvatar(x?.user?.name || x?.username)?.bgcolor , height:"31px" , width:"31px" , borderRadius:"50%" , color:"#fff"}} className="font-bold flex items-center justify-center">{stringAvatar(x?.user?.name || x?.username)?.children}</div>
                                                            }
                                                            <div>
                                                                <span className="text-xs font-regular text-secondary-100 pb-1">{x?.user?.name || x?.username}<span className="text-xs font-regular text-secondary-100 pb-1 ml-1"></span>{x?.created_at ? getTime(x?.created_at) : ""}</span>
                                                                <div className="text-sm font-regular text-secondary-200 p-2 bg-contract-100 w-fit" id="my_msg">
                                                                    {x?.audio?.length ? <AudioPlayer audioBlob={x?.audio} /> : x?.message}

                                                                </div>
                                                            </div>
                                                        </div>
                                                }
                                            </div>
                                        )
                                    })
                                }

                            </div>

                            <div className="p-2">
                                {
                                    recording ?
                                        <div className="rounded-md bg-contract-100 flex items-center p-2 font-regular gap-3 relative">
                                            <span><AiFillAudio style={{ color: "#ff1d4e", cursor: "pointer", fontSize: "1.2rem", fontFamily: "regular" }} /></span>
                                            {formatTime(recordingTime)}
                                            <span style={{ float: "right", position: 'absolute', right: "16px" }}><BsStopCircle onClick={stopRecording} style={{ color: "#ff1d4e", cursor: "pointer", fontSize: "1.2rem", fontFamily: "regular" }} /></span>                                {
                                                msg?.length > 0 && <span><IoMdSend style={{ color: "#ff1d4e", cursor: "pointer", fontSize: "1.2rem", fontFamily: "regular" }} onClick={state?.is_group ? createGroupChat : sendMessage} /></span>

                                            }
                                        </div>
                                        :
                                        <div className="rounded-md relative bg-contract-100 flex items-center px-2 font-regular gap-3">
                                            {
                                                audioBlob ?
                                                    <div className="py-2 flex items-center gap-2" style={{ width: "100% !important" }}>
                                                        <span style={{ color: "#ff1d4e", cursor: "pointer", fontSize: "1rem", fontFamily: "regular" }} onClick={() => setAudioBlob(null)}><AiFillDelete /></span>
                                                        <AudioPlayer audioBlob={audioBlob} updateTime={updateTime} currentTime={currentTime} is_record />
                                                        <span className="absolute right-2 w-fit" onClick={state?.is_group ? createGroupChat : sendMessage}><IoMdSend style={{ color: "#ff1d4e", cursor: "pointer", fontSize: "1.2rem", fontFamily: "regular" }} /></span>
                                                    </div> :
                                                    <div className="flex items-center gap-3 w-full">
                                                        <span onClick={() => setBool(!bool)} className="relative">
                                                            <BsEmojiSmile style={{ color: "#ff1d4e", cursor: "pointer", fontSize: "1rem", fontFamily: "regular" }} />
                                                            {
                                                                bool ?
                                                                    <div className="absolute left-0" style={{ top: "-450px" }}>
                                                                        <Picker onSelect={onChange} tooltip={false} />
                                                                    </div>
                                                                    :
                                                                    ""
                                                            }
                                                        </span>
                                                        <input className="rounded-md w-full border-none py-2.5 text-sm bg-contract-100 text-secondary-200 placeholder:text-sm font-regular focus: focus:ring-inset focus:none sm:text-sm  focus-visible:outline-none" placeholder="Send Message" onChange={(e) => setMsg(e.target.value)} value={msg} />
                                                        <span onClick={startRecording}><AiFillAudio style={{ color: "#ff1d4e", cursor: "pointer", fontSize: "1.2rem", fontFamily: "regular" }} /></span>
                                                        <span><BsPaperclip style={{ color: "#ff1d4e", cursor: "pointer", fontSize: "1.2rem", fontFamily: "regular" }} /></span>
                                                        {
                                                            msg?.length > 0 && <span><IoMdSend style={{ color: "#ff1d4e", cursor: "pointer", fontSize: "1.2rem", fontFamily: "regular" }} onClick={state?.is_group ? createGroupChat : sendMessage} /></span>

                                                        }
                                                    </div>
                                            }

                                        </div>
                                }

                            </div>
                        </div>
            }
            {
                isVideoCall?.bool &&
                <VideCallPopUp decline={decline}
                    is_btn={
                        isVideoCall?.type === "call_end" ?
                            state?.is_group ?
                                <div>
                                    <div className="flex gap-2 w-full items-center justify-center">
                                        <Button outline text={"leave"} onClick={handleDisconnectClick} />
                                        <Button text={"stay"} onClick={() => {
                                            setVideoCall({
                                                bool: false,
                                                data: null,
                                                type: ""
                                            })
                                        }} />
                                    </div>
                                </div> :
                                <div>
                                    <div className="flex gap-2 w-full items-center justify-center">
                                        <Button outline text={"ok"} onClick={okFunction} />
                                    </div>
                                </div>
                            : isVideoCall?.type === "decline" ?
                                state?.is_group ?
                                    <div className="flex gap-2 w-full items-center justify-center">
                                        <Button outline text={"leave"} onClick={handleDisconnectClick} />
                                        <Button text={"stay"} onClick={() => {
                                            setVideoCall({
                                                bool: false,
                                                data: null,
                                                type: ""
                                            })
                                        }} />
                                    </div> : <div className="flex gap-2 w-full items-center justify-center">
                                        <Button outline text={"ok"} onClick={okFunction} />
                                    </div> : null

                    }
                    text={textObj[isVideoCall?.type]}
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