import memoizeOne from 'memoize-one';
import isEqual from 'lodash/isEqual';

/**
 * 将路由配置变成menu
 * @param {Object} routes 路由配置
 */
function formatter(routes) {
  return routes
    .map(route => {
      if (!route.name || !route.path) {
        return null;
      }
      const result = route;
      if (route.routes) {
        const children = formatter(route.routes);
        // 减少内存使用量
        result.children = children;
      }
      delete result.routes;
      return result;
    })
    .filter(item => item);
}
const memoizeOneFormatter = memoizeOne(formatter, isEqual);

/**
 * 获取面包屑映射
 * @param {Object} menuData 菜单配置
 */
function getBreadcrumbNameMap(menuData) {
  const routerMap = {};

  const flattenMenuData = data => {
    data.forEach(menuItem => {
      if (menuItem.children) {
        flattenMenuData(menuItem.children);
      }
      // Reduce memory usage
      routerMap[menuItem.path] = menuItem;
    });
  };
  flattenMenuData(menuData);
  return routerMap;
}

const memoizeOneGetBreadcrumbNameMap = memoizeOne(getBreadcrumbNameMap, isEqual);

const getSubMenu = item => {
  if (item.children && item.children.some(child => child.name)) {
    return {
      ...item,
      children: filterMenuData(item.children) // eslint-disable-line
    };
  }
  return item;
};

const filterMenuData = menuData => {
  if (!menuData) {
    return [];
  }
  return menuData.filter(item => item.name && !item.hideInMenu).map(item => getSubMenu(item));
};

const getMenuData = routes => {
  const originalMenuData = memoizeOneFormatter(routes);
  const menuData = filterMenuData(originalMenuData);
  const breadcrumbNameMap = memoizeOneGetBreadcrumbNameMap(originalMenuData);
  return { breadcrumbNameMap, menuData };
};

export default getMenuData;
