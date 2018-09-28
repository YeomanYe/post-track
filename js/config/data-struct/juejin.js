import Constant from '../Constant';
const {TYPE_ISSUE,SITE_CSDN} = Constant;
const origin = 'https://juejin.im';
const site = SITE_CSDN;
const struct = [{regExp:/https:\/\/juejin\.im\/topic/,baseUrl:origin,origin,type:TYPE_ISSUE,site}];

export default struct;
