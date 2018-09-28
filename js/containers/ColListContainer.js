import ColList from '../components/ColList';
import PageUtil from '../utils/PageUtil';
import colDataStore from '../store/ColData';
import showStore from '../store/ShowContent';

export default PageUtil.bindMobx(ColList,{colDataStore,showStore});
