import React, {Component} from 'react';
import * as FileSaver from 'file-saver';
import PageUtil from '../utils/PageUtil';
import Constant from '../config/Constant';
import StoreUtil from '../utils/StoreUtil';
import {observer,inject} from 'mobx-react';

type State = {
    isShow: boolean
}
type Props = {

}

let {SHOW_SETTING,STOR_KEY_COLS} = Constant;
@inject('colDataStore', 'showStore')
@observer
export default class SettingList extends Component<Props,State> {


    constructor(props: any) {
        super(props);
        PageUtil.bindFun(this);
    }

    render() {
        let {showStore:{showContent},colDataStore:{setAllCols}} = this.props;
        return (
            <div id="content-setting-wrap" className={ showContent === SHOW_SETTING ? 'list' : 'hidden'}>
                <ul id="setting-list" className="list">
                    {/*<legend><img src="images/all-setting.png"/><span>全部设置</span></legend>*/}
                    <li onClick={exportFile}><i className="fa fa-cloud-download font-icon"/><span id="export">导出收藏</span></li>
                <li onClick={importFile}><i className="fa fa-cloud-download font-icon"/><span title="注意：导入收藏会覆盖当前所有的收藏" id="import">导入收藏</span></li>
                    <li><span>桌面提醒</span><input className="checkbox-switch" type="checkbox" id="switch-close-tip"/></li>
                    <input onChange={(e) => onFileChange(e,setAllCols)} type='file' hidden id='fileInput' />
                </ul>
            </div>
        );
    }
}
function importFile(){
    document.getElementById('fileInput').click();
}

function onFileChange(e,callback){
    let files = e.currentTarget.files;
    if (files.length) {
        let file = files[0],
            reader = new FileReader(); //new一个FileReader实例
        reader.onload = async function () {
            let data = JSON.parse(this.result);
            if(callback) callback(data.allCols);
        };
        reader.readAsText(file);
    }
    e.currentTarget.value = '';
}

async function exportFile(){
    let allCols = await StoreUtil.load(STOR_KEY_COLS);
    let blob = new Blob([JSON.stringify({allCols})], {
        type: 'text/plain;charset=utf-8'
    });
    FileSaver.saveAs(blob, 'PostTrack.json');
}
