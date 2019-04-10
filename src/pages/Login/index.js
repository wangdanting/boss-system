import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Form, Card, Row, Col, Input, Icon, Button } from 'antd';
import handleLogin from '@/actions/login';
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

  handleSubmit = e => {
    e.preventDefault();
    const { form, dispatch } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        const { account, password } = values;
        const submitData = {
          account,
          password
        };
        dispatch(handleLogin(submitData));
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
      submitting
    } = this.props;
    return (
      <div className='login'>
        <Card className='content'>
          <Row type='flex'>
            <Col span={10}>
              <div className='logo' />
              <h3 className='title'>状态管理案例系统</h3>
            </Col>
            <Col span={1} style={{ height: '100%' }}>
              <span className='separate' />
            </Col>
            <Col span={13}>
              <h2 className='subtitle'>用户登录</h2>
              <Form className='form' onSubmit={this.handleSubmit}>
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
                      placeholder='请输入登录手机号码:15000000003'
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
                      placeholder='请输入密码:111111'
                      size='large'
                    />
                  )}
                </FormItem>
                <FormItem>
                  <Button
                    type='primary'
                    htmlType='submit'
                    loading={submitting}
                    className='btn'
                    size='large'
                  >
                    登录
                  </Button>
                </FormItem>
              </Form>
            </Col>
          </Row>
        </Card>
        <p className='copyright'>© 2018 XXXXXX网络科技有限公司</p>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    submitting: state.login.submitting
  };
};

export default connect(mapStateToProps)(Login);
