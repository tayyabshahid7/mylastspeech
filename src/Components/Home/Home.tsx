import React from 'react';
import './home.scss';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ShortTextLogo from '../../assets/images/short_text.svg';
import SearchLogo from '../../assets/images/search-large.svg';
import LockLogo from '../../assets/images/lock.svg';
import OfflineLogo from '../../assets/images/offline_pin.svg';
import ArrowBackLogo from '../../assets/images/arrow_back.svg';
import HeartLogo from '../../assets/images/Ei-heart.svg';
import TermAndPrivacy from '../TermAndPrivacy/TermAndPrivacy';
import { Link } from 'react-router-dom';
import history from '../../utils/history';
import CookiesPolicy from '../CookiesPolicy/CookiesPolicy';


interface HomeProps {

}
interface HomeState {
    email:string,
    cookiesAgreed:boolean,
    showCookiesModal:boolean,
    showPrivacyModal:boolean,
}

class Home extends React.Component<HomeProps, HomeState> {
    state = {
        email:'',
        cookiesAgreed:false,
        showCookiesModal:false,
        showPrivacyModal:false,
    }
    componentDidMount() {
        AOS.init({
            // initialise with other settings
            duration: 1000
        });
        try {
            let temp = localStorage.getItem("cookiesAgreed");
            if(temp === "1"){
                this.setState({
                    cookiesAgreed:true
                })
            }
        }catch{

        }
    }

    goToSignUp = () =>{
        history.push({
            pathname : '/signup',
            state: { email: this.state.email }
        })
    }

    showCookiesModal = () =>{
        this.setState({showCookiesModal:true})
    }

    mailTo=(e:any)=>{
        window.location.href = `mailto:brad@acidtestdesign.com`;
    }

    acceptCookies = (e) => {
        this.setState({
          cookiesAgreed:true
        });
        localStorage.setItem('cookiesAgreed',"1")
    }

