import {getBaseStruct} from '../../utils/DataStructUtil';
import ColUtil from '../../utils/ColUtil';
import Constant from '../../config/Constant';

const {SITE_ZHIHU,TYPE_ISSUE} = Constant;
export default function createZhihuQuery() {
    let baseObj = getBaseStruct(SITE_ZHIHU,TYPE_ISSUE);
    let ajaxCall = function(data) {
        console.log(data);
        let $html = $(data);
        let title = $html.find('.QuestionHeader-title').text().trim();
        if(!title) return ;
        let regStr =  '<a class="QuestionMainAction" [\\s\\S]*?ViewAll[\\s\\S]*?>([\\s\\S]*?)</a>';
        let regs = new RegExp(regStr,"g");
        let answerNum = parseInt(regs.exec(data)[1].replace("查看全部",""));
        // let answerNum = parseInt($html.find('.List-headerText').text());
        let isAccept = false;
        return {title, isAccept, answerNum};
    };

    let zhihuQuery = function() {
        ColUtil.getCols(SITE_ZHIHU, TYPE_ISSUE, ColUtil.queryUpdate(baseObj, ajaxCall));
    };

    ColUtil.addAfterStore(zhihuQuery, ajaxCall);
    return zhihuQuery;
}
