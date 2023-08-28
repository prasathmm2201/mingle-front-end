/* eslint-disable react/prop-types */
// import { useNavigate } from "react-router-dom";
// import { NavOption } from "../constant";
import PropTypes from "prop-types";

const withNavBars = (OriginalComponent ) => {
  function NewComponent() {
    // const navigate = useNavigate()
    return (
        <div className="mx-auto max-w-sm bg-primary-100 relative">
           <div style={{height:"100vh", overflow:"auto"}}>
           <OriginalComponent />
           </div>
            {/* {
              // eslint-disable-next-line react/prop-types
              props?.is_bottom &&
              <div className="w-full" >
              <div className="grid grid-cols-4 gap-4 bg-primary-500 px-2 py-4" id="bottom_bar">
              {
                NavOption?.map((x,i)=>{
                  return(
                    <div key={i} className="flex items-center justify-center relative cursor-pointer" onClick={()=>navigate(x?.location)}>
                      {
                        window.location.pathname === x?.location ? <div>{x?.selected}<div className="absolute"></div></div> : x?.unselected
                      }
                    </div>
                  )

                })
              }
            </div>
            </div>
            } */}
            
        </div>
    );
  }
  return NewComponent;
};
export default withNavBars;
withNavBars.propTypes = {
  is_bottom: PropTypes.bool,

};
withNavBars.defaultProps = {
  is_bottom: false,

};