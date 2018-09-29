import Constant from '../../config/Constant';
import $ from 'jquery';

const {SITE_STACK_OVERFLOW,TYPE_ISSUE} = Constant;

function resolve(data) {
    let $html = $(data);
    let title = $html.find('#question-header h1').text().trim();
    if(!title) return ;
    let matcher = $html.find('#answers-header  h2').text().match(/[\d]+/);
    let answerNum = matcher ? parseInt(matcher[0]) : 0;
    let isAccept = !!$html.find('.load-accepted-answer-date').length;
    return {title,isAccept,answerNum};
}

export default [{resolve,site:SITE_STACK_OVERFLOW,type:TYPE_ISSUE}];
