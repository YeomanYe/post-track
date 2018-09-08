import Constant from '../../config/Constant';
import {toggleCol} from '../helper';
import ColUtil from '../../utils/ColUtil';

const {SITE_STACK_OVERFLOW,TYPE_ISSUE,CUR_HREF} = Constant;

export default function(curHref){
    if(curHref.search(/https:\/\/stackoverflow.com\/questions\/[\d]+\/.+/) < 0)return;
    console.log(SITE_STACK_OVERFLOW);
    window._toggleCurCol = toggleColHandlerStackOverflow;
    updateStackOverflow();
}

function toggleColHandlerStackOverflow(resSend) {
    ColUtil.getCols(SITE_STACK_OVERFLOW,TYPE_ISSUE,toggleCol(getCurInfoStackOverflow,resSend));
}

function updateStackOverflow() {
    ColUtil.getCols(SITE_STACK_OVERFLOW,TYPE_ISSUE,ColUtil.updatePageCol(getCurInfoStackOverflow));
}

function getCurInfoStackOverflow() {
    let title = $('#question-header h1').text().trim();
    if(!title) return ;
    let matcher = $('#answers-header  h2').text().match(/[\d]+/);
    let len = matcher ? matcher[0] : 0;
    let isAccept = !!$('.load-accepted-answer-date').length;
    return {
        title:title,
        url:CUR_HREF,
        isAccept:isAccept,
        answerNum:len
    };
}
