import Constant from '../Constant';
const {TYPE_TOPIC,SITE_WEIBO} = Constant;
const origin = 'https://weibo.com';
const site = SITE_WEIBO;
const struct = [{regExp:/https?:\/\/weibo\.com\/[\d]+\//,baseUrl:origin,origin,type:TYPE_TOPIC,site}];

export default struct;
