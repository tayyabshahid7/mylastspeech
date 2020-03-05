import React , {createRef} from 'react';
import * as url from '../../../utils/constant';
import axios from 'axios';
import DatePicker from 'react-mobile-datepicker';
import moment from 'moment';
import TextField from '@material-ui/core/TextField';
import avatarPic from '../../../assets/images/img_avatar.png';


import './profile.scss';

interface ProfileProps {
    changeProfilePic(profile_url:string):any,
}
interface ProfileState {
    email: string,
    name: string,
    dob: string,
    time: Date,
    isCalenderOpen: boolean,
    old_password:string,
    new_password1:string,
    new_password2:string,
    profile_picture:any,
    file:any,
    isPasswodChange:boolean,
}

const monthMap = {
    '1': 'January',
    '2': 'February',
    '3': 'March',
    '4': 'April',
    '5': 'May',
    '6': 'June',
    '7': 'July',
    '8': 'August',
    '9': 'September',
    '10': 'October',
    '11': 'November',
    '12': 'December',
};
const dateConfig = {
   
    'month': {
        format: value => monthMap[value.getMonth() + 1],
        caption: 'Mon',
        step: 1,
    },
    'date': {
        format: 'DD',
        caption: 'Day',
        step: 1,
    },
    'year': {
        format: 'YYYY',
        caption: 'Year',
        step: 1,
    },
   
};



class Profile extends React.Component<ProfileProps, ProfileState> {
    private readonly inputOpenFileRef = createRef<HTMLInputElement>()

    state = {
        email: '',
        name: '',
        dob: '',
        isCalenderOpen:false,
        time:new Date(),
        old_password:'',
        new_password1:'',
        new_password2:'',
        profile_picture:null,
        file:null,
        isPasswodChange:false,
    }

    constructor(props){
        super(props);
        this.inputOpenFileRef = React.createRef()
    }
    componentDidMount(){
         this.retrieveProfileInfo();
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
              let dob = (response.data[0]['dob']) ? moment(response.data[0]['dob']).format('Do-MMMM-YYYY'):'';
                this.setState({
                    email:response.data[0]['email'],
                    name:response.data[0]['name'],
                    dob:dob,
                    time:new Date(response.data[0]['dob']),
                    profile_picture:img
                });
            
            })
            .catch((error) => {
                
            })
            .finally( () => {
            // always executed
        });        
    }

    checkValue = (e) =>{
         ;
        if(e.target.value !=""){
            this.updateProfile();
        }
    }

    updateProfile = () => {

        var formData = new FormData();

        this.state.file && formData.append("profile_picture", this.state.file);
        formData.append("email",this.state.email);
        formData.append("dob",moment(this.state.time).format('YYYY-MM-DD'));
        formData.append("name",this.state.name);
       
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
        })
        .catch((error) => {
            
        })
        .finally(() => {
            // always executed
        });
        
    }


    updatePassword = ()=>{
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
                
        })
        .catch((error) => {
                
        })
        .finally(() => {
                // always executed
        });
        
    }

    handleClick = () => {
        this.setState({ isCalenderOpen: true });
    }

    handleCancel = () => {
        this.setState({ isCalenderOpen: false });
    }

    handleSelect = (time) => {
        let date = moment(time).format('Do-MMMM-YYYY');
        this.setState({time: time, isCalenderOpen: false,dob:date },()=>{
            this.updateProfile();
        });
    }

    handleImageChange = (e) =>{
        if(e.target.files){
            this.setState({
                profile_picture: URL.createObjectURL(e.target.files[0]),
                file:e.target.files[0],
            },()=>{
                this.updateProfile();
            });
        }     
    }

    render() {
        return (
            <div  className="tabcontent profile-section">
            <div className="profile-img">                
                <img  src={this.state.profile_picture} />
                <input type="file" ref={this.inputOpenFileRef} className = "d-none"  onChange={this.handleImageChange.bind(this)}/>
                &nbsp; &nbsp; &nbsp; &nbsp; <a onClick = {()=>{this.inputOpenFileRef.current.click()}} >Change</a>
            </div>
            <form className="form-group">
          
                <div className="position-relative">
                     <TextField id="fullname" 
                     onChange={(event) => {this.setState({name: event.target.value})}} 
                     value = {this.state.name} 
                     className = 'outlined-input-custom' 
                     label="Full Name" 
                     variant="outlined" 
                     />

                </div>
                
          
                 <div className="position-relative custom-input">                   
                    <TextField id="fullname" 
                     onFocus={this.handleClick} 
                     value= {this.state.dob && this.state.dob} 
                     className = 'outlined-input-custom' 
                     label="Date of Birth" 
                     variant="outlined" 
                     />
                   
                    <DatePicker
                    headerFormat = "DD/MM/YYYY"
                     dateConfig={dateConfig}
                     showHeader = {true}
                     cancelText = "Cancel"
                     confirmText = "Ok"
                     value={this.state.time}
                     isOpen={this.state.isCalenderOpen}
                     onSelect={this.handleSelect}
                     onCancel={this.handleCancel} />
                </div>
                <div className="position-relative custom-input">
                    <TextField  
                      onChange={(event) => {this.setState({email: event.target.value})}} 
                     value={this.state.email}
                     className = 'outlined-input-custom' 
                     label="Email" 
                     type="email"
                     variant="outlined" 
                     />
                   
                    {/* <a style= {{cursor:"pointer",zIndex:999}} onClick = {this.checkValue.bind(this)} className="profile-inputs input-inner-btn">change</a> */}
                </div>
                <div className="position-relative custom-input">
                    <TextField 
                     onChange={(event) => {this.setState({old_password: event.target.value})}} 
                     onFocus = {()=>{this.setState({isPasswodChange:true})}}
                     value={this.state.old_password}
                     className = 'outlined-input-custom' 
                     label="Old Password" 
                     type="password"   
                     variant="outlined" 
                     />
                    {/* <a style= {{cursor:"pointer",zIndex:999}} onClick= {this.updatePassword.bind(this)}className="profile-inputs input-inner-btn">change</a> */}
                </div>
                {this.state.isPasswodChange && 
                <div>
                    <div className="position-relative custom-input">
                        <TextField 
                        onChange={(event) => {this.setState({new_password1: event.target.value})}} 
                        value={this.state.new_password1} 
                        className = 'outlined-input-custom' 
                        label="New Password" 
                        type="password"   
                        variant="outlined" 
                        />
                        {/* <a href="#" className="profile-inputs input-inner-btn">change</a> */}
                    </div>
                    <div className="position-relative custom-input">
                        <TextField 
                        onChange={(event) => {this.setState({new_password2: event.target.value})}} 
                        value={this.state.new_password2}
                        className = 'outlined-input-custom' 
                        label="Re-enter Password" 
                        type="password"   
                        variant="outlined" 
                        />
                        {/* <a style= {{cursor:"pointer",zIndex:999}} onClick = {this.checkValue.bind(this)}  className="profile-inputs input-inner-btn">change</a> */}
                    </div>
                </div>
                }
               
            </form>

        </div>
 
        );
    }
}

export default Profile;



