import React from "react";
import { ProfileCreation } from "./profilecreation";
import { withNavBars } from "../../HOC";

class ProfileCreationParent extends React.Component {
  render() { return <><ProfileCreation {...this.props} /></> }
}
const props = {
  is_bottom:false
}


// eslint-disable-next-line react-refresh/only-export-components
export default withNavBars(ProfileCreationParent , props);

