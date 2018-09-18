import React, {Component} from 'react';
import Event from '../utils/Event';
import * as FileSaver from 'file-saver';
import PageUtil from '../utils/PageUtil';
import Constant from '../config/Constant';
import StoreUtil from '../utils/StoreUtil';
let switchTipsElm: Object;

type State = {
    isShow: boolean
}
type Props = {

}
let {Switch} = window;

let {SHOW_SETTING,STOR_KEY_IS_CLOSE_TIPS,STOR_KEY_COLS,STOR_KEY_UPDATE_NUM} = Constant;
export default class SettingList extends Component<Props,State> {

    async cntChangeHandler(num: number){
        let isShow = false;
        if(num === SHOW_SETTING) isShow = true;
        let initSwitch = async function(){
            if(num === SHOW_SETTING){
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
        };
        //switch必须在内容显示出来之后才能进行初始化。
        this.setState({isShow},initSwitch);
    }

    componentWillUnmount() {
        Event.unregister(Event.TYPE.CHANGE_CNT,this.cntChangeHandler);
    }

    constructor(props: any) {
        super(props);
        PageUtil.bindFun(this);
        this.state = {
          isShow:false
        };
        Event.register(Event.TYPE.CHANGE_CNT,this.cntChangeHandler);
    }

    async exportFile(){
        let [allCols,updateNum] = await StoreUtil.load([STOR_KEY_COLS,STOR_KEY_UPDATE_NUM]);
        let blob = new Blob([JSON.stringify({allCols,updateNum})], {
            type: 'text/plain;charset=utf-8'
        });
        FileSaver.saveAs(blob, 'PostTrack.json');
    }

    importFile(){
        document.getElementById('fileInput').click();
    }

    onFileChange(e){
        let files = e.currentTarget.files;
        if (files.length) {
            let file = files[0],
                reader = new FileReader(); //new一个FileReader实例
            reader.onload = async function () {
                let data = JSON.parse(this.result);
                await StoreUtil.save(data);
                Event.emit(Event.TYPE.RELOAD_COL);
            };
            reader.readAsText(file);
        }
        e.currentTarget.value = '';
    }

    render() {
        let {isShow} = this.state;
        return (
            <div id="content-setting-wrap" className={ isShow ? 'list' : 'hidden'}>
                <ul id="setting-list" className="list">
                    {/*<legend><img src="images/all-setting.png"/><span>全部设置</span></legend>*/}
                    <li onClick={this.exportFile}><i className="fa fa-cloud-download font-icon"/><span id="export">导出收藏</span></li>
                <li onClick={this.importFile}><i className="fa fa-cloud-download font-icon"/><span title="注意：导入收藏会覆盖当前所有的收藏" id="import">导入收藏</span></li>
                    <li><span>桌面提醒</span><input className="checkbox-switch" type="checkbox" id="switch-close-tip"/></li>
                    <input onChange={this.onFileChange} type='file' hidden id='fileInput' />
                </ul>
            </div>
        );
    }
}
