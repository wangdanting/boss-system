import React, { PureComponent } from 'react';
import { Layout, Popconfirm, Icon } from 'antd';
import Storage from '@/utils/storage';
import './Header.less';

const { Header } = Layout;

class HeaderDom extends PureComponent {
  logout = () => {
    const { history } = this.props;
    Storage.session.remove('Authorization');
    history.push('/');
  };

  render() {
    return (
      <Header className='header-layouts2-dom'>
        <Popconfirm
          placement='bottomRight'
          title='您确定要退出该系统么？'
          onConfirm={this.logout}
          okText='确定'
          cancelText='取消'
        >
          <a href='#' className='item'>
            <Icon type='logout' />
            <span className='logout'>退出系统</span>
          </a>
        </Popconfirm>
      </Header>
    );
  }
}

export default HeaderDom;
