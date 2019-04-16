<div align="center">

  # redux状态管理案例系统

  ##### 一个简单的使用redux状态管理的系统

  ![登录页面](/src/excludeFile/login.jpg)
  ![状态查询列表](/src/excludeFile/1.jpg)
</div>

- 使用框架：[react](https://reactjs.org/)、
[redux](https://redux.js.org/)、[ant.design](https://ant.design/index-cn)、[less](http://lesscss.org/)
- 使用的路由技术：[react-router](https://reacttraining.com/react-router/web/guides/quick-start)
- 使用redux相关技术: [react-redux](https://react-redux.js.org/)、[react-router-redux](https://github.com/reactjs/react-router-redux)、[redux-logger](https://www.npmjs.com/package/redux-logger)、[redux-thunk](https://github.com/reduxjs/redux-thunk)、[reselect](https://github.com/reduxjs/reselect)
- 使用的网路请求库：[axios](https://github.com/axios/axios)
- 搭建环境技术：[webpack](https://webpack.js.org/)、[babel](https://babeljs.io/)、[eslint](https://eslint.org/)、[prettier](https://prettier.io/)、[stylelint](https://stylelint.io/)、[husky](https://www.npmjs.com/package/husky)、[lint-staged](https://www.npmjs.com/package/lint-staged)

### 特性

- 最新技术栈：
-
-

## 命令行

- #### `启动项目`

```bash
$ git clone git@github.com:wangdanting/redux-template-system.git
$ cd redux-template-system
$ yarn install
$ yarn start         # 访问 http://localhost:8087
```

- #### `fix格式项目`(提交代码时会进行代码格式的检查，如果报错，则在命令行中输入👇命令，查看报错原因)

```bash
$ yarn lint:fix
```

## 支持环境

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari|
| --------- | --------- |
| last 2 versions| last 2 versions


## 模版

```
- actions (redux actions文件)
- common (公共资源文件)
- components (封装组件)
  - BtnGroup (表单最地下的两个按钮)
  - DescriptionList (描述列表)
  - ResultTable (table分页)
  - UploadImg (上传/编辑图片)
- constants (actions 变量)
- excludeFile (不打包编译的文件)
- layouts (框架布局)
- pages (业务)
  - Courier
  - DeliverySettings
  - Login
  - Order
- utils
  - exportFile (封装下载文件)
  - handleBreadcrumb (封装处理面包屑导航)
  - pubsubmsg (封装订阅和发布)
  - renderRoutes (封装处理路由)
  - request (封装请求)
  - storage (封装Storage)
  - util (公共方法)
- router.config.js (路由配置)
- variables.less (less变量)
```

## 案例

- 关键字查询列表与详情页

<div align="center">

  ![状态查询列表](/src/excludeFile/4.jpg)
  ![详情列表](/src/excludeFile/3.png)

</div>

- 表单新增与编辑

<div align="center">

  ![新增表单](/src/excludeFile/5.jpg)
  ![编辑表单](/src/excludeFile/6.png)

</div>