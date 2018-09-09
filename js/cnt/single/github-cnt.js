import Constant from '../../config/Constant';
import {toggleCol} from '../helper';
import ColUtil from '../../utils/ColUtil';
const {SITE_GITHUB,TYPE_ISSUE,CUR_HREF} = Constant;

export default function(curHref){
    if(curHref.search(/https:\/\/github.com\/.*\/issues\/[\d]+/) < 0)return;
    console.log(SITE_GITHUB);
    window._toggleCurCol = toggleColHandlerGithub;
    updateGithub();
}

function toggleColHandlerGithub(resSend) {
    ColUtil.getCols(SITE_GITHUB,TYPE_ISSUE,toggleCol(getCurInfoGithub,resSend));
}

function updateGithub() {
    ColUtil.getCols(SITE_GITHUB,TYPE_ISSUE,ColUtil.updatePageCol(getCurInfoGithub));
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
