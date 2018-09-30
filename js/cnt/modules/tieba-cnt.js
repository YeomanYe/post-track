import Constant from '../../config/Constant';
import structObjArr from '../../config/data-struct/tieba';
import {getTypeByHref} from '../helper';
import $ from 'jquery';

const {CUR_HREF,TYPE_TOPIC} = Constant;

export default function(){
    let type = getTypeByHref(structObjArr);
    let getCurInfo;
    switch (type){
        case TYPE_TOPIC: getCurInfo = getInfo;break;
        default:return;
    }
    window.getCurInfo = getCurInfo;
}

function getInfo() {
    let title = $('.core_title_txt').text();
    if(!title) return ;
    let answerNum = $('.l_reply_num .red').eq(0).text();
    return {
        title:title,
        url:CUR_HREF,
        answerNum:answerNum
    };
}
