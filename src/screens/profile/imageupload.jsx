import PropTypes from "prop-types";
import { BsPlusCircleDotted, BsXCircleFill } from "react-icons/bs";

export const ImageUpload = (props) => {
    const { onChange, value, deleteImg } = props;
    return (
        <div className="">
            <div>
                {
                    props?.is_title && 
                    <center>
                    <p className="antialiased m-0 text-xl text-secondary-200 font-bold">Upload Your Photo</p>
                    {/* <p className="antialiased m-0 text-sm text-secondary-500 font-regular">Pick more than 2 images</p> */}
                </center>
                }
               
                <div className="mt-4">
                    {
                        value?.length ?
                            <div className="h-20 w-20 rounded-md relative" id="image_upload">
                                <img src={value} width={'100%'} height={'100%'} id="image_upload1"/>
                                <span className="bg-contract-100 absolute bottom-0 right-0 rounded-full cursor-pointer" onClick={() => deleteImg()}>
                                    <BsXCircleFill style={{ fontSize: "1.5rem", color: "#ff1d4e" }} />
                                </span>
                            </div>
                            :
                            <label htmlFor="icon-button-file" id="image_upload" className="h-24 rounded-md flex justify-center items-center cursor-pointer">
                                <input accept="image/*" id="icon-button-file" type="file" multiple onChange={(e) => onChange(e)} style={{ display: "none" }} />
                                <BsPlusCircleDotted style={{ fontSize: "2rem", color: "#ff1d4e" }} />
                            </label>

                    }

                </div>

            </div>
        </div>
    )
}
ImageUpload.propTypes = {
    value: PropTypes.array,
    onChange: PropTypes.func,
    deleteImg: PropTypes.func,
    is_title: PropTypes.bool,
};
ImageUpload.defaultProps = {
    value: [],
    onChange: () => false,
    deleteImg: () => false,
    is_title:true
};