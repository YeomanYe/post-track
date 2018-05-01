//@flow
import React, {Component} from 'react';
import ColList from './ColList';
import SettingList from './SettingList';
import TogglePanel from './TogglePanel';
import Toolbar from './Toolbar';
import Event from './Event';

type State = {
    datas: Object[]
}
let {EVENT_RELOAD_COL,EVENT_DEL_COL, getCols,  arrEqStr, STOR_KEY_COLS, storLocal, decUpdateNum, sendToAllTabs, CNT_CMD_UPDATE_CUR_FAV, log, formatHref, bindInnerFun, getStoreLocal} = window;

export default class Root extends Component<any,State> {
    reloadCol(){
        let self = this;
        getStoreLocal(STOR_KEY_COLS, (allCols) => {
            let datas = [];
            allCols = allCols ? allCols : [];
            log('allCols', allCols);
            allCols.map((item) => {
                let {icon, origin, siteName, baseUrl, site, type} = item;
                let iconStyle = {backgroundImage: `url('${icon}')`};
                item.cols.map((col) => {
                    let {title, url, isAccept, answerNum, isUpdate} = col;
                    datas.push({
                        type, site, title, isAccept, answerNum, isUpdate, origin, iconStyle, siteName,
                        url: formatHref(url, baseUrl)
                    })
                });
            });
            self.setState({datas})
        });
    }

    delCol(colItem: Object){
        let self = this;
        let {site,type,title} = colItem;
        getCols(site, type, (cols, allCols) => {
            let index = arrEqStr(cols, {title: title});
            let col;
            if (index < 0) return;
            col = cols.splice(index, 1);
            storLocal.set({[STOR_KEY_COLS]: allCols});
            decUpdateNum(col);
            //从视图中删除
            let {datas} = self.state;
            index = datas.indexOf(colItem);
            datas.splice(index, 1);
            this.setState({datas});
            sendToAllTabs([CNT_CMD_UPDATE_CUR_FAV]);
        });
    }

    constructor(props: any){
        super(props);
        bindInnerFun(this);
        this.state = {
            datas:[]
        }
    }

    componentDidMount(){
        this.reloadCol();
        Event.register(EVENT_RELOAD_COL,this.reloadCol);
        Event.register(EVENT_DEL_COL,this.delCol);
    }

/*    getChildContext() {
        return {Event};
    }*/
    render() {
        let {datas} = this.state;
        return (
            <div id='content-wrap'>
                <Toolbar colListDatas={datas}/>
                <ColList colListDatas={datas}/>
                <SettingList/>
                <TogglePanel/>
            </div>
        );
    }
}