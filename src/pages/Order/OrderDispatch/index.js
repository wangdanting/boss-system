import React, { PureComponent } from 'react';
import { Card, Form, Row, Col, Radio, Input, Switch } from 'antd';
import { connect } from 'react-redux';
import classnames from 'classnames';
import Debounce from 'lodash-decorators/debounce';
import Bind from 'lodash-decorators/bind';
import { handleSearch, changeQueryData } from '@/actions/orderDispatch/orderList';
import { handleChangeVoiceSwitch, getVoiceSwitchStatus } from '@/actions/common';
import Result from './Result';
import './index.less';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

@Form.create()
class OrderDispatch extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getVoiceSwitchStatus());
  }

  @Bind()
  @Debounce(1000)
  setDebounce(queryData) {
    const { dispatch } = this.props;
    dispatch(handleSearch(queryData));
    dispatch(changeQueryData(queryData));
  }

  /**
   * 更新查询状态
   */
  changeStatus = (obj, key) => {
    const { dispatch, queryData: prevObj } = this.props;
    const queryData = Object.assign({}, prevObj, obj, { page: 0, size: 10 });
    if (key === 'status') {
      dispatch(handleSearch(queryData));
      dispatch(changeQueryData(queryData));
    } else {
      this.setDebounce(queryData);
    }
  };

  /**
   *处理查询状态改变
   * handle status query change
   */
  handleChange = (e, key) => {
    const obj = {};
    switch (key) {
      case 'status':
      case 'expressOrderId':
        obj[key] = e.target.value;
        break;
      default:
    }
    this.changeStatus(obj, key);
  };

  handleChangeVoiceSwitch = checked => {
    const { dispatch } = this.props;
    dispatch(handleChangeVoiceSwitch(checked));
  };

  render() {
    const {
      data,
      dataTotal,
      queryData: { page, size },
      voiceStatus
    } = this.props;
    return (
      <Card bordered={false} className='order-dispatch'>
        <Form layout='inline'>
          <Row>
            <Col>
              <FormItem label='订单状态'>
                <RadioGroup
                  defaultValue='notallocat'
                  onChange={e => this.handleChange(e, 'status')}
                >
                  <Radio value='notallocat'>未分配</Radio>
                  <Radio value='allocated'>已分配</Radio>
                  <Radio value='sending'>配送中</Radio>
                </RadioGroup>
              </FormItem>
            </Col>
            <Col>
              <FormItem label='订单号'>
                <Input allowClear onChange={e => this.handleChange(e, 'expressOrderId')} />
              </FormItem>
            </Col>
          </Row>
        </Form>
        <div className={classnames('common-right-top-btn', 'tip')}>
          新订单语音通知
          <Switch
            checkedChildren='开'
            unCheckedChildren='关'
            checked={voiceStatus}
            onChange={this.handleChangeVoiceSwitch}
          />
        </div>
        <Result
          data={data}
          dataTotal={dataTotal}
          current={page}
          pageSize={size}
          handleChange={this.changePagination}
        />
      </Card>
    );
  }
}

const mapStateToProps = state => {
  const { data, dataTotal, queryData } = state.orderDispatch.orderList;
  const { voiceStatus } = state.common;
  return {
    data,
    dataTotal,
    queryData,
    voiceStatus
  };
};

export default connect(mapStateToProps)(OrderDispatch);
