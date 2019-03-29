import React, { Suspense } from 'react';
import { Layout } from 'antd';
import { getFlatMenuKeys } from './SiderMenuUtils';
import PageLoading from '../PageLoading';
import './index.less';

const BaseMenu = React.lazy(() => import('./BaseMenu'));
const { Sider } = Layout;

const SideMenu = React.memo(props => {
  const { menuData } = props;
  const flatMenuKeys = getFlatMenuKeys(menuData);
  return (
    <Sider className='sider-bar'>
      <Suspense fallback={<PageLoading />}>
        <BaseMenu {...props} flatMenuKeys={flatMenuKeys} />
      </Suspense>
    </Sider>
  );
});

export default SideMenu;
