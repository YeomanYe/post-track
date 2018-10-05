import Constant from '../../config/Constant';

const {SITE_WEIBO, TYPE_TOPIC, TYPE_USER} = Constant;
const site = SITE_WEIBO;

function resolve(data) {
    console.log('weibo', data);
    return {answerNum: data.data.count};
}

function resolveUser(data) {
    console.log('weibo user data',data);
    let matchArr = data.match(/<strong class=\\"W_f12\\">([\d]+)<\\\/strong><span class=\\"S_txt2\\">微博<\\\/span>/);
    console.log('weibo user',matchArr);
    let answerNum = matchArr[1];
    return {answerNum};
}

export default [
    {resolve, site, type: TYPE_TOPIC},
    {resolve: resolveUser, site, type: TYPE_USER}
];
