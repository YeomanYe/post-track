import {action, computed, observable, reaction, toJS} from 'mobx';
import ArrayUtil from '../utils/ArrayUtil';
import StoreUtil from '../utils/StoreUtil';
import TabUtil from '../utils/TabUtil';
import Constant from '../config/Constant';
import PageUtil from '../utils/PageUtil';

const {CNT_CMD_UPDATE_CUR_FAV,STOR_KEY_COLS,BG_CMD_UPDATE_NUM,TYPE_USER,TYPE_ISSUE,TYPE_TOPIC} = Constant;
class ColData {
    @observable allCols = [];

    subCols(callback){
        reaction(() => toJS(this.allCols),
            allCols => {
                if(callback) callback(allCols);
            });
    }

    subUpdateNum(callback){
        reaction(() => toJS(this.updateNum),
            updateNum => {
                if(callback) callback(updateNum);
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
        cols.splice(index, 1)[0];
        console.log('allCols',this.allCols);
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
                let numText;
                switch (type){
                    case TYPE_ISSUE:numText = '回答总数';break;
                    case TYPE_USER:numText = '发帖总数';break;
                    default: numText = '跟帖总数';break;
                }
                return {
                    numText,type, site, title, isAccept,icon, answerNum, isUpdate, origin, iconStyle, siteName,
                    url: PageUtil.formatHref(url, baseUrl)
                };
            })];
        });
        return datas;
    }
    @computed
    get updateNum(){
        let allCols = this.allCols;
        let updateNum = 0;
        allCols.forEach((item) => {
            let {cols} = item;
            updateNum += cols.filter((col) => col.isUpdate === true).length;
        });
        return updateNum;
    }
}
const store = new ColData();
store.loadCols();
store.subCols(allCols => StoreUtil.save(STOR_KEY_COLS,allCols));
store.subUpdateNum(updateNum => {
    try {
        chrome.runtime.sendMessage(null, [BG_CMD_UPDATE_NUM]);
    }catch (e) {
        console.log('subUpdateNum',e);
    }
});
export default store;
