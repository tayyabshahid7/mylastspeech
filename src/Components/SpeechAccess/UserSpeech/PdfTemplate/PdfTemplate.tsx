import React, { useState } from 'react';

import './pdf.scss';

interface PdfTemplateProps {
    name: string,
    speech:string,
    songName:string,
}
interface PdfTemplateState {

}


class PdfTemplate extends React.Component<PdfTemplateProps, PdfTemplateState> {

    convertName = (e:any)=>{
        debugger;
       
    }

    render(){
        return (
            <div>
                <div className="position-relaticpx-0 mx-0" style={{padding: '15% 7% 15% 7%',backgroundColor:"black"}}>
                    <img
                        className="px-0 "
                        style={{marginLeft:'50%',padding:"0"}}
                        src="data:image/png;base64,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"
                        width="40px"
                        height="40px"
                    />
                </div>
                <div className="pdf">
                    <p className="mt-3"  ><strong>{this.props.name}</strong></p>
                    <p className="paragraph">My last speech is as follows...</p>   
                    <p className="paragraph">{this.props.speech}</p>
                    <p className="paragraph"><strong>Song Name</strong>: {this.props.songName}</p>
                </div>
            </div>
        );
    }
    
}
export default PdfTemplate;
