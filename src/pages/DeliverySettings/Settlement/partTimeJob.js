import React from 'react';
import { Card, Tooltip, Icon } from 'antd';
import SettleItem from '../SettleItem';

const PartTimeJob = () => (
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
);

export default PartTimeJob;
