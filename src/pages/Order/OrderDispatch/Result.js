import React from 'react';
import { Link } from 'react-router-dom';
import ResultTable from '@/components/ResultTable';

const columns = [
  {
    title: '订单号',
    dataIndex: 'expressOrderId',
    key: 'expressOrderId'
  },
  {
    title: '订单类型',
    dataIndex: 'orderWayName',
    key: 'orderWayName'
  },
  {
    title: '配送站',
    dataIndex: 'merchName',
    key: 'merchName'
  },
  {
    title: '发货信息',
    dataIndex: 'deliveryFromDesc',
    key: 'deliveryFromDesc',
    render: (text, record) => {
      return (
        <>
          {record.orderWay === 'jbg-proxy' && <p>{record.orderWayName}</p>}
          <p>{record.shopName}</p>
          <p>{record.fromMobile || ''}</p>
        </>
      );
    }
  },
  {
    title: '收货地址',
    dataIndex: 'destAddr',
    key: 'destAddr'
  },
  {
    title: '预计送达时间',
    dataIndex: 'expectArrivedFormat',
    key: 'expectArrivedFormat'
  },
  {
    title: '配送类型',
    dataIndex: 'orderType',
    key: 'orderType',
    render: text => {
      if (text === 'now') {
        return '立即配送';
      }
      if (text === 'predict') {
        return '预约配送';
      }
      return '';
    }
  },
  {
    title: '配送员',
    dataIndex: 'courierName',
    key: 'courierName'
  },
  {
    title: '操作',
    dataIndex: 'operate',
    key: 'operate',
    width: 100,
    render: (text, record) => {
      return <Link to={`/order/dispatch/detail/${record.expressOrderId}`}>重新分配</Link>;
    }
  }
];

const Result = React.memo(props => (
  <ResultTable {...props} columns={columns} keyStr='expressOrderId' />
));

export default Result;
