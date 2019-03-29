import React, { PureComponent } from 'react';
import { Form, Card, Row, Col, Input, Icon, Button } from 'antd';
import { regMobile } from '@/utils/util';

import './index.less';

const FormItem = Form.Item;

@Form.create()
class Login extends PureComponent {
  checkPhone = (rule, value, callback) => {
    if (!value) {
      callback();
    } else if (!regMobile.test(value)) {
      callback('请输入正确的手机号码！');
    } else {
      callback();
    }
  };

  render() {
    const {
      form: { getFieldDecorator }
    } = this.props;
    return (
      <div className='login'>
        <Card className='content'>
          <Row type='flex'>
            <Col span={10}>
              <div className='logo' />
              <h3 className='title'>业务支撑系统</h3>
            </Col>
            <Col span={2} style={{ height: '100%' }}>
              <span className='separate' />
            </Col>
            <Col span={12}>
              <h2 className='subtitle'>用户登录</h2>
              <Form className='form'>
                <FormItem>
                  {getFieldDecorator('account', {
                    rules: [
                      { required: true, message: '请输入登录手机号码!' },
                      {
                        validator: this.checkPhone
                      }
                    ]
                  })(
                    <Input
                      prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />}
                      placeholder='请输入登录手机号码'
                      size='large'
                    />
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('password', {
                    rules: [{ required: true, message: '请输入密码！' }]
                  })(
                    <Input.Password
                      prefix={<Icon type='unlock' style={{ color: 'rgba(0,0,0,.25)' }} />}
                      placeholder='请输入密码'
                      size='large'
                    />
                  )}
                </FormItem>
                <FormItem>
                  <Button type='primary' htmlType='submit' className='btn' size='large'>
                    登录
                  </Button>
                </FormItem>
              </Form>
            </Col>
          </Row>
        </Card>
      </div>
    );
  }
}

export default Login;
