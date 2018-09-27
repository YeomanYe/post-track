import {getBaseStruct} from '../../config/data-struct';
import ColUtil from '../../utils/ColUtil';
import Constant from '../../config/Constant';

const {SITE_GITHUB,TYPE_ISSUE} = Constant;
export default function createGithubQuery() {
    let baseObj = getBaseStruct(SITE_GITHUB,TYPE_ISSUE);
    let ajaxCall = function(data) {
        let $html = $(data);
        let title = $html.find('.js-issue-title').text().trim();
        if(!title) return ;
        let $answers = $html.find('.js-discussion .js-timeline-item');
        let isAccept = !!$answers.find('.discussion-item-closed').length;
        return {
            title:title,
            isAccept:isAccept,
            answerNum:Math.max($answers.length,0)
        };
    };

    let githubQuery = function() {
        ColUtil.getCols(SITE_GITHUB, TYPE_ISSUE, ColUtil.queryUpdate(baseObj, ajaxCall));
    };

    ColUtil.addAfterStore(githubQuery, ajaxCall);
    return githubQuery;
}
