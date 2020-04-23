import React from 'react';
import * as url from '../../../utils/constant';
import { Collapse, CardBody, Card } from 'reactstrap';
import axios from 'axios';
import { css } from "@emotion/core";
import history from '../../../utils/history';
import './security.scss';

interface SecurityProps {

}
interface SecurityState {
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

class Security extends React.Component<SecurityProps, SecurityState> {

    state = {
        isOpen:false,
        question:'',
        answer:'',
        showAnswerInput:false,
        isSuccess:false,
        msg:'',
        questionsList:[],
        isValidated:true,
    }

    componentDidMount(){
        this.retrieveSecurityQuestion();
    }

  
    validateForm():boolean{ 
        if(this.state.answer && this.state.question){
          return true;
        }
        return false;
    }
    
    retrieveSecurityQuestion =()=>{
        const config = {
            headers: { Authorization: `Token ${localStorage.getItem('userToken')}` }
        };
      
        axios.get(url.secuirtyQuestionUrl,        
            config
            )
            .then((response) => {
                response.data.results.map((item:any)=>{
                    item.showAnswer = false;
                });
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

    deleteSecurityQuestion =(item:any,e:any)=>{
        axios.delete(url.secuirtyQuestionUrl+ item.id,{
            headers: { Authorization: `Token ${localStorage.getItem('userToken')}`},
            }         
        )
        .then((response) => {
            this.retrieveSecurityQuestion();
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
                    this.setState({
                        isSuccess:false,
                        showAnswerInput:false,
                        msg:"Question Added Successfully",
                        answer:"",
                        question:"",
                    });
                    this.retrieveSecurityQuestion();
                    setTimeout(() => {
                        this.setState({
                            msg:""
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
                .finally( () => {
                // always executed
            }); 
        }
                 
    }
  
    showAnswer = (item:any,e:any)=>{
        let data = this.state.questionsList;
        data.map((obj:any)=>{
            if(obj == item )
                obj.showAnswer = !obj.showAnswer;
        });
        this.setState({
            questionsList:data,
        });
    }

  
    render() {
        return (
        <div id = "security" className="col-12 col-md-10 pl-0 pl-md-3 pr-0 tabcontent second-content pt-4">
            <p className="pt-0 d-none d-md-block">Add questions that we will ask your loved ones when <br/>they try to access your speech</p>
            <form>
                <div className="pr-0 col-12 col-md-11 pl-md-0 form-group position-relative ">
                    <textarea style = {{resize:"none"}}
                        onChange={(event) => {this.setState({question: event.target.value})}}
                        className={"form-control ".concat(this.state.isValidated ? "" : "validate")}
                        placeholder="Type your question"
                        value={this.state.question} 
                    />
                    <div className="line"></div> 

                    <textarea style = {{resize:"none"}}
                        onChange={(event) => {this.setState({answer: event.target.value})}}
                        className={"form-control custom-input ".concat(this.state.isValidated ? "" : "validate")}
                        placeholder="Type your answer"
                        value={this.state.answer}
                    />

                    
                    <span className="response-msg mt-2">{this.state.msg}</span>   

                </div>
                
                <div className="mt-3 add-btn position-relative button-save">
                        <button 
                        onClick = {this.addSecurityQuestion.bind(this)}
                        className="save-btn">
                            Save
                        </button>
                    {/* <a onClick = {this.addSecurityQuestion.bind(this)}>+ Save</a> */}
                </div>
                <br/>
                {this.state.questionsList && this.state.questionsList.length>0 && this.state.questionsList.map((item:any,i:number)=>
                        <div key={i} className = "mt-3 col-12 pl-md-0 pr-md-0 col-md-11 form-group position-relative mobile-screen ">
                             <p className={"mb-0 question-answer form-control custom-input "}>
                                        {item.question}
                             </p>
                         
                            {item.showAnswer &&
                                <div >
                                    <div className="line"></div> 
                                    <p className={"mb-0 question-answer form-control custom-input "}>
                                        {item.answer}
                                    </p>
                                </div>
                            }
                               <a onClick = {this.showAnswer.bind(this,item)} 
                                className="input-inner-btn">
                                {item.showAnswer ? "Hide" : "Show"}
                            </a>
                             { item.id!="" && <i onClick = {this.deleteSecurityQuestion.bind(this,item)} className="fa fa-minus-circle collapse-minus" aria-hidden="true"></i>}
                    </div>
                )}
                </form>
        </div>
   
           
     );
    }
}

export default Security;



