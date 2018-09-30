import Constant from '../../config/Constant';

const {SITE_WEIBO,TYPE_TOPIC} = Constant;

function resolve(data) {
    console.log('weibo',data);
    return {answerNum:data.data.count};
}
export default [{resolve,site:SITE_WEIBO,type:TYPE_TOPIC}];
