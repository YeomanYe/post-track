import React, {Component} from 'react';
import ColList from './ColList';
import SettingList from './SettingList';
import TogglePanel from './TogglePanel';
import Toolbar from './Toolbar';
import Event from './Event';
import TabUtil from '../utils/TabUtil';
import Constant from '../config/Constant';
import PageUtil from '../utils/PageUtil';
import StoreUtil from '../utils/StoreUtil';
import ArrayUtil from '../utils/ArrayUtil';
import ColUtil from '../utils/ColUtil';

type State = {
    datas: Object[]
}
let {getCols, decUpdateNum, formatHref} = window;

const {CNT_CMD_UPDATE_CUR_FAV,STOR_KEY_COLS} = Constant;

export default class Root extends Component<any,State> {
    async reloadCol(){
        let self = this;
        let allCols = await StoreUtil.load(STOR_KEY_COLS);
        let datas = [];
        allCols = allCols ? allCols : [];
        console.log('allCols', allCols);
        allCols.map((item) => {
            let {icon, origin, siteName, baseUrl, site, type} = item;
            let iconStyle = {backgroundImage: `url('${icon}')`};
            datas = item.cols.map((col) => {
                let {title, url, isAccept, answerNum, isUpdate} = col;
                return {
                    type, site, title, isAccept,icon, answerNum, isUpdate, origin, iconStyle, siteName,
                    url: ColUtil.formatHref(url, baseUrl)
                };
            });
        });
        self.setState({datas});
    }

    delCol(colItem: Object){
        let self = this;
        let {site,type,title} = colItem;
        getCols(site, type, (cols, allCols) => {
            let index = ArrayUtil.arrEqStr(cols, {title});
            let col;
            if (index < 0) return;
            col = cols.splice(index, 1);
            StoreUtil.save(STOR_KEY_COLS,allCols);
            decUpdateNum(col);
            //从视图中删除
            let {datas} = self.state;
            index = datas.indexOf(colItem);
            datas.splice(index, 1);
            this.setState({datas});
            TabUtil.sendToAllTabs([CNT_CMD_UPDATE_CUR_FAV]);
        });
    }

    constructor(props: any){
        super(props);
        PageUtil.bindFun(this);
        this.state = {
            datas:[]
        }
    }

    componentDidMount(){
        this.reloadCol();
        Event.register(Event.TYPE.RELOAD_COL,this.reloadCol);
        Event.register(Event.TYPE.DEL_COL,this.delCol);
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
