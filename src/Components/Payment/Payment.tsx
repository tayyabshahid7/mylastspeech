import React from 'react';
import history from '../../utils/history';
import axios from 'axios';
import * as url from '../../utils/constant';
import TextField from '@material-ui/core/TextField';
import { BraintreeHostedFields } from 'braintree-web-react'


import './payment.scss';

interface PaymentProps {
    location?: any,
}
interface PaymentState {
    clientToken: string,
    accessCode: string,
    expiryDate:string,
    cardNo:string,
    cvc:string,
    email:string,
    activeTab:string,
}

class Payment extends React.Component<PaymentProps, PaymentState> {

    instance:any;
    state = {
        clientToken: '',
        accessCode: '',
        expiryDate:'',
        cardNo:'',
        cvc:'',
        email:'',
        activeTab:'card',
    }
    componentDidMount() {
        this.setState({
            clientToken:'xg4wf7szzxkfzk89'
        })
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

    async purchase() {
        debugger
        try {
          // Send nonce to your server
          const { nonce } = await this.instance.tokenize()

          const response = await axios.post(
            'http://localhost:8000/api/braintree/v1/sandbox',
            { paymentMethodNonce: nonce }
          )
     
          console.log(response)
        } catch (err) {
          console.error(err)
        }
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
                            <div className="anchor-links pt-4 pb-4">
                                <a onClick={()=>{this.setState({activeTab:"card"})}} className={this.state.activeTab === "card" && "activeTab"} href="#">Card</a>
                                <a onClick={()=>{this.setState({activeTab:"paypal"})}} className={"ml-3 ".concat(this.state.activeTab === "paypal" && "activeTab")} href="#">Paypal</a>
                            </div>
                            <div className="container">
                <BraintreeHostedFields
                    className="drop-in-container"
                    options={{
                    authorization: this.state.clientToken
                    }}
                    onInstance={(instance) => (this.instance = instance)}
                >
            <form id="cardForm">
              <label className="hosted-fields--label">Card Number</label>
              <div id="card-number" className="hosted-field"></div>
 
              <label className="hosted-fields--label">Expiration Date</label>
              <div id="expiration-date" className="hosted-field"></div>
 
              <label className="hosted-fields--label">CVV</label>
              <div id="cvv" className="hosted-field"></div>
 
              <label className="hosted-fields--label">Postal Code</label>
              <div id="postal-code" className="hosted-field"></div>
            </form>
          </BraintreeHostedFields>
          <button className="submit" onClick={this.purchase.bind(this)}>Submit</button>
        </div>
                            {/* <BraintreeHostedFields
                                className="drop-in-container"
                                options={{
                                authorization: this.state.clientToken
                                }}
                                onInstance={(instance) => (this.instance = instance)}
                            >
                            <div className="form-group">
                                <TextField
                                    onChange={(event) => { that.setState({ email: event.target.value }) }}
                                    value={that.state.email}
                                    className='outlined-input-custom'
                                    label="Email"
                                    type="email"
                                    variant="outlined"
                                />
                            </div>
                            <div className="form-group">
                                <TextField
                                    onChange={(event) => { this.setState({ cardNo: event.target.value }) }}
                                    value={this.state.cardNo}
                                    className='outlined-input-custom'
                                    label="Card Number"
                                    type="number"
                                    variant="outlined"
                                />
                            </div>
                            <div className="col-6 float-left form-group p-0">
                                 <TextField
                                    onChange={(event) => { this.setState({ expiryDate: event.target.value }) }}
                                    value={this.state.expiryDate}
                                    className='outlined-input-custom'
                                    label="Expiry Date (mm/yy)"
                                    type="text"
                                    variant="outlined"
                                />
                            </div>
                            <div className="col-5 float-right form-group p-0 ">
                             <TextField
                                    onChange={(event) => { this.setState({ cvc: event.target.value }) }}
                                    value={this.state.cvc}
                                    className='outlined-input-custom'
                                    label="CVC"
                                    type="text"
                                    variant="outlined"
                                />
                            </div>
                            <div className="form-group custom-submit ">
                                <button onClick = {this.purchase.bind(this)} className="btn btnSubmit" type="submit">
                                      Pay £10.00 Now
                                </button>  
                            </div>
                            </BraintreeHostedFields> */}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Payment;

