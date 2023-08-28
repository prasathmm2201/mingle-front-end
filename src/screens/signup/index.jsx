import React from "react";
import { SignUp } from "./signup";
import { withNavBars } from "../../HOC";

class SignUpParent extends React.Component {
  render() { return <><SignUp {...this.props} /></> }
}

const props = {
  is_bottom:false
}
// eslint-disable-next-line react-refresh/only-export-components
export default withNavBars(SignUpParent,props);

