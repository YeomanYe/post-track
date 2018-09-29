import Constant from '../../config/Constant';
import structObjArr from '../../config/data-struct/zhihu';
import {getTypeByHref} from '../helper';
import $ from 'jquery';

const {CUR_HREF,TYPE_ISSUE} = Constant;

export default function(){
    let type = getTypeByHref(structObjArr);
    let getCurInfo;
    switch (type){
        case TYPE_ISSUE: getCurInfo = getCurInfoZhihu;break;
        default:return;
    }
    window.getCurInfo = getCurInfo;
}

function getCurInfoZhihu() {
    let title = $('.QuestionHeader-title').text().trim();
    if(!title) return ;
    let answerNum = parseInt($('.QuestionMainAction').text().split(' ')[1]);
    let isAccept = false;
    return {
        title:title,
        url:CUR_HREF,
        isAccept:isAccept,
        answerNum:answerNum
    };
}
