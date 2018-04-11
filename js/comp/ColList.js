import React, { Component } from 'react';

export default class ColList extends Component {
    renderItem(datas){
        let retArr = [];
        datas.map((data)=>{
            retArr.push(
                <li>
                    <a className="left">
                        <div></div>
                    </a>
                    <div className="middle"></div>
                    <div className="right"><a></a></div>
                </li>
            );
        });
        return retArr;
    }
    componentDidMount(){
        let self = this;
        getStoreLocal(STOR_KEY_COLS,(allCols)=>{
            let datas = [];

            self.setState({datas})
        });
    }
    constructor(props){
        super(props);
        this.state = {
            datas:[]
        };
    }
    render() {
        let {datas} = this.state;
        return (
          <div id='col-list-wrap'>
              <ul>
                  {this.renderItem(datas)}
              </ul>
          </div>
        );
    }
}