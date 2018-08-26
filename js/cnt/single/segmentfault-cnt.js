import Constant from '../../config/Constant';
import {toggleCol} from '../helper';

const {SITE_SEGMENT_FAULT,TYPE_ISSUE} = Constant;


export default function (curHref) {
    if(curHref.indexOf('segmentfault.com/q/') < 0)return;
    console.log(SITE_SEGMENT_FAULT);
    window._toggleCurCol = toggleFavHandlerSf;
    updateSf();
}
function toggleFavHandlerSf(resSend) {
    getCols(SITE_SEGMENT_FAULT,TYPE_ISSUE,toggleCol(getCurInfoSf,resSend));
}

function updateSf() {
    getCols(SITE_SEGMENT_FAULT,TYPE_ISSUE,updatePageCol(getCurInfoSf));
}

function getCurInfoSf() {
    var title = $('#questionTitle').text().trim();
    if(!title) return ;
    var answers = $('#goToReplyArea article');
    var isAccept = !!answers.find('.accepted-check').length;
    return {
        title:title,
        url:curHref,
        isAccept:isAccept,
        answerNum:answers.length
    };
}
