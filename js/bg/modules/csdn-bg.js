import Constant from '../../config/Constant';
import $ from 'jquery';
const {SITE_CSDN, TYPE_ISSUE} = Constant;


function resolve(data) {
    let $html = $(data);
    let title = $html.find('.questions_detail_con dt').text().trim();
    if (!title) return;
    let answerNum = parseInt($html.find('.answer_sort_con p').text().match(/[\d]+/)[0]);
    let isAccept = !!$html.find('.answer_accept').length;

    return {title, isAccept, answerNum};
}

export default [
    { resolve, site: SITE_CSDN, type: TYPE_ISSUE}
];
