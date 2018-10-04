import Constant from '../../config/Constant';

const {SITE_JUEJIN, TYPE_TOPIC,TYPE_USER} = Constant;

const site = SITE_JUEJIN;

function resolve(data) {
    console.log('juejin', data);
    return {title: data.d.list[0].topic.title, answerNum: data.d.total};
}

function resolveUser(data) {
    console.log('juejin user', data);
    let userObj = data.d;
    let answerNum = 0, title;
    for (let key in userObj) {
        if (userObj.hasOwnProperty(key)) {
            let {username, pinCount, postedEntriesCount, postedPostsCount} = userObj[key];
            answerNum = pinCount + postedPostsCount + postedEntriesCount;
            title = username;
        }
    }
    return {title, answerNum};
}

export default [
    {resolve, site, type: TYPE_TOPIC},
    {resolve:resolveUser,site,type: TYPE_USER}
];
