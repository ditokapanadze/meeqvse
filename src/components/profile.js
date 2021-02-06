import axios from 'axios'
import React, {useContext, useEffect, useState } from 'react'
import useAuth from "../hooks/useAuth"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  useParams
} from "react-router-dom";
import UserContext from "../UserContext"
let Profile =() =>{
    const [userInfo, setUserInfo] = useState([])
    const auth = useAuth();
    const params = useParams()
    let history = useHistory()
    const page = 1
   const {setCurrentUser} = useContext(UserContext)
    
    useEffect(()=>{
        axios.get('https://us-central1-js04-b4877.cloudfunctions.net/api/profile',{
          headers: {
            Authorization: `Bearer ${auth.token}` 
          }})
        .then(res =>{ 
          setUserInfo(res.data.data)
            console.log(userInfo)
        })
        .catch(error => console.log(error))
    }, [])
    
    let logOut =() =>{
      setCurrentUser('')
      localStorage.removeItem("token");
      history.push('/')
    }


    return(
    <div>
      <img src={userInfo.profile_picture}></img>
        <div>user name: {userInfo.username}</div>
        <div>first namte: {userInfo.first_name}</div>
        <div>last namte: {userInfo.last_name}</div>
        <div>age: {userInfo.age}</div>
        <button onClick={logOut}>LOG OUT</button>
        </div>
    )
}



    


export default Profile