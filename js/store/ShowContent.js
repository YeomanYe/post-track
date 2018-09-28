import {onSnapshot, types} from 'mobx-state-tree';
import Constant from '../config/Constant';
import StoreUtil from '../utils/StoreUtil';

const {SHOW_COL,SHOW_SETTING,STOR_KEY_IS_CLOSE_TIPS} = Constant;
const Store = types.model({
    showContent:SHOW_COL
}).actions(self => ({
    setShowContent(showContent){
        self.showContent = showContent;
    }
}));
const store = Store.create({});
// 用于初始化switch
let switchTipsElm;
onSnapshot(store,async (snapshot) => {
    if(snapshot.showContent === SHOW_SETTING){
        if(!switchTipsElm){
            let status = await StoreUtil.load(STOR_KEY_IS_CLOSE_TIPS);
            status = !status;
            switchTipsElm = new Switch(document.getElementById('switch-close-tip'), {size: 'middle',onChange:function (e) {
                    let checked = switchTipsElm.getChecked();
                    StoreUtil.save(STOR_KEY_IS_CLOSE_TIPS,!checked);
                }});
            if(status) switchTipsElm.on();
        }
    }
});
export default store;
