import Constant from '../Constant';
import ArrayUtil from '../../utils/ArrayUtil';

import zhihu from './zhihu';
import github from './github';
import segmentfault from './segmentfault';
import stackoverflow from './stackoverflow';
import csdn from './csdn';
import juejin from './juejin';
import tieba from './tieba';
import weibo from './weibo';

const allStructs = [].concat(
    zhihu, github, segmentfault,
    stackoverflow, csdn, juejin,
    tieba,weibo
);
const {TYPE_ISSUE, SITE_SEGMENT_FAULT, SITE_STACK_OVERFLOW, SITE_GITHUB, SITE_CSDN, SITE_ZHIHU, SITE_JUEJIN, SITE_TIEBA,SITE_WEIBO} = Constant;


let _allBaseStoreObj = {
    [SITE_ZHIHU]: {siteName: '知乎', icon: '../../images/site-icon/zhihu.png'},
    [SITE_GITHUB]: {siteName: 'GitHub', icon: '../../images/site-icon/github.png'},
    [SITE_CSDN]: {siteName: 'CSDN', icon: '../../images/site-icon/csdn.jpg'},
    [SITE_STACK_OVERFLOW]: {siteName: 'Stack Overflow', icon: '../../images/site-icon/stack-overflow.png'},
    [SITE_SEGMENT_FAULT]: {siteName: 'SegmentFault', icon: '../../images/site-icon/sf.jpg',},
    [SITE_JUEJIN]: {siteName: '掘金', icon: '../../images/site-icon/juejin.png'},
    [SITE_TIEBA]:{siteName:'贴吧',icon:'../../images/site-icon/tieba.jpg'},
    [SITE_WEIBO]:{siteName:'微博',icon:'../../images/site-icon/weibo.png'}
};

export function getBaseStruct(site, type = TYPE_ISSUE) {
    const {origin, baseUrl} = ArrayUtil.getItemEqStr(allStructs, {site, type});
    return createBaseStruct(origin, site, type, baseUrl);
}

export function getBaseStructByHref() {
    let href = window.location.href;
    let searchArr = allStructs.map(item => item.regExp);
    for (let regExp of searchArr) {
        if (href.search(regExp) >= 0) {
            const {origin, type, baseUrl, site} = ArrayUtil.getItemEqStr(allStructs, {regExp});
            return createBaseStruct(origin, site, type, baseUrl);
        }
    }
    return {};
}

function createBaseStruct(origin, site, type, baseUrl) {
    return {
        ..._allBaseStoreObj[site],
        site,
        origin,
        type,
        baseUrl
    }
}
