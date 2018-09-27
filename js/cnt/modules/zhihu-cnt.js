import Constant from '../../config/Constant';

const {CUR_HREF} = Constant;

export default function(curHref){
    if(curHref.search(/zhihu.com\/question\/[\d]+/) < 0)return;
    window.getCurInfo = getCurInfoZhihu;
}

function getCurInfoZhihu() {
    let title = $('.QuestionHeader-title').text().trim();
    if(!title) return ;
    let answerNum = parseInt($('.List-headerText').text());
    let isAccept = false;
    return {
        title:title,
        url:CUR_HREF,
        isAccept:isAccept,
        answerNum:answerNum
    };
}
