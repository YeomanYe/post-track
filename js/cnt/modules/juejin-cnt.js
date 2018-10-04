import Constant from '../../config/Constant';
import structObjArr from '../../config/data-struct/juejin';
import {getTypeByHref} from '../helper';
import $ from 'jquery';

const {TYPE_TOPIC,CUR_HREF,TYPE_USER} = Constant;
export default function(){
    let type = getTypeByHref(structObjArr);
    let getCurInfo;
    switch (type){
        case TYPE_TOPIC: getCurInfo = getCurInfoJj;break;
        case TYPE_USER:getCurInfo = getCurUserInfo;break;
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

function getCurUserInfo() {
    let title = $('.username').eq(0).text();
    if(!title) return ;
    let $itemCnt = $('.item-count');
    let zlNum = +$itemCnt.eq(0).text(),
        fdNum = +$itemCnt.eq(1).text(),
        fxNum = +$itemCnt.eq(2).text();

    let tmpArr = CUR_HREF.split('/');
    let ids = tmpArr[tmpArr.length - 1];
    const queryInfo = {
        url:'https://lccro-api-ms.juejin.im/v1/get_multi_user',
        type:'GET',
        param:{
            token:'',
            uid:'',
            device_id:'',
            src:'web',
            ids,
            cols:'viewedEntriesCount|role|totalCollectionsCount|allowNotification|subscribedTagsCount|appliedEditorAt|email|followersCount|postedEntriesCount|latestCollectionUserNotification|commentedEntriesCount|weeklyEmail|collectedEntriesCount|postedPostsCount|username|latestLoginedInAt|totalHotIndex|blogAddress|selfDescription|latestCheckedNotificationAt|emailVerified|totalCommentsCount|installation|blacklist|weiboId|mobilePhoneNumber|apply|followeesCount|deviceType|editorType|jobTitle|company|latestVoteLikeUserNotification|authData|avatarLarge|mobilePhoneVerified|objectId|createdAt|updatedAt'
        }
    };
    return {
        title,
        url:CUR_HREF,
        answerNum:zlNum + fdNum + fxNum,
        queryInfo
    };
}
