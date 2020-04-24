import React from 'react';
import axios from 'axios';
import * as url from '../../utils/constant';
import history from '../../utils/history';
import { css } from "@emotion/core";
import { ClipLoader } from "react-spinners";
import tickIcon from '../../assets/images/tick.svg';
import TextField from '@material-ui/core/TextField';
import SweetAlert from 'react-bootstrap-sweetalert';

import './passwordresetconfirm.scss';

interface PasswordResetConfirmProps {
    location?:any,
}
interface PasswordResetConfirmState {
    password1:string,
    password2:string,
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

class PasswordResetConfirm extends React.Component<PasswordResetConfirmProps, PasswordResetConfirmState> {
    
    uid:any = "";
    token:any = "";

    state = {
        password1:"",
        password2:"",
        isValidated:true,
        isSuccess:false,
        formSubmitted:false,
        errors: {
            new_password2: '',
        }
    }

    componentDidMount(){
        let params = new URLSearchParams(this.props?.location?.search);
        this.uid = params.get("uidb64")?.toString();
        this.token =  params.get("token")?.toString();
    }

    validateForm():boolean{ 
        if(this.state.password1 && this.state.password2){
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
            axios.post(url.passwordResetConfirmUrl, {
                uid:this.uid,
                token:this.token,
                new_password1:this.state.password1,
                new_password2:this.state.password2,
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
                }, 3000);

              })
              .catch((error) => {

                  let form_errors = {
                    new_password2:error.response?.data['new_password2'],
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
            <div id= "password-reset-confirm">
                <div className="align-items-center d-flex justify-content-center sweet-loading">
                    <ClipLoader
                    css={override}
                    size={150}
                    //size={"150px"} this also works
                    color={"#123abc"}
                    loading={this.state.formSubmitted}
                   />
                </div>
                <div className={"container-fluid login-container login-form ".concat(this.state.formSubmitted?"screen-overlay":"")}>             
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
                        <div className="pt-3 col-lg-5 login-form">
                            <form onSubmit={this.submitForm.bind(this)}>
                                <div className={"form-group ".concat(!this.state.isValidated && this.state.password1 ==="" ? 'validate':'' )}>
                                    <TextField 
                                        onChange={(event) => {this.setState({password1: event.target.value})}} 
                                        value = {this.state.password1} 
                                        className = 'outlined-input-custom' 
                                        label="New Password" 
                                        type="password"   
                                        variant="outlined" 
                                    />
                                    {/* <span className="error ml-1">{this.state.errors?.loginError && this.state.errors?.loginError[0]}</span> */}
                                </div>
                                <div className={"form-group ".concat(!this.state.isValidated && this.state.password2 ==="" ? 'validate':'' )}>
                                     <TextField 
                                        onChange={(event) => {this.setState({password2: event.target.value})}} 
                                        value = {this.state.password2} 
                                        className = 'outlined-input-custom' 
                                        label="Confirm New Password" 
                                        type="password"   
                                        variant="outlined" 
                                    />
                                    <span className="error ml-1">{this.state.errors?.new_password2 && this.state.errors?.new_password2[0]}</span>
                                </div>
                                <div className="form-group custom-submit">
                                    <button className="btn btnSubmit" type="submit"><i className=" fa fa-long-arrow-right" aria-hidden="true"></i>
                                    </button>
                                </div>
                                <SweetAlert
                                    title="Password has been reset with the new password."
                                    onConfirm={()=>{}}
                                    onCancel={()=>{}}
                                    showConfirm = {false}
                                    show = {this.state.isSuccess}
                                >           
                                    <div>
                                        <img className="tick-img" src = {tickIcon} />
                                    </div>                             
                                </SweetAlert>
                            </form>
                        </div>
                    </div>
                
                </div> 
            </div>
        );
    }
}

export default PasswordResetConfirm;

