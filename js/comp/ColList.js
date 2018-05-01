//@flow
import React, {Component} from 'react';
import Event from './Event';

type State = {
    isShow: boolean
}

let {SHOW_COL,EVENT_DEL_COL,EVENT_RELOAD_COL, EVENT_CHANGE_CNT, getCols, arrEqStr, STOR_KEY_COLS, storLocal, decUpdateNum, sendToAllTabs, CNT_CMD_UPDATE_CUR_FAV, log, formatHref, bindInnerFun, getStoreLocal} = window;

export default class ColList extends Component<any, State> {
    cntChangeHandler(num: number) {
        let isShow = false;
        if (num === SHOW_COL)
            isShow = true;
        this.setState({isShow})
    }

    componentWillUnmount() {
        Event.unregister(EVENT_CHANGE_CNT, this.cntChangeHandler);
    }

    createDelCol(colItem: Object) {
        // let {type, site, title} = colItem;
        return () => {
            Event.emit(EVENT_DEL_COL,colItem);
        }
    }

    renderItem(datas: Object[]) {
        let retArr = [];
        log('list datas', datas);
        datas.map((data) => {
            retArr.push(
                <li>
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
            );
        });
        return retArr;
    }


    constructor(props: any) {
        super(props);
        bindInnerFun(this);
        this.state = {
            isShow: true
        };
        Event.register(EVENT_CHANGE_CNT, this.cntChangeHandler);
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