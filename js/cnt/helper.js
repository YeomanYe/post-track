import StoreUtil from '../utils/StoreUtil';
import ArrayUtil from '../utils/ArrayUtil';
import Constant from '../config/Constant';
import {showTips} from '../utils/UIUtil';
import {getBaseStructByHref} from '../config/data-struct';
import ColUtil from '../utils/ColUtil';

const {STOR_KEY_COLS,MSG_ADD_COL_SUC,MSG_DEL_COL_SUC} = Constant;
/**
 * 收藏或取消收藏
 * accessIndex是否访问目录页获取信息
 */
export async function toggleCol(resSend) {
    let obj = window.getCurInfo();
    let {baseUrl} = getBaseStructByHref();
    if(!baseUrl) return showTips('不支持当前页面');
    let {cols,allCols} = await ColUtil.getColsByHref();
    let index = ArrayUtil.getIndexEqStr(cols,{title:obj.title});
    let showMsg,isCol = false;
    if(index >= 0) {
        cols.splice(index,1);
        showMsg = MSG_DEL_COL_SUC;
    }else{
        obj.url = obj.url.replace(baseUrl,'');
        showMsg = MSG_ADD_COL_SUC;
        cols.push(obj);
        isCol = true;
    }
    showTips(showMsg);
    resSend({isCol});
    StoreUtil.save(STOR_KEY_COLS,allCols);
    console.log('allCols',allCols);
}

/**
 * 更新阅读记录
 */
export async function updatePageCol() {
    let curInfo = window.getCurInfo();
    let {cols,allCols} = await ColUtil.getColsByHref();
    if(!cols) return;
    //解析当前页面并更新阅读记录
    let index = ArrayUtil.getIndexEqStr(cols, {title: curInfo.title});
    if (index < 0) return;
    //更新图标
    let curItem = cols[index];
    curItem.timestamp = Date.now();
    //更新，当前更新的数量
    await ColUtil.decUpdateNum(curItem);
    StoreUtil.save('allCols', allCols);
}
