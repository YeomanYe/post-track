import Constant from '../../config/Constant';

const {SITE_JUEJIN,TYPE_TOPIC} = Constant;

function resolve(data) {
    console.log('juejin',data);
    return {title:data.d.list[0].topic.title, answerNum:data.d.total};
}
export default [{resolve,site:SITE_JUEJIN,type:TYPE_TOPIC}];
