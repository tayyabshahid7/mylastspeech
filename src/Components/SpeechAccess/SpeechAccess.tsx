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

    state = {
        email: '',
        tosChecked:false,
        showPrivacyModal:false,
        activeTab:'',
        userObj:{}
    }

    componentDidMount(){
        let name: string =this.props.location.state['name'];
        name = name.toUpperCase();
        let data = {
            name:name,
            image:this.props.location.state['image'],
            id:this.props.location.state['id']
        }
        this.setState({
            userObj:data,
        });
    }

    checkUserSpeechAccess = (e:any) =>{
        e.preventDefault();
        axios.get(url.userAccessCheckUrl, {
                params: {
                    user_id:this.props.location.state['id'],
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
            {this.state.showPrivacyModal ?
            
            <div className="privacy-card">
                <TermAndPrivacy 
                    activeTab = {this.state.activeTab}
                    closeModal = {()=>{
                        this.setState({showPrivacyModal:false});
                }}/>
            </div>
            :
            <div className="container card-container mt-5">
                <div className="align-items-center d-flex justify-content-center row custom-profile">
                    <div className=" col-lg-6 card-profile">
                        <form onSubmit = {this.checkUserSpeechAccess.bind(this)}>
                            <img src={this.state.userObj['image']} alt="Avatar"/>&nbsp; &nbsp; &nbsp; &nbsp;<span><b>{(this.state.userObj['name'])}</b></span>
                            <p className="mt-5 mb-4">Please enter your email to see if you have beed granted access automatically by this person</p>
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
                            <span onClick={(event) => { this.setState({tosChecked: !this.state.tosChecked});}} >
                                <input type="checkbox" checked={this.state.tosChecked} />
                                <span className="checkmark"></span>
                            </span>
                            <span className="pl-2"> I agree to
                                        <a href="#" onClick = {()=>{this.setState({showPrivacyModal:true,activeTab:"Privacy"})}}> privacy policy</a> and <a href="#" onClick = {()=>{this.setState({showPrivacyModal:true,activeTab:"Terms"})}}>terms of service</a><br/>
                                    </span>
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

