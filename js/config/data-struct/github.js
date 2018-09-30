import Constant from '../Constant';
const {TYPE_ISSUE,SITE_GITHUB} = Constant;
const origin = 'https://github.com';
const icon = '../../images/site-icon/github.png';
const site = SITE_GITHUB;

const struct = [{regExp:/https?:\/\/github.com\/.*\/issues\/[\d]+/,baseUrl:origin,origin,type:TYPE_ISSUE,icon,site}];

export default struct;
