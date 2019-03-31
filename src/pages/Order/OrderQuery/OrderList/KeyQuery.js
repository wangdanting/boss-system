import React, { PureComponent, Fragment } from 'react';
import { Form, Input, Divider, Alert } from 'antd';
import { connect } from 'react-redux';
import {
  handleSearch,
  changeQueryData,
  changeData,
  changeDataTotal
} from '@/actions/orderQuery/orderList/KeyQuery';
import Result from './Result';

const FormItem = Form.Item;

const { Search } = Input;

@Form.create()
class KeyQuery extends PureComponent {
  /**
   *处理查询状态改变
   * handle status query change
   */
  handleChange = value => {
    const { dispatch, queryData: prevObj } = this.props;
    const queryData = Object.assign({}, prevObj, { keyWords: value, page: 0, size: 10 });
    dispatch(changeQueryData(queryData));
    if (value) {
      dispatch(handleSearch(queryData));
    } else {
      dispatch(changeData([]));
      dispatch(changeDataTotal(0));
    }
  };

  /**
   * 清空查询条件
   */
  clear = () => {
    const {
      form: { resetFields }
    } = this.props;
    resetFields();
    this.handleChange('');
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
      queryData: { page, size, keyWords },
      form: { getFieldDecorator }
    } = this.props;
    const message = keyWords ? (
      <>
        {keyWords}
        <span>的查询结果如下(已为您展示全部的查询结果)</span>
        <a onClick={this.clear} style={{ marginLeft: 24 }}>
          清空
        </a>
      </>
    ) : (
      '请输入关键字'
    );
    return (
      <Fragment>
        <Form layout='inline'>
          <FormItem label='关键字查询'>
            {getFieldDecorator('queryKeyword')(
              <Search
                placeholder='请输入关键字'
                enterButton='查询'
                onSearch={value => this.handleChange(value)}
                style={{ width: 300 }}
              />
            )}
          </FormItem>
          <Divider />
        </Form>
        <Alert message={message} type='info' showIcon />
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
  const { data, dataTotal, queryData } = state.orderQuery.keyQuery;
  return {
    data,
    dataTotal,
    queryData
  };
};

export default connect(mapStateToProps)(KeyQuery);
