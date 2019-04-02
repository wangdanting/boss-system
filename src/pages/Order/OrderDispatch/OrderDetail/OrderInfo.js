import React, { PureComponent } from 'react';
import { Card, Divider } from 'antd';
import DescriptionList from '@/components/DescriptionList';

const { Description } = DescriptionList;

class OrderInfo extends PureComponent {
  render() {
    return (
      <Card bordered={false} title='订单信息' style={{ marginRight: '15px' }}>
        <DescriptionList size='large' col={1}>
          <Description term='订单号'>a</Description>
          <Description term='订单来源'>b</Description>
          <Description term='订单类型'>c</Description>
          <Description term='配送站'>a</Description>
          <Description term='预计取件'>b</Description>
          <Description term='预计送达'>c</Description>
        </DescriptionList>
        <Divider />
        <DescriptionList size='large' col={1}>
          <Description term='发货信息'>a</Description>
          <Description term='取货地址'>b</Description>
        </DescriptionList>
        <Divider />
        <DescriptionList size='large' col={1}>
          <Description term='收货信息'>a</Description>
          <Description term='配送地址'>b</Description>
        </DescriptionList>
        <Divider />
        <DescriptionList size='large' col={1}>
          <Description term='配送员'>a</Description>
        </DescriptionList>
      </Card>
    );
  }
}

export default OrderInfo;
