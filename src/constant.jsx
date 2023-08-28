import React from "react";
import { RiHomeLine , RiHomeFill } from "react-icons/ri";
import { AiFillHeart , AiOutlineHeart } from "react-icons/ai";
import { BsFillChatFill , BsChat ,BsPersonFill , BsPerson, BsGenderMale, BsGenderFemale, BsGenderTrans} from "react-icons/bs";
import { getDownloadURL, ref, storage, uploadBytesResumable } from "../firebase";


export const LocalStoragekeys={
    token:"token",
    user_id:"user_id"
}
export let AlertContext = React.createContext({
    show: false,
    message: "",
    onclose: () => null,
    setSnack: () => null,
  });

export const NavOption=[
    {
        selected:<RiHomeFill style={{fontSize:"1.6rem" , color:"#fff"}}/>,
        unselected:<RiHomeLine style={{fontSize:"1.4rem" , color:"#fff"}}/>,
        location:"/home"
    },
    {
        selected:<AiFillHeart style={{fontSize:"1.6rem" , color:"#fff"}}/>,
        unselected:<AiOutlineHeart style={{fontSize:"1.4rem" , color:"#fff"}}/>,
        location:"/followers"
    },
    {
        selected:<BsFillChatFill style={{fontSize:"1.6rem" , color:"#fff"}}/>,
        unselected:<BsChat style={{fontSize:"1.4rem" , color:"#fff"}}/>,
        location:"/chat"

    },
    {
        selected:<BsPersonFill style={{fontSize:"1.6rem" , color:"#fff"}}/>,
        unselected:<BsPerson style={{fontSize:"1.4rem" , color:"#fff"}}/>,
        location:"/profile/view"
    },
]

export const genderOption = [
    {
        selected:<BsGenderMale style={{color:"#fff" , fontSize:"1.3rem"}}/>,
        unselected:<BsGenderMale style={{color:"#ff1d4e" , fontSize:"1.3rem"}}/>,
        value:"male"
    },
    {
        selected:<BsGenderFemale style={{color:"#fff" , fontSize:"1.3rem"}}/>,
        unselected:<BsGenderFemale style={{color:"#ff1d4e" , fontSize:"1.3rem"}}/>,
        value:"female"
    },
    {
        selected:<BsGenderTrans style={{color:"#fff" , fontSize:"1.3rem"}}/>,
        unselected:<BsGenderTrans style={{color:"#ff1d4e" , fontSize:"1.3rem"}}/>,
        value:"transgender"

    }
]
export const friendsOptions = [
    {
        name: "Friends",
        value: "friends"
    },
    {
        name: "Request to others",
        value: "to"

    },
    {
        name: "Request from others",
        value: "from"

    },
]

export const TimeDiffBetweenDates=(date1,date2)=>{
    console.log(date1,date2)
    function formatTimeDifference(startDate, endDate) {
      const timeDifferenceMs = endDate - startDate;
    
      const hours = Math.floor(timeDifferenceMs / (1000 * 60 * 60));
      const minutes = Math.floor((timeDifferenceMs % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDifferenceMs % (1000 * 60)) / 1000);
    
      let formattedTime = '';
      if (hours > 0) {
        formattedTime = `${hours}hr `;
      }
      if (minutes > 0) {
        formattedTime = `${minutes}min `;
      }
  
      if (seconds > 0) {
        formattedTime = `${seconds}sec `;
      }

      if(seconds === 0){
        formattedTime = `now`;

      }
    
      return formattedTime.trim();
    }
    
    const startDate = new Date(date1);  
    const endDate = new Date(date2);    
    
    const formattedTime = formatTimeDifference(startDate, endDate);
    
    return formattedTime;
    
  }

 export const ImageUploadFunction = async (file , fun=()=>false , alert) => {
    if (!file) return
    const storageRef = ref(storage, `files/${file?.name}`)
    const uploadFile = uploadBytesResumable(storageRef, file)
    await uploadFile.on("state_changed", (snapshot) => {
        const value = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
        console.log(value, 'value')

    }, (err) => {
        if(alert){
            alert.setSnack({
                ...alert,
                show: true,
                message: "Some thing went wrong",
                type: "error"
            });
        }
        console.log(err)
    }, () => {
        getDownloadURL(uploadFile.snapshot.ref).then((url) => {
            console.log(url , 'slsl')
          fun(url)

        })
    })
}
const alphabetColors = {
    A: '#C24B23',
    B: '#647D18',
    C: '#2C7E4E',
    D: '#3275A5',
    E: '#5E3B77',
    F: '#773B54',
    G: '#A1652A',
    H: '#366D00',
    I: '#387C65',
    J: '#55678C',
    K: '#9636A9',
    L: '#A93666',
    M: '#867339',
    N: '#497639',
    O: '#228078',
    P: '#464D9F',
    Q: '#994092',
    R: '#890A3F',
    S: '#616116',
    T: '#267D26',
    U: '#3E6C75',
    V: '#453B77',
    W: '#773B63',
    X: '#CB2C6E',
    Y: '#6F2E2E',
    Z: '#962CCB',
  };

  export const stringAvatar = (name) => {
    let capName = name ? name.trim('').toUpperCase() : undefined
    return {
  bgcolor: alphabetColors[capName?.[0]],
      children: capName && (capName.indexOf(' ') >= 0 ? `${capName.split(' ')[0][0]}${capName.split(' ')[1][0]}` : `${capName.split(' ')[0][0]}`),
    };
  }
  