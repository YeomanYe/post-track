import Constant from '../../config/Constant';

const {SITE_GITHUB,TYPE_ISSUE} = Constant;

function resolve(data) {
    let $html = $(data);
    let title = $html.find('.js-issue-title').text().trim();
    if(!title) return ;
    let $answers = $html.find('.js-discussion .js-timeline-item');
    let isAccept = !!$answers.find('.discussion-item-closed').length;
    return {
        title:title,
        isAccept:isAccept,
        answerNum:Math.max($answers.length,0)
    };
}
export default [{resolve,type:TYPE_ISSUE,site:SITE_GITHUB}];
