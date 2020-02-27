import React from 'react';
import * as url from '../../../utils/constant';
import axios from 'axios';
import { css } from "@emotion/core";
import { ClipLoader } from "react-spinners";

interface UserAccessProps {

}
interface UserAccessState {
    email1: string,
    email2: string,
    email3: string,
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
        email1: '',
        email2: '',
        email3: '',
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
        if (this.state.email1 && this.state.email2 && this.state.email3) {
            return true;
        }
        return false;
    }

    retrieveEmails =()=>{
        const config = {
            headers: { Authorization: `Token ${localStorage.getItem('userToken')}` }
        };
      
        axios.get(url.closeContactsUrl,        
            config
            )
            .then((response) => {
                response.data.results && response.data.results.length>0 ?
                  this.setState({btnText:"Update"})
                : this.setState({btnText:"Add"});

                this.setState({
                    email1:response.data.results[0]['email1'],
                    email2:response.data.results[0]['email2'],
                    email3:response.data.results[0]['email3'],
                });
            
            })
            .catch((error) => {
                
            })
            .finally( () => {
            // always executed
        });        
    }

    addCloseContacts = (e: any) => {
        e.preventDefault();
        let flag = this.validateForm();
        this.setState({
            isValidated: flag,
        });
        if (flag) {
            this.setState({
                isSuccess: true,
            });

            const config = {
                headers: { Authorization: `Token ${localStorage.getItem('userToken')}`}
            };
            const bodyParameters = {
                email1: this.state.email1,
                email2: this.state.email2,
                email3: this.state.email3,
            };

            let that = this;
            axios.post(url.closeContactsUrl,
                bodyParameters,
                config
            )
            .then((response) => {
                     ;
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

    }

    render() {
        return (
            <div>
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
                        <input type="email"
                            onChange={(event) => { this.setState({ email1: event.target.value }) }}
                            className={"form-control ".concat(this.state.isValidated ? "" : "validate")}
                            placeholder="Email 1"
                            value={this.state.email1} />

                        <input type="email"
                            onChange={(event) => { this.setState({ email2: event.target.value }) }}
                            className={"form-control ".concat(this.state.isValidated ? "" : "validate")}
                            placeholder="Email 2"
                            value={this.state.email2} />

                        <input type="email"
                            onChange={(event) => { this.setState({ email3: event.target.value }) }}
                            className={"form-control ".concat(this.state.isValidated ? "" : "validate")}
                            placeholder="Email 3"
                            value={this.state.email3} />                 
                    </div>

                    <div className="add-btn d-flex flex-column mt-4">
                        <span className="response-msg">{this.state.successMsg}</span>
                        <span className="response-msg error">{this.state.errorMsg}</span>
                        <a onClick={this.addCloseContacts.bind(this)}>+ {this.state.btnText}</a>
                    </div>
                </div>

            </div>
        );
    }
}

export default UserAccess;



