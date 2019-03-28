import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import RenderRoutes from './utils/renderRoutes';
import routes from './router.config';

moment.locale('zh-cn');

const App = () => (
  <Router>
    <LocaleProvider locale={zhCN}>{RenderRoutes(routes)}</LocaleProvider>
  </Router>
);

export default App;
