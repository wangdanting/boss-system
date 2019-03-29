import React, { PureComponent } from 'react';
import { Layout } from 'antd';
import Header from './Header';
import PageWrapper from './PageWrapper';
import getBreadcrumbData from '@/utils/handleBreadcrumb';
import MenuContext from './MenuContext';
import SideMenu from '@/components/SideMenu';

import './BasicLayout.less';

const { Content } = Layout;

class BasicLayout extends PureComponent {
  state = {
    menuData: []
  };

  componentDidMount() {
    const {
      route: { routes }
    } = this.props;
    const { menuData } = getBreadcrumbData(routes);
    this.setState({
      menuData
    });
  }

  getContext() {
    const {
      location,
      route: { routes }
    } = this.props;
    const { breadcrumbNameMap } = getBreadcrumbData(routes);
    return {
      location,
      breadcrumbNameMap
    };
  }

  render() {
    const { children, history, location } = this.props;
    const { menuData } = this.state;
    return (
      <Layout className='basic-layout'>
        <SideMenu menuData={menuData} location={location} />
        <Layout style={{ marginLeft: 170 }}>
          <Header history={history} />
          <Content className='content'>
            <MenuContext.Provider value={this.getContext()}>
              <PageWrapper location={location}>{children}</PageWrapper>
            </MenuContext.Provider>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default BasicLayout;
