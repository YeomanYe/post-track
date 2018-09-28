import TogglePanel from '../components/TogglePanel';
import PageUtil from '../utils/PageUtil';
import showStore from '../store/ShowContent';

export default PageUtil.bindMobx(TogglePanel,{showStore});
