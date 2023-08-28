import React from "react";
import { ChatPage } from "./persnalchat";
import { withNavBars } from "../../HOC";

class ChatPageParent extends React.Component {
  render() { 
    return <><ChatPage {...this.props} /></>
   }
}
const props = {
  is_bottom:false
}


// eslint-disable-next-line react-refresh/only-export-components
export default withNavBars(ChatPageParent , props);

