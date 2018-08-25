var storLocal = chrome.storage.local;
var log = console.log;
var sendMsg = chrome.runtime.sendMessage;
var cGetUrl = chrome.runtime.getURL;
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
function updatePageCol(getCurInfo) {
    return function (cols, allCols) {
        var curInfo = getCurInfo();
        //解析当前页面并更新阅读记录
        var index = arrEqStr(cols, {title: curInfo.title});
        if(_$imgToggle) _$imgToggle.get(0).src = _src.collectGrey;
        if (index < 0) return;
        //更新图标
        if(_$imgToggle) _$imgToggle.get(0).src = _src.collect;
        var curItem = cols[index];
        curItem.timestamp = Date.now();
        //更新，当前更新的数量
        decUpdateNum(curItem);
        storLocal.set({
            allCols: allCols
        });
    }
}

/**
 * 查询是否有更新的通用函数
 */
function queryUpdate(baseObj, callback) {
    var baseUrl = baseObj.baseUrl;
    var siteName = baseObj.siteName;
    var icon = baseObj.icon;
    var emptyFun = function () {};
    var afterStoreCall = callback._afterStore ? callback._afterStore : emptyFun; //存储成功之后的回调函数
    var isUpdate = false;
    return function (favs, allCols, updateNum) {
        var sucCall = function (data) {
            try {
                var resObj = callback(data);
                var answerNum = resObj.answerNum,
                    isAccept = resObj.isAccept;
                if (col.isAccept !== isAccept || col.answerNum !== answerNum) {

                    //生成提示
                    getStoreLocal(STOR_KEY_IS_CLOSE_TIPS, (function (icon, col,isAccept,oldIsAccept) {
                        return function (isCloseTips) {
                            if(isCloseTips) return;
                            if (oldIsAccept === isAccept) createNotify(siteName + ' 【更新】', icon, col.title, formatHref(col.url,baseUrl));
                            else createNotify(siteName + ' 【采纳】', icon, col.title, formatHref(col.url,baseUrl));
                        }
                    })(icon, col,isAccept,col.isAccept));

                    col.answerNum = answerNum;
                    col.isAccept = isAccept;

                    isUpdate = true;
                    if (!col.isUpdate) {
                        col.isUpdate = true;
                        ++updateNum;
                    }

                    storLocal.set({
                        updateNum: updateNum,
                        allCols: allCols
                    }, afterStoreCall);
                }
            } catch (e) {
                log(e);
            }

        };
        for (var i = 0, len = favs.length; i < len; i++) {
            var col = favs[i];
            var url = col.url;
            $.ajax(formatHref(url,baseUrl), {
                success: sucCall,
                async: false
            });
        }
        if (!isUpdate) afterStoreCall();
        //更新查询完毕，替换掉正在查询标志“....”  改为更新的数量
        if(afterStoreCall == emptyFun){
            setBadge(updateNum);
        }
    }
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
        message: message,
        buttons:[
            {title:'打开',iconUrl:cGetUrl('images/notification-buttons/ic_flash_auto_black_48dp.png')},
            {title:'已读',iconUrl:cGetUrl('images/notification-buttons/ic_exposure_plus_1_black_48dp.png')}],
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
        top: height / 2,
        left: width / 2,
        transform: 'translate(-50%,-50%)',
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
 * @param handler
 */
function sendToAllTabs(data,handler) {
    chrome.windows.getAll(null,function (wins) {
        for(var i=0,len=wins.length;i<len;i++){
            var win = wins[i];
            chrome.tabs.query({windowId:win.id},function (tabs) {
                for(var i=0,len=tabs.length;i<len;i++){
                    var tab = tabs[i];
                    handler = handler || function(){};
                    chrome.tabs.sendMessage(tab.id,data,null,handler);
                }
            });
        }
    });
}

/**
 * 获取当前tab
 * @param sucCall
 */
function getCurTab(sucCall){
    chrome.tabs.query({active:true},function (tabs) {
        var curTab = tabs[0];
        sucCall(curTab);
    });
}

/**
 * 发送通知到当前tab页
 * @param data
 * @param handler
 */
function sendToCurTab(data,handler) {
    chrome.tabs.query({active:true},function (tabs) {
        var tab = tabs[0];
        handler = handler || function(){};
        chrome.tabs.sendMessage(tab.id,data,null,handler);
    });
}

function bindInnerFun(self) {
    var proto = self.constructor.prototype,
        arr = Object.getOwnPropertyNames(proto),
        excludeFunArr = ['constructor','componentWillUnmount','componentDidMount','render',];
    for (var i=0,len=arr.length;i<len;i++) {
        var key = arr[i];
        if (excludeFunArr.indexOf(key) < 0 && (proto[key] instanceof Function))
            self[key] = proto[key].bind(self);
    }
}
