import React, { useState } from 'react';
import { Redirect } from 'react-router';
import { Route, Link,  Router } from 'react-router-dom';
import './routes.scss';

import Home from './../Home/Home';
import Navbar from './../Navbar/Navbar';
import history from "../../utils/history";
import SignUp from './../SignUp/SignUp';
import SignIn from './../SignIn/SignIn';
import Resend from './../Resend/Resend';
import Success from './../Success/Success';
import Dashboard from '../Dashboard/Dashboard';
import PasswordReset from '../PasswordReset/PasswordReset';
import PasswordResetConfirm from '../PasswordResetConfirm/PasswordResetConfirm';

const Routes: React.FC = () => {
  const [isSignUp,setIsSignUp] = useState(false);
  const [isSignIn,setIsSignIn] = useState(false);
  const [isRightBar,setIsRightBar] = useState(true);
 

  return (
    
    <Router history={history}>
      <div id="main-div">
        <Navbar isRightBar = {isRightBar} signUpNavBar = {isSignUp} signInNavBar = {isSignIn}/>   

        <Route exact path='/' render={(props) =>
            {
              const loggedIn = localStorage.getItem("userToken");
              if(loggedIn && loggedIn.length>0){
                setIsSignUp(true);
                setIsSignIn(true);
                setIsRightBar(true);
                return(
                 <Dashboard  {...props}/>
                )
              }else{
                setIsSignUp(false);
                setIsSignIn(false);
                return(
                  <Home  {...props}/>
                )
              }         
            }
          }
        />  

        <Route exact path='/signup' render={(props) =>
            {
              const loggedIn = localStorage.getItem("userToken");
              if(loggedIn && loggedIn.length>0){
                setIsSignUp(true);
                setIsSignIn(true);
                setIsRightBar(true);
                return(
                 <Dashboard  {...props}/>
                )
              }else{
                setIsSignUp(true);
                setIsSignIn(false);
                return(
                  <SignUp  {...props}/>
                )
              }
            
            }
          }
        /> 

        <Route exact path='/success' render={(props) =>
            {

              const loggedIn = localStorage.getItem("userToken");
              if(loggedIn && loggedIn.length>0){
              setIsSignUp(true);
              setIsSignIn(true);
              setIsRightBar(false);
              return(
                <Success  {...props}/>
              )
            }else{
              return(
                <Redirect to="/signin"/>
               )
            }
          }
          }
        /> 

        <Route exact path='/dashboard' render={(props) =>
            {
              const loggedIn = localStorage.getItem("userToken");
              if(loggedIn && loggedIn.length>0){
                setIsSignUp(true);
                setIsSignIn(true);
                setIsRightBar(true);
                return(
                 <Dashboard  {...props}/>
                )
              }else{
                return(
                  <Redirect to="/signin"/>
                 )
              }            
            }
          }
        /> 


        <Route exact path='/resend' render={(props) =>
            {
              const loggedIn = localStorage.getItem("userToken");
              if(loggedIn && loggedIn.length>0){
                setIsSignUp(true);
                setIsSignIn(true);
                setIsRightBar(true);
                return(
                 <Dashboard  {...props}/>
                )
              }else{
                setIsSignUp(true);
                setIsSignIn(false);
                return(
                 <Resend  {...props}/>
                )
              }
             
            }
          }
        /> 

        <Route exact path='/signin' render={(props) =>
            {
              const loggedIn = localStorage.getItem("userToken");
              if(loggedIn && loggedIn.length>0){
                setIsSignUp(true);
                setIsSignIn(true);
                setIsRightBar(true);
                return(
                 <Dashboard  {...props}/>
                )
              }else{
                setIsSignIn(true);
                setIsSignUp(false);
                return(
                  <SignIn  {...props}/>
                 )
              }
             
            }
          }
        />  
        <Route exact path='/passwordreset' render={(props) =>
            {
              const loggedIn = localStorage.getItem("userToken");
              if(loggedIn && loggedIn.length>0){
                setIsSignUp(true);
                setIsSignIn(true);
                setIsRightBar(true);
                return(
                 <Dashboard  {...props}/>
                )
              }else{
                setIsSignIn(true);
                setIsSignUp(false);
                return(
                  <PasswordReset  {...props}/>
              )
              }
             
            }
          }
        />  
         <Route exact path='/password_reset_confirm' render={(props) =>
            {
              const loggedIn = localStorage.getItem("userToken");
              if(loggedIn && loggedIn.length>0){
                setIsSignUp(true);
                setIsSignIn(true);
                setIsRightBar(true);
                return(
                 <Dashboard  {...props}/>
                )
              }else{
                setIsSignIn(true);
                setIsSignUp(false);
                return(
                  <PasswordResetConfirm  {...props}/>
                )
              }
             
            }
          }
        />  
        
      </div>
    </Router>
  )
}
export default Routes;
