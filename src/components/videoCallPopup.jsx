import PropTypes from "prop-types";
// import { GrClose } from "react-icons/gr";
import { Button } from "./button";

export const VideCallPopUp = (props) => {
    return (
        <div className="absolute top-50 left-0 right-0 w-fit h-fit flex items-center justify-center" style={{top:"40%",zIndex:999 , width:"100%"}}>
            <div style={{background:"#fff", padding:"12px",borderRadius:"12px",boxShadow:'0px 0px 16px #00000014'}}>
                {/* <div className="p-2 flex justify-end cursor-pointer" onClick={props?.onOpen}>
                <GrClose style={{ fontSize: "1rem", color: "#ff1d4e" }} />
                </div> */}
            <div className="flex gap-2 items-center">
                <img src={props?.data?.logo} className="h-10 w-10" style={{borderRadius:"50%"}}/>
                <span className="font-regular text-secondary-100 text-md">{props?.data?.name} {props?.text}</span>

            </div>
            {
                props?.is_btn ?? 
                <div className="flex gap-2 w-full items-center justify-center">
                <Button outline text={props?.btnText ??  'Decline'} onClick={props?.decline}/>
                <Button text={props?.btnText1 ?? 'Accept'} onClick={props?.onAccept}/>
               </div>
            }
          
            </div>
        </div>
    )
}
VideCallPopUp.propTypes = {
    onOpen: PropTypes.func,
    bool: PropTypes.bool,
    data: PropTypes?.data,
    onAccept:PropTypes.func,
    decline:PropTypes.func,
    is_btn:PropTypes.bool,
    text:PropTypes.string,
    btnText:PropTypes.string,
    btnText1:PropTypes.string
};
