import React, { PureComponent } from 'react';
import { Row, Col, Card } from 'antd';
import { connect } from 'react-redux';
import OrderInfo from './OrderInfo';
import { getOrderInfo, getAllotableCourier } from '@/actions/orderDispatch/orderDetail';

class OrderDetail extends PureComponent {
  componentDidMount() {
    const {
      match: {
        params: { id }
      },
      dispatch
    } = this.props;
    if (id) {
      const queryData = {
        orderId: id,
        page: 0,
        size: 10
      };
      dispatch(getOrderInfo(id));
      dispatch(getAllotableCourier(queryData));
    }
  }

  render() {
    const { orderInfo } = this.props;
    return (
      <Row>
        <Col xl={12} lg={24} md={24} sm={24} xs={24}>
          <OrderInfo data={orderInfo} />
        </Col>
        <Col xl={12} lg={24} md={24} sm={24} xs={24}>
          <Card bordered={false} title='请选择配送人员' />
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => {
  const { orderInfo, allotableCourier, dataTotal, queryData } = state.orderDispatch.orderDetail;
  return {
    orderInfo,
    allotableCourier,
    dataTotal,
    queryData
  };
};

export default connect(mapStateToProps)(OrderDetail);
