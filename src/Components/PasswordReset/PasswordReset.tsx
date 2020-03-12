import React from 'react';
import history from '../../utils/history';
import axios from 'axios';
import * as url from '../../utils/constant';
import { css } from "@emotion/core";
import { ClipLoader } from "react-spinners";
import tickIcon from '../../assets/images/tick.svg';
import SweetAlert from 'react-bootstrap-sweetalert';
import TextField from '@material-ui/core/TextField';

import './passwordreset.scss';

interface PasswordResetProps {

}
interface PasswordResetState {
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

class PasswordReset extends React.Component<PasswordResetProps, PasswordResetState> {
   
    state = {
        email:"",
        password:"",
        isValidated:true,
        isSuccess:false,
        formSubmitted:false,
        errors: {
            email: '',
          }
    }

    validateForm():boolean{ 
        if(this.state.email){
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
            axios.post(url.passwordResetUrl, {
                email:this.state.email,
              })
              .then((response) => {
                that.setState({
                    isSuccess:true,
                    formSubmitted:false,
                    errors:{},
                });

                setTimeout(() => {
                    that.setState({
                        isSuccess:false,
                    });
                     history.push("/signin");  
                }, 5000);
 
              })
              .catch((error) => {
                  let form_errors = {
                    email:error.response?.data['email'],
                  }
                
                  that.setState({
                      errors:form_errors,
                      formSubmitted:false,
                  });
              })
              .finally( () => {
                // always executed
              });           
        }
  
    }
    
    render() {
        return (    
            <div id= "password-reset">
                <div className="align-items-center d-flex justify-content-center sweet-loading">
                    <ClipLoader
                    css={override}
                    size={150}
                    //size={"150px"} this also works
                    color={"#123abc"}
                    loading={this.state.formSubmitted}
                   />
                </div>
                <div  className={"container-fluid login-container login-form ".concat(this.state.formSubmitted?"screen-overlay":"")}>             
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
                                
                                <div className={"form-group ".concat(!this.state.isValidated && this.state.email ==="" ? 'validate':'' )}>
                                    <p>
                                        Enter your user account's verified email address and we will send you a password reset link.
                                    </p>
                                    <div className = "pt-2">  
                                        <TextField 
                                        onChange={(event) => {this.setState({email: event.target.value})}} 
                                        value = {this.state.email} 
                                        className = 'outlined-input-custom' 
                                        label="Email" 
                                        type="email"
                                        variant="outlined" 
                                        />
                                        <span className="error ml-1">{this.state.errors?.email && this.state.errors?.email[0]}</span>   
                                    </div>
                                    </div>
                              
                                <div className="form-group custom-submit ">
                                    <button className="btn btnSubmit" type="submit"><i className=" fa fa-long-arrow-right" aria-hidden="true"></i>
                                    </button>
                                </div>
                                <div className="position-relative">        
                                    <SweetAlert  
                                        title="Check your email for a link to reset your password."
                                        onConfirm={()=>{}}
                                        onCancel={()=>{}}
                                        showConfirm = {false}
                                        show = {this.state.isSuccess}
                                        >
                                        <div>
                                            <img className="tick-img" src = {tickIcon} />
                                        </div>
                                    </SweetAlert>
                                </div>
                            </form>
                        </div>
                    </div>
                
                </div> 
            </div>
        );
    }
}

export default PasswordReset;

