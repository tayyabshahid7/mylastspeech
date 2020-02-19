import React , {createRef} from 'react';
import * as url from '../../../utils/constant';
import axios from 'axios';
import DatePicker from 'react-mobile-datepicker';
import moment from 'moment';
import './profile.scss';

interface ProfileProps {

}
interface ProfileState {
    email: string,
    name: string,
    dob: string,
    isValidated: boolean,
    isSuccess: boolean,
    successMsg: string,
    errorMsg:string,
    time: Date,
    isCalenderOpen: boolean,
    password:string,
    profile_picture:any,
    file:any,
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
        isValidated: true,
        isSuccess: false,
        successMsg: '',
        errorMsg:'',
        isCalenderOpen:false,
        time:new Date(),
        password:'',
        profile_picture:null,
        file:null,
    }

    constructor(props){
        super(props);
        this.inputOpenFileRef = React.createRef()
    }
    componentDidMount(){
         this.retrieveProfileInfo();
    }

    validateForm(): boolean {
        // if (this.state.email1 && this.state.email2 && this.state.email3) {
        //     return true;
        // }
        return false;
    }

    retrieveProfileInfo =()=>{
        debugger;
        const config = {
            headers: { Authorization: `Token ${localStorage.getItem('userToken')}` }
        };
      
        axios.get(url.updateProfileUrl,        
            config
            )
            .then((response) => {
              debugger;
            //   let img = response.data[0]['profile_picture'] === null ? "https://www.pinclipart.com/picdir/big/355-3553881_stockvader-predicted-adig-user-profile-icon-png-clipart.png":
            //             response.data[0]['profile_picture'] ;
                let img ="https://www.pinclipart.com/picdir/big/355-3553881_stockvader-predicted-adig-user-profile-icon-png-clipart.png"
                this.setState({
                    email:response.data[0]['email'],
                    name:response.data[0]['name'],
                    dob:moment(response.data[0]['dob']).format('Do-MMMM-YYYY'),
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

    updateProfile = () => {
        let flag = true;//this.validateForm();
        this.setState({
            isValidated: flag,
        });
        var formData = new FormData();
        formData.append("email",this.state.email);
        formData.append("dob",moment(this.state.time).format('YYYY-MM-DD'));
        formData.append("name",this.state.name);
        formData.append("password",this.state.password);


        if (flag) {          
            const config = {
                headers: { Authorization: `Token ${localStorage.getItem('userToken')}`}
            };
            

            let that = this;
            axios.post(url.updateProfileUrl,
                formData,
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

    }


    handleClick = () => {
        this.setState({ isCalenderOpen: true });
    }

    handleCancel = () => {
        this.setState({ isCalenderOpen: false });
    }

    handleSelect = (time) => {
        debugger;
        let date = moment(time).format('Do-MMMM-YYYY');
        this.setState({time: time, isCalenderOpen: false,dob:date });
    }

    handleImageChange = (e) =>{
        this.setState({
            profile_picture: URL.createObjectURL(e.target.files[0]),
            file:e.target.files[0],
        },()=>{
            this.updateProfile();
        });
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
                    <label className="input-title">Full Name</label>
                    <input type="text"
                    onChange={(event) => {this.setState({name: event.target.value})}} 
                    className="form-control" 
                    placeholder="Enter Your Name *" 
                    value={this.state.name}
                    onBlur= {this.updateProfile.bind(this)}
                    />
                    <a href="#" className="profile-inputs input-inner-btn">change</a>
                </div>
                <div className="position-relative custom-input">
                    <label className="input-title">Date of Birth</label>
                    <input type="text"
                     onBlur= {this.updateProfile.bind(this)}
                     onChange = {()=>{}}
                     className="form-control" 
                     placeholder=" mm/dd/yy" 
                     value= {this.state.dob} 
                     />
                    <a  onClick={this.handleClick} className="profile-inputs input-inner-btn">change</a>
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
                    <label className="input-title">Email</label>
                    <input type="email"
                    onChange={(event) => {this.setState({email: event.target.value})}}  
                    onBlur= {this.updateProfile.bind(this)}
                    className="form-control" 
                    placeholder="Email *" 
                    value={this.state.email} />
                    <a href="#" className="profile-inputs input-inner-btn">change</a>
                </div>
                <div className="position-relative custom-input">
                    <label className="input-title">Password</label>
                    <input type="password" 
                    onChange={(event) => {this.setState({password: event.target.value})}} 
                    onBlur= {this.updateProfile.bind(this)}
                    className="form-control" 
                    placeholder="Password *" 
                    value={this.state.password} />
                    <a href="#" className="profile-inputs input-inner-btn">change</a>
                </div>
            </form>

        </div>
 
        );
    }
}

export default Profile;



