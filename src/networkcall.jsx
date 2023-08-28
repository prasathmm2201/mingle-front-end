import Axios from "axios";
import { LocalStoragekeys } from "./constant";

export const Networkcall = (
 {
  url,
  method,
  body,
  headers,
  isAuthorized = false,
  // notValidateURL = false,
  otherProps = {}
 }
) => {
  console.log(body , "ssksksk------")
  //Check for URL,method,body
  if (!url && !method) {
    return Promise.reject({ message: "URL and HTTP Method is not mentioned." });
  }

  // // Check for proper URL
  // if (url && !notValidateURL) {
  //   const expression =
  //     /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
  //   const regex = new RegExp(expression);

  //   if (!url.match(regex)) {
  //     return Promise.reject({ message: "Malformed URL, Please check" });
  //   }
  // }

  // //Checking the Internet connection
  if (!navigator.onLine) {
    return Promise.reject({ code: 503, message: "Unable to connect with Internet!" });
  }

  //Initializing the header
  let newHeader = headers;

  //Adding Authorization to headers if it is requested
  if (isAuthorized) {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem(LocalStoragekeys.token);
    newHeader = {
      ...headers,
      "Content-Type": "application/json",
      Authorization:
        "Bearer " + token,
    };
  }

  return Axios({
    method: method,
    url: url,
    data: body,
    headers: newHeader,
    ...otherProps
  }).catch((error) => {    
      return Promise.reject(error);
  });
};
