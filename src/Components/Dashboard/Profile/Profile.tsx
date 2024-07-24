import React , {createRef, Fragment} from 'react';
import * as url from '../../../utils/constant';
import axios from 'axios';
import moment from 'moment';
import TextField from '@material-ui/core/TextField';
import avatarPic from '../../../assets/images/img_avatar.png';
import history from '../../../utils/history';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './profile.scss';
import Item from '../../Search/Item/Item';
import SweetAlert from 'react-bootstrap-sweetalert';
import warningIcon from '../../../assets/images/warning.svg';

interface ProfileProps {
    changeProfilePic(profile_url:string):any,
    emailPreferencesModal:boolean,
}

interface ProfileState {
    email: string,
    firstName:string,
    lastName:string,
    time: Date,
    isCalenderOpen: boolean,
    old_password:string,
    new_password1:string,
    new_password2:string,
    profile_picture:any,
    file:any,
    isNameChange:boolean,
    isEmailChange:boolean,
    isPasswordChange:boolean,
    showOldPassword:boolean,
    showNewPass1:boolean,
    showNewPass2:boolean,
    errorMsg:string,
    passwordError:string,
    showDeleteDialog:boolean,
    emailPreferencesModal:boolean,
    nameErrorMsg:string,   
    isAccountAndNotification:boolean,
    isUpdatesAndFeatures:boolean,
    unSubscribeAll:boolean,
}


class Profile extends React.Component<ProfileProps, ProfileState> {
    private readonly inputOpenFileRef = createRef<HTMLInputElement>();
    isDefaultPic = true;
    state = {
        email: '',
        firstName:"",
        lastName:"",
        isCalenderOpen:false,
        time:new Date(),
        old_password:'',
        new_password1:'',
        new_password2:'',
        profile_picture:null,
        file:null,
        isNameChange:false,
        isPasswordChange:false,
        isEmailChange:false,
        showOldPassword:false,
        showNewPass1:false,
        showNewPass2:false,
        errorMsg:'',
        passwordError:'',
        showDeleteDialog:false,
        nameErrorMsg:'',    
        emailPreferencesModal:false,   
        isAccountAndNotification:false,
        isUpdatesAndFeatures:false,
        unSubscribeAll:false,
    }

