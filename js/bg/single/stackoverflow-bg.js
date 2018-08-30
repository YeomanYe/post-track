import {getBaseStruct} from '../../utils/DataStructUtil';
import ColUtil from '../../utils/ColUtil';
import Constant from '../../config/Constant';

const {SITE_STACK_OVERFLOW,TYPE_ISSUE} = Constant;
export default function createStackOverflowQuery() {
    let baseObj = getBaseStruct(SITE_STACK_OVERFLOW,TYPE_ISSUE);
    let ajaxCall = function(data) {
        let $html = $(data);
        let title = $html.find('#question-header h1').text().trim();
        if(!title) return ;
        let matcher = $('#answers-header  h2').text().match(/[\d]+/);
        let len = matcher ? matcher[0] : 0;
        let isAccept = !!$html.find('.load-accepted-answer-date').length;
        return {
            title:title,
            isAccept:isAccept,
            answerNum:len + 1
        };
    };

    let stackOverflowQuery = function() {
        ColUtil.getCols(SITE_STACK_OVERFLOW, TYPE_ISSUE, ColUtil.queryUpdate(baseObj, ajaxCall));
    };

    ColUtil.addAfterStore(stackOverflowQuery, ajaxCall);
    return stackOverflowQuery;
}
