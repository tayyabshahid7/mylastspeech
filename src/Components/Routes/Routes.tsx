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
import TermAndPrivacy from '../TermAndPrivacy/TermAndPrivacy';
import ReactGA from 'react-ga';

const trackingId = "UA-158954661-1";
ReactGA.initialize(trackingId);
ReactGA.pageview(window.location.pathname + window.location.search);

const Routes: React.FC = () => {
  const [isSignUp,setIsSignUp] = useState(false);
  const [isSignIn,setIsSignIn] = useState(false);
  const [isRightBar,setIsRightBar] = useState(true);
  const [profilePic,setProfilePic] = useState('');
 

  return (
    
    <Router history={history}>
      <div id="main-div">
        <Navbar profilePic = {profilePic}  isRightBar = {isRightBar} signUpNavBar = {isSignUp} signInNavBar = {isSignIn}/>   

        <Route exact path='/' render={(props) =>
            {
              const loggedIn = localStorage.getItem("userToken");            
                setIsSignUp(false);
                setIsSignIn(false);
                return(
                  <Home  {...props}/>
                )
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
                 <Dashboard  changeProfilePic = {()=>{}} {...props}/>
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

        {/* <Route exact path='/termandprivacy' render={(props) =>
            {         
              setIsSignUp(true);
              setIsSignIn(true);
              setIsRightBar(false);
              return(
                <TermAndPrivacy {...props} />
              )          
          }
          }
        />  */}

        <Route exact path='/dashboard' render={(props) =>
            {
              const loggedIn = localStorage.getItem("userToken");
              if(loggedIn && loggedIn.length>0){
                setIsSignUp(true);
                setIsSignIn(true);
                setIsRightBar(true);
                return(
                 <Dashboard {...props}
                  changeProfilePic = {(profile_url:string)=>{
                      profile_url && setProfilePic(profile_url)

                  }} />
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
                 <Dashboard changeProfilePic = {()=>{}}  {...props}/>
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
                 <Dashboard changeProfilePic = {()=>{}}  {...props}/>
                )
              }else{
                setIsSignIn(true);
                setIsSignUp(false);
                return(
                  <SignIn {...props} changeProfilePic = {(profile_url:string)=>{
                    profile_url && setProfilePic(profile_url)
                    }} />
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
                 <Dashboard changeProfilePic = {()=>{}} {...props}/>
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
                 <Dashboard changeProfilePic = {()=>{}} {...props}/>
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
