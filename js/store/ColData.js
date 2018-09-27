import {action,toJS,reaction, computed, observable} from 'mobx';
import ColUtil from '../utils/ColUtil';
import ArrayUtil from '../utils/ArrayUtil';
import StoreUtil from '../utils/StoreUtil';
import TabUtil from '../utils/TabUtil';
import Constant from '../config/Constant';

const {CNT_CMD_UPDATE_CUR_FAV,STOR_KEY_COLS} = Constant;
class ColData {
    @observable allCols = [];

    subscribeCols(){
        reaction(() => toJS(this.allCols),
            allCols => {
                StoreUtil.save(STOR_KEY_COLS,allCols);
            });
    }

    @action.bound
    setAllCols(allCols){
        this.allCols = allCols;
    }

    @action.bound
    async loadCols(){
        this.allCols = await StoreUtil.load(STOR_KEY_COLS) || [];
        console.log('loadCols allCols',toJS(this.allCols));
    }

    @action.bound
    async delCol(colItem){
        // let self = this;
        let {site,type,title} = colItem;
        let cols = ArrayUtil.getItemEqStr(this.allCols,{site,type}).cols;
        let index = ArrayUtil.getIndexEqStr(cols, {title});
        if (index < 0) return;
        let col = cols.splice(index, 1)[0];
        console.log('allCols',this.allCols);
        await ColUtil.decUpdateNum(col);
        //从视图中删除
        TabUtil.sendToAllTabs([CNT_CMD_UPDATE_CUR_FAV]);
    }

    //展示用数据
    @computed
    get displayCols(){
        let datas = [];
        let allCols = this.allCols;
        console.log('allCols', allCols);
        allCols.forEach((item) => {
            let {icon, origin, siteName, baseUrl, site, type} = item;
            let iconStyle = {backgroundImage: `url('${icon}')`};
            datas = [...datas,...item.cols.map((col) => {
                let {title, url, isAccept, answerNum, isUpdate} = col;
                return {
                    type, site, title, isAccept,icon, answerNum, isUpdate, origin, iconStyle, siteName,
                    url: ColUtil.formatHref(url, baseUrl)
                };
            })];
        });
        return datas;
    }
}
const store = new ColData();
store.loadCols();
store.subscribeCols();
export default store;
