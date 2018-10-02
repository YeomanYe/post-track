import queryObjArr from './modules';
import Constant from '../config/Constant';
import TabUtil from '../utils/TabUtil';
import colDataStore from '../store/ColData';
import {queryUpdateOfBg, setBadge} from './helper';
import PageUtil from '../utils/PageUtil';

const {BG_CMD_UPDATE_NUM, BG_CMD_UPDATE_FAV_BTN, CNT_CMD_UPDATE_CUR_FAV} = Constant;
/**
 * 查询是否有更新
 */
let isQuery = false;
let allQuery = function () {
    allQuery = async function () {
        setBadge('....', 'blue'); //提示正在查询中
        isQuery = true;
        for(let queryObj of queryObjArr){
            const {site,type,resolve} = queryObj;
            await queryUpdateOfBg(site,type,resolve);
        }
        isQuery = false;
        await colDataStore.loadCols(); //防止不重载
        setBadge(colDataStore.updateNum);
        setTimeout(allQuery, 1000 * 60 * 10);
    };
    setTimeout(allQuery,1000 * 10);
};

allQuery();

//监听消息
chrome.runtime.onMessage.addListener(function (msgArr, msgSenderObj, resSend) {
    switch (msgArr[0]) {
        case BG_CMD_UPDATE_NUM:
            colDataStore.loadCols();
            break;
        case BG_CMD_UPDATE_FAV_BTN:
            TabUtil.sendToAllTabs([CNT_CMD_UPDATE_CUR_FAV]);
            break;
    }
    return true;
});

//点击提醒打开链接
chrome.notifications.onClicked.addListener(function (url) {
    console.log('url', url);
    window.open(url);
});

chrome.notifications.onButtonClicked.addListener(function (url, btnIndex) {
    let updateToNews = async function () {
        let allCols  = colDataStore.allCols;
        for (let len = allCols.length; --len;) {
            let favItem = allCols[len];
            let cols = favItem.cols;
            for (let len2 = cols.length; len2--;) {
                let colItem = cols[len2];
                let url2 = PageUtil.formatHref(colItem.url, favItem.baseUrl);
                if (url === url2) {
                    colItem.isUpdate = false;
                    colDataStore.setAllCols(allCols);
                    return;
                }
            }
        }
    };
    switch (btnIndex) {
        case 0:
            window.open(url);
            break;
        case 1:
            updateToNews();
            break;
    }
    chrome.notifications.clear(url);
});

/**
 * 更新徽章数
 */
colDataStore.subUpdateNum(updateNum => {
    if(!isQuery) setBadge(updateNum)
});
