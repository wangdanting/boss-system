import React, { PureComponent } from 'react';
import { Table } from 'antd';
import PropTypes from 'prop-types';
import './index.less';

class ResultTable extends PureComponent {
  static propTypes = {
    data: PropTypes.array, // 表单数据
    dataTotal: PropTypes.number, // 数据总数
    current: PropTypes.number, // 当前页数
    pageSize: PropTypes.number, // 每页条数
    columns: PropTypes.array, // 表格列的配置描述
    width: PropTypes.string, // 表哥的宽
    keyStr: PropTypes.string.isRequired, // 表格行 key 的取值
    handleChange: PropTypes.func // 页码改变的回调和pageSize 变化的回调
  };

  static defaultProps = {
    data: [],
    dataTotal: 0,
    current: 0,
    pageSize: 10,
    columns: [],
    width: '100%',
    handleChange: () => {}
  };

  onChange = (current, pageSize) => {
    const { handleChange } = this.props;
    handleChange(current, pageSize);
  };

  onShowSizeChange = (current, pageSize) => {
    const { handleChange } = this.props;
    handleChange(current, pageSize);
  };

  render() {
    const { data, dataTotal, pageSize, columns, keyStr, width, current } = this.props;
    const pagination = {
      position: 'bottom',
      showSizeChanger: true,
      showQuickJumper: true,
      total: dataTotal,
      current: current + 1,
      pageSize,
      showTotal: total => `总共 ${total} 条`,
      onChange: this.onChange,
      onShowSizeChange: this.onShowSizeChange
    };
    return (
      <div className='result-table'>
        <Table
          rowKey={record => record[keyStr]}
          columns={columns}
          dataSource={data}
          bordered
          pagination={pagination}
          size='small'
          style={{ minWidth: width }}
        />
      </div>
    );
  }
}

export default ResultTable;
