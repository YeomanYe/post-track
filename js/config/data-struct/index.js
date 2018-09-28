import Constant from '../Constant';
import ArrayUtil from '../../utils/ArrayUtil';

import zhihu from './zhihu';
import github from './github';
import segmentfault from './segmentfault';
import stackoverflow from './stackoverflow';
import csdn from './csdn';

const struct = {
    zhihu,github,segmentfault,stackoverflow,csdn
};
let _allBaseStoreObj = {};
const {TYPE_ISSUE,SITE_SEGMENT_FAULT,SITE_STACK_OVERFLOW,SITE_GITHUB,SITE_CSDN,SITE_ZHIHU} = Constant;
export function getBaseStruct(name,type = TYPE_ISSUE){
    let keys = Object.keys(_allBaseStoreObj);
    let origin;
    //说明name是origin
    if(name.search('http')>=0){
        origin = name;
    }
    let index = ArrayUtil.getIndexInStr(keys,name);
    if(index >= 0)
        return _allBaseStoreObj[keys[index]](origin,type);
}

export function getBaseStructByHref(){
    let href = window.location.href;
    let allStructs = [];
    for(let key in struct){
        if(struct.hasOwnProperty(key))
            allStructs = allStructs.concat(struct[key]);
    }
    let searchArr = allStructs.map(item => item.regExp);
    for(let regExp of searchArr){
        if(href.search(regExp) >= 0){
            const {origin,type,icon,baseUrl,site} = ArrayUtil.getItemEqStr(allStructs,{regExp});
            return _allBaseStoreObj[site](origin,type,baseUrl,icon)
        }
    }
    return {};
}

_allBaseStoreObj[SITE_SEGMENT_FAULT] = function (origin = 'https://segmentfault.com',type,baseUrl = origin + '/q/',icon = '../../images/site-icon/sf.jpg') {

    let storObj = {
        baseUrl,
        type,
        origin,
        site: SITE_SEGMENT_FAULT,
        siteName:'SegmentFault',
        icon
    };
    return storObj;
};

_allBaseStoreObj[SITE_GITHUB] = function (origin = 'https://github.com',type,baseUrl = origin,icon = '../../images/site-icon/github.png') {

    let storObj = {
        baseUrl:baseUrl,
        type:type,
        origin: origin,
        site: SITE_GITHUB,
        siteName:'GitHub',
        icon
    };
    return storObj;
};

_allBaseStoreObj[SITE_CSDN] = function (origin = 'https://ask.csdn.net',type,baseUrl = origin + '/questions/',icon = '../../images/site-icon/csdn.jpg') {

    let storObj = {
        baseUrl,
        type,
        origin,
        site: SITE_CSDN,
        siteName:'CSDN',
        icon
    };
    return storObj;
};

_allBaseStoreObj[SITE_STACK_OVERFLOW] = function (origin = 'https://stackoverflow.com',type,baseUrl = origin + '/questions/',icon = '../../images/site-icon/stack-overflow.png') {

    let storObj = {
        baseUrl,
        type,
        origin,
        site: SITE_STACK_OVERFLOW,
        siteName:'Stack Overflow',
        icon
    };
    return storObj;
};

_allBaseStoreObj[SITE_ZHIHU] = function (origin = 'https://www.zhihu.com',type,baseUrl = origin + '/question/',icon = '../../images/site-icon/zhihu.png') {
    let storObj = {
        baseUrl:baseUrl,
        type:type,
        origin: origin,
        site: SITE_ZHIHU,
        siteName:'知乎',
        icon
    };
    return storObj;
};
