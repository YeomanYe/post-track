
$(function(){
    if(curHref.indexOf('segmentfault.com/q/') < 0)return;
    log(SITE_SEGMENT_FAULT);
    // createBtn();
    // _$imgToggle.on('click',toggleFavHandlerSf);
    // _updateCurFavFun = updateSf;
    _toggleCurCol = toggleFavHandlerSf;
    // updateSf();
});

function toggleFavHandlerSf(resSend) {
    getCols(SITE_SEGMENT_FAULT,TYPE_ISSUE,toggleCol(getCurInfoSf,resSend));
}

function updateSf() {
    getCols(SITE_SEGMENT_FAULT,TYPE_ISSUE,updatePageCol(getCurInfoSf));
}

function getCurInfoSf() {
    var title = $('#questionTitle').text().trim();
    if(!title) return ;
    var answers = $('#goToReplyArea article');
    var isAccept = !!answers.find('.accepted-check').length;
    return {
        title:title,
        url:curHref,
        isAccept:isAccept,
        answerNum:answers.length
    };
}