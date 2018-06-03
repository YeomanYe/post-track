
$(function(){
    if(curHref.search(/zhihu.com\/question\/[\d]+/) < 0)return;
    log(SITE_ZHIHU);
    _toggleCurCol = toggleFavHandlerZhihu;
    updateZhihu();
});

function toggleFavHandlerZhihu(resSend) {
    getCols(SITE_ZHIHU,TYPE_ISSUE,toggleCol(getCurInfoZhihu,resSend));
}

function updateZhihu() {
    getCols(SITE_ZHIHU,TYPE_ISSUE,updatePageCol(getCurInfoZhihu));
}

function getCurInfoZhihu() {
    var title = $('.QuestionHeader-title').text().trim();
    if(!title) return ;
    var answerNum = parseInt($('.List-headerText').text());
    var isAccept = false;
    return {
        title:title,
        url:curHref,
        isAccept:isAccept,
        answerNum:answerNum
    };
}
