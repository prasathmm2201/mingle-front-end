import React from "react";
// import { Home } from "./home";
import { withNavBars } from "../../HOC";
import { GroupCreate } from "./groupcreate";

class GroupCreateParent extends React.Component {
  render() { return <><GroupCreate/></> }
}
const props = {
    is_bottom:true
}

// eslint-disable-next-line react-refresh/only-export-components
export default withNavBars(GroupCreateParent , props);

