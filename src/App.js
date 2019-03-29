import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import rootReducer from './reducers';
import RenderRoutes from './utils/renderRoutes';
import routes from './router.config';

moment.locale('zh-cn');

const middleware = [thunk, createLogger()];
const store = createStore(rootReducer, applyMiddleware(...middleware));

const App = () => (
  <Provider store={store}>
    <Router>
      <LocaleProvider locale={zhCN}>{RenderRoutes(routes)}</LocaleProvider>
    </Router>
  </Provider>
);

export default App;
