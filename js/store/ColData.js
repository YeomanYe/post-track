import { observable, computed, reaction, action } from 'mobx';
import { types, onSnapshot,onAction } from 'mobx-state-tree';
import ColUtil from '../utils/ColUtil';

class ColData {
    @observable allCols = [];
    @action.bound
    setAllCols(allCols){
        this.allCols = allCols;
    }
    //展示用数据
    @computed
    get displayCols(){
        let datas = [];
        let allCols = this.allCols;
        console.log('allCols', allCols);
        allCols.map((item) => {
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
    }
}
const store = new ColData();
