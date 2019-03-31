import React, { PureComponent, Fragment } from 'react';
import { Form, Radio, Col, Row, DatePicker } from 'antd';
import { connect } from 'react-redux';
import moment from 'moment';
import { handleSearch, changeQueryData } from '@/actions/orderQuery/orderList/statusQuery';
import Result from './Result';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';
const todayRange = [moment(new Date(), dateFormat), moment(new Date(), dateFormat)]; // 时间范围搜索框的默认值

@Form.create()
class StatusQuery extends PureComponent {
  componentDidMount() {
    const { dispatch, queryData } = this.props;
    dispatch(handleSearch(queryData));
  }

  /**
   * 更新查询状态
   */
  changeStatus = obj => {
    const { dispatch, queryData: prevObj } = this.props;
    const queryData = Object.assign({}, prevObj, obj, { page: 0, size: 10 });
    dispatch(handleSearch(queryData));
    dispatch(changeQueryData(queryData));
  };

  /**
   *处理查询状态改变
   * handle status query change
   */
  handleChange = (e, key) => {
    const obj = {};
    switch (key) {
      case 'status':
      case 'orderWay':
        obj[key] = e.target.value;
        break;
      case 'range':
        obj.expectFetchCurrentStart = moment(e[0])
          .startOf('day')
          .valueOf();
        obj.expectFetchCurrentEnd = moment(e[1])
          .endOf('day')
          .valueOf();
        break;
      default:
    }

    this.changeStatus(obj);
  };

  /**
   * 分页改变
   */
  changePagination = (current, pageSize) => {
    const { queryData: prevObj, dispatch } = this.props;
    const queryData = Object.assign({}, prevObj, { page: current - 1, size: pageSize });
    dispatch(handleSearch(queryData));
    dispatch(changeQueryData(queryData));
  };

  render() {
    const {
      data,
      dataTotal,
      queryData: { page, size }
    } = this.props;
    return (
      <Fragment>
        <Form className='order-list' layout='inline'>
          <Row>
            <Col>
              <FormItem label='订单状态'>
                <RadioGroup defaultValue='all' onChange={e => this.handleChange(e, 'status')}>
                  <Radio value='all'>全部</Radio>
                  <Radio value='wait_send'>待配送</Radio>
                  <Radio value='sending'>配送中</Radio>
                  <Radio value='arrived'>已送达</Radio>
                  <Radio value='cancelled'>已取消</Radio>
                </RadioGroup>
              </FormItem>
            </Col>
            <Col>
              <FormItem label='订单类型'>
                <RadioGroup defaultValue='all' onChange={e => this.handleChange(e, 'orderWay')}>
                  <Radio value='all'>全部</Radio>
                  <Radio value='general'>普通下单</Radio>
                  <Radio value='fast'>一键下单</Radio>
                  <Radio value='proxy'>跑腿代购</Radio>
                </RadioGroup>
              </FormItem>
            </Col>
            <Col>
              <FormItem label='日期'>
                <RangePicker
                  style={{ width: 250 }}
                  defaultValue={todayRange}
                  format={dateFormat}
                  allowClear={false}
                  onChange={e => this.handleChange(e, 'range')}
                />
              </FormItem>
            </Col>
          </Row>
        </Form>
        <Result
          data={data}
          dataTotal={dataTotal}
          current={page}
          pageSize={size}
          handleChange={this.changePagination}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  const { data, dataTotal, queryData } = state.orderQuery.statusQuery;
  return {
    data,
    dataTotal,
    queryData
  };
};

export default connect(mapStateToProps)(StatusQuery);
