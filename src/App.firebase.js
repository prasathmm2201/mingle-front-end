import dotenv from "dotenv";
import { initializeApp } from "firebase/app";
import "firebase/messaging";
import {
  deleteToken,
  getMessaging,
  getToken,
  onMessage
} from "firebase/messaging";
import React from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FirebaseContext } from "./contexts";
import { withAllContexts } from "./HOCs";
import { LocalStorageKeys } from "./utils";
import { config } from "./config";
import PropTypes from 'prop-types';
dotenv.config();

class AppFireBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      isTokenFound: false,
      messaging: null,
    };
  }

  componentDidMount() {
    this.firebaseInitialization();
  }

  firebaseInitialization = () => {

    try {

      const firebaseConfig = {
        apiKey: config.REACT_APP_FIREBASE_API_KEY,
        authDomain: config.REACT_APP_FIREBASE_AUTH_DOMAIN,
        projectId: config.REACT_APP_FIREBASE_PROJECT_ID,
        storageBucket: config.REACT_APP_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: config.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
        appId: config.REACT_APP_FIREBASE_APP_ID,
        measurementId: config.REACT_APP_FIREBASE_MEASUREMENT_ID,
      };

      const intializedApp = initializeApp(firebaseConfig);

      this.checkNotificationPermission(intializedApp);
    } catch (error) {
      console.log("Firebase already registered: ", error);
    }
  };

  checkNotificationPermission = async (intializedApp) => {
    // Let's check if the browser supports notifications
    if (!("Notification" in window)) {
      console.log("This browser does not support desktop notification");
    }

    // Let's check whether notification permissions have already been granted
    else if (Notification.permission === "granted") {
      // If it's okay let's create a notification
      this.getToken(intializedApp);
    }

    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== "denied") {
      console.log("Requesting Permission");
      let permission = await Notification.requestPermission();
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        this.getToken(intializedApp);
      }
    }
  };

  getToken = async (intializedApp) => {
    const messaging = getMessaging(intializedApp);
    try {
      let currentToken = await getToken(messaging, {
        vapidKey: config.REACT_APP_FIREBASE_VAPIDKEY,
      });
      this.setState(
        {
          token: currentToken,
          isTokenFound: currentToken ? true : false,
          messaging: messaging,
        },
        () => {
          localStorage.setItem(LocalStorageKeys.deviceToken, currentToken);
          this.receiveForeGroundNotifications(messaging);
        }
      );
    } catch (error) {
      console.log("An error occurred while retrieving token. ", error);
    }
  };

  receiveForeGroundNotifications = (messaging) => {
    onMessage(messaging, (payload) => {
      toast.info(payload?.data, {
        position: "bottom-right",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        onClick: () => {
          window.location.replace("/" + payload?.data ?? "");
        },
      });
    });
  };

  deleteLocalToken = () => {
    deleteToken(this.state.messaging)
      .then((isFullFilled) => {
        if (isFullFilled) {
          console.log("Token Deleted...!");
          localStorage.removeItem(LocalStorageKeys.deviceToken);
        }
      })
      .catch((err) => {
        console.log("Error while deleting token", err);
      });
  };

  render() {
    return (
      <FirebaseContext.Provider
        value={{
          ...this.state,
          getToken: this.getToken,
          requestPermission: this.checkNotificationPermission,
          deleteToken: this.deleteLocalToken,
        }}
      >
        {this.props.children}
        <ToastContainer
          position="bottom-right"
          autoClose={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
        />
      </FirebaseContext.Provider>
    );
  }
  static propTypes = {
    children: PropTypes.node.isRequired,
  };
}

export default withAllContexts(AppFireBase);
