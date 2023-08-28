import React from "react";
import PropTypes from "prop-types";
import SearchLocationInput from './search';

const LocationParent = (props) => {
  return (
    <div>
      <SearchLocationInput
        parent_id={`searchlocation_${props?.parent_id}`}
        value={props?.value?.address}
        handleChange={props?.handleChange}
        placeholder={props?.placeholder}
        textFieldComponent={props?.textFieldComponent}
      />
    </div>
  );
};
LocationParent.propTypes = {
  value: PropTypes.object,
  handleChange: PropTypes.func,
  placeholder: PropTypes.string,
  parent_id: PropTypes.string,
  textFieldComponent: PropTypes.node,
};

export default React.memo(LocationParent);
