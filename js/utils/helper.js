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

