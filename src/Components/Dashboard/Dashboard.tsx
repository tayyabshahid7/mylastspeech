import React from 'react';
import UserAccess from './UserAccess/UserAccess';
import * as url from '../../utils/constant';
import axios from 'axios';
import history from '../../utils/history';
import { css } from "@emotion/core";
import ellipsisIcon from '../../assets/images/ellipsis.svg';
import spotifyIcon from '../../assets/images/spotifylogo.png';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { ClipLoader } from "react-spinners";
import SpotifyLogin from 'react-spotify-login';
import SweetAlert from 'react-bootstrap-sweetalert';
import warningIcon from '../../assets/images/warning.svg';
import Profile from './Profile/Profile';
import Speech from './Speech/Speech';
import Security from './Security/Security';
import './dashboard.scss';

interface DashboardProps {
    changeProfilePic(profile_url:string):any,
    location?:any,
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
    songsList:Array<object>,
    searchText:string,
    accessToken:string,
    openSpotifyModal:boolean,
    artistName:string,
    songName:string,
    emailPreferencesModal:boolean,
    isAccountAndNotification:boolean,
    isUpdatesAndFeatures:boolean,
    unSubscribeAll:boolean,
    showDeleteDialog:boolean,
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

interval = null;

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
    songsList:[],
    isValidated:true,
    searchText:'',
    accessToken:'',
    openSpotifyModal:false,
    artistName:'',
    songName:'',
    emailPreferencesModal:false,
    isAccountAndNotification:false,
    isUpdatesAndFeatures:false,
    unSubscribeAll:false,
    showDeleteDialog:false,
}

componentDidMount(){
  
    this.getAccessToken();
    if(this.props.location && this.props.location?.state?.lastLogin == ""){
        this.setState({
            activeBottomTab:'Settings',
        })
    }
    let user:any = localStorage.getItem('user');
    user = JSON.parse(user);
    if(user && user.has_subscribed_to_notificatons && user.has_subscribed_to_updates_features){
        this.setState({
            isAccountAndNotification:user.has_subscribed_to_notificatons,
            isUpdatesAndFeatures:user.has_subscribed_to_updates_features,
            unSubscribeAll:false,
        })
    }else if(user && (user.has_subscribed_to_notificatons || user.has_subscribed_to_updates_features)){
        this.setState({
            isAccountAndNotification:user.has_subscribed_to_notificatons,
            isUpdatesAndFeatures:user.has_subscribed_to_updates_features,
            unSubscribeAll:false,
        })
    }else if(user && !(user.has_subscribed_to_notificatons && user.has_subscribed_to_updates_features)){
        this.setState({
            isAccountAndNotification:user.has_subscribed_to_notificatons,
            isUpdatesAndFeatures:user.has_subscribed_to_updates_features,
            unSubscribeAll:true,
        })
    }
  
}

componentWillUnmount() {
    clearInterval(this.interval);
}

componentWillReceiveProps(){
    let params = new URLSearchParams(this.props?.location?.search);
    if(params.get("activeTab")?.toString()){
        this.setState({
            activeBottomTab:params.get("activeTab")?.toString(),
        });    
    }  
    if(params.get("sideActiveTab")?.toString()){
        this.setState({
            activeTab:params.get("sideActiveTab")?.toString(),
            emailPreferencesModal:true
        });    
    }  
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
    if(tabName === "Speech"){
        this.interval = setInterval(() => this.getAccessToken(), 3600);
    }else{
        clearInterval(this.interval);
    }
}


getAccessToken =()=>{
    const params = "grant_type=client_credentials";
    const xhr = new XMLHttpRequest();

    xhr.open('POST', url.spotifyAccessTokenUrl, true);

    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Authorization', `Basic ZmExZmRlMzc3Mjk3NDhlZGFlYjQzNTdjOWI1OThlNzc6Y2ZiY2I3NTY2OWMyNGIwMjgyYmY1YzFiMjk2MjdiZTI=`);

    xhr.send((params));
    xhr.onload= () => {
        let token = JSON.parse(xhr.response);
        console.log(token)
        this.setState({
            accessToken:token.access_token
        });
    };
    xhr.onerror = (error) => {
        console.log(error);
    };  
}


