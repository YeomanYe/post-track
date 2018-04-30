//@flow
import React, {Component} from 'react';


export default class Toolbar extends Component<any, any> {
    constructor(props: any) {
        super(props);

    }

    render() {
        return (
            <header id='toolbar'>
                <div className="hd">
                    <img src="../../images/icon/logo-white32.png" alt=""/>
                    <h1>PostTrack</h1>
                </div>
                <div className="bd">
                    <img src="../../images/star-white.png" alt=""/>
                </div>
            </header>
        );
    }
}