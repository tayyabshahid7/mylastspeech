import React from 'react';
import './nextpage.scss';
import axios from 'axios';
import * as url from '../../../utils/constant';
import history from '../../../utils/history';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';

interface NextPageProps {
    location?:any,
}
interface NextPageState {
    userObj:object,
    error:boolean,
    questionsList:Array<object>
}

class NextPage extends React.Component<NextPageProps, NextPageState> {

    state = {
        userObj:{},
        questionsList:[{}],
        error:false,
    }

    componentDidMount(){
        let name: string =this.props.location.state['name'];
        let data = {
            name:name,
            image:this.props.location.state['image'],
            id:this.props.location.state['id'],
            close_contact_email:this.props.location.state['close_contact_email'],
        }
        this.setState({
            userObj:data,
        });
        this.retrieveSequrityQuestion();
    }


    retrieveSequrityQuestion =()=>{ 
        axios.get(url.searchedUserSecuirtyQuestionUrl, {
                params: {
                    user_id:this.props.location.state['id']
                }
             })
            .then((response) => {
                debugger;
                let data = response.data.results;
                data.map((obj:any)=>{
                    obj.answer = '';
                });
                this.setState({
                  questionsList:data,
                });
            })
            .catch((error) => {
                
            })
            .finally( () => {
            // always executed
        });        
    }

    setAnswer = (index:number,e:any) =>{
        let data = this.state.questionsList;
        data[index]['answer'] = e.target.value;
        this.setState({
            questionsList:data,
        });
    }

    checkSecurityQuestion = (e:any) =>{
        e.preventDefault();
        const params = {
            answer : this.state.questionsList,
            user_id: this.props.location.state['id']
        };
        axios.post(url.checkSecurityQuestionUrl, {
            params
        })
        .then((response) => {
            let data = this.state.userObj;
            data['payment_status'] = this.props.location.state['payment_status'];
            if(this.props.location.state['payment_status']){
                if(response.data.isCorrect){
                    history.push({
                        pathname: '/userspeech',
                        state: data
                    });
                }else{
                    this.setState({error:true});
                    setTimeout(() => {
                    this.setState({error:false});
                    }, 4000);
                }                
            }else{              
                history.push({
                    pathname: '/payment',
                    state: data
                 });
            }            
        })
        .catch((error) => {
        
        })
        .finally( () => {
        // always executed
        });           
    }

    render() {
        return (               
            <div className="container card-container next-card-container mt-5">
                <div className="align-items-center d-flex justify-content-center row custom-profile">
                    <div className="col-lg-7 card-profile next-card-profile">
                        <form>
                            <img src={this.state.userObj['image']}  alt="Avatar"/>&nbsp; &nbsp; &nbsp; &nbsp;<span><b>{this.state.userObj['name']} </b></span>
                            <p className="mt-5 mb-4">No account has granted that address access yet. Please enter the following security questions to see this account</p>
                           {
                           this.state.questionsList && this.state.questionsList.length >0 ? 
                           this.state.questionsList.map((item:any,i:number)=>(
                                <div className="mb-3">
                                 <TextField  
                                     onChange={this.setAnswer.bind(this,i)} 
                                     value = {item.answer} 
                                     multiline
                                     className = 'outlined-input-custom' 
                                     label={item.question}
                                     type="email"
                                     variant="outlined" 
                                 />
                                </div>
                           )
                        )
                        :
                        <p className="mt-3 mb-4"><b>{this.state.userObj['name']}</b> has not added a speech yet. Please check again later.</p>
                        }
                        {this.state.error && <p className="mt-3 mb-3 error"> Answers are not correct.</p>}

                        <div className="form-group custom-submit ">
                                <button onClick = {this.checkSecurityQuestion.bind(this)} className="btn btnSubmit" type="submit"><i className=" fa fa-long-arrow-right" aria-hidden="true"></i>
                                </button>
                            <Link to={{pathname:"speechaccess", state:this.state.userObj}}>
                                <button className="btn btnSubmit-back" type="submit"><i className=" fa fa-long-arrow-left" aria-hidden="true"></i>
                                </button>
                            </Link>
                            
                        </div>

                    </form>
                </div>
            </div>
        </div>
        );
    }
}

export default NextPage;

