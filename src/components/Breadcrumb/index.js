import React, { PureComponent, createElement } from 'react';
import { Breadcrumb } from 'antd';
import pathToRegexp from 'path-to-regexp';
import MenuContext from '@/layouts/MenuContext';
import { urlToList } from '@/utils/util';
import { Link } from 'react-router-dom';
import './index.less';

class BreadcrumbView extends PureComponent {
  static contextType = MenuContext;

  state = {
    breadcrumb: null
  };

  componentDidMount() {
    this.getBreadcrumbDom();
  }

  componentDidUpdate(preProps) {
    const { location } = this.props;
    if (!location || !preProps.location) {
      return;
    }
    const prePathname = preProps.location.pathname;
    if (prePathname !== location.pathname) {
      this.getBreadcrumbDom();
    }
  }

  getBreadcrumbDom = () => {
    const breadcrumb = this.conversionBreadcrumbList();
    this.setState({
      breadcrumb
    });
  };

  /**
   * 匹配路由
   */
  getBreadcrumb = (breadcrumbNameMap, url) => {
    let breadcrumb = breadcrumbNameMap[url];
    if (!breadcrumb) {
      Object.keys(breadcrumbNameMap).forEach(item => {
        if (pathToRegexp(item).test(url)) {
          breadcrumb = breadcrumbNameMap[item];
        }
      });
    }
    return breadcrumb || {};
  };

  /**
   * 根据 location 生成 面包屑
   * Generate breadcrumbs based on location
   */
  conversionFromLocation = (routerLocation, breadcrumbNameMap) => {
    const linkElement = Link;
    // Convert the url to an array
    const pathSnippets = urlToList(routerLocation.pathname);
    // Loop data mosaic routing
    const extraBreadcrumbItems = pathSnippets.map((url, index) => {
      const currentBreadcrumb = this.getBreadcrumb(breadcrumbNameMap, url);
      const isLinkable = index !== pathSnippets.length - 1 && currentBreadcrumb.component;
      const { name } = currentBreadcrumb;
      return name ? (
        <Breadcrumb.Item key={url}>
          {createElement(isLinkable ? linkElement : 'span', { to: url }, name)}
        </Breadcrumb.Item>
      ) : null;
    });

    return <Breadcrumb className='breadcrumb'>{extraBreadcrumbItems}</Breadcrumb>;
  };

  /**
   * 将参数转化为面包屑
   * Convert parameters into breadcrumbs
   */
  conversionBreadcrumbList = () => {
    const { location: routerLocation, breadcrumbNameMap } = this.context;
    // 根据 location 生成 面包屑
    if (routerLocation && routerLocation.pathname) {
      return this.conversionFromLocation(routerLocation, breadcrumbNameMap);
    }
    return null;
  };

  render() {
    const { breadcrumb } = this.state;
    return breadcrumb;
  }
}

export default BreadcrumbView;
