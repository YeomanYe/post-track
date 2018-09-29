import csdnCntResolve from './modules/csdn-cnt';
import githubCntResolve from './modules/github-cnt';
import segmentfaultCntResolve from './modules/segmentfault-cnt';
import stackoverflowCntResolve from './modules/stackoverflow-cnt';
import zhihuCntResolve from './modules/zhihu-cnt';
import juejinCntResolve from './modules/juejin-cnt';
import Constant from '../config/Constant';
import {toggleCol, updatePageCol} from './helper';

const {CNT_CMD_TOGGLE_CUR_COL,CNT_CMD_UPDATE_CUR_FAV} = Constant;
$(function () {
    csdnCntResolve();
    githubCntResolve();
    segmentfaultCntResolve();
    stackoverflowCntResolve();
    zhihuCntResolve();
    juejinCntResolve();
    init();
});

function init(){
    //延时，等待页面完成加载后执行
    setTimeout(updatePageCol,1200);
}

chrome.runtime.onMessage.addListener(function (msgArr, msgSenderObj, resSend) {
    switch (msgArr[0]) {
        case CNT_CMD_UPDATE_CUR_FAV:
            break;
        case CNT_CMD_TOGGLE_CUR_COL:
            toggleCol(resSend);
            break;
    }
    return true;
});
