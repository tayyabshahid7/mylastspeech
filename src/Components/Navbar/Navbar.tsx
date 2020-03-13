import React from 'react';
import './navbar.scss';
import HeaderLogo from '../../assets/images/message-email.png';
import SideNavBar2 from '../SideNavBar/SideNavbar2/SideNavbar2';
import SideNavBar from '../SideNavBar/SideNavBar';
import { Link } from 'react-router-dom';
import Search from '../Search/Search';
import avatarImg from '../../assets/images/img_avatar.png';

interface NavbarProps {
    signUpNavBar:boolean,
    signInNavBar:boolean,
    isRightBar:boolean,
    profilePic:string,
}
interface NavbarState {
    isSignUp:boolean,
    isSignIn:boolean,
    img:string,
}



class Navbar extends React.Component<NavbarProps, NavbarState> {

    state = {
        isSignUp:false,
        isSignIn:false,
        img:'',
    }

    componentDidMount(){
        this.setState({
            isSignUp:this.props.signUpNavBar,
            isSignIn:this.props.signInNavBar
        });
        let user = localStorage.getItem('user');
        user = user && JSON.parse(user);
        user && user['profile_picture'] ?this.setState({img:user['profile_picture']}):this.setState({img:avatarImg});
    }
    
    componentWillReceiveProps(nextProps:any){
        if(nextProps?.profilePic != ""){
            let user = JSON.parse(localStorage.getItem('user'));
            if(user){
                user['profile_picture'] = nextProps?.profilePic;
                localStorage.setItem('user',JSON.stringify(user));
                this.setState({
                    img:nextProps?.profilePic,
                });     
            }     
        }
        this.setState({
            isSignUp:nextProps.signUpNavBar,
            isSignIn:nextProps.signInNavBar,
        });
    }

    signUpHandler = (e:any) =>{
        this.setState({
            isSignUp:true,
        });
    }

    render() {
        let token = localStorage.getItem('userToken');
        let user = localStorage.getItem('user');
        user = user && JSON.parse(user);
        // let img = user && user['profile_picture'] ?this.setState({img:user['profile_picture']}):this.setState({img:avatarImg});
        return (
                !this.state.isSignUp && !this.state.isSignIn?
                    <nav className="navbar navbar-dark navbar-expand-md pl-0 pt-0 fixed-top">
                        <div className="container-fluid p-0">
                            <div className="form-search d-flex align-items-center justify-content-center " >
                                <Link to="/" >
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
                            <li className="nav-item hamburger-icon d-none">
                                <SideNavBar img = {this.state.img} />
                            </li>
                            <div className="collapse navbar-collapse item-navbar justify-content-end" id="navbarsExampleDefault">
                               {token!="" && user ? 
                               <Link to="/dashboard">
                                    <img style={{width:"50px",borderRadius:"50%"}} src = {this.state.img}/>
                               </Link>
                               :
                                 <ul className="navbar-nav ml-auto mr-5">
                                    <li className="mr-5 nav-item ">
                                        <Link to = "/signup"  className="nav-link">Sign up </Link>
                                    </li>
                                    <li className="ml-3 nav-item">
                                        <Link to = "/signin" className="nav-link" >login</Link>
                                    </li>
                                </ul>
                               }
                              
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
                                             <SideNavBar2/>
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

