import Constant from '../Constant';
const {TYPE_ISSUE,SITE_SEGMENT_FAULT} = Constant;
const origin = 'https://segmentfault.com';
const icon = '../../images/site-icon/sf.jpg';
const site = SITE_SEGMENT_FAULT;

const struct = [{regExp:/segmentfault\.com\/q\//,baseUrl:origin+'/q/',origin,type:TYPE_ISSUE,icon,site}];

export default struct;
