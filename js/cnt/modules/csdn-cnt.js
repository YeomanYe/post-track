import Constant from '../../config/Constant';

const {CUR_HREF} = Constant;

export default function(curHref){
    if(curHref.search(/https:\/\/ask.csdn.net\/questions\/[\d]+/) < 0)return;
    window.getCurInfo = getCurInfoCSDN;
}

function getCurInfoCSDN() {
    let title = $('.questions_detail_con dt').text().trim();
    if(!title) return ;
    let len = $('.answer_sort_con  p').text().match(/[\d]+/)[0];
    let isAccept = !!$('.answer_accept').length;
    return {
        title:title,
        url:CUR_HREF,
        isAccept:isAccept,
        answerNum:len
    };
}
