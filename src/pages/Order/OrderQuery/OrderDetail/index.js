import React, { PureComponent } from 'react';
import { Card, Steps, Divider } from 'antd';
import { connect } from 'react-redux';
import DescriptionList from '@/components/DescriptionList';
import { getOrderInfo } from '@/actions/orderQuery/OrderDetail';

const { Step } = Steps;
const { Description } = DescriptionList;

class OrderDetail extends PureComponent {
  componentDidMount() {
    const {
      match: {
        params: { id }
      },
      dispatch
    } = this.props;
    if (id) {
      dispatch(getOrderInfo(id));
    }
  }

  render() {
    const { expressOrderStatuses, orderDetail } = this.props;
    let current = -1;
    const steps = expressOrderStatuses.map(item => {
      if (item.createdAt) {
        current += 1;
      }
      return <Step key={item.status} title={item.statusName} description={item.createdAtFormat} />;
    });
    return (
      <>
        <Card title='订单流程' bordered={false}>
          <Steps current={current} size='small'>
            {steps}
          </Steps>
        </Card>
        <Card title='订单信息' bordered={false} style={{ marginTop: 25 }}>
          <DescriptionList size='large' title='基本信息'>
            <Description term='订单号'>{orderDetail.expressOrderId}</Description>
            <Description term='订单来源'>{orderDetail.orderSource}</Description>
            <Description term='订单类型'>{orderDetail.orderWayName}</Description>
            <Description term='配送站'>{orderDetail.merchName}</Description>
            <Description term='预计取件'>
              {orderDetail.orderWay !== 'applet-proxy' && orderDetail.orderType === 'now'
                ? `立即取件（${orderDetail.expectFetchAtFormat}）`
                : `预约取件（${orderDetail.expectFetchAtFormat}）`}
            </Description>
            <Description term='预计送达'>
              {orderDetail.orderDeliveryInfoState &&
              orderDetail.orderWay === 'applet-proxy' &&
              orderDetail.orderType === 'predict'
                ? `预计送达（${orderDetail.expectArrivedFormat}）`
                : orderDetail.expectArrivedFormat}
            </Description>
          </DescriptionList>
          <Divider />
          <DescriptionList size='large' title='发货信息'>
            <Description term='发货信息'>
              {`${orderDetail.shippingInformation}（${orderDetail.shippingInformationMobie}）`}
            </Description>
            <Description term='取货地址'>{orderDetail.fromAddr}</Description>
          </DescriptionList>
          <Divider />
          <DescriptionList size='large' title='收货信息'>
            <Description term='收货信息'>
              {`${orderDetail.destName}（${orderDetail.destMobile}）`}
            </Description>
            <Description term='配送地址'>{orderDetail.destAddr}</Description>
          </DescriptionList>
          <Divider />
          <DescriptionList size='large' title='配送信息'>
            <Description term='配送员'>
              {`${orderDetail.courierName}（${orderDetail.courierMobile}）`}
            </Description>
          </DescriptionList>
        </Card>
      </>
    );
  }
}

const mapStateToProps = state => {
  const {
    orderDetail: { expressOrderStatuses = [] },
    orderDetail
  } = state.orderQuery;
  return {
    expressOrderStatuses,
    orderDetail
  };
};

export default connect(mapStateToProps)(OrderDetail);
