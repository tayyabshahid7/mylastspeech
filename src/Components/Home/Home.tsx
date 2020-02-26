import React from 'react';
import './home.scss';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ShortTextLogo from '../../assets/images/short_text.svg';
import SearchLogo from '../../assets/images/search-large.svg';
import EyeLogo from '../../assets/images/remove_red_eye.svg';
import OfflineLogo from '../../assets/images/offline_pin.svg';
import ArrowBackLogo from '../../assets/images/arrow_back.svg';
import HeartLogo from '../../assets/images/Ei-heart.svg';
import { Link } from 'react-router-dom';
import history from '../../utils/history';


interface HomeProps {

}
interface HomeState {
    email:string,
    cookiesAgreed:boolean,
}

class Home extends React.Component<HomeProps, HomeState> {
    state = {
        email:'',
        cookiesAgreed:false,
    }
    componentDidMount() {
        AOS.init({
            // initialise with other settings
            duration: 500
        });
    }

    goToSignUp = () =>{
        history.push({
            pathname : '/signup',
            state: { email: this.state.email }
        })
    }

    render() {
        let user = localStorage.getItem('user');
        user = user && JSON.parse(user);
        let token = localStorage.getItem('userToken');
        return (
            <div id="home">
                <div className="banner-section container d-flex justify-content-center mb-0">
                    <div className="text-left custom-banner">
                        <h1 className="mt-5" data-aos="fade-up" >It’s your<br /> Funeral</h1>
                        <p className="d-flex m-auto pb-4 pt-4 text-left text-light">Funerals are sad times, especially when it’s your own.<br /> Take a few moments to Write your last speech now.</p>
                        {token!="" && user ? '':  
                        <button className="btn btn-custom d-flex justify-content-center align-items-center">
                              <Link to="/signup">Create a Free Account</Link>
                            <i className="pl-2 fa fa-long-arrow-right" aria-hidden="true"></i>
                        </button>
                        }
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
                                 Our site uses Cookies. <a>Learn more </a>
                            </p>
                             <button onClick = {()=>{this.setState({cookiesAgreed:true})}} className="btn btn-custom d-flex justify-content-center align-items-center">
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
                                <div className="col-2 hidden-mobile"></div>
                                <div className="col-12 col-md-4 card-custom" data-aos="zoom-in">
                                    <div className="card-section">
                                        <h2>How it works…</h2>
                                        <p>My last speech allows you to write your<br /> own speech at your funeral that can be<br />unlocked by your loved ones when you<br /> pass.</p>
                                    </div>

                                </div>
                                <div className="col-3 hidden-mobile"></div>
                            </div>
                        </div>
                    </div>
                </div>



                <div className="container-fluid sidebar-image position-relative" data-aos="fade-right"
                    data-aos-offset="300"
                    data-aos-easing="ease-in-sine">
                    <div className="container side-by-side pt-5">
                        <div className="row d-flex align-items-center">
                            <div className="col-12 col-md-6 col-lg-6">
                                <div className="d-flex justify-content-around list-section" data-aos="fade-left">
                                    <img src={ShortTextLogo} />
                                    <p >You log in and write your last<br />speech, you can even link your <br />favourite song</p>
                                </div>
                                <div className="d-flex justify-content-around list-section" data-aos="fade-right" >
                                    <img src={EyeLogo} />
                                    <p>We save them and encrypt them.<br /> You can come back anytime to<br /> update or make amendments as<br /> life goes on.</p>
                                </div>
                                <div className="image-section-mobile" data-aos="fade-right"
                                    data-aos-offset="300"
                                    data-aos-easing="ease-in-sine">
                                </div>
                                <div className="d-flex justify-content-around list-section" data-aos="fade-left">
                                    <img src={SearchLogo} />
                                    <p>When you’re gone, we notify your<br /> loved ones about your saved speech <br />and grant them access</p>
                                </div>
                                <div className="d-flex justify-content-around list-section" data-aos="fade-right">
                                    <img src={OfflineLogo} />
                                    <p>It’s your last chance to tell your <br />friends and family everything<br /> you wanted to but didn’t, Crack a <br />joke or just say thanks for being <br />there…</p>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 col-lg-6">
                                <div className="image-section" data-aos="fade-right"
                                    data-aos-offset="300"
                                    data-aos-easing="ease-in-sine">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="align-items-center container-fluid custom-upper d-flex" data-aos="zoom-in-up">
                    <div className="container upper-footer">
                        <div className="d-flex justify-content-around pl-5 row custom-upper-footer">
                            <div className="col-12 col-md-9">
                                <div className="col-12 ml-3 newsletter p-5 position-relative" data-aos="zoom-out-up">
                                    <h2 >Create your last speech now</h2>
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
                                    <li><a href="#"> Legal</a></li>
                                    <li><a href="#">Contact us</a></li>
                                    <li><a href="#">About</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="align-items-baseline copyright-section d-flex justify-content-end">
                                <h5>My Last Speech…</h5>
                                <p>Company info TBC TM tbc</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
