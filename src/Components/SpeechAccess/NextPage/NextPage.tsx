import React from 'react';
import './nextpage.scss';
import axios from 'axios';
import * as url from '../../../utils/constant';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';

interface NextPageProps {
    location?:any,
}
interface NextPageState {
    userObj:object,
    questionsList:Array<object>
}

class NextPage extends React.Component<NextPageProps, NextPageState> {

    state = {
        userObj:{},
        questionsList:[{}]
    }

    componentDidMount(){
        let name: string =this.props.location.state['name'];
        name = name.toUpperCase();
        let data = {
            name:name,
            image:this.props.location.state['image'],
            id:this.props.location.state['id']
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

    render() {
        return (               
            <div className="container card-container next-card-container mt-5">
                <div className="align-items-center d-flex justify-content-center row custom-profile">
                    <div className="col-lg-7 card-profile next-card-profile">
                        <form>
                            <img src={this.state.userObj['image']}  alt="Avatar"/>&nbsp; &nbsp; &nbsp; &nbsp;<span><b>{this.state.userObj['name']} </b></span>
                            <p className="mt-5 mb-4">No account has granted that address access yet. Please enter the following security questions to see this account</p>
                           {this.state.questionsList.map((item:any,i:number)=>(
                                <div className="mb-3">
                                 <TextField  
                                     onChange={this.setAnswer.bind(this,i)} 
                                     value = {item.answer} 
                                     className = 'outlined-input-custom' 
                                     label={item.question}
                                     type="email"
                                     variant="outlined" 
                                 />
                                </div>
                           )
                        )}
                        <div className="form-group custom-submit ">
                            <Link to="">
                                <button className="btn btnSubmit" type="submit"><i className=" fa fa-long-arrow-right" aria-hidden="true"></i>
                                </button>
                            </Link>
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

