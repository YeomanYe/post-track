import Constant from '../../config/Constant';
import {getTypeByHref} from '../helper';
import structObjArr from '../../config/data-struct/segmentfault';
const {CUR_HREF,TYPE_ISSUE} = Constant;


export default function () {
    let type = getTypeByHref(structObjArr);
    let getCurInfo;
    switch (type){
        case TYPE_ISSUE: getCurInfo = getCurInfoSf;break;
        default:return;
    }
    window.getCurInfo = getCurInfo;
}


function getCurInfoSf() {
    let title = $('#questionTitle').text().trim();
    if(!title) return ;
    let answers = $('#goToReplyArea article');
    let isAccept = !!answers.find('.accepted-check').length;
    return {
        title:title,
        url:CUR_HREF,
        isAccept:isAccept,
        answerNum:answers.length
    };
}
