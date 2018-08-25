import {getBaseStoreObj} from '../utils/baseStoreObj';

var _$imgAss,_$imgToggle;
var curHref = location.origin + location.pathname;
var storLocal = chrome.storage.local;
var _src = {
    collect:cGetUrl('images/collect.png'),
    collectGrey:cGetUrl('images/collect-grey.png'),
    questionGrey:cGetUrl('images/question-grey.png'),
    questionBlue:cGetUrl('images/question-blue.png')
};
var _updateCurFavFun,_toggleCurCol;
//获取基本信息
var origin = location.origin,
    storObj = getBaseStoreObj(origin);
if(storObj){
    var baseUrl = storObj.baseUrl;
}
chrome.runtime.onMessage.addListener(function(msgArr,msgSenderObj,resSend) {
    switch (msgArr[0]) {
        case CNT_CMD_UPDATE_CUR_FAV:
            if(_updateCurFavFun) _updateCurFavFun();
            break;
        case CNT_CMD_TOGGLE_CUR_COL:
            if(!_toggleCurCol) return showTips('不支持当前页面');
            _toggleCurCol(resSend);
            break;
    }
    return true;
});
//创建按钮
function createBtn(){
    var $ul = $('<ul>');
    $ul.addClass('img-list');
    $ul.attr({draggable:true});
    _$imgToggle = addImgToUL($ul,_src.collectGrey,null,'收藏');
    _$imgAss = addImgToUL($ul,_src.questionBlue,toggleMenu,'切换菜单');
    // setDraggable($ul);
    $('body').append($ul);
}
//给ul列表中加入一个图片
function addImgToUL($ul,srcStr,clickHandler,title){
    var $li = $('<li>'),$img = $('<img>');
    $img.addClass('fab-img');
    $img.get(0).src = srcStr;
    $img.get(0).title = title;
    if(clickHandler) $img.on('click',clickHandler);
    $li.append($img);
    $ul.append($li);
    return $img;
}
/**
 * 设置元素可拖动
 */
function setDraggable($elm){
    var dragging = false;
    $elm.on('mousedown',function(evt){
        dragging = true;
    });
    $elm.on('mousemove',function(evt){
        if(!dragging) return;
        var clientX = evt.clientX,clientY = evt.clientY;
        var offsetX = evt.offsetX,offsetY = evt.offsetY;
        var elmWidth =$(this).width(),elmHeight = $(this).height();
        var winX = $(window).width(),winY = $(window).height();
        log('elmWidth',elmWidth,'elmHeight',elmHeight);
        log('offsetX',offsetX,'offsetY',offsetY);
        $(this).css({
            bottom:winY - clientY - elmHeight / 2,
            right:winX - clientX - elmWidth / 2,
        });
        log('move',evt);
    });
    $elm.on('mouseup',function(evt){
        dragging = false;
    });
}
/**
 * 切换菜单图标
 */
function toggleMenu(){
    var imgElm = _$imgAss.get(0);
    if(imgElm.src === _src.questionGrey){
        imgElm.src = _src.questionBlue;
    }else{
        imgElm.src = _src.questionGrey;
    }
    _$imgToggle.toggle();
}
/**
 * 收藏或取消收藏
 * accessIndex是否访问目录页获取信息
 */
function toggleCol(getCurInfo,resSend) {
    var obj = getCurInfo();
    var baseUrl = storObj.baseUrl;
    return function (cols,allCols) {
        var index = arrEqStr(cols,{title:obj.title});
        if(index >= 0) {
            cols.splice(index,1);
            showTips(MSG_DEL_COL_SUC);
            resSend({isCol:false});
            if(_$imgToggle) _$imgToggle.attr('src',_src.collectGrey);
        }else{
            obj.url = obj.url.replace(baseUrl,'');
            cols.push(obj);
            showTips(MSG_ADD_COL_SUC);
            resSend({isCol:true});
            if(_$imgToggle) _$imgToggle.attr('src',_src.collect);
        }
        storLocal.set({[STOR_KEY_COLS]:allCols});
        log('allCols',allCols);
    }
}
