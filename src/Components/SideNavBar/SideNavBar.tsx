import React from "react";
import "./sidenavbar.scss";
import Hambuger from '../../assets/images/hamburger.svg';
import { Link } from 'react-router-dom';

interface SideNavBarProps {
  img:any,
}
interface SideNavBarState {
  
}

class SideNavBar extends React.Component<SideNavBarProps,SideNavBarState> {
  state = {
    state: {
      showNav: false
    }
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

  render() {
    const { showNav } :any= this.state
    let navCoverStyle = { width: showNav ? "100%" : "0" }
    let sideNavStyle = { opacity: showNav ? "1" : "0" }

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
                      <Link to="/dashboard" className = "mb-4">
                        <img style={{width:"50px",borderRadius:"50%"}} src = {this.props.img}/>
                      </Link>
                      <Link className="link-design" to="/signup">Sign up </Link>
                      <Link className="link-design" style={{borderTop:0}} to="/signin">Login</Link>

                  </div>
                  <div className="position-absolute" style={{bottom:0}}>
                      <Link to="/signup">Contact Us </Link>
                      <Link to="/signin">Legal</Link>
                  </div>                 
              </div>
             <div>

             </div>
            
          </div>
    
      </div>
    )
  }
}

export default SideNavBar;
