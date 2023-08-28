import PropTypes from "prop-types";
import { useState } from "react";
import { AiOutlineEyeInvisible ,AiOutlineEye} from "react-icons/ai";

export const TextBox=(props)=>{
  const { type, placeholder , onChange , value  } = props;
  const [show , setShow]=useState(false)
  const changeShow=()=>{
    setShow(!show)
  }
  return (
    <div>
      <div className="relative rounded-md shadow-sm">
        <input
          type={type === 'password' ? show ? 'text':'password'  : type}
          className="w-full rounded-md border px-3.5 py-2.5 text-xs text-primary-500 placeholder:text-xs font-regular focus: focus:ring-inset focus:ring-primary-500 sm:text-xs  focus-visible:outline-none"
          placeholder={placeholder}
          onChange={onChange}
          value={value}
        />
        {
          type === 'password' && 
          <span onClick={changeShow} className="cursor-pointer absolute top-2 right-2">
          {
            show ? <AiOutlineEye style={{fontSize:"1.2rem" , color:"#ff1d4e"}}/>:<AiOutlineEyeInvisible style={{fontSize:"1.2rem",color:"#ff1d4e"}}/>
          }
          </span>
        }
     
      </div>
    </div>
  )
}
TextBox.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  type:PropTypes.string,
  onChange:PropTypes.func,
  value:PropTypes.string,
};
TextBox.defaultProps = {
  label: "Textbox",
  type: "text",
  placeholder: "Type Here...",
  onChange:()=>false,
  value:""
};
