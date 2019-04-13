import React from 'react';
import { Card, Alert, Tooltip, Icon } from 'antd';
import SettleItem from '../SettleItem';

const PartTimeJob = () => (
  <>
    <Alert
      message='请确保结算时段包含了所有营业时段，距离区间包含了站点的最大配送范围'
      description={
        <>
          <p>营业时段: 00:00-06:56 最大配送距离100km</p>
          <p>营业时段: 07:00-23:51 最大配送距离10000km</p>
        </>
      }
      type='info'
      showIcon
      style={{ marginBottom: '10px' }}
    />
    <Card
      title={
        <Tooltip placement='top' title='配送员每完成一个订单，根据结算规则核算配送员的收入'>
          （兼职）配送员结算规则
          <Icon type='info-circle' theme='outlined' />
        </Tooltip>
      }
    >
      <SettleItem />
    </Card>
  </>
);

export default PartTimeJob;
