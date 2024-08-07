import React from 'react';
import history from '../../utils/history';
import axios from 'axios';
import * as url from '../../utils/constant';
import SweetAlert from 'react-bootstrap-sweetalert';
import tickIcon from '../../assets/images/tick.svg';
import './resend.scss';

interface ResendProps {
    location?:any,
}
interface ResendState {
    code: string,
    isSuccess:boolean,
    successText:string,
}

class Resend extends React.Component<ResendProps, ResendState> {

    email = ""
    state = {
        code:"",
        isSuccess:false,
        successText:"",  
    }
    
    componentDidMount(){
        if(this.props.location.state && this.props.location.state.email){
            this.email = this.props.location.state.email;
        }else{
            let params = new URLSearchParams(this.props?.location?.search);
            this.email = params.get('email')?.toString();
        }
    }
    submitCode = (e:any) => {
        e.preventDefault();
        let that = this;
        axios.post(url.confirmCodeUrl, {
            key:this.state.code,              
        }).then((response)=> {
            that.setState({
                isSuccess:true,
                successText:"Verified Successfully"
            });
            setTimeout(() => {
                that.setState({
                    isSuccess:false,
                });
                history.push("/");   
            }, 2500);
        })
        .catch((error:any)=> {           
            console.log(error.response.data);
        })
        .finally(()=> {

        });           
    }

    resendCode = (e:any) => {
        e.preventDefault();
        let that = this;
        axios.post(url.resendCodeUrl, {
            email:this.email,
        })
        .then( (response)=> {
            that.setState({
                isSuccess:true,
                successText:"Code Resent Successfully"
            });

            setTimeout(() => {
                that.setState({
                    isSuccess:false,                    
                });
            }, 2500);
              
        })
        .catch((error:any)=> {
            console.log(error.response.data);
        })
        .finally(()=> {

        });           
    } 

    render() {
        return (
            <div className="container login-container resend">
                <div className="align-items-center d-flex justify-content-center row custom-login">
                    <div className=" col-lg-6 col-12  login-form">
                        <form onSubmit={this.submitCode.bind(this)}>
                            <a>Please go to your email and verify the address you
                            have used. If you do not see it check your junk folder.</a>
                            <div className="form-group mt-5 mb-5">
                                <input type="text"
                                onChange={(event) => {this.setState({code: event.target.value});}}
                                value={this.state.code} 
                                className="form-control"
                                 placeholder="Verification code" 
                                />
                            </div>
                            <button className="resend-text mb-5" onClick = {this.resendCode.bind(this)}>Resend</button>
                            <div className="form-group custom-submit ">
                                <button className="btn btnSubmit" style={{bottom:"unset"}} type="submit">
                                    <i className=" fa fa-long-arrow-right" aria-hidden="true"></i>
                                </button>                            
                            </div>

                            <div className="position-relative">      
                                <SweetAlert  
                                    title={this.state.successText}
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
        );
    }
}

export default Resend;

