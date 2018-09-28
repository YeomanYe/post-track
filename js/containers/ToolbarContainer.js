import Toolbar from '../components/Toolbar';
import PageUtil from '../utils/PageUtil';
import colDataStore from '../store/ColData';

export default PageUtil.bindMobx(Toolbar,{colDataStore});
