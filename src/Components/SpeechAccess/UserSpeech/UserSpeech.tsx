import React from 'react';
import * as url from '../../../utils/constant';
import axios from 'axios';
import shareIcon from '../../../assets/images/share.svg';
import { css } from "@emotion/core";
import spotifyIcon from '../../../assets/images/spotifylogo.png';
import { ClipLoader } from "react-spinners";
import './userspeech.scss';
import { PDFExport } from '@progress/kendo-react-pdf';
import PdfTemplate from './PdfTemplate/PdfTemplate';

interface UserSpeechProps {
    location?: any
}
interface UserSpeechState {
    speech: string,
    userObj:object,
    apiCalled:boolean,
    songUrl:string,
    songName:string,
    artistName:string
}

const override = css`
  display: block;
  position:absolute;
  z-index:9999;
  margin:0 auto;
  border:5px solid;
  border-color: #8600B5;
  top:40%;
`;

class UserSpeech extends React.Component<UserSpeechProps, UserSpeechState> {
    pdfExportComponent;
    interval = null;
    userName = '';

    state = {
        speech: '',
        userObj:{},
        apiCalled:false,
        songUrl:'',
        songName:'',
        artistName:'',
        // name: 'Still, Jaime',
        // rank: 'SGT',
        // description: 'Demonstrate how to export an HTML section to PDF'
    }
    
    // onChange = (event) => {
    //     const name = event.target.name;
    //     const value = event.target.value;
    //     this.setState((state) => {
    //       state[name] = value;
    //       return state;
    //     })
    //   }
    

    componentDidMount(){
        let name: string =this.props.location.state['name'];
        name = name.toUpperCase();
        let data = {
            name:name,
            image:this.props.location.state['image'],
            id:this.props.location.state['id']
        }
        this.setState({
            userObj:data,
            apiCalled:true
        });
        // let s:string =  this.props.location.state['name'];
        // let tmp:any = s.split(' ');
        // let s1 = tmp[0].charAt(0).toUpperCase() + tmp[0].slice(1);
        // let s2 = tmp[1].charAt(0).toUpperCase() + tmp[1].slice(1);      
        this.userName = String(this.props.location.state['name']).toLowerCase();
        this.retrieveSpeech();
    }

    retrieveSpeech = () => {
        axios.get(url.getUserSpeechUrl, {
            params: {
                user_id: this.props.location.state['id'],
            }
        })
        .then((response) => {
            this.setState({
                speech: response?.data && response?.data[0]?.text,
                songUrl:response?.data && response?.data[0]?.song_url,
                songName:response?.data && response?.data[0]?.song_name,
                artistName:response?.data && response?.data[0]?.artist_name,
                apiCalled:false,
            });
        })
        .catch((error) => {

        })
        .finally(() => {
            // always executed
        });
    }

  

    render() {
        return (
            !this.state.apiCalled ?
                <div id="user-speech" className="container login-container tab-page mt-5 px-4 px-md-0">
                    <div className="mb-5 pb-5align-items-center d-flex justify-content-center row tabs-section custom-login">
                      <div className="col-12 col-lg-10 login-form mb-5 pb-5 tabs-card">
                            <form onSubmit={(e)=>{e.preventDefault()}}>
                                <div className="form-group">
                                        <div className="custom-text-field">
                                            <textarea rows={15}
                                                onChange={(e) => { }}
                                                value={this.state.speech}
                                                readOnly
                                            ></textarea>
                                        </div>
                                    </div>
                            </form>
                            <div className="form-group custom-submit ">
                                <button onClick = {()=>{window.open(this.state.songUrl, "_blank")}}  className="btn btnSubmit spotify" type="submit">                                      
                                    <img className = "mr-2" src = {spotifyIcon}></img>
                                    <span>{this.state.artistName && this.state.songName ? <p style = {{lineHeight:"1"}} className="m-0 song-text">{this.state.artistName }<p className="m-0 song-text">{this.state.songName}</p></p> : '+ Spotify Song'}</span>
                                </button>
                                <button onClick={() => { this.pdfExportComponent.save(); }}  className="btn btnSubmit share" type="submit">
                            <img src = {shareIcon}/>
                        </button>

                        <div style={{ position: "absolute", left: "-1000px", top: 0 }}>
                            <PDFExport
                                paperSize="A4"
                                margin="1cm"
                                fileName={this.userName.concat('\'s_MyLastSpeech')}
                                ref={(component) => this.pdfExportComponent = component}
                            >
                                <div style={{ width: "500px" }}>
                                  <PdfTemplate songName = {this.state.songName}  speech = {this.state.speech} name = {this.userName}/>
                                </div>
                            </PDFExport>
                        </div>
 
                             
                            </div> 
                            <div className={"after-section "}>
                            </div >   
                            <div className="col-8 d-flex upper-list pl-0">      
                               <div className="d-flex align-content-center align-items-center">
                                   <img src = {this.state.userObj['image']} />
                                    <a style={{minWidth:"130px"}} className={ "active ml-2"} >{this.userName}</a>
                               </div>                              
                            </div>
                        </div>
                     
                    </div>
                </div>
               
            :
            <div className="align-items-center d-flex justify-content-center sweet-loading">
                <ClipLoader
                css={override}
                size={150}
                //size={"150px"} this also works
                color={"#123abc"}
                loading={this.state.apiCalled}
            />
            </div>
        );
    }
}

export default UserSpeech;



