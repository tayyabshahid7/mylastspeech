import React from 'react';
import * as url from '../../../utils/constant';
import axios from 'axios';
import shareIcon from '../../../assets/images/share.svg';
import { css } from "@emotion/core";
import { ClipLoader } from "react-spinners";
import './userspeech.scss';

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
    interval = null;
    state = {
        speech: '',
        userObj:{},
        apiCalled:false,
        songUrl:'',
        songName:'',
        artistName:''
    }

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
                    <div className="align-items-center d-flex justify-content-center row tabs-section custom-login">
                      <div className=" col-12 col-lg-10 login-form mb-5 pb-5 tabs-card">
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
                                <div className="form-group custom-submit ">
                                    <button onClick = {()=>{window.open(this.state.songUrl, "_blank")}}  className="btn btnSubmit spotify" type="submit">
                                        <i className="fa fa-spotify" aria-hidden="true"></i> &nbsp;
                                            <span>{this.state.artistName && this.state.songName ? <span>{this.state.artistName }<br/>{this.state.songName}</span> : '+ Spotify Song'}</span>
                                    </button>
                                    <button className="btn btnSubmit share" type="submit">
                                        <img src = {shareIcon}/>
                                    </button>
                                </div>
                            </form>
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



