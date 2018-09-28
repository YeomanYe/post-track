let CUR_HREF = location.origin + location.pathname;
export default {
    CUR_HREF,
    TYPE_ISSUE: 'issue', //问题
    TYPE_ARTICLE:'article',//文章
    TYPE_TOPIC:'topic', //话题
    TYPE_POST:'post', //帖子

    BG_CMD_UPDATE_NUM: 'updateNumChange',
    BG_CMD_UPDATE_FAV_BTN: 'updateFavBtn', //更新content页的favbtn图标

    CNT_CMD_UPDATE_CUR_FAV: 'updateCurFav',//content页 命令
    CNT_CMD_TOGGLE_CUR_COL: 'toggleCurCol',//切换收藏

    STOR_KEY_COLS: 'allCols',
    STOR_KEY_IS_CLOSE_TIPS: 'isCloseTips',

    MSG_ADD_COL_SUC: '收藏成功',
    MSG_DEL_COL_SUC: '取消收藏成功',

    SITE_SEGMENT_FAULT: 'segmentfault',
    SITE_GITHUB: 'github',
    SITE_CSDN: 'csdn',
    SITE_STACK_OVERFLOW: 'stackoverflow',
    SITE_ZHIHU: 'zhihu',
    SITE_JUEJIN:'juejin',

    TIME_SHORT: 1000,
    TIME_LONG: 5 * 1000,

    SHOW_COL: 0,
    SHOW_SETTING: 1
}
