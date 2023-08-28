import { RiNotification3Line } from "react-icons/ri"
import { Location } from "../../components"
import { useEffect, useState } from "react"
import { BsGeoAlt } from "react-icons/bs"
import { genderOption } from "../../constant"
import { getCoords } from "../../utilities/helper"
import { BiSearch } from "react-icons/bi"
import { AiOutlineHeart } from "react-icons/ai"


export const Home = () => {
    const [state, setState] = useState({
        location: {},
        gender: "male"
    })
    const updateState = (k, v) => {
        setState({ ...state, [k]: v })
    }
    const getCurrentLocation = async () => {
        const location = await getCoords();
        if (location?.latitude && location?.longitude) {
            updateState('location', location)
        }
    }
    useEffect(() => {
        getCurrentLocation()
    }, [])
    return (
        <div>
            <div className="flex items-center justify-between p-2">
                <div className="bg-primary-100">
                <span className="text-primary-500 font-bold text-sm">Location</span>

                   <div className="bg-primary-100  flex items-center">
                   <span><BsGeoAlt style={{ fontSize: "0.9rem", color: "#ff1d4e" }} /></span>
                    <Location
                        value={state?.location}
                        handleChange={(value) => updateState('location', value)}
                        textFieldComponent={(ref, value, handleChange) => (
                            <input
                                ref={ref}
                                value={value}
                                onChange={(e) => handleChange(e.target.value)}
                                placeholder={'Choose Location'}
                                className="border-none py-0 text-sm bg-primary-100 text-primary-500 placeholder:text-sm font-regular focus: focus:ring-inset focus:none sm:text-sm  focus-visible:outline-none"

                            />
                        )}
                    />
                   </div>
                </div>
                <div className="inline-grid w-full">
                    <div className="flex items-center justify-end px-2 gap-2">
                        <span className="bg-contract-100 p-2 rounded-md">
                            <BiSearch style={{ fontSize: "1.4rem", color: "#ff1d4e" }} />
                        </span>
                        <span className="bg-contract-100 p-2 rounded-md">
                            <RiNotification3Line style={{ fontSize: "1.4rem", color: "#ff1d4e" }} />
                        </span>
                    </div>
                    <div className="flex items-center justify-end p-2">
                        <span className="flex items-center border rounded-md border-primary-500 cursor-pointer" >
                            {
                                genderOption?.map((x, i) => {
                                    return (
                                        <div className={`${x?.value === state?.gender ? "bg-primary-500" : "bg-primary-100"} p-1`} key={i} onClick={() => updateState('gender', x?.value)}>
                                            {x?.value === state?.gender ? x?.selected : x?.unselected}
                                        </div>
                                    )
                                })
                            }
                        </span>
                    </div>
                </div>
            </div>
            

            <div className="p-2">
                <div className="rounded-md relative bg-contract-100 flex items-center px-2 font-regular">
                    <BiSearch style={{ fontSize: "1.5rem", color: "#ff1d4e" }} />
                    <input className="rounded-md w-full border-none px-3.5 py-2.5 text-sm bg-contract-100 text-primary-500 placeholder:text-sm font-regular focus: focus:ring-inset focus:none sm:text-sm  focus-visible:outline-none" placeholder="Search your partner" />
                </div>
            </div>

            {/* image */}

            <div className="p-2">
            <div className="bg-contract-100 rounded-lg relative">
                <img className="w-full h-56 rounded-lg" src="/public/female.jpeg"/>
              <div className="absolute bottom-0 left-0 right-0 w-full flex items-center justify-center">
              <span className="p-2 text-contract-100 bg-primary-500 font-regular w-fit rounded-t-xl">
                    Prasath , 22
                </span>
              </div>
              <div className="absolute top-1 right-1 cursor-pointer">
                <AiOutlineHeart style={{fontSize:"1.4rem" , color:"#ff1d4e"}}/>
              </div>

            </div>
            </div>
        </div>
    )
}