import React from "react";
import { Welcome } from "./welcome";
import { withNavBars } from "../../HOC";

class WelcomeParent extends React.Component {
  render() { return <Welcome {...this.props} /> }
}

const props = {
  is_bottom:false
}
// eslint-disable-next-line react-refresh/only-export-components
export default withNavBars(WelcomeParent , props);

