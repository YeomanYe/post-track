var _allBaseStoreObj = {};
export function getBaseStruct(name,type){
    var keys = Object.keys(_allBaseStoreObj);
    var origin;
    //说明name是origin
    if(name.search('http')>=0){
        origin = name;
    }
    var index = arrInStr(keys,name);
    type = type ? type : TYPE_ISSUE;
    if(index >= 0)
        return _allBaseStoreObj[keys[index]](origin,type);
}

_allBaseStoreObj[SITE_SEGMENT_FAULT] = function (origin,type) {
    origin = origin ? origin : 'https://segmentfault.com';
    var baseUrl = origin + '/q/';

    storObj = {
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
    var baseUrl = origin;

    storObj = {
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
    var baseUrl = origin + '/questions/';

    storObj = {
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
    var baseUrl = origin + '/questions/';

    storObj = {
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
    var baseUrl = origin + '/question/';

    storObj = {
        baseUrl:baseUrl,
        type:type,
        origin: origin,
        site: SITE_ZHIHU,
        siteName:'知乎',
        icon:cGetUrl('images/site-icon/zhihu.png')
    };
    return storObj;
};
