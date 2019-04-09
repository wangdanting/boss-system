import React from 'react';
import { Button, Popconfirm, Card } from 'antd';
import ResultTable from '@/components/ResultTable';

const setAllotCourier = () => {};

const columns = [
  {
    title: '姓名',
    dataIndex: 'courierName',
    key: 'courierName',
    render: text => {
      return <span style={{ color: '#121212', fontSize: 13 }}>{text}</span>;
    }
  },
  {
    title: '待配送',
    dataIndex: 'carryNum',
    key: 'carryNum',
    render: text => {
      return (
        <>
          待配送：
          <span style={{ color: '#d01414' }}>{text}</span>
        </>
      );
    }
  },
  {
    title: '手机号',
    dataIndex: 'courierMobile',
    key: 'courierMobile'
  },
  {
    title: '操作',
    dataIndex: 'operate',
    key: 'operate',
    width: 100,
    render: (text, record) => {
      if (record.overAlert) {
        return (
          <Popconfirm
            placement='topRight'
            title='该配送员已经满载，是否将订单分配给他'
            onConfirm={() => setAllotCourier(record.expressCourierId)}
            okText='确认'
            cancelText='取消'
          >
            <Button type='primary'>分配给TA</Button>
          </Popconfirm>
        );
      }
      return (
        <Button type='primary' onClick={() => setAllotCourier(record.expressCourierId)}>
          分配给TA
        </Button>
      );
    }
  }
];

const AssignCourier = React.memo(props => (
  <Card bordered={false} title='请选择配送人员'>
    <ResultTable
      {...props}
      bordered={false}
      showHeader={false}
      columns={columns}
      size='default'
      keyStr='expressCourierId'
    />
  </Card>
));

export default AssignCourier;
