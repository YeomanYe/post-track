import Constant from '../../config/Constant';
import structObjArr from '../../config/data-struct/github';
import {getTypeByHref} from '../helper';

const {CUR_HREF,TYPE_ISSUE} = Constant;

export default function(){
    let type = getTypeByHref(structObjArr);
    let getCurInfo;
    switch (type){
        case TYPE_ISSUE: getCurInfo = getCurInfoGithub;break;
        default:return;
    }
    window.getCurInfo = getCurInfo;
}

function getCurInfoGithub() {
    let title = $('.js-issue-title').text().trim();
    if(!title) return ;
    let $answers = $('.js-discussion .js-timeline-item');
    let isAccept = !!$answers.find('.discussion-item-closed').length;
    return {
        title:title,
        url:CUR_HREF,
        isAccept:isAccept,
        answerNum:Math.max($answers.length,0) //去掉一个为提问的备注
    };
}
