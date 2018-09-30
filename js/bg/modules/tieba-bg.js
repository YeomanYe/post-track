import Constant from '../../config/Constant';
import $ from 'jquery';
const {SITE_TIEBA, TYPE_TOPIC} = Constant;


function resolve(data) {
    let $html = $(data);
    let title = $html.find('.core_title_txt').text();
    if(!title) return ;
    let answerNum = $html.find('.l_reply_num .red').eq(0).text();
    return {
        title:title,
        answerNum:answerNum
    };
}

export default [
    { resolve, site: SITE_TIEBA, type: TYPE_TOPIC}
];
