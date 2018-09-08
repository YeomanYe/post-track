import Constant from '../../config/Constant';
import {toggleCol} from '../helper';
import ColUtil from '../../utils/ColUtil';

const {SITE_CSDN,TYPE_ISSUE,CUR_HREF} = Constant;

export default function(curHref){
    if(curHref.search(/https:\/\/ask.csdn.net\/questions\/[\d]+/) < 0)return;
    console.log(SITE_CSDN);
    window._toggleCurCol = toggleColHandlerCSDN;
    updateCSDN();
}

function toggleColHandlerCSDN(resSend) {
    ColUtil.getCols(SITE_CSDN,TYPE_ISSUE,toggleCol(getCurInfoCSDN,resSend));
}

function updateCSDN() {
    ColUtil.getCols(SITE_CSDN,TYPE_ISSUE,ColUtil.updatePageCol(getCurInfoCSDN));
}

function getCurInfoCSDN() {
    let title = $('.questions_detail_con dt').text().trim();
    if(!title) return ;
    let len = $('.answer_sort_con  p').text().match(/[\d]+/)[0];
    let isAccept = !!$('.answer_accept').length;
    return {
        title:title,
        url:CUR_HREF,
        isAccept:isAccept,
        answerNum:len
    };
}
