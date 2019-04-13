import React, { PureComponent } from 'react';
import { Card, Tabs } from 'antd';
import DeliveryProxy from './DeliveryProxy';
import Settlement from './Settlement';

const { TabPane } = Tabs;

class DeliverySettings extends PureComponent {
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
      <Card bordered={false}>
        <Tabs activeKey={activeKey} onChange={this.tabChange}>
          <TabPane tab='代购设置' key='area'>
            <DeliveryProxy />
          </TabPane>
          <TabPane tab='跑腿代购服务' key='service'>
            <Settlement />
          </TabPane>
        </Tabs>
      </Card>
    );
  }
}

export default DeliverySettings;
