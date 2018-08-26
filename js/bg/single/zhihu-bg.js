export default function createZhihuQuery() {
    var baseObj = getBaseStoreObj(SITE_ZHIHU,TYPE_ISSUE);
    var ajaxCall = function(data) {
        var $html = $(data);
        var title = $html.find('.QuestionHeader-title').text().trim();
        if(!title) return ;
        var answerNum = parseInt($html.find('.List-headerText').text());
        var isAccept = false;
        return {
            title:title,
            isAccept:isAccept,
            answerNum:answerNum
        };
    };

    var zhihuQuery = function() {
        getCols(SITE_ZHIHU, TYPE_ISSUE, queryUpdate(baseObj, ajaxCall));
    };

    this.addAfterStore(zhihuQuery, ajaxCall);
    return zhihuQuery;
}
