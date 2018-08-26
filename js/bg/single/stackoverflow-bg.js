export default function createStackOverflowQuery() {
    var baseObj = getBaseStoreObj(SITE_STACK_OVERFLOW,TYPE_ISSUE);
    var ajaxCall = function(data) {
        var $html = $(data);
        var title = $html.find('#question-header h1').text().trim();
        if(!title) return ;
        var matcher = $('#answers-header  h2').text().match(/[\d]+/);
        var len = matcher ? matcher[0] : 0;
        var isAccept = !!$html.find('.load-accepted-answer-date').length;
        return {
            title:title,
            isAccept:isAccept,
            answerNum:len + 1
        };
    };

    var stackOverflowQuery = function() {
        getCols(SITE_STACK_OVERFLOW, TYPE_ISSUE, queryUpdate(baseObj, ajaxCall));
    };

    this.addAfterStore(stackOverflowQuery, ajaxCall);
    return stackOverflowQuery;
}
