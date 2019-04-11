import React, { PureComponent } from 'react';
import { Card, Form, Row, Col, Input, Button } from 'antd';
import { connect } from 'react-redux';
import Debounce from 'lodash-decorators/debounce';
import Bind from 'lodash-decorators/bind';
import { handleSearch, changeQueryData } from '@/actions/manageCourier/courierList';

const FormItem = Form.Item;

class ManageCourier extends PureComponent {
  /**
   * 更新查询状态
   */
  @Bind()
  @Debounce(1000)
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
      case 'mobile':
        obj[key] = e.target.value;
        break;
      default:
    }
    this.changeStatus(obj);
  };

  render() {
    return (
      <Card bordered={false}>
        <Form layout='inline'>
          <Row>
            <Col>
              <FormItem label='配送员手机号'>
                <Input allowClear onChange={e => this.handleChange(e, 'mobile')} />
              </FormItem>
            </Col>
          </Row>
        </Form>
        <Button
          type='primary'
          icon='plus'
          className='common-right-top-btn'
          onClick={this.goAddMiaoSha}
        >
          新增配送员
        </Button>
      </Card>
    );
  }
}

const mapStateToProps = state => {
  const { data, dataTotal, queryData } = state.manageCourier.courierList;
  return {
    data,
    dataTotal,
    queryData
  };
};

export default connect(mapStateToProps)(ManageCourier);
