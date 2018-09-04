import StoreUtil from './StoreUtil';
import ArrayUtil from './ArrayUtil';
import {getBaseStruct} from './DataStructUtil';
import Constant from '../config/Constant';

let {chrome} = window;
let cGetUrl = chrome.runtime.getURL;
const {STOR_KEY_UPDATE_NUM, BG_CMD_UPDATE_NUM, STOR_KEY_COLS, STOR_KEY_IS_CLOSE_TIPS} = Constant;
export default class ColUtil {
    /**
     * 获取某站点下所有的采集，以及更新的数目
     */
    static async getCols(siteName, type, callback) {
        let defaultStore = getBaseStruct(siteName, type);
        let [allCols, updateNum] = await StoreUtil.load([STOR_KEY_COLS, STOR_KEY_UPDATE_NUM]);
        allCols = allCols ? allCols : [];
        updateNum = updateNum ? updateNum : 0;
        let index = -1;
        if (allCols.length) index = ArrayUtil.arrEqStr(allCols, {site: siteName, type: type});
        let cols = [];
        if (index < 0) {
            defaultStore.cols = cols;
            allCols.unshift(defaultStore);
        } else {
            cols = allCols[index].cols;
        }
        callback(cols, allCols, updateNum);
    }

    /**
     * 减少更新的数量
     */
    static async decUpdateNum(item) {
        if (item.isUpdate) {
            item.isUpdate = false;
            let updateNum = await StoreUtil.load(STOR_KEY_UPDATE_NUM);
            --updateNum;
            await StoreUtil.save('updateNum', updateNum);
            chrome.runtime.sendMessage(null, [BG_CMD_UPDATE_NUM]);
        }
    }

    static addAfterStore(queryFun, hangFun) {
        queryFun.afterStore = function (callback) {
            hangFun._afterStore = callback;
            return callback;
        };
    }

    /**
     * 更新阅读记录
     */
    static updatePageCol(getCurInfo) {
        return async function (cols, allCols) {
            let curInfo = getCurInfo();
            //解析当前页面并更新阅读记录
            let index = ArrayUtil.arrEqStr(cols, {title: curInfo.title});
            if (index < 0) return;
            //更新图标
            let curItem = cols[index];
            curItem.timestamp = Date.now();
            //更新，当前更新的数量
            await this.decUpdateNum(curItem);
            StoreUtil.save('allCols', allCols);
        }
    }

    /**
     * 格式化href
     * @param href
     */
    static formatHref(href, baseHref) {
        let retHref;
        let index = href.search('^https?://');
        if (index < 0) {
            //如果href不是http打头，那么应该为 //www.xx.com/dd 这样的形式
            if (!baseHref) retHref = 'http:' + href;
            else {
                href = baseHref + href;
                index = href.search('^https?://');
                if (index < 0) retHref = 'http:' + href;
                else retHref = href;
            }
        } else {
            retHref = href;
        }
        return retHref;
    }

    /**
     * 查询是否有更新的通用函数
     */
    static queryUpdate(baseObj, callback) {
        let baseUrl = baseObj.baseUrl;
        let siteName = baseObj.siteName;
        let icon = baseObj.icon;
        let emptyFun = () => {
        };
        let afterStoreCall = callback._afterStore ? callback._afterStore : emptyFun; //存储成功之后的回调函数
        let isUpdate = false;
        return function (favs, allCols, updateNum) {
            let createSucCall = function (col) {
                return async function (data) {
                    try {
                        let resObj = callback(data);
                        let answerNum = resObj.answerNum,
                            isAccept = resObj.isAccept;
                        if (col.isAccept !== isAccept || col.answerNum !== answerNum) {
                            let isCloseTips = await
                            StoreUtil.load(STOR_KEY_IS_CLOSE_TIPS);
                            if (!isCloseTips) {
                                //生成提示
                                if (col.isAccept === isAccept) ColUtil.createNotify(siteName + ' 【更新】', icon, col.title, ColUtil.formatHref(col.url, baseUrl));
                                else {
                                    ColUtil.createNotify(siteName + ' 【采纳】', icon, col.title, ColUtil.formatHref(col.url, baseUrl));
                                }
                            }

                            col.answerNum = answerNum;
                            col.isAccept = isAccept;

                            isUpdate = true;
                            if (!col.isUpdate) {
                                col.isUpdate = true;
                                ++updateNum;
                            }
                            await
                            StoreUtil.save({updateNum, allCols});
                            afterStoreCall();
                        }
                    } catch (e) {
                        console.log(e);
                    }
                };
            };
            for (let i = 0, len = favs.length; i < len; i++) {
                let col = favs[i];
                let url = col.url;
                $.ajax(ColUtil.formatHref(url, baseUrl), {
                    success: createSucCall(col),
                    async: false
                });
            }
            if (!isUpdate) afterStoreCall();
            //更新查询完毕，替换掉正在查询标志“....”  改为更新的数量
            if (afterStoreCall === emptyFun) {
                ColUtil.setBadge(updateNum);
            }
        }
    }

    /**
     * 设置徽章
     */
    static setBadge(num, color = 'red') {
        if (num <= 0) {
            chrome.browserAction.setBadgeText({
                text: ''
            });
            chrome.browserAction.setBadgeBackgroundColor({
                color: color
            });
            StoreUtil.save(STOR_KEY_UPDATE_NUM, 0);
            return;
        }
        chrome.browserAction.setBadgeText({
            text: '' + num
        });
        chrome.browserAction.setBadgeBackgroundColor({
            color: color
        })
    }

    /**
     * 创建提醒
     */
    static createNotify(title, iconUrl, message, newUrl) {
        var options = {
            type: chrome.notifications.TemplateType.BASIC,
            title: title,
            iconUrl: iconUrl,
            isClickable: true,
            message: message,
            buttons: [
                {title: '打开', iconUrl: cGetUrl('images/notification-buttons/ic_flash_auto_black_48dp.png')},
                {title: '已读', iconUrl: cGetUrl('images/notification-buttons/ic_exposure_plus_1_black_48dp.png')}],
        };
        chrome.notifications.create(newUrl, options);
    }
}
