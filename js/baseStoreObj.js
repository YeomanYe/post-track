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