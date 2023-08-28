import { useState } from "react"
import { BiSearch } from "react-icons/bi"
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { GrClose } from 'react-icons/gr'
import { friendsOptions } from "../../constant"

export const Followers = () => {
    const [type, setType] = useState({
        type: "friends",
        bool:false
    })
   
    const updateState = (k, v) => {
        setType({ ...type, [k]: v })
    }
    const onOpen=()=>{
        updateState("bool" , !type?.bool)
    }
    return (
        <div>
            <p className="antialiased m-0 text-xl text-secondary-200 font-regular pt-2 px-2">Friends</p>
            <div className="p-2">
                <div className="rounded-md relative bg-contract-100 flex items-center px-2">
                    <BiSearch style={{ fontSize: "1.5rem", color: "#ff1d4e" }} />
                    <input className="rounded-md w-full border-none px-3.5 py-2.5 text-sm bg-contract-100 text-primary-500 placeholder:text-sm font-regular focus: focus:ring-inset focus:none sm:text-sm  focus-visible:outline-none" placeholder="Search" />
                </div>
            </div>
            <div className="flex items-center gap-2">
                {
                    friendsOptions?.map((x, i) => {
                        return (
                            <div key={i} id="text" className={`${type?.type === x?.value ? "bg-primary-500 text-contract-100" : "bg-primary-100 text-secondary-200"} text-sm font-regular px-2 py-1 cursor-pointer`} style={{ borderRadius: "10px 10px 0px 0px" }} onClick={() => updateState('type', x?.value)}>
                                {x?.name}
                            </div>
                        )
                    })
                }
            </div>
            <div className="border-b-1 border-secondary-500 p-4" id="chat_border">
                <div className="p-2 bg-contract-100 rounded-md flex items-center justify-between cursor-pointer" onClick={onOpen}>
                    <div className="flex items-center gap-4">
                        <img className="inline-block h-8 w-8 rounded-full ring-primary-500 ring-2" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                        <div>
                            <p className="font-regular text-secondary-200 text-sm">Robert</p>
                            <p className="font-regular text-secondary-100 text-xs">Hello how are you?</p>
                        </div>
                    </div>
                    <div>
                        {
                            type?.type === "to" && <button className="bg-primary-500 text-contract-100 text-sm font-regular px-2 py-1 rounded-md">Accept</button>

                        }
                    </div>
                </div>
            </div>
            <>
                <Transition appear show={type?.bool} as={Fragment} static={true}>
                    <Dialog as="div" className="relative z-10" onClose={onOpen}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black bg-opacity-25" />
                        </Transition.Child>

                        <div className="fixed inset-0 overflow-y-auto">
                            <div className="flex min-h-full  justify-center h-screen bg-contract-100 text-center">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <Dialog.Panel className="w-full mx-auto max-w-sm transform overflow-hidden  bg-white text-left  transition-all">
                                        <div>
                                            <div className="w-full relative">
                                                <span className="bg-contract-100 p-2 w-11 inline-flex items-baseline justify-center item-center cursor-pointer rounded-md absolute top-2 right-2" onClick={onOpen}><GrClose style={{ fontSize: "1.2rem", color: "#ff1d4e" }} /></span>
                                                <img className="inline-block w-full" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" style={{ height: "16rem", borderBottomLeftRadius: "20px", borderBottomRightRadius: "20px" }} />
                                            </div>
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
                                                    <span className="text-sm font-regular  text-secondary-100">Male</span>
                                                </div>
                                            </div>
                                            <div className="mt-3">
                                                <p className="font-regular text-secondary-200 text-md">Interests</p>
                                                <div className="mt-1">
                                                    <span className="text-sm font-regular bg-primary-100 rounded-lg p-2 text-secondary-100">Music</span>
                                                </div>
                                            </div>
                                            <div className="mt-3">
                                                <p className="font-regular text-secondary-200 text-md">Location</p>
                                                <div className="mt-1">
                                                    <span className="text-sm font-regular text-secondary-100">Music</span>
                                                </div>
                                            </div>

                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            </>
        </div>
    )
}