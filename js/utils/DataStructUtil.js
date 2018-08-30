import Constant from '../config/Constant';
import ArrayUtil from './ArrayUtil';

let _allBaseStoreObj = {};
let cGetUrl = chrome.runtime.getURL;
const {TYPE_ISSUE,SITE_SEGMENT_FAULT,SITE_STACK_OVERFLOW,SITE_GITHUB,SITE_CSDN,SITE_ZHIHU} = Constant;
export function getBaseStruct(name,type){
    let keys = Object.keys(_allBaseStoreObj);
    let origin;
    //说明name是origin
    if(name.search('http')>=0){
        origin = name;
    }
    let index = ArrayUtil.arrInStr(keys,name);
    type = type ? type : TYPE_ISSUE;
    if(index >= 0)
        return _allBaseStoreObj[keys[index]](origin,type);
}

_allBaseStoreObj[SITE_SEGMENT_FAULT] = function (origin,type) {
    origin = origin ? origin : 'https://segmentfault.com';
    let baseUrl = origin + '/q/';

    let storObj = {
        baseUrl:baseUrl,
        type:type,
        origin: origin,
        site: SITE_SEGMENT_FAULT,
        siteName:'SegmentFault',
        icon:cGetUrl('images/site-icon/sf.jpg')
    };
    return storObj;
};

_allBaseStoreObj[SITE_GITHUB] = function (origin,type) {
    origin = origin ? origin : 'https://github.com';
    let baseUrl = origin;

    let storObj = {
        baseUrl:baseUrl,
        type:type,
        origin: origin,
        site: SITE_GITHUB,
        siteName:'GitHub',
        icon:cGetUrl('images/site-icon/github.png')
    };
    return storObj;
};

_allBaseStoreObj[SITE_CSDN] = function (origin,type) {
    origin = origin ? origin : 'https://ask.csdn.net';
    let baseUrl = origin + '/questions/';

    let storObj = {
        baseUrl:baseUrl,
        type:type,
        origin: origin,
        site: SITE_CSDN,
        siteName:'CSDN',
        icon:cGetUrl('images/site-icon/csdn.jpg')
    };
    return storObj;
};

_allBaseStoreObj[SITE_STACK_OVERFLOW] = function (origin,type) {
    origin = origin ? origin : 'https://stackoverflow.com';
    let baseUrl = origin + '/questions/';

    let storObj = {
        baseUrl:baseUrl,
        type:type,
        origin: origin,
        site: SITE_STACK_OVERFLOW,
        siteName:'Stack Overflow',
        icon:cGetUrl('images/site-icon/stack-overflow.png')
    };
    return storObj;
};

_allBaseStoreObj[SITE_ZHIHU] = function (origin,type) {
    origin = origin ? origin : 'https://www.zhihu.com';
    let baseUrl = origin + '/question/';

    let storObj = {
        baseUrl:baseUrl,
        type:type,
        origin: origin,
        site: SITE_ZHIHU,
        siteName:'知乎',
        icon:cGetUrl('images/site-icon/zhihu.png')
    };
    return storObj;
};
