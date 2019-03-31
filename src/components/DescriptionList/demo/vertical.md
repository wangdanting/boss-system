---
order: 2
title:
  zh-CN: 垂直型
---

垂直布局。

![垂直布局描述列表图片示例](../../../excludeFile/description-list-vertical.png)

````jsx
import DescriptionList from '@/component/DescriptionList';

const { Description } = DescriptionList;

ReactDOM.render(
  <DescriptionList size="large" title="title" layout="vertical">
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
