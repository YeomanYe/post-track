//@flow
import React, {Component} from 'react';


export default class Toolbar extends Component<any, any> {
    constructor(props: any) {
        super(props);

    }

    render() {
        return (
            <header id='toolbar'>
                <div><img src="../../images/icon/logo48.png" alt=""/></div>
            </header>
        );
    }
}