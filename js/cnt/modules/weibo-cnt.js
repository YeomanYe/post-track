import Constant from '../../config/Constant';
import structObjArr from '../../config/data-struct/weibo';
import {getTypeByHref} from '../helper';
import $ from 'jquery';

const {CUR_HREF,TYPE_TOPIC} = Constant;

export default function(){
    let type = getTypeByHref(structObjArr);
    let getCurInfo;
    switch (type){
        case TYPE_TOPIC: getCurInfo = getInfo;break;
        default:return;
    }
    window.getCurInfo = getCurInfo;
}

function getInfo() {
    let title = $('.WB_detail .WB_text').text();
    if(!title) return ;
    let ouid = CUR_HREF.split('/')[3];
    let id = $(`div[tbInfo="ouid=${ouid}"]`).eq(0).attr('mid');
    const queryInfo = {
        url:'https://weibo.com/aj/v6/comment/big',
        type:'GET',
        param:{
            __rnd:parseInt(Math.random() * 100),
            from:'singleWeiBo',
            ajwvr:6,
            id
        }
    };
    let answerNum = $('.WB_row_line.WB_row_r4 .curr .line em').eq(1).text();
    return {
        title,
        url:CUR_HREF,
        answerNum,
        queryInfo
    };
}
