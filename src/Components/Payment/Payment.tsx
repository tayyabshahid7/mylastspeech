import React from 'react';
import axios from 'axios';
import * as url from '../../utils/constant';
import TextField from '@material-ui/core/TextField';
import BrainTree from './BrainTree';

import './payment.scss';

interface PaymentProps {
    location?: any,
}
interface PaymentState {
    accessCode: string,
    email:string,
    userObj:object
}

class Payment extends React.Component<PaymentProps, PaymentState> {

    instance:any;
    state = {
        accessCode: '',
        email:'',
        userObj:{}
    }
    componentDidMount() {
        let name: string =this.props.location.state['name'];
        name = name.toUpperCase();
        let data = {
            name:name,
            image:this.props.location.state['image'],
            id:this.props.location.state['id'],
            close_contact_email:this.props.location.state['close_contact_email']
        }
        this.setState({
            userObj:data,
        });
    }
    
    submitCode = (e: any) => {
        e.preventDefault();
        axios.post(url.confirmCodeUrl, {

        }).then((response) => {

        })
        .catch((error: any) => {
            console.log(error.response.data);
        })
        .finally(() => {

        });
    }

 
    render() {
        let that = this;
        return (
            <div id="payment" >
                 
                <div className="container card-container payment-container mt-5">
                    <div className="align-items-center d-flex justify-content-center row custom-profile">
                        <div className=" col-lg-6 card-profile payment-card p-4 ">
                            <h5 className="pt-4 mb-0" ><b>Success, juts one more thing…</b></h5>
                            <p className="mt-5 mb-4">To help this site run we ask that you make a contribution, you will
                                only need to make this payment once.<br/>
                                If you have accessed this page before you should have received a
                                code by email which you can use to view it again.</p>
                           
                            <div className="">
                                <p className="mb-0"></p>
                                <TextField
                                    onChange={(event) => { this.setState({ accessCode: event.target.value }) }}
                                    value={this.state.accessCode}
                                    className='outlined-input-custom'
                                    label="Access code"
                                    type="txt"
                                    variant="outlined"
                                />
                            </div>
                            {/* <div className="anchor-links pt-4 pb-4">
                                <a onClick={()=>{this.setState({activeTab:"card"})}} className={this.state.activeTab === "card" && "activeTab"} href="#">Card</a>
                                <a onClick={()=>{this.setState({activeTab:"paypal"})}} className={"ml-3 ".concat(this.state.activeTab === "paypal" && "activeTab")} href="#">Paypal</a>
                            </div> */}
                            <div className="container mt-3 pl-1">
                                <BrainTree userData = {this.state.userObj}/>
                            </div>
                           
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Payment;

