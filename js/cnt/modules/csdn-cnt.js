import Constant from '../../config/Constant';
import structObjArr from '../../config/data-struct/csdn';
import {getTypeByHref} from '../helper';
import $ from 'jquery';

const {TYPE_ISSUE,CUR_HREF} = Constant;
export default function(){
    let type = getTypeByHref(structObjArr);
    let getCurInfo;
    switch (type){
        case TYPE_ISSUE: getCurInfo = getCurInfoCSDN;break;
        default:return;
    }
    window.getCurInfo = getCurInfo;
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
