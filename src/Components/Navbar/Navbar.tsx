import React from 'react';
import './navbar.scss';
import HeaderLogo from '../../assets/images/message.svg';
import SideNavBar from '../SideNavBar/SideNavBar';
import { Link } from 'react-router-dom';
import Search from '../Search/Search';

interface NavbarProps {
    signUpNavBar:boolean,
    signInNavBar:boolean,
    isRightBar:boolean,
}
interface NavbarState {
    isSignUp:boolean,
    isSignIn:boolean,
}



class Navbar extends React.Component<NavbarProps, NavbarState> {

    state = {
        isSignUp:false,
        isSignIn:false,
    }

    componentDidMount(){
        this.setState({
            isSignUp:this.props.signUpNavBar,
            isSignIn:this.props.signInNavBar
        });
    }
    componentWillReceiveProps(nextProps:any){
        this.setState({
            isSignUp:nextProps.signUpNavBar,
            isSignIn:nextProps.signInNavBar
        });
    }

    signUpHandler = (e:any) =>{
        this.setState({
            isSignUp:true,
        });
    }

    render() {
        return (
                !this.state.isSignUp && !this.state.isSignIn?
                    <nav className="navbar navbar-dark navbar-expand-md pl-0 pt-0 fixed-top">
                        <div className="container-fluid p-0">
                            <div className="form-search d-flex align-items-center justify-content-center " >
                                <Link to="/" className="pl-4 pl-md-0">
                                    <img src={HeaderLogo}/>
                                </Link>  
                                {/* <form action="#" className="ml-5">
                                    <div className="input-group rounded-pill  form-inner">
                                        <div className="input-group-prepend border-0">
                                            <button id="button-addon4" type="button" className="btn btn-link text-info"><i className="fa fa-search"></i></button>
                                        </div>
                                        <input type="search" placeholder="Search" aria-describedby="button-addon4" className="form-control bg-none border-0 custom-input" />
                                      
                                    </div>
                                </form> */}
                                <Search/>
                           
                            </div>
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault"
                                aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarsExampleDefault">
                                <ul className="navbar-nav ml-auto mr-5">
                                    <li className="mr-5 nav-item ">
                                        <Link to = "/signup"  className="nav-link">Sign up </Link>
                                    </li>
                                    <li className="ml-3 nav-item">
                                        <Link to = "/signin" className="nav-link" >login</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        
                    </nav>  
                    
                :
                    <nav className="navbar navbar-dark navbar-expand-md pl-0 pt-0">
                        <div className="container-fluid p-0">
                            <div className="form-search-login d-flex align-items-center justify-content-center fixed-top" >
                                <Link to="/">
                                    <img src={HeaderLogo}/>
                                </Link>                          
                            </div>
                            {!this.state.isSignUp && this.state.isSignIn?
                                <div className="collapse navbar-collapse" id="navbarsExampleDefault">
                                    <ul className="navbar-nav ml-auto mr-5 mt-5">
                                        <li className="nav-item ">
                                            <Link to = "/signup" className="nav-link" href="signup.html">Don’t have an account? &nbsp;&nbsp; <span>Sign up</span> </Link>
                                        </li>
                                    </ul>
                                </div>
                                :this.state.isSignUp && !this.state.isSignIn?
                                <div className="collapse navbar-collapse" id="navbarsExampleDefault">
                                    <ul className="navbar-nav ml-auto mr-5 mt-5">
                                        <li className="nav-item ">
                                            <Link to = "/signin"  className="nav-link" href="login.html">Already have an account? &nbsp; &nbsp;<span>Login</span> </Link>
                                        </li>
                                    </ul>
                                </div>
                                :
                                this.state.isSignUp && this.state.isSignIn && this.props.isRightBar ?
                                <div className="collapse navbar-collapse user-dash" id="navbarsExampleDefault">
                                    <ul className="navbar-nav ml-auto mr-5 mt-3">
                                        <li className="nav-item ">
                                             <SideNavBar/>
                                        </li>
                                    </ul>
                                </div>
                              :null
                            }
                        </div>
                    </nav>
                
        );
    }
}


export default Navbar;

