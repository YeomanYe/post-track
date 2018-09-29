import Constant from '../../config/Constant';
import $ from 'jquery';

const {SITE_ZHIHU,TYPE_ISSUE} = Constant;

function resolve(data) {
    let $html = $(data);
    let title = $html.find('.QuestionHeader-title').text().trim();
    if(!title) return ;
    let regStr =  '<a class="QuestionMainAction" [\\s\\S]*?ViewAll[\\s\\S]*?>([\\s\\S]*?)</a>';
    let regs = new RegExp(regStr,"g");
    let answerNum = parseInt(regs.exec(data)[1].replace("查看全部",""));
    let isAccept = false;
    return {title, isAccept, answerNum};
}
export default [{resolve,site:SITE_ZHIHU,type:TYPE_ISSUE}];
