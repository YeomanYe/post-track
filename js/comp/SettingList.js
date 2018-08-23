//@flow
import React, {Component} from 'react';
import Event from './Event';
import * as FileSaver from 'file-saver';
let switchTipsElm: Object;

type State = {
    isShow: boolean
}
type Props = {

}
let {SHOW_SETTING,getStoreLocal,Switch,storLocal,EVENT_CHANGE_CNT,bindInnerFun,STOR_KEY_IS_CLOSE_TIPS,STOR_KEY_COLS,STOR_KEY_UPDATE_NUM,EVENT_RELOAD_COL} = window;
export default class SettingList extends Component<Props,State> {

    cntChangeHandler(num: number){
        let isShow = false;
        if(num === SHOW_SETTING){
            if(!switchTipsElm)
            getStoreLocal(STOR_KEY_IS_CLOSE_TIPS,function (status: ?boolean) {
                status = !status;
                switchTipsElm = new Switch(document.getElementById('switch-close-tip'), {size: 'middle',onChange:function (e) {
                    var checked = switchTipsElm.getChecked();
                    storLocal.set({[STOR_KEY_IS_CLOSE_TIPS]:!checked});
                }});
                if(status) switchTipsElm.on();
            });
            isShow = true;

        }
        this.setState({isShow})
    }

    componentWillUnmount() {
        Event.unregister(Event.TYPE.CHANGE_CNT,this.cntChangeHandler);
    }

    constructor(props: any) {
        super(props);
        bindInnerFun(this);
        this.state = {
          isShow:false
        };
        Event.register(Event.TYPE.CHANGE_CNT,this.cntChangeHandler);
    }

    exportFile(){
        storLocal.get([STOR_KEY_COLS, STOR_KEY_UPDATE_NUM], function (resObj) {
            var blob = new Blob([JSON.stringify(resObj)], {
                type: 'text/plain;charset=utf-8'
            });
            FileSaver.saveAs(blob, 'PostTrack.json');
        })
    }

    importFile(){
        document.getElementById('fileInput').click();
    }

    onFileChange(e){
        var files = e.currentTarget.files;
        if (files.length) {
            var file = files[0],
                reader = new FileReader(); //new一个FileReader实例
            reader.onload = function () {
                var data = JSON.parse(this.result);
                storLocal.set(data,function () {
                    Event.emit(Event.TYPE.RELOAD_COL);
                });
            };
            reader.readAsText(file);
        }
        e.currentTarget.value = '';
    }

    render() {
        let {isShow} = this.state;
        return (
            <div id="content-setting-wrap" className={ isShow ? 'list' : 'hidden'}>
                <ul id="setting-list" class="list">
                    {/*<legend><img src="images/all-setting.png"/><span>全部设置</span></legend>*/}
                    <li onClick={this.exportFile}><i class="fa fa-cloud-download font-icon"/><span id="export">导出收藏</span></li>
                <li onClick={this.importFile}><i class="fa fa-cloud-download font-icon"/><span title="注意：导入收藏会覆盖当前所有的收藏" id="import">导入收藏</span></li>
                    <li><span>桌面提醒</span><input className="checkbox-switch" type="checkbox" id="switch-close-tip"/></li>
                    <input onChange={this.onFileChange} type='file' hidden id='fileInput' />
                </ul>

            </div>
        );
    }
}
