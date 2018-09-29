import Constant from '../Constant';
const {TYPE_ISSUE,SITE_CSDN} = Constant;
const origin = 'https://ask.csdn.net';
const site = SITE_CSDN;
const struct = [{regExp:/https:\/\/ask.csdn.net\/questions\/[\d]+/,baseUrl:origin+'/questions/',origin,type:TYPE_ISSUE,site}];

export default struct;
