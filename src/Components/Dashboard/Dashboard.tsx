import React from 'react';
import UserAccess from './UserAccess/UserAccess';
import * as url from '../../utils/constant';
import axios from 'axios';
import history from '../../utils/history';
import { css } from "@emotion/core";
import ellipsisIcon from '../../assets/images/ellipsis.svg';
import { ClipLoader } from "react-spinners";


import './dashboard.scss';
import Profile from './Profile/Profile';
import Speech from './Speech/Speech';
import Security from './Security/Security';

interface DashboardProps {
    changeProfilePic(profile_url:string):any,
}
interface DashboardState {
    activeTab:string,
    activeBottomTab:string,
    isOpen:boolean,
    question:string,
    answer:string,
    showAnswerInput:boolean,
    isSuccess:boolean,
    msg:string,
    questionsList:Array<object>
    isValidated:boolean,
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


class Dashboard extends React.Component<DashboardProps, DashboardState> {

state = {
    activeTab: 'accesspage',
    activeBottomTab:'Speech',
    isOpen:false,
    question:'',
    answer:'',
    showAnswerInput:false,
    isSuccess:false,
    msg:'',
    questionsList:[{}],
    isValidated:true,
}


toggleActiveTab = (tab:string,e:any)=>{
    this.setState({
        activeTab : tab,
    });   
}

toggleBottomTabsHandler = (tabName:string,e:any) =>{
    this.setState({
        activeBottomTab:tabName
    });
}





logout = ()=> {
    const config = {
        headers: { Authorization: `Token ${localStorage.getItem('userToken')}`}
    };
    const params = {};

    axios.post(url.logoutUrl,
        params,
        config
    )
    .then((response) => {
        localStorage.removeItem('userToken');
        localStorage.removeItem('user');
        history.push("/");
    })
    .catch((error) => {
            
    })
    .finally(() => {
            // always executed
    });
    
}

deleteAccount = ()=> {
    const config = {
        headers: { Authorization: `Token ${localStorage.getItem('userToken')}`}
    };
    const bodyParameters = {
     };
    
    axios.delete(url.deleteAccountUrl, 
        config
    )
    .then((response) => {
        localStorage.removeItem('userToken');
        history.push("/");
    })
    .catch((error) => {
            
    })
    .finally(() => {
            // always executed
    });
    
}


render() {

 return (
    <div id="dashboard" className="mb-5">
        <div className="align-items-center d-flex justify-content-center sweet-loading">
            <ClipLoader
            css={override}
            size={150}
            //size={"150px"} this also works
            color={"#123abc"}
            loading={this.state.isSuccess}
            />
        </div>
        <div className="container login-container tab-page mt-5 px-4 px-md-0">
            <div className="position-relative align-items-center d-flex justify-content-center row tabs-section custom-login">               
                <div className=" col-12 col-lg-10 login-form mb-5 pb-5 tabs-card">
                    {this.state.activeBottomTab == "Settings"&&
                        <div className = "d-flex flex-md-row flex-column">
                            <div className="col-12 col-md-3 float-left  pb-md-5 left-sec">
                                <div className="tab">
                                    <button className={"pt-4 pb-4 tablinks ".concat(this.state.activeTab === "accesspage" ? 'active': '')} onClick={this.toggleActiveTab.bind(this,'accesspage')} id="defaultOpen">Who can access my page</button>
                                    <button className={"pb-4 tablinks ".concat(this.state.activeTab === "security" ? 'active': '')} onClick={this.toggleActiveTab.bind(this,'security')} >Security questions</button>
                                    <button className={"pb-4 tablinks ".concat(this.state.activeTab === "profile" ? 'active': '')} onClick={this.toggleActiveTab.bind(this,'profile')} >Profile</button>
                                    <button className={"d-none d-md-block pb-4 more-btn tablinks ".concat(this.state.activeTab === "more" ? 'active': '')} onClick={this.toggleActiveTab.bind(this,'more')} >More</button>
                                  
                                </div>
                            </div>
                        
                            <div  className="col-12 col-md-9 float-left pb-5 content-sec ">
                                {this.state.activeTab === "accesspage" ?
                                    <UserAccess/>                              
                                : this.state.activeTab === "security"?
                                    <Security />
                                : this.state.activeTab === "profile"?
                                    <Profile changeProfilePic = {(profile_url:string)=>{
                                        profile_url && this.props.changeProfilePic(profile_url)
                                    }} />
                                :
                                <div className = "col-12 col-md-9 float-left pb-5 more-section">
                                    <div className="row pt-2">
                                        <div className = "col-12 col-md-10 more-card d-flex flex-column align-content-center justify-content-center">
                                            <a onClick={this.logout.bind(this)} className="ml-2">Logout<span> - You can sign back in at any time</span></a>
                                        </div>
                                        <div className = "col-12 col-md-10 mt-4 more-card d-flex flex-column align-content-center justify-content-center">
                                            <a onClick={this.deleteAccount.bind(this)} className="ml-2">Delete<span> - This will remove your account forever</span></a>
                                        </div>
                                        <div className = "col-12 col-md-10 mt-4 more-card d-flex flex-column align-content-center justify-content-center">
                                            <a className="ml-2">Contact us <span> - Get in touch if you need to speak to us about anything</span></a>
                                        </div>
                                    </div>
                                </div>
                            }   
                        </div>               
                        </div>                        
                    }
                    
                    {this.state.activeBottomTab == "Speech" &&
                        <div >
                            <Speech/>               
                        </div>
                    }                  
                                  
                </div>
               
                {this.state.activeBottomTab == "Speech" &&
                    <div className="form-group custom-submit ">
                        <button className="btn btnSubmit" type="submit">
                            <i className="fa fa-spotify" aria-hidden="true"></i> &nbsp;
                            <span>+ Spotify song</span>
                        </button>
                    </div>  
                }    
                {this.state.activeBottomTab == "Settings" && 
                    <img onClick={this.toggleActiveTab.bind(this,'more')} className = "ellipsis-icon" src = {ellipsisIcon} />
                }
                <div className="col-8 d-flex upper-list">
                    <div className={"after-section ".concat(this.state.activeBottomTab === "Settings" ? "after-section-animate": "" )}>
                    </div>   
                    <a style={{minWidth:"130px"}} className={this.state.activeBottomTab === "Speech" ? "active": ""} onClick={this.toggleBottomTabsHandler.bind(this,"Speech")}>My Speech</a>
                    <a className={"ml-4 ".concat(this.state.activeBottomTab === "Settings" ? "active": "" )} onClick={this.toggleBottomTabsHandler.bind(this,"Settings")} >Settings</a>
                </div>
        
            </div>
            
        </div>
    </div>
    );
  }
}

export default Dashboard;

