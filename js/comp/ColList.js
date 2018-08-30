import React, {Component} from 'react';
import Event from './Event';
import PageUtil from '../utils/PageUtil';
import Constant from '../config/Constant';

type State = {
    isShow: boolean
}

let {SHOW_COL} = Constant;
export default class ColList extends Component<any, State> {
    cntChangeHandler(num: number) {
        let isShow = false;
        if (num === SHOW_COL)
            isShow = true;
        this.setState({isShow})
    }

    componentWillUnmount() {
        Event.unregister(Event.TYPE.CHANGE_CNT, this.cntChangeHandler);
    }

    createDelCol(colItem: Object) {
        // let {type, site, title} = colItem;
        return () => {
            Event.emit(Event.TYPE.DEL_COL,colItem);
        }
    }

    renderItem(datas: Object[]) {
        console.log('list datas', datas);
        let retArr = datas.map((data,index) => (
                <li key={data+index}>
                    <a href={data.origin} target="_blank" className="left">
                        <div style={data.iconStyle}></div>
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
                        <p><span onClick={this.createDelCol(data)} className="del-col">删除</span></p>
                    </div>
                </li>
            ));
        return retArr;
    }


    constructor(props: any) {
        super(props);
        PageUtil.bindFun(this);
        this.state = {
            isShow: true
        };
        Event.register(Event.TYPE.CHANGE_CNT, this.cntChangeHandler);
    }

    render() {
        let { isShow} = this.state;
        let {colListDatas} = this.props;
        return (
            <div id='col-list-wrap' className={isShow ? 'list' : 'hidden'}>
                <ul id="col-list">
                    {this.renderItem(colListDatas)}
                </ul>
            </div>
        );
    }
}
