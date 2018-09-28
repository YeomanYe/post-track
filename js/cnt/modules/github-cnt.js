import Constant from '../../config/Constant';

const {CUR_HREF} = Constant;

export default function(curHref){
    if(curHref.search(/https:\/\/github.com\/.*\/issues\/[\d]+/) < 0)return;
    window.getCurInfo = getCurInfoGithub;
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
