import React from "react";
import { Chat } from "./chat";
import { withNavBars } from "../../HOC";

class ChatParent extends React.Component {
  render() { return <><Chat {...this.props} /></> }
}

const props = {
  is_bottom:true
}
// eslint-disable-next-line react-refresh/only-export-components
export default withNavBars(ChatParent, props);

