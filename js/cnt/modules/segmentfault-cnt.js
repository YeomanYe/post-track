import Constant from '../../config/Constant';

const {CUR_HREF} = Constant;


export default function (curHref) {
    if(curHref.search(/segmentfault\.com\/q\//) < 0)return;
    window.getCurInfo = getCurInfoSf;
}


function getCurInfoSf() {
    let title = $('#questionTitle').text().trim();
    if(!title) return ;
    let answers = $('#goToReplyArea article');
    let isAccept = !!answers.find('.accepted-check').length;
    return {
        title:title,
        url:CUR_HREF,
        isAccept:isAccept,
        answerNum:answers.length
    };
}
