import {getBaseStruct} from '../../config/data-struct';
import ColUtil from '../../utils/ColUtil';
import Constant from '../../config/Constant';

const {SITE_SEGMENT_FAULT,TYPE_ISSUE} = Constant;
export default function createSfQuery() {
    let baseObj = getBaseStruct(SITE_SEGMENT_FAULT,TYPE_ISSUE);
    let ajaxCall = function(data) {
        let $html = $(data);
        let title = $html.find('#questionTitle').text().trim();
        if(!title) return ;
        let $answers = $html.find('#goToReplyArea article');
        let isAccept = !!$answers.find('.accepted-check').length;
        return {
            title:title,
            isAccept:isAccept,
            answerNum:$answers.length
        };
    };

    let sfQuery = function() {
        ColUtil.getCols(SITE_SEGMENT_FAULT, TYPE_ISSUE, ColUtil.queryUpdate(baseObj, ajaxCall));
    };

    ColUtil.addAfterStore(sfQuery, ajaxCall);
    return sfQuery;
}
