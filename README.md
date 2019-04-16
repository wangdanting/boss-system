<div align="center">

  # redux状态管理案例系统

  ##### 一个简单的使用redux状态管理的系统

  ![登录页面](/src/excludeFile/login.jpg)
  ![状态查询列表](/src/excludeFile/1.jpg)
</div>

- 使用框架：[react](https://reactjs.org/)、
[redux](https://redux.js.org/)、[ant.design](https://ant.design/index-cn)、[less](http://lesscss.org/)
- 使用的路由技术：[react-router](https://reacttraining.com/react-router/web/guides/quick-start)
- 使用redux相关技术:[react-redux](https://react-redux.js.org/)、[react-router-redux](https://github.com/reactjs/react-router-redux)、[redux-logger](https://www.npmjs.com/package/redux-logger)、[redux-thunk](https://github.com/reduxjs/redux-thunk)、[reselect](https://github.com/reduxjs/reselect)
- 使用的网路请求库：[axios](https://github.com/axios/axios)
- 搭建环境技术：[webpack](https://webpack.js.org/)、[babel](https://babeljs.io/)、[eslint](https://eslint.org/)、[prettier](https://prettier.io/)、[stylelint](https://stylelint.io/)、[husky](https://www.npmjs.com/package/husky)、[lint-staged](https://www.npmjs.com/package/lint-staged)

## 命令行

#### `启动项目`

```bash
$ git clone git@github.com:wangdanting/redux-template-system.git
$ cd redux-template-system
$ yarn install
$ yarn start         # 访问 http://localhost:8087
```

#### `fix格式项目`(提交代码时会进行代码格式的检查，如果报错，则在命令行中输入👇命令，查看报错原因)

```bash
$ yarn lint:fix
```