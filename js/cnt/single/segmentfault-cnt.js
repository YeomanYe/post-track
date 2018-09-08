import Constant from '../../config/Constant';
import {toggleCol} from '../helper';
import ColUtil from '../../utils/ColUtil';

const {SITE_SEGMENT_FAULT,TYPE_ISSUE,CUR_HREF} = Constant;


export default function (curHref) {
    if(curHref.indexOf('segmentfault.com/q/') < 0)return;
    console.log(SITE_SEGMENT_FAULT);
    window._toggleCurCol = toggleFavHandlerSf;
    updateSf();
}
function toggleFavHandlerSf(resSend) {
    ColUtil.getCols(SITE_SEGMENT_FAULT,TYPE_ISSUE,toggleCol(getCurInfoSf,resSend));
}

function updateSf() {
    ColUtil.getCols(SITE_SEGMENT_FAULT,TYPE_ISSUE,ColUtil.updatePageCol(getCurInfoSf));
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
