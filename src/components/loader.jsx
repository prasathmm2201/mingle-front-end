import PropTypes from "prop-types";

export const Loader =(props)=>{
    return(
        <div className="bg-primary-100 flex justify-center items-center" style={{height:props?.height ?? '100vh'}}>
       <img src={'/public/loader.gif'} alt="loader" className="loader_img"/>
        </div>
    )
}
Loader.propTypes = {
    height: PropTypes.string
};
Loader.defaultProps = {
    height: "100vh"
};