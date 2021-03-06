import Constant from '../Constant';

const {TYPE_TOPIC,TYPE_USER, SITE_JUEJIN} = Constant;
const origin = 'https://juejin.im';
const site = SITE_JUEJIN;
const struct = [
    {regExp: /https?:\/\/juejin\.im\/topic/, baseUrl: `${origin}/topic/`, origin, type: TYPE_TOPIC, site},
    {regExp: /https?:\/\/juejin\.im\/user/, baseUrl: `${origin}/user/`, origin, type: TYPE_USER, site},
];

export default struct;
