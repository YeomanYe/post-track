import StoreUtil from '../utils/StoreUtil';
import ArrayUtil from '../utils/ArrayUtil';
import Constant from '../config/Constant';
import {showTips} from '../utils/UIUtil';

const {STOR_KEY_COLS,MSG_ADD_COL_SUC,MSG_DEL_COL_SUC} = Constant;
/**
 * 收藏或取消收藏
 * accessIndex是否访问目录页获取信息
 */
export function toggleCol(getCurInfo,resSend) {
    let obj = getCurInfo();
    let baseUrl = storObj.baseUrl;
    return function (cols,allCols) {
        let index = ArrayUtil.arrEqStr(cols,{title:obj.title});
        let showMsg,sendObj;
        if(index >= 0) {
            cols.splice(index,1);
            showMsg = MSG_DEL_COL_SUC;
            sendObj = {isCols:false};
        }else{
            obj.url = obj.url.replace(baseUrl,'');
            showMsg = MSG_ADD_COL_SUC;
            cols.push(obj);
            sendObj = {isCol:true};
        }
        showTips(showMsg);
        resSend(sendObj);
        StoreUtil.save(STOR_KEY_COLS,allCols);
        console.log('allCols',allCols);
    }
}
