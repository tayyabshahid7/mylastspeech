import React from 'react';
import history from '../../utils/history';
import axios from 'axios';
import * as url from '../../utils/constant';
import { css } from "@emotion/core";
import { ClipLoader } from "react-spinners";
import TextField from '@material-ui/core/TextField';

import './signin.scss';
import { Link } from 'react-router-dom';


// const trackingId = "UA-158954661-1"; // Replace with your Google Analytics tracking ID


interface SignInProps {
    changeProfilePic?:any;
}
interface SignInState {
    email:string,
    password:string,
    isValidated: boolean,
    isSuccess:boolean,
    errors:object,
    formSubmitted:boolean,
}
const override = css`
  display: block;
  position:absolute;
  z-index:9999;
  margin:0 auto;
  border:5px solid;
  border-color: #8600B5;
  top:40%;
`;

class SignIn extends React.Component<SignInProps, SignInState> {
   
    state = {
        email:"",
        password:"",
        isValidated:true,
        isSuccess:false,
        formSubmitted:false,
        errors: {
            loginError: '',
          }
    }

    validateForm():boolean{ 
        if(this.state.password && this.state.email){
          return true;
        }
        return false;
    }
    
    submitForm = (e:any) => {
        e.preventDefault();
        let flag = this.validateForm();
        this.setState({
            isValidated:flag,
            formSubmitted:true,
        });
        if(flag){
           let that = this;
            axios.post(url.loginURL, {
                email:this.state.email,
                password:this.state.password,
              })
              .then((response) => {
                   debugger;
                that.setState({
                    isSuccess:true,
                    formSubmitted:false,
                    errors:{},
                });
                that.setState({
                    isSuccess:false,
                });
                localStorage.setItem('userToken',response.data.key);
                localStorage.setItem('user',JSON.stringify(response.data.user))
                response.data.user['profile_picture'] && this.props.changeProfilePic(response.data.user['profile_picture'])
                
                // ReactGA.set({
                //     userId: response.data.key
                // });
                history.push("/success");   
              })
              .catch((error) => {
                 debugger;
                  let form_errors = {};   
                  if(error.response?.data['email'][0] === "E-mail is not verified."){
                    history.push({
                        pathname: '/resend',
                        state: { email: that.state.email }
                     });
                  }
                  if(error.response?.data['email'] && error.response?.data['email'][0] === "Enter a valid email address."){
                      form_errors = {
                        loginError:error.response?.data['email'],
                      }
                  }else{
                    form_errors = {
                        loginError:error.response?.data['login-error'],
                    }      
                  }

                  that.setState({
                      errors:form_errors,
                      formSubmitted:false,
                  });
              })
              .finally( () => {
                // always executed
              });           
        }else{
            let loginError:any = [];
            loginError[0] = "Please Enter all required field";
            let form_errors = {
                loginError:loginError
            }
            this.setState({
                errors:form_errors,
                formSubmitted:false,
            })
        }
  
    }
    
    render() {
        return (    
            <div>
                <div className="align-items-center d-flex justify-content-center sweet-loading">
                    <ClipLoader
                    css={override}
                    size={150}
                    //size={"150px"} this also works
                    color={"#123abc"}
                    loading={this.state.formSubmitted}
                   />
                </div>
                <div id= "login-container" className={"container-fluid login-container login-form ".concat(this.state.formSubmitted?"screen-overlay":"")}>             
                    <div className="row background-images">
                            <div className="col-12 col-md-6 left-section-login position-relative">
                                <div className="col-3 first-div"></div>
                                <div className="col-3 second-div"></div>
                            </div>
                            <div className="col-12 col-md-6 right-section-login p-0 position-relative">
                            <div className="col-3 third-div"></div>
                                <div className="col-3 fourth-div"></div>
                            </div>
                        </div>
                
                    <div className="align-items-center d-flex justify-content-center row custom-login login-dailog">
                        <div className="  col-lg-6 login-form">
                            <form onSubmit={this.submitForm.bind(this)}>
                                <div className={"form-group mt-3 ".concat(!this.state.isValidated && this.state.email ==="" ? 'validate':'' )}>
                                    <TextField  
                                    onChange={(event) => {this.setState({email: event.target.value})}} 
                                    value = {this.state.email} 
                                    className = 'outlined-input-custom' 
                                    label="Email" 
                                    type="email"
                                    variant="outlined" 
                                    />
                                </div>
                                <div className={"form-group mb-0 ".concat(!this.state.isValidated && this.state.password ==="" ? 'validate':'' )}>
                                    <TextField 
                                    onChange={(event) => {this.setState({password: event.target.value})}} 
                                    value = {this.state.password} 
                                    className = 'outlined-input-custom' 
                                    label="Password" 
                                    type="password"   
                                    variant="outlined" 
                                    />
                                    <span className="error ml-1">{this.state.errors?.loginError && this.state.errors?.loginError[0]}</span>
                                </div>
                                <div className="form-group pt-4">
                                    <Link to = "/passwordreset" className="ForgetPwd">Forget Password?</Link>
                                </div>
                                <div className="form-group custom-submit ">
                                    <button className="btn btnSubmit" type="submit"><i className=" fa fa-long-arrow-right" aria-hidden="true"></i>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                
                </div> 
            </div>
        );
    }
}

export default SignIn;

