import React from "react";
import { Home } from "./home";
import { withNavBars } from "../../HOC";

class HomeParent extends React.Component {
  render() { return <><Home {...this.props} /></> }
}
const props = {
    is_bottom:true
}

// eslint-disable-next-line react-refresh/only-export-components
export default withNavBars(HomeParent , props);

