import React, { PureComponent } from 'react';
import { Card, Form, Button, TimePicker, Col, Row, InputNumber, Popconfirm } from 'antd';
import moment from 'moment';
import './style.less';

const FormItem = Form.Item;

@Form.create()
class DeliveryProxy extends PureComponent {
  state = {
    fragment: [{ id: '1' }, { id: '2' }]
  };

  render() {
    const {
      form: { getFieldDecorator }
    } = this.props;
    const { fragment } = this.state;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 3 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 }
      }
    };

    const fragmentEle = fragment.map((item, index) => {
      const key = item.id;
      return (
        <Card key={key} className='item'>
          <FormItem {...formItemLayout} label='营业时段' required>
            <Row type='flex'>
              <Col>
                <FormItem>
                  {getFieldDecorator(`startTime${key}`, {
                    rules: [
                      {
                        required: true,
                        message: '请选择开始时间!',
                        whitespace: true,
                        type: 'object'
                      }
                    ]
                  })(
                    <TimePicker
                      onChange={e => this.handleStartTimeChange(e, index)}
                      format='HH:mm'
                      defaultOpenValue={moment('00:00', 'HH:mm')}
                      allowClear={false}
                      placeholder='开始时间'
                    />
                  )}
                </FormItem>
              </Col>
              <Col className='separator'>-</Col>
              <Col>
                <FormItem>
                  {getFieldDecorator(`endTime${key}`, {
                    rules: [
                      {
                        required: true,
                        message: '请选择结束时间!',
                        whitespace: true,
                        type: 'object'
                      }
                    ]
                  })(
                    <TimePicker
                      onChange={e => this.handleEndTimeChange(e, index, key)}
                      onOpenChange={isOpen => this.onOpenChange(isOpen, key)}
                      format='HH:mm'
                      defaultOpenValue={moment('00:00', 'HH:mm')}
                      allowClear={false}
                      placeholder='结束时间'
                    />
                  )}
                </FormItem>
              </Col>
            </Row>
          </FormItem>
          <FormItem {...formItemLayout} label='计费规则'>
            {getFieldDecorator(`proxyFee${key}`, {
              rules: [
                {
                  required: true,
                  message: '请输入计费规则!',
                  whitespace: true,
                  type: 'number'
                }
              ]
            })(<InputNumber min={0.01} step={0.01} />)}
            <span className='ant-form-text'> 元/单</span>
          </FormItem>
          <FormItem {...formItemLayout} label='配送时间'>
            {getFieldDecorator(`proxyTime${key}`, {
              rules: [
                {
                  required: true,
                  message: '请输入配送时间!',
                  whitespace: true,
                  type: 'number'
                }
              ]
            })(<InputNumber min={0} />)}
            <span className='ant-form-text'> 分钟</span>
          </FormItem>
          {fragment.length > 1 ? (
            <Popconfirm
              placement='top'
              title='您确定删除该时段么？'
              onConfirm={() => this.deleteFragment(index)}
              okText='确定'
              cancelText='取消'
            >
              <Button className='del' type='primary' shape='circle' icon='delete' size='large' />
            </Popconfirm>
          ) : null}
        </Card>
      );
    });

    return (
      <>
        <Card title='跑腿代购设置' className='delivery-settings'>
          <Form>{fragmentEle}</Form>
          <Button type='dashed' icon='plus' className='add-btn' onClick={this.addFragment}>
            添加跑腿代购时段
          </Button>
        </Card>
        <Button className='delivery-settings-btn' type='primary' onClick={this.handleSubmit}>
          保存
        </Button>
      </>
    );
  }
}

export default DeliveryProxy;