retrieveSpotifySongs = (event:any)=>{
    var searchText = event.target.value.toLowerCase();
    this.setState({
        searchText:searchText
    },()=>{
        const config = {
            headers: { Authorization: `Bearer ${this.state.accessToken}` }
        };
      
        axios.get(url.spotifySongSearchUrl+'?type=track&q=' + this.state.searchText,        
            config
            )
            .then((response) => {               
               this.setState({
                   songsList:response.data.tracks.items,
                   searchText:''
               })
            })
            .catch((error) => {
                
            })
            .finally( () => {
            // always executed
        });  
    })
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
        this.props.changeProfilePic('');
        history.push("/");
    })
    .catch((error) => {
        if(error.response.data.detail === "Invalid token."){
            localStorage.removeItem('userToken');
            localStorage.removeItem('user');
            history.push({
                pathname:'/signin',
            });
        }
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
        if(error.response.data.detail === "Invalid token."){
            localStorage.removeItem('userToken');
            localStorage.removeItem('user');
            history.push({
                pathname:'/signin',
            });
        } 
    })
    .finally(() => {
            // always executed
    });
    
}


saveSong = (songUrl:string,artist_name,song_name,e:any) =>{
    const config = {
        headers: { Authorization: `Token ${localStorage.getItem('userToken')}`}
    };
    const bodyParameters = {
        song_url:songUrl,
        artist_name:artist_name,
        song_name:song_name
    };

    axios.patch(url.addRetrieveSpeechUrl,
        bodyParameters,
        config
    )
    .then((response) => {
        debugger;
        this.setState({
            openSpotifyModal:false,
            artistName:response.data.artist_name,
            songName: response.data.song_name
        });
    })
    .catch((error) => {
        if(error.response.data.detail === "Invalid token."){
            localStorage.removeItem('userToken');
            localStorage.removeItem('user');
            history.push({
                pathname:'/signin',
            });
        }
    })
    .finally(() => {
            // always executed
    });
}



changeNotificationSettings = (e:any) =>{
    e.preventDefault();

    const config = {
        headers: { Authorization: `Token ${localStorage.getItem('userToken')}`}
    };
    const bodyParameters = {
        has_subscribed_to_notificatons :this.state.isAccountAndNotification,
        has_subscribed_to_updates_features: this.state.isUpdatesAndFeatures,
        allUnSubscribed: this.state.unSubscribeAll,
    };

    axios.post(url.changeNotificationSettingsUrl,
        bodyParameters,
        config
    )
    .then((response) => {
        localStorage.setItem('user',JSON.stringify(response.data));
        this.setState({
            emailPreferencesModal:false,
        });
    })
    .catch((error) => {
        if(error.response.data.detail === "Invalid token."){
            localStorage.removeItem('userToken');
            localStorage.removeItem('user');
            history.push({
                pathname:'/signin',
            });
        }
    })
    .finally(() => {
            // always executed
    });
}

