import React, { PureComponent } from 'react';
import { Row, Col } from 'antd';
import { connect } from 'react-redux';
import OrderInfo from './OrderInfo';
import AssignCourier from './AssignCourier';
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

  // /**
  //  * 分页改变
  //  */
  // changePagination = (current, pageSize) => {
  //   const { queryData: prevObj, dispatch } = this.props;
  //   const queryData = Object.assign({}, prevObj, { page: current - 1, size: pageSize });
  //   dispatch(handleSearch(queryData));
  //   dispatch(changeQueryData(queryData));
  // };

  render() {
    const {
      orderInfo,
      allotableCourier,
      dataTotal,
      queryData: { page, size }
    } = this.props;
    return (
      <Row>
        <Col xl={12} lg={24} md={24} sm={24} xs={24}>
          <OrderInfo data={orderInfo} />
        </Col>
        <Col xl={12} lg={24} md={24} sm={24} xs={24}>
          <AssignCourier
            data={allotableCourier}
            dataTotal={dataTotal}
            current={page}
            pageSize={size}
            handleChange={this.changePagination}
          />
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
