import React from 'react';
import * as url from '../../../utils/constant';
import axios from 'axios';
import { css } from "@emotion/core";
import { ClipLoader } from "react-spinners";
import './useraccess.scss';
import Item from '../../Search/Item/Item';

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
        },{
            id: '',
            email: "",
        },{
            id: '',
            email: "",
        }],
        isValidated: true,
        isSuccess: false,
        successMsg: '',
        errorMsg:'',
        btnText:'Add'
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
                debugger;
                let data = response.data;
                if(data.length>0){
                    data.map((item:any)=>{
                        item.isChanged = false;
                    });
                    debugger;
                    this.setState({
                         emailList:data,                 
                    });
                }            
            })
            .catch((error) => {
                
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
        if(!this.checkUniqueness(item)){
            let flag = this.validateForm();
            if(item.id === "" && flag){
                e.preventDefault();
                let flag = this.validateForm();
                this.setState({
                    isValidated: flag,
                });
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
                                item.isChanged = false;
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
                        debugger;
                        this.setState({
                            isSuccess: false,
                            errorMsg: "Enter valid email address in all 3 fields",
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
            }else if(item.id === "" ){
                this.setState({
                    isSuccess: false,
                    errorMsg: "Please enter valid email address and atleast 3 emails are required",
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
                errorMsg: "Same Email already added",
            });
              setTimeout(() => {
                this.setState({
                    errorMsg: ""
                });
            }, 3000);
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
        if(this.state.emailList.length >3 ){
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
                
            })
            .finally(() => {
                // always executed
            });
        }else{
            this.setState({
                isSuccess: false,
                errorMsg: "Atleast 3 emails are required can't delete",
            });
              setTimeout(() => {
                this.setState({
                    errorMsg: ""
                });
            }, 2000);
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
                <div className="tabcontent">
                    <p>Add the email address’s of people you wish to allow access your <br /> speech, you need to add at least 3</p>
                    <div className="form-group mb-0">
                        {this.state.emailList.map((item:any,i:number)=>(
                            <div key ={i} className="position-relative">
                                <input type="email"
                                onChange={this.setEmail.bind(this,i)}
                                className={"form-control ".concat(this.state.isValidated ? "" : "validate")}
                                placeholder={"Email ".concat((i+1).toLocaleString())}
                                value={item.email}
                                onBlur = {this.addCloseContacts.bind(this,item)} />
                                {item.isChanged && item.id!="" && <a style= {{cursor:"pointer",zIndex:9999}} onClick = {this.updateEmail.bind(this,item,i)} className="profile-inputs input-inner-btn">update</a>}
                                { item.id!="" && <i onClick = {this.removeEmail.bind(this,item,i)} className="fa fa-minus-circle collapse-minus" aria-hidden="true"></i>}
                            </div>
                        ))}

                    </div>

                    <div className="add-btn d-flex flex-column mt-4">
                        <span className="response-msg">{this.state.successMsg}</span>
                        <span className="response-msg error">{this.state.errorMsg}</span>
                        <a onClick={this.addField.bind(this)}>+ {this.state.btnText}</a>
                    </div>
                </div>

            </div>
        );
    }
}

export default UserAccess;



