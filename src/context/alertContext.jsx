import React from "react";
import { Alert } from "../components";
import { AlertContext } from "../constant";

class AppAlert extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      message: "",
    };
  }

  
  close = () => {
    this.setState({
    show: false,
      message: "",
    });
  };

  set = (props) => {
    this.setState({ ...props });
  };

  render() {
    return (
      <AlertContext.Provider
        value={{
          ...this.state,
          onclose: this.close,
          setSnack: this.set,
        }}
      >
        {this.state.show ? <Alert {...this.state} onClose={this.close} /> : ""}
        {this.props.children}
      </AlertContext.Provider>
    );
  }
}

export default AppAlert;
