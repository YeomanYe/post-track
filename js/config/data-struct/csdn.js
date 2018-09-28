import Constant from '../Constant';
const {TYPE_ISSUE,SITE_CSDN} = Constant;
const origin = 'https://ask.csdn.net';
const icon = '../../images/site-icon/csdn.jpg';
const site = SITE_CSDN;
const struct = [{regExp:/https:\/\/ask.csdn.net\/questions\/[\d]+/,baseUrl:origin+'/questions/',origin,type:TYPE_ISSUE,icon,site}];

export default struct;
