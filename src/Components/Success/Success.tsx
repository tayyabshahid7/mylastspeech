import React from 'react';
import history from '../../utils/history';
import axios from 'axios';
import * as url from '../../utils/constant';
import { css } from "@emotion/core";
import { ClipLoader } from "react-spinners";
import TextField from '@material-ui/core/TextField';

import './success.scss';
import { Link } from 'react-router-dom';


// const trackingId = "UA-158954661-1"; // Replace with your Google Analytics tracking ID


interface SuccessProps {
    changeProfilePic?:any;
}
interface SuccessState {
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

class Success extends React.Component<SuccessProps, SuccessState> {
   
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
                
                history.push({
                    pathname: '/dashboard',
                    state: { lastLogin: response.data.user.is_first_login }
                 });
              })
              .catch((error) => {
                 debugger;
                  let form_errors = {};   
                  if(error.response?.data['email'] && error.response?.data['email'][0] === "E-mail is not verified."){
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
                <div id= "success" className={"container-fluid login-container login-form ".concat(this.state.formSubmitted?"screen-overlay":"")}>             
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
                        <div className="col-lg-4 login-form">
                          
                            <form onSubmit={this.submitForm.bind(this)}>
                                <div className = "pb-3">
                                    <p style = {{fontSize:"20px"}}><b>Success.</b></p>
                                    <p style = {{opacity:"0.8"}}>Please log in with the account you created. Then you can get started writing your speech. </p>
                                </div>
                                <div className={"form-group mt-3 ".concat(!this.state.isValidated && this.state.email ==="" ? 'validate':'' )}>
                                    <TextField  
                                    onChange={(event) => {this.setState({email: event.target.value})}} 
                                    value = {this.state.email} 
                                    className = {this.state.email ? 'outlined-input-custom active' : 'outlined-input-custom'} 
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

export default Success;



// import React from 'react';
// import './success.scss';
// import { Link } from 'react-router-dom';

// interface SuccessProps {

// }
// interface SuccessState {

// }

// class Success extends React.Component<SuccessProps, SuccessState> {

//     render() {
//         return (
//             <div className="container login-container success mt-5">
//                 <div className="align-items-center d-flex justify-content-center row custom-login">
//                     <div className="col-12 col-lg-6 success text-center">
//                         <h3>Success!</h3>
//                         <p className="pt-4 pb-4"> Now you will be taken to the speech<br />
//                             editor where you will need to Fill<br />
//                             in some additional information before you<br />
//                             can get started.</p>
//                         <Link to="/signin">
//                             <button className="btn success-btn">
//                             <a className="nav-link"> Lets get started &nbsp;&nbsp;
//                             <i className=" fa fa-long-arrow-right" aria-hidden="true"></i>
//                             </a>
//                         </button>
//                         </Link>
                       
//                     </div>
//                 </div>

//             </div>
//         );
//     }
// }

// export default Success;

