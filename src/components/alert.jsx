import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { MdErrorOutline } from 'react-icons/md'; // Import icons from react-icons/md

export const Alert = ({ type, message, onClose,show }) => {
    const [open , setOpen]=React.useState(show)
    const handleClose=()=>{
        setOpen(false)
        onClose()
    }
    useEffect(()=>{
        setTimeout(function() {
            setOpen(false)
            onClose()
          }, 3000);
          
    },[])
  return (
    open && (
      <div className={`notification ${type}`}>
        <MdErrorOutline size={30} color="#fff"/>
        <span className="msg">{message}</span>
        <span className="close-btn" onClick={handleClose}>
        &#x2715;
        </span>
      </div>
    )
  );
};

Alert.propTypes = {
    type: PropTypes.string,
    onClose: PropTypes.func,
    message: PropTypes.string,
    show:PropTypes.bool
};
Alert.defaultProps = {
    type: "success",
    onClose: () => false,
    message: "",
    show:false
};