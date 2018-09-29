import Constant from '../../config/Constant';
import structObjArr from '../../config/data-struct/juejin';
import {getTypeByHref} from '../helper';

const {TYPE_TOPIC,CUR_HREF} = Constant;
export default function(){
    let type = getTypeByHref(structObjArr);
    let getCurInfo;
    switch (type){
        case TYPE_TOPIC: getCurInfo = getCurInfoJj;break;
        default:return;
    }
    window.getCurInfo = getCurInfo;
}

function getCurInfoJj() {
    let title = $('.topic-box .title').eq(0).text();
    if(!title) return ;
    let len = $('.topic-box .count').eq(0).text();

    let tmpArr = CUR_HREF.split('/');
    let topicId = tmpArr[tmpArr.length - 1];
    const queryInfo = {
        url:'https://short-msg-ms.juejin.im/v1/pinList/topic',
        type:'GET',
        param:{
            token:'',
            topicId,
            uid:'',
            device_id:'',
            src:'web',
            page:0,
            pageSize:1,
            sortType:'newest',
        }
    };
    return {
        title,
        url:CUR_HREF,
        answerNum:len,
        queryInfo
    };
}
