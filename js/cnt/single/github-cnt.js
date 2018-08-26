import Constant from '../../config/Constant';
import {toggleCol} from '../helper';
const {SITE_GITHUB,TYPE_ISSUE} = Constant;

export default function(curHref){
    if(curHref.search(/https:\/\/github.com\/.*\/issues\/[\d]+/) < 0)return;
    console.log(SITE_GITHUB);
    window._toggleCurCol = toggleColHandlerGithub;
    updateGithub();
}

function toggleColHandlerGithub(resSend) {
    getCols(SITE_GITHUB,TYPE_ISSUE,toggleCol(getCurInfoGithub,resSend));
}

function updateGithub() {
    getCols(SITE_GITHUB,TYPE_ISSUE,updatePageCol(getCurInfoGithub));
}

function getCurInfoGithub() {
    let title = $('.js-issue-title').text().trim();
    if(!title) return ;
    let $answers = $('.js-discussion .js-timeline-item');
    let isAccept = !!$answers.find('.discussion-item-closed').length;
    return {
        title:title,
        url:curHref,
        isAccept:isAccept,
        answerNum:Math.max($answers.length - 1,0) //去掉一个为提问的备注
    };
}
