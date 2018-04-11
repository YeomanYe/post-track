import React, { Component } from 'react';

export default class ColList extends Component {
    renderItem(datas){
        let retArr = [];
        datas.map((data)=>{
            retArr.push(
                <li>
                    <a href={data.origin} className="left">
                        <div style={data.iconStyle}></div>
                    </a>
                    <div className="middle">{data.title}</div>
                    <div className="right"><a>删除</a></div>
                </li>
            );
        });
        return retArr;
    }
    componentDidMount(){
        let self = this;
        getStoreLocal(STOR_KEY_COLS,(allCols)=>{
            let datas = [];
            allCols = allCols ? allCols : [];
            log('allCols',allCols);
            allCols.map((item)=>{
                let {icon,origin,siteName,baseUrl} = item;
                let iconStyle = {backgroundImage:`url('${icon}')`};
                item.cols.map((col)=>{
                    let {title,url,isAccept,answerNum} = col;
                    datas.push({
                        title,isAccept,answerNum,origin,iconStyle,siteName,
                        url:formatHref(url,baseUrl)
                    })
                });
            });
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
              <ul id={"colList"}>
                  {this.renderItem(datas)}
              </ul>
          </div>
        );
    }
}