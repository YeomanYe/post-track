import ColUtil from '../../utils/ColUtil';
import {getBaseStruct} from '../../utils/DataStructUtil';
import Constant from '../../config/Constant';

const {SITE_CSDN,TYPE_ISSUE} = Constant;
export default function createCSDNQuery() {
    let baseObj = getBaseStruct(SITE_CSDN,TYPE_ISSUE);
    let ajaxCall = function(data) {
        let $html = $(data);
        let title = $html.find('.questions_detail_con dt').text().trim();
        if(!title) return ;
        let answerNum = parseInt($html.find('.answer_sort_con p').text().match(/[\d]+/)[0]);
        let isAccept = !!$html.find('.answer_accept').length;
        return {title,isAccept,answerNum};
    };

    let csdnQuery = function() {
        ColUtil.getCols(SITE_CSDN, TYPE_ISSUE, ColUtil.queryUpdate(baseObj, ajaxCall));
    };

    ColUtil.addAfterStore(csdnQuery, ajaxCall);
    return csdnQuery;
}
