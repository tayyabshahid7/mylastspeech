import React from 'react';
import './signup.scss';
import history from '../../utils/history';
import axios from 'axios';
import SweetAlert from 'react-bootstrap-sweetalert';
import TextField from '@material-ui/core/TextField';
import { css } from "@emotion/core";
import { ClipLoader } from "react-spinners";
import TermAndPrivacy from '../TermAndPrivacy/TermAndPrivacy';
import tickIcon from '../../assets/images/tick.svg';
import * as url from '../../utils/constant';

interface SignUpProps {
    location?:any,
}

interface SignUpState {
    isResend:boolean,
    firstName:string,
    lastName:string,
    email:string,
    password1:string,
    password2:string,
    tosChecked:boolean,
    isValidated: boolean,
    isSuccess:boolean,
    formSubmitted:boolean,
    errors:object,
    showPrivacyModal:boolean,
    activeTab:string,
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

class SignUp extends React.Component<SignUpProps, SignUpState> {

    state = {
        isResend:false,
        firstName:"",
        lastName:"",
        email:"",
        password1:"",
        password2:"",
        tosChecked:false,
        isValidated:true,
        isSuccess:false,
        formSubmitted:false,
        showPrivacyModal:false,
        activeTab:'',
        errors: {
            email: '',
            password: '',
          }
    }

    componentDidMount(){
        this.setState({
            email:this.props?.location?.state?.email,
        });
    }
    
    validateForm():boolean{ 
        if(this.state.firstName && this.state.lastName && this.state.password1 && this.state.password2 && this.state.email && this.state.tosChecked){
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
        })
        if(flag){
           let that = this;
            axios.post(url.registerURL, {
                first_name:this.state.firstName,
                last_name:this.state.lastName,
                password1:this.state.password1,
                password2:this.state.password2,
                email:this.state.email,
              })
              .then( (response) =>{
                that.setState({
                    isSuccess:true,
                    errors:{},
                    formSubmitted:false,
                });
                setTimeout(() => {
                    that.setState({
                        isSuccess:false,
                    });
                    history.push({
                        pathname: '/resend',
                        state: { email: that.state.email }
                     });
                }, 2500);
              })
              .catch( (error)=> {
                  let form_errors = {
                      email:error.response?.data['email'],
                      password:error.response?.data['password1'],
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
            this.setState({
                formSubmitted:false,
            });
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
                <div className={"container-fluid login-container sign-up ".concat(this.state.formSubmitted?"screen-overlay":"")}>
                    <div className="row background-images">
                            <div className="col-12 col-md-4 left-section position-relative">
                                <div className="col-3 first-div"></div>
                                <div className="col-3 second-div"></div>
                            </div>
                            <div className="col-12 col-md-6 right-section p-0 position-relative">
                            <div className="col-3 third-div"></div>
                                <div className="col-3 fourth-div"></div>
                            </div>
                        </div>
                
                    <div className="align-items-center d-flex justify-content-center row custom-login signup-dialog">
                        <div className="col-lg-4 col-12  login-form">
                            <form   onSubmit={this.submitForm.bind(this)}>
                                <div className={"form-group mt-4 ".concat(!this.state.isValidated && this.state.firstName ==="" ? 'validate':'' )}>
                                    <TextField 
                                        onChange={(event) => {this.setState({firstName: event.target.value});}}
                                        value = {this.state.firstName} 
                                        className = {(this.state.firstName && this.state.firstName.length > 0 )? 'outlined-input-custom active' : 'outlined-input-custom' }
                                        label="First Name" 
                                        variant="outlined" 
                                    />
                                </div>
                                <div className={"form-group mt-4 ".concat(!this.state.isValidated && this.state.lastName ==="" ? 'validate':'' )}>
                                    <TextField 
                                        onChange={(event) => {this.setState({lastName: event.target.value});}}
                                        value = {this.state.lastName} 
                                        className = {(this.state.lastName && this.state.lastName.length > 0) ? 'outlined-input-custom active' : 'outlined-input-custom' }
                                        label="Last Name" 
                                        variant="outlined" 
                                    />
                                </div>
                                <div className={"form-group ".concat(!this.state.isValidated && this.state.email ==="" ? 'validate':'' )}>
                                     <TextField 
                                        onChange={(event) => {this.setState({email: event.target.value});}}
                                        value = {this.state.email} 
                                        className = {(this.state.email && this.state.email.length > 0) ? 'outlined-input-custom active' : 'outlined-input-custom' }
                                        label="Email" 
                                        type="email"
                                        variant="outlined" 
                                    />
                                    <span className="error ml-1">{this.state.errors?.email && this.state.errors?.email[0]}</span>
                                </div>
                                <div className={"form-group ".concat(!this.state.isValidated && this.state.password1 ==="" ? 'validate':'' )}>
                                    <TextField 
                                        onChange={(event) => {this.setState({password1: event.target.value});}}
                                        value = {this.state.password1} 
                                        className =  {(this.state.password1 && this.state.password1.length > 0 ) ? 'outlined-input-custom active' : 'outlined-input-custom' }
                                        label="Password" 
                                        type="password"
                                        variant="outlined" 
                                    />
                                </div>
                                <div className={"form-group ".concat(!this.state.isValidated && this.state.password2 ==="" ? 'validate':'' )}>
                                    <TextField 
                                        onChange={(event) => {this.setState({password2: event.target.value});}}
                                        value = {this.state.password2} 
                                        className = {(this.state.password2 && this.state.password2.length > 0 )   ? 'outlined-input-custom active' : 'outlined-input-custom' }
                                        label="Repeat Password" 
                                        type="password"
                                        variant="outlined" 
                                    />
                                    <span className="error ml-1">{this.state.errors?.password && this.state.errors?.password[0]}</span>
                                </div>
                                <div className={"d-flex align-items-center form-group mt-3 pb-4 form-field ".concat(!this.state.isValidated && !this.state.tosChecked  ? 'validate':'' )}>
                                    <span onClick={(event) => { this.setState({tosChecked: !this.state.tosChecked});}} >
                                        <input type="checkbox" checked={this.state.tosChecked} />
                                        <span className="checkmark"></span>
                                    </span>
                                    
                                    <span className="pl-2"> I agree to
                                        <a href="#" style ={{color:"#000"}} onClick = {()=>{this.setState({showPrivacyModal:true,activeTab:"Privacy"})}}> privacy policy</a> and <a style ={{color:"#000"}} href="#" onClick = {()=>{this.setState({showPrivacyModal:true,activeTab:"Terms"})}}>terms of service</a><br/>
                                    </span>
                                    <div className="position-relative">        
                                        <SweetAlert  
                                            title="Successfully Registered!"
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
                                </div>
                                <div className="form-group custom-submit">
                                    <button className="btn btnSubmit" type="submit"> <i className=" fa fa-long-arrow-right" aria-hidden="true"></i>
                                    </button>
                                </div>
                            </form>
                    </div>
                </div>
                        
                </div>  
                
                <TermAndPrivacy 
                    showPrivacyModal =  {this.state.showPrivacyModal}
                    closeModal = {()=>{
                    this.setState({showPrivacyModal:false});
                }}/> 
                  
            </div> 
        );
    }
}

export default SignUp;

