import Constant from '../Constant';
const {TYPE_TOPIC,SITE_TIEBA} = Constant;
const origin = 'https://tieba.baidu.com';
const site = SITE_TIEBA;
const struct = [{regExp:/https?:\/\/tieba.baidu.com\/p\/[\d]+/,baseUrl:origin+'/p/',origin,type:TYPE_TOPIC,site}];

export default struct;
