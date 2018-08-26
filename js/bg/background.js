import _createQueryObj from './single';
import Constant from '../config/Constant';
import StoreUtil from '../utils/StoreUtil';
import TabUtil from '../utils/TabUtil';

const {BG_CMD_UPDATE_NUM, BG_CMD_UPDATE_FAV_BTN, CNT_CMD_UPDATE_CUR_FAV, STOR_KEY_COLS, STOR_KEY_UPDATE_NUM} = Constant;
/**
 * 查询是否有更新
 */
let allQuery = function () {
    let keys = Object.keys(_createQueryObj);
    let firstQuery = _createQueryObj[keys[0]](), nextQuery = firstQuery;
    //创建查询链
    for (let i = 1, len = keys.length; i < len; i++) {
        nextQuery = nextQuery.afterStore(_createQueryObj[keys[i]]());
    }
    allQuery = function () {
        setBadge('....', 'blue'); //提示正在查询中
        firstQuery();
        setTimeout(allQuery, 1000 * 60 * 10);
    };
    allQuery();
};

updateBadge(allQuery);

//监听消息
chrome.runtime.onMessage.addListener(function (msgArr, msgSenderObj, resSend) {
    switch (msgArr[0]) {
        case BG_CMD_UPDATE_NUM:
            updateBadge();
            break;
        case BG_CMD_UPDATE_FAV_BTN:
            TabUtil.sendToAllTabs([CNT_CMD_UPDATE_CUR_FAV]);
            break;
    }
    return true;
});

//点击提醒打开链接
chrome.notifications.onClicked.addListener(function (url) {
    log('url', url);
    window.open(url);
});

chrome.notifications.onButtonClicked.addListener(function (url, btnIndex) {
    let updateToNews = async function () {
        let [allCols, updateNum] = await StoreUtil.load([STOR_KEY_COLS, STOR_KEY_UPDATE_NUM]);
        for (let len = allCols.length; --len;) {
            let favItem = allCols[len];
            let cols = favItem.cols;
            for (let len2 = cols.length; len2--;) {
                let colItem = cols[len2];
                let url2 = formatHref(colItem.url, favItem.baseUrl);
                if (url === url2) {
                    colItem.isUpdate = false;
                    StoreUtil.save({[STOR_KEY_COLS]: allCols, [STOR_KEY_UPDATE_NUM]: --updateNum});
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
async function updateBadge(callback) {
    let updateNum = await StoreUtil.load(STOR_KEY_UPDATE_NUM);
    updateNum = updateNum ? updateNum : 0;
    setBadge(updateNum);
    if (callback) callback();
}


/**
 * 设置徽章
 */
function setBadge(num, color) {
    color = color ? color : 'red';
    if (num <= 0) {
        chrome.browserAction.setBadgeText({
            text: ''
        });
        chrome.browserAction.setBadgeBackgroundColor({
            color: color
        });
        storLocal.set({
            [STOR_KEY_UPDATE_NUM]: 0
        });
        return;
    }
    chrome.browserAction.setBadgeText({
        text: '' + num
    });
    chrome.browserAction.setBadgeBackgroundColor({
        color: color
    })
}
