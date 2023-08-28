import React from "react";
import { ProfileView } from "./profileview";
import { withNavBars } from "../../HOC";

class ProfileViewParent extends React.Component {
  render() { return <><ProfileView {...this.props} /></> }
}
const props = {
    is_bottom:true
}

// eslint-disable-next-line react-refresh/only-export-components
export default withNavBars(ProfileViewParent , props);

