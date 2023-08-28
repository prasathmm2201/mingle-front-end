import PropTypes from "prop-types";
import React from "react";
import { RiLoader2Line } from "react-icons/ri";

export const Button = (props) => {
    const {
        text = "",
        onClick = () => false,
        loading = false,
        outline=false
    } = props

    return (
        <div>
            {
                outline ? 
                <button 
                className="font-regular border border-primary-500 rounded-md bg-contract-100 text-primary-500 px-3.5 py-2.5 text-xs  w-full font-fontFamily-bold text-white shadow-sm hover:bg-contract-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-contract-100  flex text-center justify-center" 
                 onClick={onClick} disabled={loading}>
                    {loading ? <RiLoader2Line style={{color:"#fff",fontSize:"1rem"}}/> : text}
                </button>:
                 <button 
                 className="font-bold rounded-md bg-primary-500 text-contract-100 px-3.5 py-2.5 text-xs  w-full font-fontFamily-bold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 flex text-center justify-center" 
                  onClick={onClick} disabled={loading}>
                                         {loading ? <RiLoader2Line style={{color:"#fff",fontSize:"1rem"}}/> : text}
                 </button>
            }
        </div>
       
    )
}
Button.propTypes = {
    text: PropTypes.string,
    onClick: PropTypes.func,
    loading: PropTypes.bool,
    outline:PropTypes.bool
};
Button.defaultProps = {
    text: "Submit",
    onClick: () => false,
    value: ""
};