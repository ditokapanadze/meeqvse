import axios from 'axios';
import React, {useEffect, useState, useContext } from 'react'
import useAuth from "../hooks/useAuth"
import '../App.css'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useHistory,
    useParams,
    Link
  } from "react-router-dom";
import AllProducts from './allProducts';
import HomePage from './HomePage';
import UserContext from "../UserContext"


let Navbar = () =>{
  const {isLoggedIn, saveToken} = useAuth();
  const {currentUser} = useContext(UserContext)
    const [search, setSearch] = useState('')
    const [foundProducts, setFoundProducts] = useState([])
    let history = useHistory();

  let updateSearch =(event) =>{
      setSearch(event.target.value)
      console.log(search+ " search")
      }

  let getSearch = (e) =>{
    
    e.preventDefault()
      let searchString = search.toLowerCase().split(' ').join('+')
      e.preventDefault()
      history.push(`/search/${searchString}`);
      setSearch('')
}
 let Buttons = () =>{
   if(isLoggedIn){
     return (
       <button onClick={()=>history.push("/profile")}>MY PROFILE</button>
     )
   } else {
     return(
      <button onClick={()=>history.push("/signIn")}>
      SIGHN IN
    </button>
     )
   }
 }
    return(
        <div>
            <nav className="nav">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/AllProducts">All Prodcuts</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
            <li>
              <form onSubmit={getSearch}>
                <input  type="text" value={search} onChange={updateSearch} required/> 
                <button type="submit">SEARCH</button>
              </form>
            </li>
            <li>
              <Buttons/>
            </li>
            
          </ul>
        </nav>
        </div>
    )
}


export default Navbar