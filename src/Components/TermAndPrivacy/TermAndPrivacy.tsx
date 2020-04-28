import React from 'react';
import closeIcon from '../../assets/images/close.svg'
 import './termandprivacy.scss';
import { Link } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

interface TermAndPrivacyProps {
    closeModal():any,
    showPrivacyModal:boolean,
}
interface TermAndPrivacyState {
    showPrivacyModal:boolean,
}




class TermAndPrivacy extends React.Component<TermAndPrivacyProps, TermAndPrivacyState> {

state = {
   
    showPrivacyModal:false,
}

componentWillReceiveProps(nextProps:any){
    this.setState({
        showPrivacyModal:nextProps.showPrivacyModal
    });
}
toggleModal = () => {
    this.setState({
        showPrivacyModal:false,
    });
    this.props.closeModal();
}

render() {

 return (
    <div id="termandprivacy" className="mb-5">
        <Modal className = {"privacy-modal"} isOpen={this.state.showPrivacyModal} toggle={this.toggleModal.bind(this)}>
                <ModalHeader  toggle={()=>{this.setState({showPrivacyModal:false,})}}>
                    
                </ModalHeader>
                <ModalBody className="col-12 pt-0 m-auto">
                    <div className="col-md-8 col-12 ml-auto">
                        <span className="font-weight-bold px-4">Privacy and Terms</span>
                        <p className="mb-0 font-weight-bold pt-3 px-4">What information do we collect?</p>
                        <p className="mb-0 para-text  col-md-9 col-12  pt-3 px-4">
                            We collect your personal data and other information when you 
                            make a purchase, use or register into our products and services 
                            (including navigation.com stores, which are branded by Original 
                            Equipment Manufacturers (“OEMs”) and operated by us), 
                            take part in campaigns or research or otherwise interact 
                            with us. This includes following categories:
                        </p>
                        <p className="mb-0 font-weight-bold pt-3 px-4"> Product and service activations</p>
                        <p className="mb-0 para-text  col-md-9 col-12  pt-3 px-4">
                        ATD products and services may require electronic activation, 
                        where your device and application type, as well as unique device, 
                        application, network and subscription identifiers are sent to ATD.
                        </p>

                        <p className="mb-0 font-weight-bold pt-3 px-4">Use of products and services</p>
                        <p className="mb-0 para-text  col-md-9 col-12  pt-3 px-4">
                            When you access our services online, our web servers automatically create records of
                            your visit. These records typically include IP-address, access times, the sites linked
                            from, pages visited, the links and features used, the content viewed or requested, 
                            browser or application type, language and other such information. See also our Cookie 
                            policy.
                        </p>
                        <p className="mb-0 para-text  col-md-9 col-12  pt-3 px-4">
                            Our applications may contact our servers periodically, for example to check for 
                            updates or to send us information relating to service usage. Additionally, 
                            we may invite you to join voluntary product and service improvement or research 
                            programs where detailed information is collected. See Supplements to this Policy 
                            for more details.
                        </p>

                        <p className="mb-0 font-weight-bold pt-3 px-4">Information you provide us with</p>
                        <p className="mb-0 para-text  col-md-9 col-12  pt-3 px-4">
                            When you create an account, make a purchase, request services, 
                            participate in research or campaigns or otherwise interact with us,
                            we may ask for information such as your name, email address, phone 
                            number, street address, user names and passwords, feedback, 
                            information relating to your devices, age, gender, and language, 
                            bank account number, credit card details and other such financial
                            information.
                        </p>
                        <p className="mb-0 para-text  col-md-9 col-12  pt-3 px-4">
                            We also maintain records of your consents, preferences and settings relating to, 
                            for example, location data, marketing and sharing of personal data.
                        </p>
                        <p className="mb-0 font-weight-bold pt-3 px-4">Your transactions with us</p>
                        <p className="mb-0 para-text  col-md-9 col-12  pt-3 px-4">
                            We maintain records of your purchases, downloads, the content 
                            you have provided us with, your requests, agreements between you 
                            and ATD, the products and services provided to you, payment 
                            and delivery details, your contacts and communications and 
                            other interactions with us. We may, in accordance with applicable 
                            law, record your communication with our customer care or with other 
                            such contact points.

                        </p>
                        <p className="mb-0 font-weight-bold pt-3 px-4">
                            Information provided by partners
                        </p>
                        <p className="mb-0 para-text  col-md-9 col-12  pt-3 px-4">
                            We obtain information from industry partners and a variety of 
                            other sources, including publicly available sources such as 
                            business registries. We require these sources to comply with 
                            applicable laws with regard to collecting and transferring this 
                            data to us, including ensuring that there is a legal basis for 
                            the transfer or anonymizing the data in accordance with applicable 
                            laws prior to disclosure of the data to us.
                        </p>

                        <p className="mb-0 font-weight-bold pt-3 px-4">
                            Why do we process Personal Data?
                        </p>
                        <p className="mb-0 para-text  col-md-9 col-12  pt-3 px-4">
                            ATD may process your personal data for the following purposes. One or more purposes may apply simultaneously.
                        </p>

                        <p className="mb-0 font-weight-bold pt-3 px-4">
                            Providing products and services
                        </p>
                        <p className="mb-0 para-text  col-md-9 col-12  pt-3 px-4">
                            We may use your personal data to provide you with our products 
                            and services, to process your requests or as otherwise may be 
                            necessary to perform the contract between you and ATD, to 
                            ensure the functionality and security of our products and 
                            services, to identify you as well as to prevent and investigate
                            fraud and other misuses.
                        </p>

                        <p className="mb-0 font-weight-bold pt-3 px-4">
                            Accounts
                        </p>
                        <p className="mb-0 para-text  col-md-9 col-12  pt-3 px-4">
                            Some services may require an account to help you manage your 
                            content and preferences. Depending on the service, an 
                            account creation may be either required or voluntary. 
                            Account creation requires you to provide us with basic 
                            contact details about yourself, such as name, email address, 
                            country of residence and date of birth. You may also be able 
                            to voluntarily provide more information about yourself while 
                            creating a profile, such as a photo or avatar of your choice.
                        </p>

                        <p className="mb-0 font-weight-bold pt-3 px-4">
                            Developing and managing products and services
                        </p>
                        <p className="mb-0 para-text  col-md-9 col-12  pt-3 px-4">
                            We may use your personal data to develop and manage our 
                            products, services, customer care, sales and marketing. 
                            We may combine personal data collected in connection with 
                            your use of a particular ATD product and/or service with other
                            personal data we may have about you, unless such personal data 
                            was collected for a purpose, where the original purpose is 
                            incompatible with this purpose.
                        </p>

                        <p className="mb-0 font-weight-bold pt-3 px-4">
                            Communicating with you
                        </p>
                        <p className="mb-0 para-text  col-md-9 col-12  pt-3 px-4">
                            We may use your personal data to communicate with you, 
                            for example to inform you that our services have changed 
                            or to send you critical alerts and other such notices 
                            relating to our products and/or services and to contact you 
                            for customer care related purposes.
                        </p>

                        <p className="mb-0 font-weight-bold pt-3 px-4">
                            Marketing, advertising and making recommendations
                        </p>
                        <p className="mb-0 para-text  col-md-9 col-12  pt-3 px-4">
                            We may contact you to inform you of new products, 
                            services or promotions we may offer and to conduct 
                            market research when we have your consent or it is 
                            otherwise allowed. We may use your personal data to 
                            personalize our offering and to provide you with more 
                            relevant services, for example, to make recommendations 
                            and to display customized content and advertising in our 
                            services. This may include displaying ATD and third party content.
                        </p>

                        <p className="mb-0 font-weight-bold pt-3 px-4">
                            Others
                        </p>
                        <p className="mb-0 para-text  col-md-9 col-12  pt-3 px-4">
                            We will contact accounts you provide as part of our service,
                            this is to inform them that the service has been accessed
                            by you and your data is available for them to access. 
                            There is no way to prevent this as this is how the product operates. 
                            It is your responsibility to ensure that these accounts you provide are
                            happy to be contacted by us. They can opt out at any time.
                        </p>

                        <p className="mb-0 font-weight-bold pt-3 px-4">
                            What is our legal basis for processing your Personal Data?
                        </p>
                        <p className="mb-0 para-text  col-md-9 col-12  pt-3 px-4">
                            Our legal basis for processing your personal data is dependent 
                            on the purpose for processing and may vary as described in 
                            the Supplement applicable to the product or service you are using.
                            In general, we process your personal data under the following 
                            legal bases:
                        </p>

                        <p className="mb-0 font-weight-bold pt-3 px-4">
                            Performance of a contract with you
                        </p>
                        <p className="mb-0 para-text  col-md-9 col-12  pt-3 px-4">
                            We process your personal data to perform our obligations under 
                            the Service Terms applicable to the product or service you are 
                            using, provided by us or our customers.
                        </p>

                        <p className="mb-0 font-weight-bold pt-3 px-4">
                            Your consent
                        </p>
                        <p className="mb-0 para-text  col-md-9 col-12  pt-3 px-4">
                            We process your personal data if you have consented to the 
                            processing activity. You may revoke your consent at any time. 
                            Doing so will bar us from further processing of your personal 
                            data based on your consent, but will not impact the lawfulness 
                            of processing based on your consent before it was withdrawn. 
                            Some of the features of our products and services might be only 
                            available based on consent.
                        </p>

                        <p className="mb-0 font-weight-bold pt-3 px-4">
                            Legal obligations
                        </p>
                        <p className="mb-0 para-text  col-md-9 col-12  pt-3 px-4">
                            We process your personal data as needed to comply with laws 
                            and regulations.
                        </p>

                        <p className="mb-0 font-weight-bold pt-3 px-4">
                            Legitimate interests
                        </p>
                        <p className="mb-0 para-text  col-md-9 col-12  pt-3 px-4">
                            We process your personal data to further our legitimate interests,
                            such as in connection with managing, developing, testing, 
                            securing, and in limited circumstances marketing, advertising, 
                            and making recommendations regarding our products and services. 
                            Any such processing is conducted subject to appropriate measures 
                            to protect your fundamental rights and freedoms related to your 
                            personal data, and in any event will be subject to the restrictions 
                            provided in this Policy. Further information or specification of 
                            our legitimate interests may be provided in relevant Supplements 
                            applicable to the product or service.
                        </p>

                        <p className="mb-0 font-weight-bold pt-3 px-4">
                            How long do we retain Personal Data?
                        </p>
                        <p className="mb-0 para-text  col-md-9 col-12  pt-3 px-4">
                            We endeavor to only collect personal data that are necessary for 
                            the purposes for which they are collected, and to retain such
                            data for no longer than is necessary for such purposes. The length 
                            of time personal data is retained, and criteria for determining 
                            that time, are dependent on the nature of the personal data and 
                            the purpose for which it was provided. 
                            Do we share Personal Data?
                        </p>
                        <p className="mb-0 para-text  col-md-9 col-12  pt-3 px-4">
                            We do not sell, lease, rent or otherwise disclose your 
                            personal data to third parties unless otherwise stated below.
                        </p>

                        <p className="mb-0 font-weight-bold pt-3 px-4">
                            ATD companies and authorized third parties
                        </p>
                        <p className="mb-0 para-text  col-md-9 col-12  pt-3 px-4">
                            We may share your personal data with other ATD companies or 
                            authorized third parties who process personal data for ATD 
                            for the purposes described in this Policy. This may include 
                            for example billing through your network service provider or 
                            otherwise, delivery of your purchases, providing services including 
                            customer service, managing and analyzing consumer data, credit checks, 
                            conducting research and managing marketing and other such campaigns. 
                            When you purchase a ATD product from us with a network service provider 
                            plan, we may need to exchange information with your network service 
                            provider to provide you with such service.
                        </p>
                        <p className="mb-0 para-text  col-md-9 col-12  pt-3 px-4">
                            We may conduct joint marketing and other communications with our 
                            partners, for example your mobile operator. To avoid duplicate 
                            or unnecessary communications and to tailor the message to you 
                            we may need to match information that ATD has collected with 
                            information that the partner has collected where this is permitted 
                            by law.
                        </p>
                        <p className="mb-0 para-text  col-md-9 col-12  pt-3 px-4">
                            These authorized third parties are not permitted to use your 
                            personal data for any other purposes. We bind them contractually, 
                            require them to act consistently with this Policy and to use 
                            appropriate security measures to protect your personal data.
                        </p>

                        <p className="mb-0 font-weight-bold pt-3 px-4">
                            International transfers of personal data
                        </p>
                        <p className="mb-0 para-text  col-md-9 col-12  pt-3 px-4">
                            Our products and services may be provided using resources and 
                            servers located in various countries around the world. 
                            Therefore your personal data may be transferred across 
                            international borders outside the country where you use our 
                            services, including to countries outside the European Economic 
                            Area (EEA) that do not have laws providing specific protection 
                            for personal data or that have different legal rules on data 
                            protection
                        </p>

                        <p className="mb-0 font-weight-bold pt-3 px-4">
                            Mandatory disclosures
                        </p>
                        <p className="mb-0 para-text  col-md-9 col-12  pt-3 px-4">
                            We may be obligated by mandatory law to disclose your personal 
                            data to certain authorities or other third parties, for example, 
                            to law enforcement agencies in the countries where we or third 
                            parties acting on our behalf operate. We may also disclose and 
                            otherwise process your personal data in accordance with applicable 
                            law to defend ATD’s legitimate interests, for example, in legal 
                            proceedings or in connection with governmental requests and filings.
                        </p>

                        <p className="mb-0 font-weight-bold pt-3 px-4">
                            Mergers and Acquisitions
                        </p>
                        <p className="mb-0 para-text  col-md-9 col-12  pt-3 px-4">
                            If we decide to sell, buy, merge or otherwise reorganize our 
                            businesses in certain countries, this may involve us disclosing 
                            personal data to prospective or actual purchasers and their 
                            advisers, or receiving personal data from sellers and their advisers.
                        </p>

                        <p className="mb-0 font-weight-bold pt-3 px-4">
                            How do we address Data Quality?
                        </p>
                        <p className="mb-0 para-text  col-md-9 col-12  pt-3 px-4">
                            We take reasonable steps to keep the personal data we possess 
                            accurate and to delete incorrect or unnecessary personal data.
                        </p>
                        <p className="mb-0 para-text  col-md-9 col-12  pt-3 px-4">
                            We encourage you to access your personal data through your 
                            account from time to time to ensure that it is up to date.
                        </p>

                        <p className="mb-0 font-weight-bold pt-3 px-4">
                            What steps are taken to safeguard Personal Data?
                        </p>
                        <p className="mb-0 para-text  col-md-9 col-12  pt-3 px-4">
                            Privacy and security are key considerations in the creation 
                            and delivery of our products and services. We have assigned 
                            specific responsibilities to address privacy and security related 
                            matters. We enforce our internal policies and guidelines through
                            an appropriate selection of activities, including proactive and 
                            reactive risk management, security and privacy engineering, 
                            training and assessments. We take appropriate steps to address 
                            online security, physical security, risk of data loss and other 
                            such risks taking into consideration the risk represented by the 
                            processing and the nature of the data being protected. Also, we 
                            limit access to our data bases containing personal data to 
                            authorized persons having a justified need to access such 
                            information.
                        </p>

                        <p className="mb-0 font-weight-bold pt-3 px-4">
                            How do we use Cookies and Web Beacons?
                        </p>
                        <p className="mb-0 para-text  col-md-9 col-12  pt-3 px-4">
                            ATD uses cookies, web beacons and other similar technologies 
                            to operate and improve our websites and offerings. We also use 
                            cookies for personalization and to display ads. Some ATD websites 
                            use third party advertising technologies to serve ads.
                        </p>
                        <p className="mb-0 para-text  col-md-9 col-12  pt-3 px-4">
                            Our domains may include third party elements that set cookies 
                            on behalf of a third party, for example relating to third party 
                            social network. Please visit our Cookie policy to find out more 
                            about how ATD uses cookies and how you can disable cookies by 
                            browser settings or otherwise.
                        </p>

                        <p className="mb-0 font-weight-bold pt-3 px-4">
                            What are your rights?
                        </p>
                        <p className="mb-0 para-text  col-md-9 col-12  pt-3 px-4">
                            You have a right to know what personal data we hold about you, 
                            and to access it. You have a right to have incomplete, incorrect, 
                            unnecessary or outdated personal data updated. You have the right 
                            to request that your personal data be erased, and to obtain a copy 
                            of your data in a machine-readable format. You have the right to 
                            object to or restrict processing in certain circumstances, such as 
                            where you believe the data is inaccurate or the processing activity 
                            is unlawful. You have a right to unsubscribe from direct marketing 
                            messages and to request that we stop processing your personal data 
                            for direct marketing purposes or on other compelling legal grounds. 
                            However, if you opt-out from marketing and other communications from ATD, 
                            critical alerts may still be sent to you. If you are located in a European 
                            Union member state or within the European Economic Area, you have the 
                            right to lodge a complaint about our data collection and processing 
                            activities with the supervisory authority concerned.
                        </p>

                        <p className="mb-0 para-text  col-md-9 col-12  pt-3 px-4">
                        You may exercise your rights by contacting us or by managing your 
                        account and choices through available profile management tools on 
                        your device and our services. In some cases, especially if you wish 
                        us to delete or stop processing your personal data, this may also 
                        mean that we may not be able to continue to provide the services to 
                        you. Applicable data protection law may provide certain restrictions 
                        on the extent to which these rights may be exercised. If a 
                        restriction applies, we will respond to your request with an 
                        explanation of what action will be taken, to the extent required 
                        under applicable data protection law.
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

export default TermAndPrivacy;

