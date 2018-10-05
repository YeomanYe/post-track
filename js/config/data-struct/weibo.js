import Constant from '../Constant';

const {TYPE_TOPIC, SITE_WEIBO,TYPE_USER} = Constant;
const origin = 'https://weibo.com';
const site = SITE_WEIBO;
const struct = [
    {regExp: /https?:\/\/weibo\.com\/[\d]+\//, baseUrl: origin, origin, type: TYPE_TOPIC, site},
    {regExp: /https?:\/\/weibo\.com\/u\/[\d]+/, baseUrl: origin + '/u/', origin, type: TYPE_USER, site},
];

export default struct;
