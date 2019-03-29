import React, { PureComponent, Fragment } from 'react';
import { Spin } from 'antd';
import Breadcrumb from '@/components/Breadcrumb';
import PubSub from '@/utils/pubsubmsg';
import './PageWrapper.less';

class PageWrapper extends PureComponent {
  state = {
    clientHeight: 0,
    loading: false
  };

  componentDidMount() {
    const headerHeight = '64';
    this.setState({
      clientHeight: document.body.clientHeight - headerHeight
    });

    PubSub.subscribe('loading', type => {
      this.setState({
        loading: type
      });
    });
  }

  render() {
    const { children, location } = this.props;
    const { clientHeight, loading } = this.state;
    return (
      <div className='page-wrapper' style={{ height: clientHeight }}>
        <Fragment>
          <Breadcrumb location={location} />
          <Spin spinning={loading}>
            <div className='wrap'>{children}</div>
          </Spin>
        </Fragment>
      </div>
    );
  }
}

export default PageWrapper;
