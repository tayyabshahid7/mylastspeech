import React from "react";
import "./sidenavbar2.scss";
import Hambuger from '../../assets/images/hamburger.svg';

class SideNavBar2 extends React.Component {
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
    const { showNav }:any = this.state
    let sideNavStyle = { width: showNav ? "460px" : "0" }

    return (
      <div id="sideNavBar2">
      <React.Fragment>
        <span onClick={this.openNavClick} className="open-nav">
          <i className="fa fa-question-circle question-mark" aria-hidden="true"></i>
        </span>
        {/* <div
          onClick={this.navCoverClick}
          class="nav-cover"
          style={navCoverStyle}
        /> */}
        <div className={"side-nav ".concat(showNav?"spacing":"")} style={sideNavStyle}>
          <a href="#" onClick={this.closeNavClick} className="close-nav">
            &times;
          </a>
          <span className={"heading ".concat(showNav?"d-block":"d-none")}>Writing Tips</span>
          <div className={"text pt-4 ".concat(showNav?"d-block":"d-none")}>
            <p>
            Talk about your friends, and maybe a fun story about when you were growing up. Keep it clean though. 
            </p>
            
            <p>
            Talk about the most fun you ever had. 
            </p>
          
            <p>
            Tell people what your best achievement was and give them some advice you learned from life. 
            </p>

            <p>
            Tell everyone you love them 
            </p>

            <p>
             Say thanks for coming, they are all here for you after all.
            </p>

            <p>
            Crack a joke, it’s a sad time, but not for you. 
            </p>

            <p>
            Say something to someone you always wanted to say and maybe didn’t get the chance to.
            </p>

            <p>
            Keep it light, Its a pretty sombre time for everybody remind them of who you were and your personality. 
            </p>

            <p>
            Tell everyone, or someone, to go and do something in your honour, any last wishes, nows the time. 
            </p>

            <p>
            This is the last time they will ever get to hear. Your words in most cases, so finish with a bang.
            </p>

            <p>
            Remember not to add add personal or account information here.
            </p>
           </div>
        </div>
      </React.Fragment>
      </div>
    )
  }
}

export default SideNavBar2;
