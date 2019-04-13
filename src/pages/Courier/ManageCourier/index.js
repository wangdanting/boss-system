import React, { PureComponent } from 'react';
import { Card, Form, Row, Col, Input, Button, Popconfirm } from 'antd';
import { connect } from 'react-redux';
import Debounce from 'lodash-decorators/debounce';
import Bind from 'lodash-decorators/bind';
import {
  handleSearch,
  changeQueryData,
  setCourierStatus,
  changeSelectedRowKeys,
  batchStopCourier
} from '@/actions/manageCourier/courierList';
import Result from './Result';

const FormItem = Form.Item;

class ManageCourier extends PureComponent {
  componentDidMount() {
    const { dispatch, queryData } = this.props;
    dispatch(handleSearch(queryData));
  }

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

  /**
   * 分页改变
   */
  changePagination = (current, pageSize) => {
    const { queryData: prevObj, dispatch } = this.props;
    const queryData = Object.assign({}, prevObj, { page: current - 1, size: pageSize });
    dispatch(handleSearch(queryData));
    dispatch(changeQueryData(queryData));
  };

  /**
   * 改变工作状态
   */
  setCourierStatus = (id, status) => {
    const { dispatch } = this.props;
    dispatch(setCourierStatus(id, status));
  };

  /**
   * 批量选择
   */
  onSelectChange = selectedRowKeys => {
    const { dispatch } = this.props;
    dispatch(changeSelectedRowKeys(selectedRowKeys));
  };

  /**
   * 批量停用快递员
   */
  batchStopCourier = () => {
    const { dispatch } = this.props;
    dispatch(batchStopCourier());
  };

  render() {
    const {
      data,
      dataTotal,
      selectedRowKeys,
      queryData: { page, size }
    } = this.props;

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    };

    const hasSelected = selectedRowKeys.length > 0;

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
        <Popconfirm
          placement='topLeft'
          title='是否确认停用该快递员，停用后，该快递员将被删除。'
          onConfirm={this.batchStopCourier}
          okText='确定'
          cancelText='取消'
        >
          <Button type='dashed' disabled={!hasSelected} style={{ marginBottom: 10, marginTop: 25 }}>
            批量停用快递员
          </Button>
        </Popconfirm>
        <Result
          rowSelection={rowSelection}
          data={data}
          dataTotal={dataTotal}
          current={page}
          pageSize={size}
          handleChange={this.changePagination}
          setCourierStatus={this.setCourierStatus}
        />
      </Card>
    );
  }
}

const mapStateToProps = state => {
  const { data, dataTotal, queryData, selectedRowKeys } = state.manageCourier.courierList;
  return {
    data,
    dataTotal,
    queryData,
    selectedRowKeys
  };
};

export default connect(mapStateToProps)(ManageCourier);
