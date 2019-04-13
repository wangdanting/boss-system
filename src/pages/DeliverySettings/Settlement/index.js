import React, { PureComponent } from 'react';
import { Tabs } from 'antd';
import FullJob from './fullJob';
import PartTimeJob from './partTimeJob';

const { TabPane } = Tabs;

class Settlement extends PureComponent {
  state = {
    activeKey: 'area'
  };

  tabChange = key => {
    this.setState({
      activeKey: key
    });
  };

  render() {
    const { activeKey } = this.state;
    return (
      <Tabs activeKey={activeKey} onChange={this.tabChange} tabPosition='left'>
        <TabPane tab='全职' key='area'>
          <FullJob />
        </TabPane>
        <TabPane tab='兼职' key='service'>
          <PartTimeJob />
        </TabPane>
      </Tabs>
    );
  }
}

export default Settlement;
