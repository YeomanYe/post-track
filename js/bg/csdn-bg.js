_createQueryObj.createCSDNQuery = function () {
    var baseObj = getBaseStoreObj(SITE_CSDN,TYPE_ISSUE);
    var ajaxCall = function(data) {
        var $html = $(data);
        var title = $html.find('.questions_detail_con dt').text().trim();
        if(!title) return ;
        var len = $html.find('.answer_sort_con  p').text().match(/[\d]+/)[0];
        var isAccept = !!$html.find('.answer_accept').length;
        return {
            title:title,
            isAccept:isAccept,
            answerNum:len
        };
    };

    var csdnQuery = function() {
        getCols(SITE_CSDN, TYPE_ISSUE, queryUpdate(baseObj, ajaxCall));
    };

    this.addAfterStore(csdnQuery, ajaxCall);
    return csdnQuery;
};