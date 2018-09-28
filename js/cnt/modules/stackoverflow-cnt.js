import Constant from '../../config/Constant';

const {CUR_HREF} = Constant;

export default function(curHref){
    if(curHref.search(/https:\/\/stackoverflow.com\/questions\/[\d]+\/.+/) < 0)return;
    window.getCurInfo = getCurInfoStackOverflow;
}

function getCurInfoStackOverflow() {
    let title = $('#question-header h1').text().trim();
    if(!title) return ;
    let matcher = $('#answers-header  h2').text().match(/[\d]+/);
    let len = matcher ? matcher[0] : 0;
    let isAccept = !!$('.load-accepted-answer-date').length;
    return {
        title:title,
        url:CUR_HREF,
        isAccept:isAccept,
        answerNum:len
    };
}
