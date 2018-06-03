
$(function(){
    if(curHref.search(/https:\/\/ask.csdn.net\/questions\/[\d]+/) < 0)return;
    log(SITE_CSDN);
    // createBtn();
    // _$imgToggle.on('click',toggleColHandlerCSDN);
    // _updateCurFavFun = updateGithub;
    _toggleCurCol = toggleColHandlerCSDN;
    updateCSDN();
});

function toggleColHandlerCSDN(resSend) {
    getCols(SITE_CSDN,TYPE_ISSUE,toggleCol(getCurInfoCSDN,resSend));
}

function updateCSDN() {
    getCols(SITE_CSDN,TYPE_ISSUE,updatePageCol(getCurInfoCSDN));
}

function getCurInfoCSDN() {
    var title = $('.questions_detail_con dt').text().trim();
    if(!title) return ;
    var len = $('.answer_sort_con  p').text().match(/[\d]+/)[0];
    var isAccept = !!$('.answer_accept').length;
    return {
        title:title,
        url:curHref,
        isAccept:isAccept,
        answerNum:len
    };
}
