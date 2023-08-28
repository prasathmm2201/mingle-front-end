import React from "react";
import { AppRoutes } from "./routes";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { LocalStoragekeys } from "../constant";


const PrivateRouter = ({path, children }) => {
  const navigate = useNavigate();
  const [state , setState] = React.useState(false)

  const isAuthenticated = async() => {
   try{
    if (localStorage.getItem(LocalStoragekeys.token)) {
      setState(true)
    } else {
      navigate(AppRoutes.welcome)
      setState(false)

    }
   }
   catch(err){
    navigate(AppRoutes.welcome)
    console.log(err)
   }
  };


  React.useEffect(()=>{
    isAuthenticated()
    // eslint-disable-next-line
  },[path])


  return (
    <>
      {
        state && children 
      }

    </>
  );
};

export default PrivateRouter;

PrivateRouter.propTypes = {
    children: PropTypes.node,
    path:PropTypes.string
};