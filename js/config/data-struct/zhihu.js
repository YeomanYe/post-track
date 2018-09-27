import Constant from '../Constant';
const {TYPE_ISSUE,SITE_ZHIHU} = Constant;
const origin = 'https://www.zhihu.com';
const icon = '../../images/site-icon/zhihu.png';
const site = SITE_ZHIHU;

const struct = [{regExp:/zhihu.com\/question\/[\d]+/,baseUrl:origin+'/question/',origin,type:TYPE_ISSUE,icon,site}];

export default struct;
