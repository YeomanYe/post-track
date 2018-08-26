import Constant from '../../config/Constant';
import {toggleCol} from '../helper';

const {SITE_STACK_OVERFLOW,TYPE_ISSUE} = Constant;

export default function(curHref){
    if(curHref.search(/https:\/\/stackoverflow.com\/questions\/[\d]+\/.+/) < 0)return;
    console.log(SITE_STACK_OVERFLOW);
    window._toggleCurCol = toggleColHandlerStackOverflow;
    updateStackOverflow();
}

function toggleColHandlerStackOverflow(resSend) {
    getCols(SITE_STACK_OVERFLOW,TYPE_ISSUE,toggleCol(getCurInfoStackOverflow,resSend));
}

function updateStackOverflow() {
    getCols(SITE_STACK_OVERFLOW,TYPE_ISSUE,updatePageCol(getCurInfoStackOverflow));
}

function getCurInfoStackOverflow() {
    var title = $('#question-header h1').text().trim();
    if(!title) return ;
    var matcher = $('#answers-header  h2').text().match(/[\d]+/);
    var len = matcher ? matcher[0] : 0;
    var isAccept = !!$('.load-accepted-answer-date').length;
    return {
        title:title,
        url:curHref,
        isAccept:isAccept,
        answerNum:len
    };
}
