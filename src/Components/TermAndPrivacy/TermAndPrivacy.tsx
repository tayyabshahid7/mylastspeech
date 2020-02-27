import React from 'react';
import closeIcon from '../../assets/images/close.svg'
 import './termandprivacy.scss';
import { Link } from 'react-router-dom';

interface TermAndPrivacyProps {
    closeModal():any,
    activeTab:string,
}
interface TermAndPrivacyState {
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




class TermAndPrivacy extends React.Component<TermAndPrivacyProps, TermAndPrivacyState> {

state = {
    activeBottomTab:'Terms',
    isOpen:false,
    question:'',
    answer:'',
    showAnswerInput:false,
    isSuccess:false,
    msg:'',
    questionsList:[{}],
    isValidated:true,
}

componentDidMount(){
    this.setState({
        activeBottomTab:this.props.activeTab,
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


// addSecurityQuestion = (e:any) => {
//     e.preventDefault();
//     let flag = this.validateForm();
//     this.setState({
//         isValidated:flag,
//     });
//     if(flag){
//         this.setState({
//             isSuccess:true,
//         });
    
//         const config = {
//             headers: { Authorization: `Token ${localStorage.getItem('userToken')}` }
//         };
//         const bodyParameters = {
//             answer:this.state.answer,
//             question:this.state.question,
//          };
    
//         let that = this;
//         axios.post(url.secuirtyQuestionUrl, 
//             bodyParameters,
//             config
//             )
//             .then((response) => {
//                  ;
//                 this.setState({
//                     isSuccess:false,
//                     showAnswerInput:false,
//                     msg:"Question Added Successfully",
//                     answer:"",
//                     question:"",
//                 });
//                 this.retrieveSequrityQuestion();
//                 setTimeout(() => {
//                     this.setState({
//                         msg:""
//                     });
//                 }, 2000);
    
//             })
//             .catch((error) => {
                
//             })
//             .finally( () => {
//             // always executed
//         }); 
//     }
             
// }




render() {

 return (
    <div id="termandprivacy" className="mb-5">
   
        <div className="container login-container px-4 px-md-0">
            <div className="align-items-center d-flex justify-content-center row tabs-section custom-login">               
            <div className=" col-12 col-lg-10 login-form mb-5 pb-5 tabs-card positon-relative">
            <form className="pt-5">
                <div className="col-12 d-flex align-items-center">
                    <a style={{minWidth:"130px"}} className={"tabs ".concat(this.state.activeBottomTab === "Terms" ? "active": "")} onClick={this.toggleBottomTabsHandler.bind(this,"Terms")}>Terms of service</a>
                    <a className={"ml-4 tabs ".concat(this.state.activeBottomTab === "Privacy" ? "active": "" )} onClick={this.toggleBottomTabsHandler.bind(this,"Privacy")} >Privacy</a>
                    <img onClick = {()=>{this.props.closeModal()}} className="ml-auto close-img" src={closeIcon}/>
                </div>
               
                <div className="form-group form-content">
                    <div className="mt-3">
                       {this.state.activeBottomTab === "Terms" ? 
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                            sed do eiusmod tempor incididunt ut labore et dolore 
                            magna aliqua. Ut enim ad minim veniam, quis nostrudexercitation 
                            ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                            Duis aute irure dolor in reprehenderit in voluptate velit 
                            esse cillum dolore eu fugiat nulla pariatur. Excepteur sint 
                            occaecat cupidatat non proident, sunt in culpa qui officia
                            deserunt mollit anim id est laborum.
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                            sed do eiusmod tempor incididunt ut labore et dolore 
                            magna aliqua. Ut enim ad minim veniam, quis nostrudexercitation 
                            ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                            Duis aute irure dolor in reprehenderit in voluptate velit 
                            esse cillum dolore eu fugiat nulla pariatur. Excepteur sint 
                            occaecat cupidatat non proident, sunt in culpa qui officia
                            deserunt mollit anim id est laborum.
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                            sed do eiusmod tempor incididunt ut labore et dolore 
                            magna aliqua. Ut enim ad minim veniam, quis nostrudexercitation 
                            ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                            Duis aute irure dolor in reprehenderit in voluptate velit 
                            esse cillum dolore eu fugiat nulla pariatur. Excepteur sint 
                            occaecat cupidatat non proident, sunt in culpa qui officia
                            deserunt mollit anim id est laborum.
                        </p>
                        
                        :
                        <p>                           
                            consectetur adipisicing elit,
                            sed do eiusmod tempor incididunt ut labore et dolore 
                            magna aliqua. Ut enim ad minim veniam, quis nostrudexercitation 
                            ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                            Duis aute irure dolor in reprehenderit in voluptate velit 
                            esse cillum dolore eu fugiat nulla pariatur. Excepteur sint 
                            occaecat cupidatat non proident, sunt in culpa qui officia
                            deserunt mollit anim id est laborum.
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                            sed do eiusmod tempor incididunt ut labore et dolore 
                            magna aliqua. Ut enim ad minim veniam, quis nostrudexercitation 
                            ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                            Duis aute irure dolor in reprehenderit in voluptate velit 
                            esse cillum dolore eu fugiat nulla pariatur. Excepteur sint 
                            occaecat cupidatat non proident, sunt in culpa qui officia
                            deserunt mollit anim id est laborum.
                        </p>
                        }
                    </div>
                </div>
                <div className="form-group privacy-accept-btn ">
                    <button onClick = {()=>{this.props.closeModal()}}  className="px-5 btn" type="submit">
                        <span className="font-weight-bold">Accept</span>
                    </button>
                </div>   
            </form>
        </div>
                
        
            </div>
            
        </div>
    </div>
    );
  }
}

export default TermAndPrivacy;

