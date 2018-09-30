import Constant from '../Constant';
const {TYPE_ISSUE,SITE_STACK_OVERFLOW} = Constant;
const origin = 'https://stackoverflow.com';
const icon = '../../images/site-icon/stack-overflow.png';
const site = SITE_STACK_OVERFLOW;

const struct = [{regExp:/https?:\/\/stackoverflow.com\/questions\/[\d]+\/.+/,baseUrl:origin + '/questions/',origin,type:TYPE_ISSUE,icon,site}];

export default struct;
