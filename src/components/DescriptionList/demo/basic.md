---
order: 0
title:
  zh-CN: 基本
---

基本描述列表。

![基本描述列表图片示例](../../../excludeFile/description-list-basic.png)

````jsx
import DescriptionList from '@/component/DescriptionList';

const { Description } = DescriptionList;

ReactDOM.render(
  <DescriptionList size="large" title="title">
    <Description term="Firefox">
      A free, open source, cross-platform,
      graphical web browser developed by the
      Mozilla Corporation and hundreds of
      volunteers.
    </Description>
    <Description term="Firefox">
      A free, open source, cross-platform,
      graphical web browser developed by the
      Mozilla Corporation and hundreds of
      volunteers.
    </Description>
    <Description term="Firefox">
      A free, open source, cross-platform,
      graphical web browser developed by the
      Mozilla Corporation and hundreds of
      volunteers.
    </Description>
  </DescriptionList>
, mountNode);
````
