import {getBaseStruct} from '../../utils/DataStructUtil';
import ColUtil from '../../utils/ColUtil';
import Constant from '../../config/Constant';

const {SITE_ZHIHU,TYPE_ISSUE} = Constant;
export default function createZhihuQuery() {
    let baseObj = getBaseStruct(SITE_ZHIHU,TYPE_ISSUE);
    let ajaxCall = function(data) {
        let $html = $(data);
        let title = $html.find('.QuestionHeader-title').text().trim();
        if(!title) return ;
        let answerNum = parseInt($html.find('.List-headerText').text());
        let isAccept = false;
        return {
            title:title,
            isAccept:isAccept,
            answerNum:answerNum
        };
    };

    let zhihuQuery = function() {
        ColUtil.getCols(SITE_ZHIHU, TYPE_ISSUE, ColUtil.queryUpdate(baseObj, ajaxCall));
    };

    ColUtil.addAfterStore(zhihuQuery, ajaxCall);
    return zhihuQuery;
}
