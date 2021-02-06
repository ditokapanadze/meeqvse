import React, {useEffect, useState } from 'react'
import HomePage from './components/HomePage'
import ProductPage from './components/productPage'
import AllProducts from './components/allProducts'
import FoundProduct from './components/searchProduct'
import SignIn from './components/sighnIn'
import Profile from './components/profile'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams
} from "react-router-dom";
import Navbar from './components/navbar';
import UserContext from "./UserContext";
const token = localStorage.getItem('token');

function App() {
  const [currentUser, setCurrentUser] = useState({token});
  console.log("token " + token)
  
  return (
    
    <Router>
      <UserContext.Provider value={{currentUser, setCurrentUser}}>
    <div>
      
      <Navbar/>
     <Switch>
        <Route path="/products/show/:id">
          <ProductPage />
        </Route>
          <Route path="/AllProducts/:page?">
           <AllProducts />
          </Route>
         <Route path="/search/:param">
           <FoundProduct/>
         </Route>
         <Route path="/signIn">
           <SignIn/>
         </Route>
         <Route path="/profile">
           <Profile/>
         </Route>
        <Route path="/:page?">
            <HomePage />
         </Route>
        </Switch>
    </div>  
    </UserContext.Provider>

    </Router>
  );
}
function About() {
  return <h2>About</h2>;
}
export default App;
