import { observable, computed, reaction, action } from 'mobx';
import { types, onSnapshot,onAction } from 'mobx-state-tree';
import Constant from '../config/Constant';

const {SHOW_COL,SHOW_SETTING} = Constant;
const Store = types.model({
    showContent:SHOW_COL
}).actions(self => ({
    setShowContent(showContent){
        self.showContent = showContent;
    }
}));
const store = Store.create({});

export default store;
