import Constant from '../../config/Constant';
import $ from 'jquery';

const {SITE_SEGMENT_FAULT,TYPE_ISSUE} = Constant;

function resolve(data) {
    let $html = $(data);
    let title = $html.find('#questionTitle').text().trim();
    if(!title) return ;
    let $answers = $html.find('#goToReplyArea article');
    let isAccept = !!$answers.find('.accepted-check').length;
    return {
        title:title,
        isAccept:isAccept,
        answerNum:$answers.length
    };
}

export default [{resolve,site:SITE_SEGMENT_FAULT,type:TYPE_ISSUE}];
