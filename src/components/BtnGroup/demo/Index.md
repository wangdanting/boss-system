---
order: 1
title: ResultTable
---

表单页最下面的按钮。

![表单页最下面的按钮图片示例](../../../excludeFile/btn-group.png)

````jsx
import BtnGroup from '@/component/BtnGroup';

ReactDOM.render(
  <BtnGroup
    leftText='取消'
    leftOnClick={this.cancel}
    rightText='保存'
    rightOnClick={this.handleSubmit}
/>
, mountNode);
````
