var _allBaseStoreObj = {};
function getBaseStoreObj(name,type){
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