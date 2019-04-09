import React from 'react';
import { Card, Divider } from 'antd';
import DescriptionList from '@/components/DescriptionList';

const { Description } = DescriptionList;

const OrderInfo = ({ data = {} }) => (
  <Card bordered={false} title='订单信息' style={{ marginRight: '15px' }}>
    <DescriptionList size='large' col={1}>
      <Description term='订单号'>{data.expressOrderId}</Description>
      <Description term='订单来源'>{data.orderSource}</Description>
      <Description term='订单类型'>{data.orderWayName}</Description>
      <Description term='配送站'>{data.merchName}</Description>
      <Description term='预计取件'>{data.expectFetchAtFormat}</Description>
      <Description term='预计送达'>{data.expectArrivedFormat}</Description>
    </DescriptionList>
    <Divider />
    <DescriptionList size='large' col={1}>
      <Description term='发货信息'>{data.shippingInformation}</Description>
      <Description term='取货地址'>{data.fromAddr}</Description>
    </DescriptionList>
    <Divider />
    <DescriptionList size='large' col={1}>
      <Description term='收货信息'>{data.destName}</Description>
      <Description term='配送地址'>{data.destAddr}</Description>
    </DescriptionList>
    <Divider />
    <DescriptionList size='large' col={1}>
      <Description term='配送员'>{data.courierName}</Description>
    </DescriptionList>
  </Card>
);

export default OrderInfo;
