import Constant from '../Constant';
const {TYPE_TOPIC,SITE_JUEJIN} = Constant;
const origin = 'https://juejin.im';
const site = SITE_JUEJIN;
const struct = [{regExp:/https?:\/\/juejin\.im\/topic/,baseUrl:`${origin}/topic/`,origin,type:TYPE_TOPIC,site}];

export default struct;
