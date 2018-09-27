import React, {Component} from 'react';
import PageUtil from '../utils/PageUtil';
import Constant from '../config/Constant';
import {observer} from 'mobx-react';

type State = {
    isShow: boolean
}

let {SHOW_COL} = Constant;

@observer
export default class ColList extends Component<any, State> {

    renderItem(datas: Object[]) {
        console.log('list datas', datas);
        let {colDataStore} = this.props;
        let retArr = datas.map((data,index) => (
                <li key={data+index}>
                    <a href={data.origin} target="_blank" className="left">
                        <div>
                            <img src={data.icon}/>
                        </div>
                    </a>
                    <div className="middle">
                        <a href={data.url} target="_blank">
                            <h3>{data.siteName}<span style={{display: data.isUpdate ? 'inline-block' : 'none'}}
                                                     className="badge">更新</span></h3>
                            <p>{data.title}</p>
                        </a>
                    </div>
                    <div className="right">
                        <p>是否解决:{data.isAccept ? '是' : '否'}</p>
                        <p>回答数量:{data.answerNum}</p>
                        <p><span onClick={()=>colDataStore.delCol(data)} className="del-col">删除</span></p>
                    </div>
                </li>
            ));
        return retArr;
    }


    constructor(props: any) {
        super(props);
        PageUtil.bindFun(this);
    }

    render() {
        let {colDataStore: {displayCols},showStore:{showContent}} = this.props;
        return (
            <div id='col-list-wrap' className={showContent === SHOW_COL ? 'list' : 'hidden'}>
                <ul id="col-list">
                    {this.renderItem(displayCols)}
                </ul>
            </div>
        );
    }
}
