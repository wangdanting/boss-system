import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { Popconfirm, Button } from 'antd';
import ResultTable from '@/components/ResultTable';

class Result extends PureComponent {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: '电话',
        dataIndex: 'mobile',
        key: 'mobile'
      },
      {
        title: '在职类型',
        dataIndex: 'jobType',
        key: 'jobType',
        render: text => {
          return text === 'full_job' ? '全职' : '兼职';
        }
      },
      {
        title: '工作状态',
        dataIndex: 'status',
        key: 'status',
        render: (text, record) => {
          return record.onlineState ? '在上班' : '已下班';
        }
      },
      {
        title: '状态操作',
        dataIndex: 'onlineState',
        key: 'onlineState',
        render: (text, record) => {
          const { expressCourierId } = record;
          if (text) {
            return (
              <Popconfirm
                placement='top'
                title="确定将配送员状态修改为'休息'"
                onConfirm={() => this.setCourierStatus(expressCourierId, 'offline')}
                okText='确定'
                cancelText='取消'
              >
                <Button>休息</Button>
              </Popconfirm>
            );
          }
          return (
            <Popconfirm
              placement='top'
              title="确定将配送员状态修改为'工作'"
              onConfirm={() => this.setCourierStatus(expressCourierId, 'online')}
              okText='确定'
              cancelText='取消'
            >
              <Button type='primary'>工作</Button>
            </Popconfirm>
          );
        }
      },
      {
        title: '操作',
        dataIndex: 'operate',
        key: 'operate',
        width: 100,
        render: (text, record) => {
          return <Link to={`/courier/list/edit/${record.expressCourierId}`}>修改</Link>;
        }
      }
    ];
  }

  setCourierStatus = (id, status) => {
    const { setCourierStatus } = this.props;
    setCourierStatus(id, status);
  };

  render() {
    return (
      <ResultTable
        {...this.props}
        columns={this.columns}
        className='no-margin-top'
        keyStr='expressCourierId'
      />
    );
  }
}

export default Result;
