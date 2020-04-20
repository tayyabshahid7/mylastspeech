import React from 'react';
import * as url from '../../../utils/constant';
import axios from 'axios';
import { css } from "@emotion/core";
import { ClipLoader } from "react-spinners";
import './useraccess.scss';
import tickIcon from '../../../assets/images/success-tick.png';
import history from '../../../utils/history';

interface UserAccessProps {

}
interface UserAccessState {
    emailList:any,
    isValidated: boolean,
    isSuccess: boolean,
    successMsg: string,
    errorMsg:string,
    btnText:string,
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

class UserAccess extends React.Component<UserAccessProps, UserAccessState> {

    state = {
        emailList:[ {
            id: '',
            email: "",
        }],
        isValidated: true,
        isSuccess: false,
        successMsg: '',
        errorMsg:'',
        btnText:'Add one more'
    }

    componentDidMount(){
        this.retrieveEmails();
    }

    validateForm(): boolean {
        let flag = true;
        this.state.emailList.map((item:any)=>{
            if(item.email === ""){
                flag = false
            }
        });
        return flag;
    }

    retrieveEmails =()=>{
        const config = {
            headers: { Authorization: `Token ${localStorage.getItem('userToken')}` }
        };
      
        axios.get(url.closeContactsUrl,        
            config
            )
            .then((response) => {
                let data = response.data;
                if(data.length>0){
                    data.map((item:any)=>{
                        item.isChanged = false;
                    });
                    this.setState({
                         emailList:data,                 
                    });
                }            
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
            .finally( () => {
            // always executed
        });        
    }

    checkUniqueness = (item:any) =>{
        let count = 0;
        this.state.emailList.map((obj)=>{
            if(obj.email === item.email){
                count++;
            }
        });
        if(count > 1){
            return true;
        }else{
            return false;
        }
    }
    

    addCloseContacts = (item:any,e: any) => {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(re.test(String(item.email).toLowerCase())){
            if(!this.checkUniqueness(item)){
                let flag = this.validateForm();
                if(item.id === "" ){
                    e.preventDefault();
                    if (true) {
                        this.setState({
                            isSuccess: true,
                        });
                        const config = {
                            headers: { Authorization: `Token ${localStorage.getItem('userToken')}`}
                        };
                        const bodyParameters = {
                            email:this.state.emailList,
                        };
            
                        let that = this;
                        axios.post(url.closeContactsUrl,
                            bodyParameters,
                            config
                        )
                        .then((response) => {
                            let data = response.data;
                            if(data.length>0){
                                data.map((item:any)=>{
                                    item.isChanged = false
                                });
                                debugger;
                                this.setState({
                                    emailList:data,                 
                                });
                            }    
                            this.setState({
                                isSuccess: false,
                                successMsg: "Emails Added Successfully",
                            });
                            setTimeout(() => {
                                this.setState({
                                    successMsg: ""
                                });
                            }, 2000);
        
                        })
                        .catch((error) => {
                            if(error.response.data.detail === "Invalid token."){
                                localStorage.removeItem('userToken');
                                localStorage.removeItem('user');
                                history.push({
                                    pathname:'/signin',
                                });
                            }
                            this.setState({
                                isSuccess: false,
                                errorMsg: "Enter Valid Email Address",
                            });
                            setTimeout(() => {
                            this.setState({
                                errorMsg: ""
                            });
                            }, 2000);
                        })
                        .finally(() => {
                            // always executed
                    });
                    }
                }
                
            }else{
                this.setState({
                    isSuccess: false,
                    errorMsg: "Same Email already added",
                });
                  setTimeout(() => {
                    this.setState({
                        errorMsg: ""
                    });
                }, 3000);
            }    
        }else{
            this.setState({
                isSuccess: false,
                errorMsg: "Enter Valid Email Address",
            });
            setTimeout(() => {
                this.setState({
                    errorMsg: ""
                });
            }, 2000);
        }

    }

    setEmail = (index:number,e:any) =>{
        let emails = this.state.emailList;
        emails[index]['email'] = e.target.value;
        emails[index]['isChanged'] = true;
        this.setState({
            emailList:emails,
        });
    }

    updateEmail = (obj:any,index:number,e:any) =>{  
        const config = {
            headers: { Authorization: `Token ${localStorage.getItem('userToken')}`}
        };
        const bodyParameters = {
            email:obj.email,
            id:obj.id
        };
        axios.put(url.closeContactsUrl,
            bodyParameters,
            config
        )
        .then((response) => {
            let data = response.data;
            if(data.length>0){
                data.map((item:any)=>{
                    item.isChanged = false;
                });
                this.setState({
                    emailList:data,                 
                });
            }   
            this.setState({
                isSuccess: false,
                successMsg: "Email Updated Successfully",
            });
            setTimeout(() => {
                this.setState({
                    successMsg: ""
                });
            }, 2000);
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

      });
    }

    addField = (e:any) => {
        var obj = {
            id: '',
            email: "",
        };
        let data = this.state.emailList;
        if(data.length<10){
            data.push(obj);
            this.setState({
                emailList:data,
            });
        }     
    }
    
    removeEmail = (item:any,index:number,e:any) => {
        if(this.state.emailList.length > 1 ){
            axios.delete(url.closeContactsUrl,{
                    headers: { Authorization: `Token ${localStorage.getItem('userToken')}`},
                    data :{
                        email:item.email,
                        id:item.id
                    },
                }         
            )
            .then((response) => {
                let data = response.data;
                if(data.length>0){
                    data.map((item:any)=>{
                        item.isChanged = false;
                    });
                    this.setState({
                            emailList:data,                 
                    });
                }                  
                this.setState({
                    isSuccess: false,
                    successMsg: "Email Removed Successfully",
                });
                setTimeout(() => {
                    this.setState({
                        successMsg: ""
                    });
                }, 2000);

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
        }else{
            this.setState({
                isSuccess: false,
                errorMsg: "Atleast 1 email is required can't delete",
            });
              setTimeout(() => {
                this.setState({
                    errorMsg: ""
                });
            }, 2000);
        }
    }

    _handleKeyDown(item,e) {
        if (e.key === 'Enter') {
            this.addCloseContacts(item,e);
        }
    }


    render() {
        return (
            <div id="user-access">
                <div className="align-items-center d-flex justify-content-center sweet-loading">
                    <ClipLoader
                        css={override}
                        size={150}
                        color={"#123abc"}
                        loading={this.state.isSuccess}
                    />
                </div>
                <div className="col-12 col-md-10 pl-0 pl-md-3 pr-4 pr-md-0 tabcontent pt-md-4">
                    <p className="d-md-block d-none">Add the email address’s of people you wish to allow access your speech</p>
                    <div className="col-12 col-md-11 pl-md-0 form-group mb-0">
                        {this.state.emailList.map((item:any,i:number)=>(
                            <div key ={i} className="position-relative">
                                <input type="email"
                                onChange={this.setEmail.bind(this,i)}
                                className={"form-control ".concat(this.state.isValidated ? "" : "validate")}
                                placeholder={"Email ".concat((i+1).toLocaleString())}
                                value={item.email}
                                onKeyDown={this._handleKeyDown.bind(this,item)}
                                onBlur = {this.addCloseContacts.bind(this,item)} />
                                {item.isChanged && item.id!="" && <a style= {{cursor:"pointer",zIndex:9999}} onClick = {this.updateEmail.bind(this,item,i)} className="profile-inputs input-inner-btn">update</a>}
                                {item.id!="" && !item.isChanged &&
                                    <img className = "success-tick-icon"  src = {tickIcon} />
                                }                          
                                { item.id!="" && <i onClick = {this.removeEmail.bind(this,item,i)} className="fa fa-minus-circle collapse-minus" aria-hidden="true"></i>}
                            </div>
                        ))}

                    </div>

                    <div className="add-btn d-flex flex-column mt-4">
                        <span className="response-msg">{this.state.successMsg}</span>
                        <span className="response-msg error">{this.state.errorMsg}</span>
                        <span><a onClick={this.addField.bind(this)}>+ {this.state.btnText}</a></span>
                    </div>
                </div>

            </div>
        );
    }
}

export default UserAccess;



