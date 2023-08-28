import React from "react";
import { Followers } from "./followers";
import { withNavBars } from "../../HOC";

class FollowersParent extends React.Component {
  render() { return <><Followers {...this.props} /></> }
}
const props = {
    is_bottom:true
}

// eslint-disable-next-line react-refresh/only-export-components
export default withNavBars(FollowersParent , props);

