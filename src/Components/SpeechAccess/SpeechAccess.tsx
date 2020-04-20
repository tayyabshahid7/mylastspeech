import React from 'react';
import './speechaccess.scss';
import axios from 'axios';
import * as url from '../../utils/constant';
import history from '../../utils/history';
import TextField from '@material-ui/core/TextField';
import TermAndPrivacy from '../TermAndPrivacy/TermAndPrivacy';
import { Link } from 'react-router-dom';

interface SpeechAccessProps {
    location?:any,
}
interface SpeechAccessState {
    email:string,
    tosChecked:boolean,
    showPrivacyModal:boolean,
    activeTab:string,
    userObj:object,
}

class SpeechAccess extends React.Component<SpeechAccessProps, SpeechAccessState> {
    user_id = '';
    state = {
        email: '',
        tosChecked:false,
        showPrivacyModal:false,
        activeTab:'',
        userObj:{}
    }

    componentDidMount(){
        debugger;
        let params = new URLSearchParams(this.props?.location?.search);
        let name: string =params.get('name')?.toString();
        let data = {
            name:name,
            image:params.get('image')?.toString(),
            id:params.get('id')?.toString()
        }
        this.user_id = params.get('id')?.toString();
        this.setState({
            userObj:data,
        });
    }

    checkUserSpeechAccess = (e:any) =>{
        e.preventDefault();
        axios.get(url.userAccessCheckUrl, {
                params: {
                    user_id: this.user_id,
                    email:this.state.email
                }
        })
        .then((response) => {
               let data = this.state.userObj;
               data['close_contact_email'] = this.state.email;
               data['payment_status'] = response.data.payment_status;
                if(response.data.hasAccess){
                    if(response.data.payment_status){
                        history.push({
                            pathname: '/userspeech',
                            state: data
                        });
                    }else{
                        history.push({
                            pathname: '/payment',
                            state: data
                        });
                    }                  
                }else{
                    history.push({
                        pathname: '/access-next',
                        state: data
                     });
                } 
            })
            .catch((error) => {
                
            })
            .finally( () => {
            // always executed
        }); 
    }

    render() {
        return ( 
        <div id="speechaccess" >
            <TermAndPrivacy 
                    showPrivacyModal = {this.state.showPrivacyModal}
                    closeModal = {()=>{
                    this.setState({showPrivacyModal:false});
            }}/>        
            <div className="container card-container mt-5">
                <div className="align-items-center d-flex justify-content-center row custom-profile">
                    <div className=" col-lg-6 card-profile">
                        <form onSubmit = {this.checkUserSpeechAccess.bind(this)}>
                            <img src={this.state.userObj['image']} alt="Avatar"/><span className="body-text pl-3"><b >{(this.state.userObj['name'])}</b></span>
                            <p className="body-text mt-5 mb-4">Please enter your email to see if you have beed granted access automatically by this person</p>
                            <div className="form-group">
                                <TextField  
                                    onChange={(event) => {this.setState({email: event.target.value})}} 
                                    value = {this.state.email} 
                                    className = 'outlined-input-custom' 
                                    label="Email" 
                                    type="email"
                                    variant="outlined" 
                                />
                            </div>
                            <div className = "align-items-center d-flex privacy-link">
                                <span style = {{zIndex:999}} onClick={(event) => { this.setState({tosChecked: !this.state.tosChecked});}} >
                                    <input type="checkbox" checked={this.state.tosChecked} />
                                    <span className="checkmark"></span>
                                </span>
                                <div  className="pl-2 privacy-text"> I agree to
                                    <a style = {{textDecoration:"underline", color:"black"}} href="#" onClick = {()=>{this.setState({showPrivacyModal:true,activeTab:"Privacy"})}}> privacy policy</a> and <a style = {{textDecoration:"underline",color:"black"}} href="#" onClick = {()=>{this.setState({showPrivacyModal:true,activeTab:"Terms"})}}>terms of service</a><br/>
                                </div>
                            </div>
                            
                            <div className="form-group custom-submit ">
                                    <button  className="btn btnSubmit" type="submit"><i className=" fa fa-long-arrow-right" aria-hidden="true"></i>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        }   
        </div>  
       );
    }
}

export default SpeechAccess;

