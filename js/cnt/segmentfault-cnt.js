
$(function(){
    if(curHref.indexOf('segmentfault.com/q/') < 0)return;
    log(SITE_SEGMENT_FAULT);
    createBtn();
    _$imgToggle.on('click',toggleFavHandlerSf);
    _updateCurFavFun = updateSf;
    updateSf();
});

function toggleFavHandlerSf() {
    
}

function updateSf() {
    
}

function getCurInfoSf() {
    
}