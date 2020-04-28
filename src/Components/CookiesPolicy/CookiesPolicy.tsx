import React from 'react';
import closeIcon from '../../assets/images/close.svg'
 import './cookiespolicy.scss';
import { Link } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

interface CookiesPolicyProps {
    closeModal():any,
    showCookiesModal:boolean,
}
interface CookiesPolicyState {
    showCookiesModal:boolean,
}

class CookiesPolicy extends React.Component<CookiesPolicyProps, CookiesPolicyState> {

state = {
    showCookiesModal:false,
}

componentWillReceiveProps(nextProps:any){
    this.setState({
        showCookiesModal:nextProps.showCookiesModal
    });
}

toggleModal = () => {
    this.setState({
        showCookiesModal:false,
    });
    this.props.closeModal();
}


render() {

 return (
    <div id="cookies-policy" className="mb-5">
        <Modal className = {"cookies-policy-modal"} isOpen={this.state.showCookiesModal} toggle={this.toggleModal.bind(this)}>
                <ModalHeader  toggle={()=>{this.setState({showCookiesModal:false,})}}>
                </ModalHeader>
                <ModalBody className="col-12 pt-0">
                    <div className="col-12">
                        <span className="font-weight-bold px-4">Cookies Policy</span>
                        <p className="mb-0 para-text col-12  pt-3 px-4">
                            We use cookies for cookie consent - namely to store your preferences
                            in relation to the use of cookies more generally (the cookie used for this purpose is: TMW_Accept_Cookies).
                        </p>
                        <p className="mb-0 para-text col-12 px-4">
                            Our service providers use cookies and those cookies may be stored on your computer when you visit our website.
                        </p>
                        <p className="mb-0 para-text col-12 px-4">
                            We use Google Analytics to analyse the use of our website. 
                            Google Analytics gathers information about website use by 
                            means of cookies. The information gathered relating to our 
                            website is used to create reports about the use of our website. 
                            Google’s privacy policy is available at: 
                            https://www.google.com/policies/privacy/. (The relevant cookies 
                            are: __utmz, __utma, __utmc, __cfduid, uvc, _ga, _gid, _gat, 
                            AMP_TOKEN, _gac_).
                        </p>
                        <p className="mb-0 para-text col-12  px-4">
                            Most browsers allow you to refuse to accept cookies and to delete 
                            cookies. The methods for doing so vary from browser to browser, 
                            and from version to version.
                        </p>
                        <p className="mb-0 para-text col-12  px-4">
                            Blocking all cookies will have a negative impact upon the 
                            usability of many websites.
                        </p>
                        <p className="mb-0 para-text col-12 px-4">
                            If you block cookies, you will not be able to use all the 
                            features on our website.
                        </p>
                    </div>
                </ModalBody> 
                <ModalFooter>
                    <button onClick = {this.toggleModal.bind(this)} className="btn update-btn">
                        Close
                    </button>    
                </ModalFooter>                      
        </Modal>
    </div>
    );
  }
}

export default CookiesPolicy;

