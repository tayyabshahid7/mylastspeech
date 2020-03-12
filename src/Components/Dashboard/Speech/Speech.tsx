import React from 'react';
import * as url from '../../../utils/constant';
import './speech.scss';
import axios from 'axios';


interface SpeechProps {

}
interface SpeechState {
    speech:string,
}

class Speech extends React.Component<SpeechProps, SpeechState> {
    interval = null;
    state = {
        speech:'',
    }

    componentDidMount() {
        this.retrieveSpeech();
        this.interval = setInterval(() => this.addSpeech(), 5000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    retrieveSpeech = () => {
        const config = {
            headers: { Authorization: `Token ${localStorage.getItem('userToken')}` }
        };
      
        axios.get(url.addRetrieveSpeechUrl,        
            config
        )
        .then((response) => {
             ;
            this.setState({
                speech:response?.data?.text
            });     
        })
        .catch((error) => {
            
        })
        .finally( () => {
        // always executed
        });        
    }

    addSpeech = () => {
        if(this.state.speech.length>0){
            const config = {
                headers: { Authorization: `Token ${localStorage.getItem('userToken')}`}
            };
            const bodyParameters = {
                text:this.state.speech
            };
    
            axios.patch(url.addRetrieveSpeechUrl,
                bodyParameters,
                config
            )
            .then((response) => {
                    
    
            })
            .catch((error) => {
                    
            })
            .finally(() => {
                    // always executed
            });
        }   
    }

    render() {
        return (
            <div id = "speech">
                <form>
                    <div className="form-group">
                        <div className="custom-text-field">
                            <textarea rows={15}
                            onChange = {(e)=>{this.setState({speech:e.target.value})}}
                            value = {this.state.speech}
                            placeholder="Start Typing"></textarea>
                        </div>
                    </div>       
                </form>
                
            </div>   
        );
    }
}

export default Speech;



