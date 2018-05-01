_createQueryObj.createSfQuery = function () {
    var baseObj = getBaseStoreObj(SITE_SEGMENT_FAULT,TYPE_ISSUE);
    var ajaxCall = function(data) {
        var $html = $(data);
        var title = $html.find('#questionTitle').text().trim();
        if(!title) return ;
        var $answers = $html.find('#goToReplyArea article');
        var isAccept = !!$answers.find('.accepted-check').length;
        return {
            title:title,
            isAccept:isAccept,
            answerNum:$answers.length
        };
    };

    var sfQuery = function() {
        getCols(SITE_SEGMENT_FAULT, TYPE_ISSUE, queryUpdate(baseObj, ajaxCall));
    };

    this.addAfterStore(sfQuery, ajaxCall);
    return sfQuery;
};