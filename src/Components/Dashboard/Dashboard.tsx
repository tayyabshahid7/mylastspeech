import React from 'react';
import { Collapse, CardBody, Card } from 'reactstrap';
import UserAccess from './UserAccess/UserAccess';
import * as url from '../../utils/constant';
import axios from 'axios';
import { css } from "@emotion/core";
import { ClipLoader } from "react-spinners";


import './dashboard.scss';
import Profile from './Profile/Profile';

interface DashboardProps {

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
    if(tab === "security"){
        this.retrieveSequrityQuestion();
    }
    this.setState({
        activeTab : tab,
    });
   
}

toggleBottomTabsHandler = (tabName:string,e:any) =>{
    this.setState({
        activeBottomTab:tabName
    });
}

toggleCollapse = (item:any,e:any)=>{
    let data = this.state.questionsList;
    data.map((obj:any)=>{
        if(obj == item )
            obj.showAnswer = !obj.showAnswer;
    });
    this.setState({
        questionsList:data,
    });
}

validateForm():boolean{ 
    if(this.state.answer && this.state.question){
      return true;
    }
    return false;
}

retrieveSequrityQuestion =()=>{
    const config = {
        headers: { Authorization: `Token ${localStorage.getItem('userToken')}` }
    };
  
    axios.get(url.secuirtyQuestionUrl,        
        config
        )
        .then((response) => {
            debugger;
            response.data.results.map((item:any)=>{
                item.showAnswer = false;
            })
            this.setState({
              questionsList:response.data.results,
            });
        
        })
        .catch((error) => {
            
        })
        .finally( () => {
        // always executed
    });        
}

addSecurityQuestion = (e:any) => {
    e.preventDefault();
    let flag = this.validateForm();
    this.setState({
        isValidated:flag,
    });
    if(flag){
        this.setState({
            isSuccess:true,
        });
    
        const config = {
            headers: { Authorization: `Token ${localStorage.getItem('userToken')}` }
        };
        const bodyParameters = {
            answer:this.state.answer,
            question:this.state.question,
         };
    
        let that = this;
        axios.post(url.secuirtyQuestionUrl, 
            bodyParameters,
            config
            )
            .then((response) => {
                debugger;
                this.setState({
                    isSuccess:false,
                    showAnswerInput:false,
                    msg:"Question Added Successfully",
                    answer:"",
                    question:"",
                });
                this.retrieveSequrityQuestion();
                setTimeout(() => {
                    this.setState({
                        msg:""
                    });
                }, 2000);
    
            })
            .catch((error) => {
                
            })
            .finally( () => {
            // always executed
        }); 
    }
             
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
        <div className="container login-container tab-page mt-5 pt-5 px-4 px-md-0">
            <div className="align-items-center d-flex justify-content-center row tabs-section custom-login">
                
                <div className=" col-12 col-lg-10 login-form mb-5 pb-5 tabs-card">
                   <div  className = {this.state.activeBottomTab == "Settings" ? "d-block" :"d-none"}>
                        <div className="col-md-3 float-left  pb-5 left-sec">
                            <div className="tab">
                                <button className={"tablinks ".concat(this.state.activeTab === "accesspage" ? 'active': '')} onClick={this.toggleActiveTab.bind(this,'accesspage')} id="defaultOpen">Who can access<br/> my page</button>
                                <button className={"tablinks ".concat(this.state.activeTab === "security" ? 'active': '')} onClick={this.toggleActiveTab.bind(this,'security')} >Security questions</button>
                                <button className={"tablinks ".concat(this.state.activeTab === "profile" ? 'active': '')} onClick={this.toggleActiveTab.bind(this,'profile')} >Profile</button>
                            </div>
                        </div>

                        <div  className="col-md-9 float-left pb-5 content-sec ">
                            {this.state.activeTab === "accesspage" ?
                               <UserAccess/>                              
                            : this.state.activeTab === "security"?
                                <div  className="tabcontent second-content">
                                    <p className="pt-0">Add questions that we will ask your loved ones when <br/>they try to access your speech</p>
                                    <form>
                                        <div className="form-group position-relative ">
                                            <input type="text" 
                                                onChange={(event) => {this.setState({question: event.target.value})}}
                                                className={"form-control ".concat(this.state.isValidated ? "" : "validate")}
                                                placeholder="Type your question"
                                                value={this.state.question} 
                                            />
                                            {this.state.showAnswerInput &&                                           
                                                <input type="text"
                                                onChange={(event) => {this.setState({answer: event.target.value})}}
                                                className={"form-control mt-3 ".concat(this.state.isValidated ? "" : "validate")}
                                                placeholder="Type your answer"
                                                value={this.state.answer}
                                                />
                                            }

                                            <a 
                                            onClick = {()=>{this.setState({showAnswerInput:!this.state.showAnswerInput})}} 
                                            className="input-inner-btn">
                                                Answer
                                            </a>
                                            <span className="response-msg mt-2">{this.state.msg}</span>   

                                        </div>
                                        
                                        <div className="mt-3 add-btn position-relative">
                                            <a onClick = {this.addSecurityQuestion.bind(this)}>+ Add</a>
                                        </div>
                                        <br/>
                                        {this.state.questionsList && this.state.questionsList.map((item:any,i:number)=>
                                            <div>
                                                <div className="d-flex align-items-baseline mb-2">
                                                    <div className={"security-questions ".concat(i==0 ? "mt-4" : "mt-3")}>
                                                        <span>{item.question}</span> 
                                                    </div>
                                                    <i onClick={this.toggleCollapse.bind(this,item)} className="fa fa-plus-circle toggle-icon ml-4" aria-hidden="true"></i>                            
                                                </div>
                                                    <Collapse isOpen={item.showAnswer} className="card-collapse">
                                                        <Card>
                                                        <CardBody>
                                                                {item.answer}                        
                                                        </CardBody>
                                                        </Card>
                                                </Collapse>
                                            </div>
                                        )}
                                        </form>
                                </div>
                            :
                            <Profile/>
                        }   
                    </div>
                        
                        <div className="row bottom-card">
                            <span>More</span>
                        </div>
                    
                   </div>

                   <div className = {this.state.activeBottomTab == "Speech" ? "d-block" :"d-none"}>
                         <form>
                            <div className="form-group">
                                <div className="custom-text-field">
                                    <textarea rows={15} placeholder="Start Typing"></textarea>
                                </div>
                            </div>

                            <div className="form-group custom-submit ">
                                <button className="btn btnSubmit" type="submit">
                                    <i className="fa fa-spotify" aria-hidden="true"></i> &nbsp;
                            <span>+ Spotify song</span>
                                </button>
                            </div>
                            
                        </form>
                   </div>

                   <div className={"after-section ".concat(this.state.activeBottomTab === "Settings" ? "after-section-animate": "" )}>
                   </div>                  
                </div>
 
                <div className="col-8 d-flex upper-list">
                    <a style={{minWidth:"120px"}} className={this.state.activeBottomTab === "Speech" ? "active": ""} onClick={this.toggleBottomTabsHandler.bind(this,"Speech")}>My Speech</a>
                    <a className={"ml-4 ".concat(this.state.activeBottomTab === "Settings" ? "active": "" )} onClick={this.toggleBottomTabsHandler.bind(this,"Settings")} >Settings</a>
                </div>
        
            </div>
            
        </div>
    </div>
    );
  }
}

export default Dashboard;

