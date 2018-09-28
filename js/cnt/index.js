import csdnCntResolve from './modules/csdn-cnt';
import githubCntResolve from './modules/github-cnt';
import segmentfaultCntResolve from './modules/segmentfault-cnt';
import stackoverflowCntResolve from './modules/stackoverflow-cnt';
import zhihuCntResolve from './modules/zhihu-cnt';
import Constant from '../config/Constant';
import {toggleCol, updatePageCol} from './helper';

const {CNT_CMD_TOGGLE_CUR_COL,CNT_CMD_UPDATE_CUR_FAV} = Constant;
$(function () {
    csdnCntResolve();
    githubCntResolve();
    segmentfaultCntResolve();
    stackoverflowCntResolve();
    zhihuCntResolve();
    init();
});

async function init(){
    await updatePageCol();
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
