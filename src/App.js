import React from 'react';
import { Router } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'react-router-redux';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import rootReducer from './reducers';
import RenderRoutes from './utils/renderRoutes';
import routes from './router.config';

moment.locale('zh-cn');

const history = createBrowserHistory();

const middleware = [thunk, createLogger(), routerMiddleware(history)];
const store = createStore(rootReducer, applyMiddleware(...middleware));

const App = () => (
  <Provider store={store}>
    <Router history={history}>
      <LocaleProvider locale={zhCN}>{RenderRoutes(routes)}</LocaleProvider>
    </Router>
  </Provider>
);

export default App;
