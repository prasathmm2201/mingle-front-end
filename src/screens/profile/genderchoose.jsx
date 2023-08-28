/* eslint-disable react/no-unescaped-entities */
import PropTypes from "prop-types";

export const GenderChoose = (props) => {
    const genderOptions=[
        {
            img:"bg-male",
            value:"Male",
            label:"Male"
        },
        {
            img:"bg-female",
            value:"Female",
            label:"Female"
        },
        {
            img:"bg-transgender",
            value:"Transgender",
            label:"Transgender"
        },
    ]
    return (
        <div  className="flex items-center justify-center">
           <div>
           <center>
                <p className="antialiased m-0 text-xl text-secondary-200 font-bold">What's Your Gender?</p>
                <p className="antialiased m-0 text-sm text-secondary-500 font-regular">To give you a better experience we need</p>
                <p className="antialiased m-0 text-sm text-secondary-500 font-regular">to know your Gender</p>
            </center>
            <div className="flex items-center justify-center flex-wrap gap-1.5 mt-2">
                {
                    genderOptions?.map((x , i)=>{
                        return(
                            <div className={`${x?.img} bg-cover rounded-md relative ${x?.value === props?.value ? "border-primary-500 border solid":"border-none"}`} key={i} onClick={()=>props?.onChange(x?.value)}>
                                <input type="radio" className="h-4 w-4 checked:border-primary-500 border-primary-500 p-1 absolute top-2.5 right-2.5 text-primary-500" />
                                <div style={{width:"148px",height:"150px"}}>

                                </div>
                            </div>
                        )
                    })
                }

            </div>
           </div>
        </div>
    )
}
GenderChoose.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func
};
GenderChoose.defaultProps = {
    value: "",
    onChange: () => false
};