toggleModal = (e:any) =>{
    this.setState({
        openSpotifyModal: false,
    })
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
                                  
                                </div>
                               
                            </div>
                            <div className="more-btn">
                                <button className={"ml-4 d-none d-md-block pb-4 more-btn tablinks ".concat(this.state.activeTab === "more" ? 'active': '')} onClick={this.toggleActiveTab.bind(this,'more')} >
                                    More
                                </button>
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
                                :  this.state.activeTab === "more"?
                                    <div className = "col-12 col-md-9 float-left pb-5 more-section">
                                    <div className="row pt-2">
                                        <div className = "col-12 col-md-10 more-card d-flex flex-column align-content-center justify-content-center">
                                            <a onClick={this.logout.bind(this)} className="ml-2">Logout<span> - You can sign back in at any time</span></a>
                                        </div>
                                        <div className = "col-12 col-md-10 mt-4 more-card d-flex flex-column align-content-center justify-content-center">
                                            <a onClick={()=>{this.setState({showDeleteDialog:true})}} className="ml-2">Delete<span> - This will remove your account forever</span></a>
                                        </div>
                                        <div className = "col-12 col-md-10 mt-4 more-card d-flex flex-column align-content-center justify-content-center">
                                            <a className="ml-2">Contact us <span> - Get in touch if you need to speak to us about anything</span></a>
                                        </div>
                                        <div className = "col-12 col-md-10 mt-4 more-card d-flex flex-column align-content-center justify-content-center">
                                            <a onClick = {()=>{this.setState({emailPreferencesModal:true})}} className="ml-2">Notification settings </a>
                                        </div>
                                    </div>
                                </div>
                                :null    
                            }   
                        </div>               
                        </div>                        
                    }
                    
                    {this.state.activeBottomTab == "Speech" &&
                        <div>
                            <Speech getSpeechData = {(data)=>{
                                 this.setState({
                                    artistName:data.artist_name,
                                    songName: data.song_name
                                });
                            }} />               
                        </div>
                    }                  
                                  
                </div>
               
                {this.state.activeBottomTab == "Speech" &&
                   
                     <div>
                        <div className="form-group custom-submit ">
                            <button onClick={()=>{this.setState({openSpotifyModal:true})}} className="btn btnSubmit" type="submit">
                                <img className = "mr-2" src = {spotifyIcon}></img>
                                {/* <span>+ Spotify Song</span> */}
                                <span>{this.state.artistName && this.state.songName ? <p style = {{lineHeight:"1"}} className="m-0 song-text">{this.state.artistName }<p className="m-0 song-text">{this.state.songName}</p></p> : '+ Spotify Song'}</span>
                            </button>   
                            
                        </div> 
                        <Modal className = {"spotify-modal"} centered={true} isOpen={this.state.openSpotifyModal} toggle={this.toggleModal.bind(this)}>
                                <ModalHeader>
                                    <div className="ml-3 input-group rounded-pill  form-inner">
                                        <div className="input-group-prepend border-0">
                                            <button id="button-addon4" type="button" className="btn btn-link text-info"><i className="fa fa-search"></i></button>
                                        </div>
                                        <input type="search"  onChange={this.retrieveSpotifySongs.bind(this)}  placeholder="Search" aria-describedby="button-addon4" className="form-control bg-none border-0 custom-input" />         
                                    </div>
                                </ModalHeader>
                                <ModalBody>
                                    <ul>
                                        {this.state.songsList && this.state.songsList.map((item:any)=>{
                                            return(
                                                <li  className="list-song align-content-center align-items-center d-flex my-2 pb-2"
                                                    onClick = {this.saveSong.bind(this,item.album.external_urls.spotify,item.album['artists'][0].name,item.album.name)}>
                                                    <img src={item.album['images'][0].url}></img>
                                                    <p className="ml-4 pb-0 mb-0">{item.album.name}</p>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </ModalBody>                       
                        </Modal>
                   </div> 
                }    
                {this.state.activeBottomTab == "Settings" && 
                    <img onClick={this.toggleActiveTab.bind(this,'more')} className = "d-md-none ellipsis-icon" src = {ellipsisIcon} />
                }
                {this.state.emailPreferencesModal && 
                <Modal className = {"preferences-modal"} isOpen={this.state.emailPreferencesModal} toggle={()=>{}}>
                        <ModalHeader  toggle={()=>{this.setState({emailPreferencesModal:false,})}}>
                           
                        </ModalHeader>
                        <ModalBody className="pt-0 m-auto">
                           <span className="px-4">Notification settings</span>
                           <p className="header-text px-4 pt-3">
                               Help us improve the experience of this site for everyone.Please update
                               your email preferences below.
                           </p>
                        <div className="radio-btn pl-4 pt-3">
                            <div className="d-flex">
                                <label className="container-radio mb-0">
                                    <input 
                                        onClick = {()=>{
                                                if(!this.state.isAccountAndNotification){
                                                    this.setState({unSubscribeAll:false})
                                                }else if(!this.state.isUpdatesAndFeatures && this.state.isAccountAndNotification){
                                                    this.setState({unSubscribeAll:true})
                                                }
                                                this.setState({isAccountAndNotification:!this.state.isAccountAndNotification})
                                            } 
                                        }
                                        className="checkbox"/>
                                    <span className={"checkmark ".concat(this.state.isAccountAndNotification && "checked")} ></span>                            
                                </label>
                                <span className="checkbox-text">Account reminders and notifications</span>
                            </div> 
                            <div className="d-flex mt-5 pt-2">
                                <label className="container-radio mb-0">
                                    <input 
                                        onClick = {()=>{
                                                if(!this.state.isUpdatesAndFeatures){
                                                    this.setState({unSubscribeAll:false})
                                                }else if(this.state.isUpdatesAndFeatures && !this.state.isAccountAndNotification){
                                                    this.setState({unSubscribeAll:true})
                                                }
                                                this.setState({isUpdatesAndFeatures:!this.state.isUpdatesAndFeatures})
                                            } 
                                        }
                                        className="checkbox"
                                    />
                                    <span className={"checkmark ".concat(this.state.isUpdatesAndFeatures && "checked")} ></span>                            
                                </label>
                                <span className="checkbox-text">Updates and new features</span>
                            </div>  
                                 
                        </div>
                        <div className="unsubscribe-all radio-btn pl-4 pt-3">
                            <div className="d-flex">
                                <label className="container-radio mb-0">
                                    <input 
                                        onClick = {()=>{                                    
                                                this.setState({unSubscribeAll:!this.state.unSubscribeAll,isAccountAndNotification:false,isUpdatesAndFeatures:false})
                                            }
                                        } 
                                        className="checkbox"
                                    />
                                    <span className={"checkmark ".concat(this.state.unSubscribeAll && "checked")} ></span>                            
                                </label>
                                <span className="checkbox-text">Unsubscribre from all</span>
                            </div>     
                        </div>                        
                    </ModalBody> 
                    <ModalFooter>
                        <button onClick = {this.changeNotificationSettings.bind(this)} className="btn update-btn">
                            Update
                        </button>    
                    </ModalFooter>                      
                </Modal>

                }
                <div className="col-8 d-flex upper-list">
                    <div className={"after-section ".concat(this.state.activeBottomTab === "Settings" ? "after-section-animate": "" )}>
                    </div>   
                    <a style={{minWidth:"130px"}} className={this.state.activeBottomTab === "Speech" ? "active": ""} onClick={this.toggleBottomTabsHandler.bind(this,"Speech")}>My Speech</a>
                    <a className={"ml-4 ".concat(this.state.activeBottomTab === "Settings" ? "active": "" )} onClick={this.toggleBottomTabsHandler.bind(this,"Settings")} >Settings</a>
                </div>
                <div className="position-relative">        
                    <SweetAlert  
                        title="Warning"
                        onConfirm={this.deleteAccount.bind(this)}
                        onCancel={()=>this.setState({showDeleteDialog:false})}
                        showConfirm = {true}
                        show = {this.state.showDeleteDialog}
                        showCancel={true}
                        customButtons={
                        <React.Fragment>
                            <button className = "dialog-btn cancel-btn" onClick={()=>this.setState({showDeleteDialog:false})}>Cancel</button>
                            <button className = "dialog-btn confirm-btn" onClick={this.deleteAccount.bind(this)}>Confirm</button>
                        </React.Fragment>
                        }
                        >
                        <div>
                            <img className="warning-img" src = {warningIcon} />
                            <p className = "body-text"> 
                                This will erase your speech and data, this is not
                                reversible.Are you sure you wish to completely remove your
                                account from mylastspeech?
                            </p>
                        </div>
                    </SweetAlert>
                </div> 
            </div>
            
        </div>
    </div>
    );
  }
}

export default Dashboard;

