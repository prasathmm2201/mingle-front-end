import PropTypes from "prop-types";

export const TextFieldAdornment = props => {
  const { value, handleChange, inputRef, placeholder } = props

  return (

    <div className="flex items-center" height="45px" >
      <div >
      Location
      </div>
      <div overflow="hidden">
        <input
          style={{
            border: 'none',
            outline: 'none',
            fontSize:"0.875rem",
            padding: "0px",
            width: "100%",
            color: "#091B29",
            textOverflow: "ellipsis"
          }}
          ref={inputRef}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
        />
      </div>
      <div >
      Target
      </div>
    </div>

  )
}

TextFieldAdornment.propTypes = {
    value: PropTypes.object,
    handleChange: PropTypes.func,
    placeholder: PropTypes.string,
    inputRef: PropTypes.string
  };