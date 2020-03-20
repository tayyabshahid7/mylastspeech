import React, { Component } from 'react';
import 'braintree-web';
import axios from 'axios';
import DropIn from 'braintree-web-drop-in-react';
import * as url from '../../utils/constant';
import history from '../../utils/history';

interface BrainTreeProps {
  userData: any,
}
interface BrainTreeState {
  clientToken: string,
}

class BrainTree extends React.Component<BrainTreeProps, BrainTreeState>  {
  instance;

  state = {
    clientToken: null,
    email:''
  };

  async componentDidMount() {
    await axios.get(url.getPaymentAccessTokenUrl)
        .then((response) => {
            let data = response.data.braintree_client_token;
            this.setState({
              clientToken:data,     
            });
        })
        .catch((error) => {
            
        })
        .finally( () => {
        // always executed
    }); 


   
  }

  async buy() {
    
    const { nonce } = await this.instance.requestPaymentMethod();
    await axios.post(url.getPaymentAccessTokenUrl, {
      close_contact_email:this.props.userData['close_contact_email'],
      user_id:this.props.userData['id'],
      paymentMethodNonce:nonce,
    })
    .then((response) => {
      debugger;
        if(response.data.success_status){
          history.push({
              pathname: '/userspeech',
              state: this.props.userData
          });
        }    
    })
    .catch((error) => {
      
    })
    .finally( () => {
    });   
    
  }

  render() {
    if (!this.state.clientToken) {
      return (
        <div>
          <h4>Loading...</h4>
        </div>
      );
    } else {
      return (
        <div>
          <DropIn
            options={{
              authorization: this.state.clientToken,
              paypal: { amount: 10.00, currency: 'USD',flow:'checkout' } 
            }}
            onInstance={(instance) => (this.instance = instance)}
          />
          <div className="form-group custom-submit ">
                <button onClick = {this.buy.bind(this)} className="btn btnSubmit" type="submit">
                      Pay £10.00 Now
                </button>  
          </div>
        </div>
      );
    }
  }
}

export default BrainTree;