    render() {
        let user = localStorage.getItem('user');
        user = user && JSON.parse(user);
        let token = localStorage.getItem('userToken');
        return (
            <div id="home" style={{minWidth:"100% !important",overflow:"hidden",width: "100% !important"}}>
                <div className="banner-section container d-flex  justify-content-center mb-0">
                    <div className="text-center custom-banner funeral-text pt-md-5 mt-md-5">
                        <div data-aos="fade-up" className = "d-flex flex-column flex-md-row align-content-center align-items-center col-12  justify-content-between">
                            <div className = "col-md-6 col-12">
                                <h1 className="main-text text-md-right"  >What would you <br/> say at your <br/> funeral?</h1>
                                </div>
                            <div  className = "col-md-6 col-12">
                                <p className="d-flex mb-0 para-text pb-3 text-left text-light">Turn a sad occasion into a celebration of life. Take a few moments to start your last speech now.</p>
                                {token!="" && user ? '':  
                                <button  className="position-relative btn-funeral btn btn-custom d-flex justify-content-center align-items-center">
                                    <Link  to="/signup">Create a Free Account  
                                     <i className="pl-2 fa fa-long-arrow-right custom-animate" aria-hidden="true"></i>
                                    </Link>
                                  
                                </button>
                                }
                            </div >
                            
                        </div>
                     
                    </div>
                </div>

                <div className="container-fluid">
                    <div className="row background-images">
                        <div className="col-12 col-md-6 left-section position-relative">
                            <div className="col-3 first-div"></div>
                            <div className="col-3 second-div"></div>
                        </div>
                        <div className={"align-items-baseline cookies-popup  justify-content-center py-2 ".concat(this.state.cookiesAgreed ? "d-none": "d-flex" )}>
                            <p className="mb-0 ml-3 mr-4">
                                 Our site uses Cookies.  <a style={{zIndex:9999}} onClick = {this.showCookiesModal.bind(this)}>Learn more </a>
                            </p>
                           
                             <button onClick = {this.acceptCookies.bind(this)} className="mr-2 btn btn-custom d-flex justify-content-center align-items-center">
                                Got it                          
                            </button>
                        </div>
                        <div className="col-12 col-md-6 right-section p-0">
                            <div className="right-img position-relative"></div>
                        </div>
                    </div>
                    <div className="container work-section">
                        <div className="row">
                            <div className="col-12 d-flex justify-content-center ml-md-4">
                                <div className="col-12 card-custom" >
                                    <div className="card-section pt-5">
                                        <h2 data-aos="zoom-in">How it works</h2>
                                        {/* <p>My last speech allows you to write your own speech at your funeral that can be unlocked by your loved ones when you pass.</p> */}
                                    </div>
                                    <div className="container-fluid sidebar-image position-relative" data-aos="fade-right"
                                        data-aos-offset="300"
                                        data-aos-easing="ease-in-sine">
                                        {/* <div className="col-8 sidebar-image-background"></div> */}
                                        <div className="container side-by-side pt-5">
                                            <div className="row d-flex align-items-center ">
                                                <div className="col-12 col-lg-6 col-md-6 ml-auto mr-auto">
                                                    <div className="px-md-4 d-flex list-section mt-0" data-aos="fade-right">
                                                        <img src={ShortTextLogo} />
                                                        <p className="pl-md-5 pl-3" >You log in and write a few words about about your life, you can even link a song for the occasion.</p>
                                                    </div>
                                                    <div className="px-md-4 d-flex list-section" data-aos="fade-right" >
                                                        <img src={LockLogo} />
                                                        <p className="pl-md-5 pl-3">We lock it up and keep it safe for you. You can come back anytime to update or make changes as life goes on.</p>
                                                    </div>
                                                    <div className="px-md-4 d-flex list-section" data-aos="fade-right">
                                                        <img src={SearchLogo} />
                                                        <p className="pl-md-5 pl-3">When you’re gone, we notify your loved ones about your saved speech and grant them access so it can be read at your funeral service.</p>
                                                    </div>
                                                    <div className="px-md-4 d-flex list-section" data-aos="fade-right">
                                                        <img src={OfflineLogo} />
                                                        <p className="pl-md-5 pl-3">It’s your last chance to tell your friends and family everything you wanted to but didn’t, crack a joke, tell a story, or just say thanks to everyone for being there…</p>
                                                    </div>
                                                </div>
                                                {/* <div className="col-12 col-md-6 col-lg-6">
                                                    <div className="image-section" data-aos="fade-right"
                                                        data-aos-offset="300"
                                                        data-aos-easing="ease-in-sine">
                                                    </div>
                                                </div> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


              


                <div className="align-items-center container-fluid custom-upper d-flex" data-aos="zoom-in-up">
                    <div className="container upper-footer">
                        <div className="d-flex justify-content-around pl-5 row custom-upper-footer">
                            <div className="col-12 col-md-11">
                                <div className="col-12 ml-3 newsletter p-5 position-relative" data-aos="zoom-out-up">
                                    <h2 >Get Started</h2>
                                    <p >Nobody knows when our time is up, and all the things you wanted to <br />
                                        do or say could be lost forever, don’t let that happen, write a few words<br />
                                        now, and spread some love on your final day</p>
                                    <div className="email-box position-relative">
                                        <input type="text" 
                                        className="email-box__input" 
                                        onChange = {(e)=>{this.setState({email:e.target.value})}}
                                        placeholder="Enter Email Address" 
                                        value = {this.state.email}/>
                                        <button type="button" 
                                        onClick = {this.goToSignUp.bind(this)}
                                        className="d-flex email-box__button">
                                            <img src={ArrowBackLogo} />
                                        </button>
                                    </div>
                                    <div className="right-fixed" data-aos="zoom-out-down">
                                        <img src={HeartLogo} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container footer p-3">
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <div className="footer-list">
                                <ul className="d-flex mb-0">
                                    <li><a onClick = {(e)=>{e.preventDefault();this.setState({showPrivacyModal:true})}} href="#"> Legal</a></li>
                                    <li><a onClick={this.mailTo.bind(this)}>Contact us</a></li>
                                    {/* <li><a href="#">About</a></li> */}
                                </ul>
                            </div>
                        </div>
                        {/* <div className="col-12 col-md-6">
                            <div className="align-items-baseline copyright-section d-flex justify-content-end">
                                <h5>My Last Speech…</h5>
                                <p>Company info TBC TM tbc</p>
                            </div>
                        </div> */}
                    </div>
                </div>
                <CookiesPolicy 
                    showCookiesModal =  {this.state.showCookiesModal}
                    closeModal = {()=>{
                    this.setState({showCookiesModal:false});
                }}/>
                <TermAndPrivacy 
                    showPrivacyModal =  {this.state.showPrivacyModal}
                    closeModal = {()=>{
                    this.setState({showPrivacyModal:false});
                }}/>  
            </div>
        );
    }
}

export default Home;
