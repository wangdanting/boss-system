import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

const RouteWithSubRoutes = route => (
  <Route
    path={route.path}
    exact={route.exact}
    strict={route.strict}
    sensitive={route.sensitive}
    render={props => {
      let childRoutes = null;
      if (route.routes || route.children) {
        const arr = route.routes || route.children;
        childRoutes = (
          <Switch>
            {arr.map((item, i) => {
              if (item.redirect) {
                return (
                  <Redirect
                    key={item.name || i}
                    from={item.path}
                    to={item.redirect}
                    exact
                    strict={item.strict}
                  />
                );
              }
              return <RouteWithSubRoutes key={item.name || i} {...item} />;
            })}
          </Switch>
        );
      }
      if (route.component) {
        return (
          <route.component {...props} route={route}>
            {childRoutes}
          </route.component>
        );
      }
      return childRoutes;
    }}
  />
);

const renderRoutes = routes => (
  <Switch>
    {routes.map(route => (
      <RouteWithSubRoutes key={route.path} {...route} />
    ))}
  </Switch>
);

export default renderRoutes;
