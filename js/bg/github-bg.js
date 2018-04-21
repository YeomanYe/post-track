_createQueryObj.createGithubQuery = function () {
    var baseObj = getBaseStoreObj(SITE_GITHUB,TYPE_ISSUE);
    var ajaxCall = function(data) {
        var $html = $(data);
        var title = $html.find('.js-issue-title').text().trim();
        if(!title) return ;
        var $answers = $html.find('.js-discussion .js-timeline-item');
        var isAccept = !!$answers.find('.discussion-item-closed').length;
        return {
            title:title,
            isAccept:isAccept,
            answerNum:Math.max($answers.length - 1,0)
        };
        return resObj;
    };

    var githubQuery = function() {
        getCols(SITE_GITHUB, TYPE_ISSUE, queryUpdate(baseObj, ajaxCall));
    };

    this.addAfterStore(githubQuery, ajaxCall);
    return githubQuery;
};