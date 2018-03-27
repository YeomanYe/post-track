var storLocal = chrome.storage.local;
var log = console.log;
var sendMsg = chrome.runtime.sendMessage;
var _createQueryObjProto = {
    addAfterStore: function (queryFun, hangFun) {
        queryFun.afterStore = function (callback) {
            hangFun._afterStore = callback;
            return callback;
        };
    }
};
var _createQueryObj = Object.create(_createQueryObjProto);

/**
 * 获取两个URL中相同的部分
 */
function getBaseUrl(url1, url2) {
    var arr1 = url1.split('/'),
        arr2 = url2.split('/');
    var sameArr = [];
    for (var i = 0, len = arr1.length; i < len; i++) {
        if (arr1[i] === arr2[i]) sameArr.push(arr1[i]);
    }
    return sameArr.join('/');
}

/**
 * 判断数组中是否有一个字符串在目标字符串中。并返回序列号。-1代表不存在
 * field代表数组中某个对象的某一字段
 */
function arrInStr(arr, strs) {
    var flag;
    for (var i = 0, len = arr.length; i < len; i++) {
        var obj = arr[i];
        flag = true;
        if (typeof strs === 'object') {
            var keys = Object.keys(strs);
            //为数组的情况
            for (var j = 0, len2 = keys.length; j < len2; j++) {
                if (strs[keys[j]].indexOf(obj[keys[j]]) < 0) {
                    flag = false;
                    break;
                }
            }
            if (flag) return i;
        } else if (strs.indexOf(obj) >= 0) {
            return i;
        }
    }
    return -1;
}

/**
 * 判断数组中是否有一个字符串等于目标字符串。并返回序列号。-1代表不存在
 * field代表数组中某个对象的某一字段
 */
function arrEqStr(arr, strs) {
    var flag;
    for (var i = 0, len = arr.length; i < len; i++) {
        var obj = arr[i];
        flag = true;
        if (typeof strs === 'object') {
            var keys = Object.keys(strs);
            //为数组的情况
            for (var j = 0, len2 = keys.length; j < len2; j++) {
                if (strs[keys[j]] !== obj[keys[j]]) {
                    flag = false;
                    break;
                }
            }
            if (flag) return i;
        } else if (strs === obj) {
            return i;
        }
    }
    return -1;
}

/**
 * 获取存储并执行回调函数
 */
function getStoreLocal(keys, callback) {
    chrome.storage.local.get(keys, function (resObj) {
        //不是字符串就是数组了
        if (typeof keys === 'string') {
            callback(resObj[keys]);
        } else {
            var vals = [];
            for (var i = 0, len = keys.length; i < len; i++) {
                vals.push(resObj[keys[i]]);
            }
            callback.apply({}, vals);
        }
    });
}

/**
 * 获取某站点下所有的采集，以及更新的数目
 */
function getCols(siteName, type, callback) {
    var defaultStore = getBaseStoreObj(siteName, type);
    getStoreLocal([STOR_KEY_COLS, STOR_KEY_UPDATE_NUM], function (allCols, updateNum) {
        allCols = allCols ? allCols : [];
        updateNum = updateNum ? updateNum : 0;
        var index = -1;
        if (allCols.length) index = arrEqStr(allCols, {site: siteName, type: type});
        var cols = [];
        if (index < 0) {
            defaultStore.cols = cols;
            allCols.unshift(defaultStore);
        } else {
            cols = allCols[index].cols;
        }
        callback(cols, allCols, updateNum);
    });
}

/**
 * 添加数组元素到数组中，比起concat不会新建数组
 */
function addArr(arr1, arr2) {
    for (var i = 0, len = arr2.length; i < len; i++) {
        arr1.push(arr2[i]);
    }
    return arr1;
}

/**
 * 减少更新的数量
 */
function decUpdateNum(item) {
    if (item.isUpdate) {
        item.isUpdate = false;
        getStoreLocal(STOR_KEY_UPDATE_NUM, function (updateNum) {
            --updateNum;
            storLocal.set({
                updateNum: updateNum
            }, function () {
                chrome.runtime.sendMessage(null, [BG_CMD_UPDATE_NUM]);
            });
        });
    }
}

/**
 * 更新阅读记录
 */
function updateColRecord() {

}

/**
 * 查询是否有更新的通用函数
 */
function queryUpdate() {

}

/**
 * 替换origin
 */
function replaceOrigin(url, newOrigin) {
    var restArgs = newOrigin.split('/');
    var urlArr = url.split('/');
    restArgs.unshift(0, 3);
    [].splice.apply(urlArr, restArgs);
    return urlArr.join('/');
}

/**
 * 创建提醒
 */
function createNotify(title, iconUrl, message, newUrl) {
    var options = {
        type: chrome.notifications.TemplateType.BASIC,
        title: title,
        iconUrl: iconUrl,
        isClickable: true,
        message: message
    };
    chrome.notifications.create(newUrl, options);
}

/**
 * 创建toast提醒
 */
function showTips(msg, time) {
    var $div = $('<div>');
    time = time ? time : TIME_SHORT;
    $div.text(msg);
    var width = $(window).width(),
        height = $(window).height();
    $div.css({
        position: 'fixed',
        padding: '20px',
        top: height / 2 - 40,
        left: width / 2 - 40,
        'font-size': '18px',
        'z-index': 999,
        background: 'black',
        color: 'white'
    });
    $('body').append($div);
    setTimeout(function () {
        $div.remove();
    }, time);
}

/**
 * 格式化href
 * @param href
 */
function formatHref(href, baseHref) {
    var retHref;
    var index = href.search('^https?://');
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
 * 存储消抖函数
 */
var storeDebounce = function (obj, func) {
    var storeDebounceTimeout;
    storeDebounce = function (obj, func) {
        if (storeDebounceTimeout) {
            clearTimeout(storeDebounceTimeout);
        }
        storeDebounceTimeout = setTimeout(function () {
            chrome.storage.local.set(obj, func);
        }, 500);
    };
    storeDebounce(obj, func);
};

/**
 * 发送通知到全部的tab页
 * @param data
 */
function sendToAllTabs(data) {
    chrome.windows.getAll(null,function (wins) {
        for(var i=0,len=wins.length;i<len;i++){
            var win = wins[i];
            chrome.tabs.query({windowId:win.id},function (tabs) {
                for(var i=0,len=tabs.length;i<len;i++){
                    var tab = tabs[i];
                    chrome.tabs.sendMessage(tab.id,data);
                }
            });
        }
    });
}