    constructor(props){
        super(props);
        this.inputOpenFileRef = React.createRef();
    }
    componentDidMount(){
         this.retrieveProfileInfo();
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

    componentWillReceiveProps(nextProps:any){
        this.setState({
            emailPreferencesModal:nextProps.emailPreferencesModal,
        })
    }

    retrieveProfileInfo =()=>{
        const config = {
            headers: { Authorization: `Token ${localStorage.getItem('userToken')}` }
        };
      
        axios.get(url.updateProfileUrl,        
            config
            )
            .then((response) => {
                let img = response.data[0]['profile_picture'] === null ? avatarPic:
                        response.data[0]['profile_picture'];
                response.data[0]['profile_picture'] === null ? this.isDefaultPic = true : this.isDefaultPic = false;
                // let tmp = response.data[0]['first_name'];
                // let s1 = tmp.charAt(0).toUpperCase() + tmp.slice(1);
                // tmp = response.data[0]['last_name'];
                // let s2 = tmp.charAt(0).toUpperCase() + tmp.slice(1);      
                this.setState({
                    email:response.data[0]['email'],
                    firstName:response.data[0]['first_name'],
                    lastName:response.data[0]['last_name'],
                    time:new Date(response.data[0]['dob']),
                    profile_picture:img
                });
            })
            .catch((error) => {
                if(error.response && error.response?.data.detail === "Invalid token."){
                    localStorage.removeItem('userToken');
                    localStorage.removeItem('user');
                    history.push({
                        pathname:'/signin',
                    });
                }
            })
            .finally( () => {
            // always executed
        });        
    }

    updateName = (e:any) =>{
        debugger;
        e.preventDefault();
        if(this.state.firstName.trim().length>0 && this.state.lastName.trim().length>0){
            this.updateProfile('name',e);
        }else{
            this.setState({nameErrorMsg:"Enter valid first and last name"});
            setTimeout(() => {
                this.setState({nameErrorMsg:""});              
            }, 4000);
        }
    }

    updateEmail = (e:any) =>{
        e.preventDefault();
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(re.test(String(this.state.email).toLowerCase())){
            this.updateProfile('email',e);
        }else{
            this.setState({errorMsg:"Please enter valid email address"});
            setTimeout(() => {
                this.setState({errorMsg:""});              
            }, 4000);
        }
   }

    updateProfile = (updatedField:string,e) => {
        e.preventDefault();
        var formData = new FormData();

        this.state.file && formData.append("profile_picture", this.state.file);
        formData.append("email",this.state.email);
        // formData.append("dob",moment(this.state.time).format('YYYY-MM-DD'));
        formData.append("first_name",this.state.firstName);
        formData.append("last_name",this.state.lastName);
       
        const config = {
            headers: { Authorization: `Token ${localStorage.getItem('userToken')}`}
        };
        
        let that = this;
        axios.post(url.updateProfileUrl,
            formData,
            config
        )
        .then((response) => {
            response.data.profile_picture && this.props.changeProfilePic(response.data.profile_picture)
            if(updatedField === "name"){
                this.setState({isNameChange:false});
            }else if(updatedField === "email"){
                this.setState({isEmailChange:false});
            }           
        })
        .catch((error) => {
            if(error.response && error.response?.data?.detail === "Invalid token."){
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


    updatePassword = (e)=>{
        e.preventDefault();
        const config = {
            headers: { Authorization: `Token ${localStorage.getItem('userToken')}`}
        };

        const bodyParameters = {
            old_password:this.state.old_password,
            new_password1:this.state.new_password1,
            new_password2:this.state.new_password2
         };
        
        axios.post(url.passwordChangeUrl,
            bodyParameters,
            config
        )
        .then((response) => {
            this.setState({
                isPasswordChange:false,
                old_password:'',
                new_password1:'',
                new_password2:'',
                showOldPassword:false,
                showNewPass1:false,
                showNewPass2:false,
            })
        })
        .catch((error) => {
            debugger
            console.log(error.response)
            this.setState({passwordError:error.response.data.new_password2[0]});
            setTimeout(() => {
                this.setState({passwordError:""});              
            }, 4000);
        })
        .finally(() => {
                // always executed
        });
        
    }



    handleImageChange = (e) =>{
        if(e.target.files){
            this.setState({
                profile_picture: URL.createObjectURL(e.target.files[0]),
                file:e.target.files[0],
            },()=>{
                this.updateProfile('',e);
                this.isDefaultPic = false;
            });
        }     
    }

    camelize(str:string) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    getHidePasswordIcon (){
        return(<svg className="hide-show-icon MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation"><path fill="none" d="m0 0h24v24H0z"></path><path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"></path></svg>
        )
    }

    getShowPasswordIcon (){
        return(
            <svg className="hide-show-icon MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"></path></svg>
        )
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
            this.props.changeProfilePic('');
            history.push("/");
        })
        .catch((error) => {
            if(error.response.data.detail === "Invalid token."){
                localStorage.removeItem('userToken');
                localStorage.removeItem('user');
                this.props.changeProfilePic('');
                history.push({
                    pathname:'/signin',
                });
            } 
        })
        .finally(() => {
                // always executed
        });
        
    }

    mailTo=(e:any)=>{
        window.location.href = `mailto:brad@acidtestdesign.com`;
    }
    
    render() {
        return (
        <div id="profile"  className="col-12 col-md-10 pl-md-3 pl-0  pr-0 tabcontent pt-4 profile-section">
            <div className="justify-content-md-start align-items-center d-flex d-md-block d-none justify-content-between profile-img ">                
                <img  src={this.state.profile_picture} />
                <input type="file" ref={this.inputOpenFileRef} className = "d-none"  onChange={this.handleImageChange.bind(this)}/>
                &nbsp; &nbsp; &nbsp; &nbsp; <a className="change-profile-pic" onClick = {()=>{this.inputOpenFileRef.current.click()}} >{!this.isDefaultPic ? "Edit": "Change"}</a>
            </div>
            <form className="col-12 col-md-10 pl-0 form-group mb-0">

                <div className="profile-section pb-3 position-relative">
                {!this.state.isNameChange ? 
                    <div>
                        <label className="input-label">Legal Name</label>
                        <p className="mb-0 pb-0">{this.camelize(this.state.firstName) + ' ' + this.camelize(this.state.lastName)}</p>
                        <a style= {{cursor:"pointer",zIndex:999}} onClick = {()=>{this.setState({isNameChange:true})}} className="input-inner-btn">Edit</a>
                    </div>
                    :
                    <div>
                        <div className="d-flex flex-md-row flex-column">
                            
                            <div className="px-0 mt-3 col-12 col-md-6 position-relative">
                                <TextField
                                onChange={(event) => {this.setState({firstName: event.target.value})}} 
                                value = {this.state.firstName} 
                                className = {this.state.firstName ? 'outlined-input-custom active' : 'outlined-input-custom'} 
                                label="First Name" 
                                variant="outlined" 
                                />

                            </div>
                            <div className="px-0 mt-3 col-12 col-md-6 position-relative pl-md-2">
                                <TextField 
                                onChange={(event) => {this.setState({lastName: event.target.value})}} 
                                value = {this.state.lastName} 
                                className = {this.state.lastName ? 'outlined-input-custom active' : 'outlined-input-custom'} 
                                label="Last Name" 
                                variant="outlined" 
                                />

                            </div>
                            
                        </div>
                        <div className="align-items-baseline col-12 d-flex mt-2 px-0"> 
                            <div className="col-6 pl-1"> 
                                <button 
                                onClick = {this.updateName.bind(this)}  
                                className="save-btn">
                                    Save
                                </button>
                            </div>                         
                            <div className="col-6 text-right pr-1">
                                <a onClick = {()=>{this.setState({isNameChange:false})}} className="cancel-btn">
                                    Cancel
                                </a>
                            </div>  
                        </div>
                        <span className="error ml-1">{(this.state.nameErrorMsg && this.state.nameErrorMsg.length>0 ) && this.state.nameErrorMsg }</span>

                    </div>
                    }
                </div>

                <div className="profile-section mt-4 pb-3 position-relative">
                    {!this.state.isEmailChange ? 
                        <div>
                            <label className="input-label">Email</label>
                            <p style = {{wordBreak:"break-word"}} className="pr-5 mb-0 pb-0">{this.state.email}</p>
                            <a style= {{cursor:"pointer",zIndex:999}} onClick = {()=>{this.setState({isEmailChange:true})}}  className="input-inner-btn">Edit</a>
                        </div>
                    :
                    <div>
                        <div className="d-flex flex-column">
                            
                            <div className="col-12 px-0 position-relative">
                                <TextField  
                                onChange={(event) => {this.setState({email: event.target.value})}} 
                                value = {this.state.email} 
                                className = {this.state.email ? 'outlined-input-custom active' : 'outlined-input-custom'} 
                                label="Email" 
                                type="email"
                                variant="outlined" 
                                >
                                </TextField>
                            </div>
       
                        </div>
                        <div className="align-items-baseline col-12 d-flex mt-3 px-0 "> 
                            <div className="col-6 pl-1"> 
                                <button 
                                onClick = {this.updateEmail.bind(this)}
                                className="save-btn">
                                    Save
                                </button>
                            </div>                         
                            <div className="col-6 text-right pr-1">
                                <a onClick = {()=>{this.setState({isEmailChange:false})}} className="cancel-btn">
                                    Cancel
                                </a>
                            </div> 
                        </div>
                        <span className="error ml-1">{(this.state.errorMsg && this.state.errorMsg.length>0 ) && this.state.errorMsg }</span>

                    </div>
                    }   
                </div>

                <div className="profile-section mt-4 pb-3 position-relative">
                    {!this.state.isPasswordChange ? 
                        <div>
                         <label className="input-label">Password</label>
                        <p className="mb-0 pb-0">{'xxxxxxxx'}</p>
                        <a style= {{cursor:"pointer",zIndex:999}}  onClick = {()=>{this.setState({isPasswordChange:true})}} className="input-inner-btn">Edit</a>
                        </div>
                    :  <div>
                        <div className="d-flex flex-column">
                            
                            <div className="col-12 px-0 position-relative">
                                <TextField 
                                    onChange={(event) => {this.setState({old_password: event.target.value})}} 
                                    value={this.state.old_password}
                                    className = {this.state.old_password ? 'outlined-input-custom active' : 'outlined-input-custom'} 
                                    label="Old Password" 
                                    type={this.state.showOldPassword ? "text" : "password"}  
                                    variant="outlined" 
                                />
                                <div onClick = {()=>{this.setState({showOldPassword:!this.state.showOldPassword})}}>
                                    {this.state.showOldPassword ? this.getShowPasswordIcon() : this.getHidePasswordIcon()}
                                </div>            
                            </div>

                            <div className="col-12 px-0 mt-3 position-relative">
                                <TextField 
                                    onChange={(event) => {this.setState({new_password1: event.target.value})}} 
                                    value={this.state.new_password1} 
                                    className = {this.state.new_password1 ? 'outlined-input-custom active' : 'outlined-input-custom'} 
                                    label="New Password" 
                                    type={this.state.showNewPass1 ? "text" : "password"} 
                                    variant="outlined" 
                                />
                                <div onClick = {()=>{this.setState({showNewPass1:!this.state.showNewPass1})}}>
                                    {this.state.showNewPass1 ? this.getShowPasswordIcon() : this.getHidePasswordIcon()}
                                </div>  
                            </div>

                            <div className="col-12 px-0 mt-3 position-relative">
                                <TextField 
                                    onChange={(event) => {this.setState({new_password2: event.target.value})}} 
                                    value={this.state.new_password2}
                                    className =  {this.state.new_password2 ? 'outlined-input-custom active' : 'outlined-input-custom'} 
                                    label="Re-enter Password" 
                                    type={this.state.showNewPass2 ? "text" : "password"} 
                                    variant="outlined" 
                                />
                                <div onClick = {()=>{this.setState({showNewPass2:!this.state.showNewPass2})}}>
                                    {this.state.showNewPass2 ? this.getShowPasswordIcon() : this.getHidePasswordIcon()}
                                </div>  
                            </div>
    
                        </div>
                        <div className="align-items-baseline col-12 d-flex mt-3 px-0 "> 
                            <div className="col-6 pl-1"> 
                                <button 
                                onClick = {this.updatePassword.bind(this)}
                                className="save-btn">
                                    Save
                                </button>
                            </div>                         
                            <div className="col-6 text-right pr-1">
                                <a onClick = {()=>{this.setState({isPasswordChange:false})}} className="cancel-btn">
                                    Cancel
                                </a>
                            </div> 
                        </div>
                        <span className="error ml-1">{(this.state.passwordError && this.state.passwordError.length>0 ) && this.state.passwordError }</span>
                        
                        
                    </div>
                    }
                </div>
            
                <div className="profile-section mt-4 pb-3 position-relative">
                    <div style={{cursor:"pointer"}} className ="align-content-center col-12 d-flex flex-column justify-content-center more-card pl-0 text-left">
                        <a onClick={this.logout.bind(this)} >Logout<span> - You can sign back in at any time</span></a>
                    </div>
                </div>

                <div className="profile-section mt-4 pb-3 position-relative">
                    <div style={{cursor:"pointer"}} className ="align-content-center col-12 d-flex flex-column justify-content-center more-card pl-0 text-left">
                        <a onClick={()=>{this.setState({showDeleteDialog:true})}} >Delete<span> - This will remove your account forever</span></a>
                    </div>
                </div>

                <div className="profile-section mt-4 pb-3 position-relative">
                    <div style={{cursor:"pointer"}} className ="align-content-center col-12 d-flex flex-column justify-content-center more-card pl-0 text-left">
                        <a onClick={this.mailTo.bind(this)}>Contact us <span> - Get in touch if you need to speak to us about anything</span></a>
                    </div>
                </div>
                <div className="profile-section mt-4 pb-3 position-relative">
                    <div style={{cursor:"pointer"}} className = "align-content-center col-12 d-flex flex-column justify-content-center more-card pl-0 text-left">
                        <a onClick = {()=>{this.setState({emailPreferencesModal:true})}}>Notification settings </a>
                    </div>
                </div>
               
            </form>
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
            <div className="position-relative delete-dialog">        
                <SweetAlert  
                    title="Warning"
                    onConfirm={this.deleteAccount.bind(this)}
                    onCancel={()=>this.setState({showDeleteDialog:false})}
                    showConfirm = {true}
                    show = {this.state.showDeleteDialog}
                    showCancel={true}
                    customButtons={
                    <React.Fragment>
                        <div className="delete-btns">
                            <button className = "col-6 dialog-btn cancel-btn" onClick={()=>this.setState({showDeleteDialog:false})}>Cancel</button>
                            <button className = "col-6 dialog-btn confirm-btn" onClick={this.deleteAccount.bind(this)}>Erase</button>
                        </div>
                    </React.Fragment>
                    }
                    >
                    <div>
                        <img className="warning-img" src = {warningIcon} />
                        <p className = "body-text pl-0 "> 
                            This will erase your speech and data, this is not
                            reversible.Are you sure you wish to completely remove your
                            account from mylastspeech?
                        </p>
                    </div>
                </SweetAlert>
            </div> 
        </div>
 
        );
    }
}

export default Profile;



