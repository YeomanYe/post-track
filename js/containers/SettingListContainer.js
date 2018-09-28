import SettingList from '../components/SettingList';
import PageUtil from '../utils/PageUtil';
import showStore from '../store/ShowContent';
import colDataStore from '../store/ColData';

export default PageUtil.bindMobx(SettingList,{showStore,colDataStore});
