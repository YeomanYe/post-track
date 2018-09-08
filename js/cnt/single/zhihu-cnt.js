import Constant from '../../config/Constant';
import {toggleCol} from '../helper';
import ColUtil from '../../utils/ColUtil';

const {SITE_ZHIHU,TYPE_ISSUE,CUR_HREF} = Constant;

export default function(curHref){
    if(curHref.search(/zhihu.com\/question\/[\d]+/) < 0)return;
    console.log(SITE_ZHIHU);
    window._toggleCurCol = toggleFavHandlerZhihu;
    updateZhihu();
}

function toggleFavHandlerZhihu(resSend) {
    ColUtil.getCols(SITE_ZHIHU,TYPE_ISSUE,toggleCol(getCurInfoZhihu,resSend));
}

function updateZhihu() {
    ColUtil.getCols(SITE_ZHIHU,TYPE_ISSUE,ColUtil.updatePageCol(getCurInfoZhihu));
}

function getCurInfoZhihu() {
    let title = $('.QuestionHeader-title').text().trim();
    if(!title) return ;
    let answerNum = parseInt($('.List-headerText').text());
    let isAccept = false;
    return {
        title:title,
        url:CUR_HREF,
        isAccept:isAccept,
        answerNum:answerNum
    };
}
