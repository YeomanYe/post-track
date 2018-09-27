import {getBaseStruct} from '../../config/data-struct';
import ColUtil from '../../utils/ColUtil';
import Constant from '../../config/Constant';

const {SITE_STACK_OVERFLOW,TYPE_ISSUE} = Constant;
export default function createStackOverflowQuery() {
    let baseObj = getBaseStruct(SITE_STACK_OVERFLOW,TYPE_ISSUE);
    let ajaxCall = function(data) {
        let $html = $(data);
        let title = $html.find('#question-header h1').text().trim();
        if(!title) return ;
        let matcher = $html.find('#answers-header  h2').text().match(/[\d]+/);
        let answerNum = matcher ? parseInt(matcher[0]) : 0;
        let isAccept = !!$html.find('.load-accepted-answer-date').length;
        return {title,isAccept,answerNum};
    };

    let stackOverflowQuery = function() {
        ColUtil.getCols(SITE_STACK_OVERFLOW, TYPE_ISSUE, ColUtil.queryUpdate(baseObj, ajaxCall));
    };

    ColUtil.addAfterStore(stackOverflowQuery, ajaxCall);
    return stackOverflowQuery;
}
