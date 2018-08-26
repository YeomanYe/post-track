import createCSDNQuery from './csdn-bg';
import createGithubQuery from './github-bg';
import createSegmentfaultQuery from './segmentfault-bg';
import createStackoverflowQuery from './stackoverflow-bg';
import createZhihuQuery from './zhihu-bg';

function addAfterStore(queryFun, hangFun) {
    queryFun.afterStore = function (callback) {
        hangFun._afterStore = callback;
        return callback;
    };
}

export default {
    addAfterStore,
    createCSDNQuery,
    createGithubQuery,
    createSegmentfaultQuery,
    createStackoverflowQuery,
    createZhihuQuery
}
