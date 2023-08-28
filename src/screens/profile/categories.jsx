import PropTypes from "prop-types";
// import { AiOutlineCustomerService } from "react-icons/ai";
// import { BsController } from "react-icons/bs";
// import { Dancing } from "../../assets";
// import { Location } from "../../components";
// import { BsGeoAlt } from "react-icons/bs";
// import { getCoords } from "../../utilities/helper";

export const Categories = (props) => {
    // const categoryOption=[
    //     {
    //         img:<BsController/>,
    //         value:"gaming",
    //         label:"Gaming"
    //     },
    //     {
    //         img:<Dancing/>,
    //         value:"dancing",
    //         label:"Dancing"
    //     },
    //     {
    //         img:<AiOutlineCustomerService/>,
    //         value:"music",
    //         label:"Music"
    //     },
    //     {
    //         img:"bg-transgender",
    //         value:"movie",
    //         label:"Movie"
    //     },
    //     {
    //         img:"bg-transgender",
    //         value:"fashion",
    //         label:"Fashion"
    //     },
    //     {
    //         img:"bg-transgender",
    //         value:"book",
    //         label:"Book"
    //     },
    //     {
    //         img:"bg-transgender",
    //         value:"writing",
    //         label:"Writing"
    //     },
    //     {
    //         img:"bg-transgender",
    //         value:"nature",
    //         label:"Nature"
    //     },
    //     {
    //         img:"bg-transgender",
    //         value:"painting",
    //         label:"Painting"
    //     },
    //     {
    //         img:"bg-transgender",
    //         value:"sports",
    //         label:"Sports"
    //     },
    //     {
    //         img:"bg-transgender",
    //         value:"animals",
    //         label:"Animals"
    //     },
    //     {
    //         img:"bg-transgender",
    //         value:"gym",
    //         label:"Gym & Fitness"
    //     },
    // ]
    // const getCurrentLocation = async () => {
    //     const location = await getCoords();
    //     if (location?.latitude && location?.longitude) {
    //         console.log(location , 'k')

    //         props?.handleChange('location',location)
    //     }
    // }
    return (
        <div  className="flex items-center justify-center">
            
           <div style={{display:"block"}}>
           {props?.component}
           {/* <center>
                <p className="antialiased m-0 text-xl text-secondary-200 font-bold">Select up to 5 interests</p>
            </center>
            <div className="flex items-center justify-center flex-wrap gap-1.5 mt-4">
                {
                    categoryOption?.map((x , i)=>{
                        return(
                            <span className={`rounded-lg text-sm font-regular px-1 py-1.5 cursor-pointer  ${props?.value?.includes(x?.value) ? "text-primary-500 border-primary-500  rounded-lg border solid":"border-secondary-300 border solid text-secondary-200"}`} key={i} onClick={()=>props?.onChange(x?.value)}>
                            {x.label}
                            </span>
                        )
                    })
                }

            </div> */}
            {/* <center>
                <p className="antialiased m-0 text-xl text-secondary-200 font-bold mt-4">Select Your Location</p>
                <div className="mt-4">
                <Location
                        value={props?.location_value}
                        handleChange={(value) => props?.handleChange('location', value)}
                        textFieldComponent={(ref, value, handleChange) => (
                            <input
                            ref={ref}
                            value={value}
                            onChange={(e) => handleChange(e.target.value)}
                            placeholder={'Search'}
                            className="w-full rounded-md border px-3.5 py-2.5 text-xs text-primary-500 placeholder:text-xs font-regular focus: focus:ring-inset focus:ring-primary-500 sm:text-xs  focus-visible:outline-none"

                          />
                        )}
                    />
                    <div className="flex items-center cursor-pointer" onClick={getCurrentLocation}>
                        <BsGeoAlt style={{fontSize:"0.9rem" , color:"#ff1d4e"}}/>&nbsp;<span className="text-xs text-primary-500">Use Current Location</span>
                    </div>
                </div>
            
            </center> */}
           </div>
        </div>
    )
}
Categories.propTypes = {
    value: PropTypes.array,
    handleChange: PropTypes.func,
    onChange: PropTypes.func,
    location_value:PropTypes.object,
    component:PropTypes.node

};
Categories.defaultProps = {
    value: [],
    handleChange: () => false,
    onChange: () => false,
    location_value:{}

};