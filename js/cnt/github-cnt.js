
$(function(){
    if(curHref.search(/https:\/\/github.com\/.*\/issues\/[\d]+/) < 0)return;
    log(SITE_GITHUB);
    createBtn();
    _$imgToggle.on('click',toggleColHandlerGithub);
    _updateCurFavFun = updateGithub;
    updateGithub();
});

function toggleColHandlerGithub() {
    getCols(SITE_GITHUB,TYPE_ISSUE,toggleCol(getCurInfoGithub));
}

function updateGithub() {
    getCols(SITE_GITHUB,TYPE_ISSUE,updatePageCol(getCurInfoGithub));
}

function getCurInfoGithub() {
    var title = $('.js-issue-title').text().trim();
    if(!title) return ;
    var $answers = $('.js-discussion .js-timeline-item');
    var isAccept = !!$answers.find('.discussion-item-closed').length;
    return {
        title:title,
        url:curHref,
        isAccept:isAccept,
        answerNum:Math.min($answers.length - 1,0) //去掉一个为提问的备注
    };
}