export default class TabUtil{
    /**
     * 发送通知到全部的tab页
     * @param data
     * @param handler
     */
    static sendToAllTabs(data,handler) {
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
    static getCurTab(sucCall){
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
    static sendToCurTab(data,handler) {
        chrome.tabs.query({active:true},function (tabs) {
            var tab = tabs[0];
            handler = handler || function(){};
            chrome.tabs.sendMessage(tab.id,data,null,handler);
        });
    }
}
