import Constant from '../../config/Constant';
import {getTypeByHref} from '../helper';
import structObjArr from '../../config/data-struct/stackoverflow';
const {CUR_HREF,TYPE_ISSUE} = Constant;

export default function(){
    let type = getTypeByHref(structObjArr);
    let getCurInfo;
    switch (type){
        case TYPE_ISSUE: getCurInfo = getCurInfoStackOverflow;break;
        default:return;
    }
    window.getCurInfo = getCurInfo;
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
