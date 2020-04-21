import React from "react";
import "./sidenavbar.scss";
import Hambuger from '../../assets/images/hamburger.svg';
import { Link } from 'react-router-dom';
import TermAndPrivacy from '../TermAndPrivacy/TermAndPrivacy';

interface SideNavBarProps {
  img:any,
}
interface SideNavBarState {
  showPrivacyModal:boolean,
  showNav:boolean
}

class SideNavBar extends React.Component<SideNavBarProps,SideNavBarState> {
  state = {
      showNav: false,
      showPrivacyModal: false,
  }

  openNavClick = (e:any) => {
    e.preventDefault()
    this.openNav()
  }

  closeNavClick = (e:any)  => {
    e.preventDefault()
    this.closeNav()
  }

  openNav = () => {
    this.setState({
      showNav: true
    })

    document.addEventListener("keydown", this.handleEscKey)
  }
  closeNav = () => {
    this.setState({
      showNav: false
    })

    document.removeEventListener("keydown", this.handleEscKey)
  }

  handleEscKey = (e:any)  => {
    if (e.key === "Escape") {
      this.closeNav()
    }
  }

  mailTo=(e:any)=>{
    window.location.href = `mailto:brad@acidtestdesign.com`;
  }

  render() {
    const { showNav } :any= this.state
    let navCoverStyle = { width: showNav ? "100%" : "0" }
    let sideNavStyle = { opacity: showNav ? "1" : "0" }
    let user = JSON.parse(localStorage.getItem('user'));

    return (
      <div id="side-navbar1">
        {!showNav && 
          <span onClick={this.openNavClick} className="open-nav">
          <img src = {Hambuger}></img>
          </span>
        } 
          <div className={"side-nav hamburger-icon d-flex ".concat( showNav && "visible")} style={sideNavStyle}> 
              
              <div  className="first-section"></div>
              <div className="second-section">
                <a href="#" onClick={this.closeNavClick} className="close-nav">
                    &times;
                  </a>
                  <div>
                      {user ?
                      <div className="align-items-center d-flex profile-pic">
                        <Link to="/dashboard">
                          <img style={{height:"50px",objectFit:"cover",width:"50px",borderRadius:"50%"}} src = {this.props.img}/>
                        </Link>
                          <p
                          style={{ color: "white", flexDirection: "column" }}
                          className="d-flex m-0 p-0"
                        >
                          Tayyab
                          <Link to = "/dashboard" style={{cursor:"pointer",fontSize: 12, whiteSpace: "pre", padding: 0, opacity: "0.8" }}>
                            View Speech
                          </Link>
                        </p>
                      </div>
                       
                      :
                      <div>
                          <Link className="link-design" to="/signup">Sign up </Link>
                          <Link className="link-design" style={{borderTop:0}} to="/signin">Login</Link>
                      </div>
                
                      }
                    
                  </div>
                  <div className="position-absolute" style={{bottom:0}}>
                      <a onClick={this.mailTo.bind(this)}>Contact Us </a>
                      <a onClick = {()=>{this.setState({showPrivacyModal:true})}}>Legal</a>
                  </div> 
                  <TermAndPrivacy 
                    showPrivacyModal = {this.state.showPrivacyModal}
                    closeModal = {()=>{
                    this.setState({showPrivacyModal:false});
                  }}/>                 
              </div>
             <div>

             </div>
            
          </div>
    
      </div>
    )
  }
}

export default SideNavBar;
