import React, { PureComponent } from 'react';
import { Card, Form, Input, Radio, message } from 'antd';
import { regMobile } from '@/utils/util';
import UploadImg from '@/components/UploadImg';
import BtnGroup from '@/components/BtnGroup';
import request from '@/utils/request';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

@Form.create()
class AddOrEditCourier extends PureComponent {
  state = {
    isEdit: false, // 是否是编辑状态
    courierId: '', // 配送员id
    identifiedFaceUrl: '', // 配送员身份证照正面
    identifiedBackUrl: '' // 配送员身份证照背面
  };

  componentDidMount() {
    this.getStatus();
  }

  /**
   *  区分是编辑还是新增
   */
  getStatus = () => {
    const {
      match: {
        params: { id }
      }
    } = this.props;
    if (id) {
      // 是编辑
      this.getCourierInfo(id);
      this.setState({
        isEdit: true,
        courierId: id
      });
    }
  };

  /**
   * 获取配送员信息
   */
  getCourierInfo = id => {
    request(`/express_courier/${id}`).then(data => {
      const formvalue = {
        name: data.name,
        mobile: data.mobile,
        identifiedCode: data.identifiedCode,
        vehicleType: data.vehicleType,
        insuranceNo: data.insuranceNo,
        licensePlate: data.licensePlate,
        licenseDrive: data.licenseDrive,
        courierType: 'own',
        licenseVehicle: data.licenseVehicle,
        identifiedFace: data.identifiedFace,
        identifiedBack: data.identifiedBack,
        jobType: data.jobType
      };
      this.setState(
        {
          identifiedFaceUrl: data.identifiedFaceImgUrl,
          identifiedBackUrl: data.identifiedBackImgUrl
        },
        () => {
          const { form } = this.props;
          form.setFieldsValue(formvalue);
        }
      );
    });
  };

  /**
   * 检查手机号格式
   */
  checkPhone = (rule, value, callback) => {
    if (!value) {
      callback();
    } else if (!regMobile.test(value)) {
      callback('请输入正确的手机号码！');
    } else {
      callback();
    }
  };

  /**
   * 检查身份证号格式
   */
  checkIdentified = (rule, value, callback) => {
    if (!value) {
      callback();
    } else if (!(value.length === 18)) {
      callback('请输入正确的身份证号！');
    } else {
      callback();
    }
  };

  /**
   * 构建提交数据
   */
  createSubmitObj = values => {
    const submitData = {};
    submitData.name = values.name;
    submitData.courierType = 'own';
    submitData.identifiedFace = values.identifiedFace;
    submitData.identifiedBack = values.identifiedBack;
    submitData.identifiedCode = values.identifiedCode;
    submitData.insuranceNo = values.insuranceNo;
    submitData.licenseDrive = values.licenseDrive;
    submitData.licensePlate = values.licensePlate;
    submitData.licenseVehicle = values.licenseVehicle;
    submitData.mobile = values.mobile;
    submitData.vehicleType = values.vehicleType;
    submitData.jobType = values.jobType;
    return submitData;
  };

  /**
   * 提交数据
   */
  handleSendData = submitData => {
    const { isEdit, courierId } = this.state;
    if (isEdit) {
      const data = submitData;
      data.expressCourierId = courierId;
      request('/express_courier/update', {
        method: 'put',
        data
      }).then(() => {
        message.success('修改成功！', 2);
        this.goBack();
      });
    } else {
      request('/express_courier/save', {
        method: 'post',
        data: submitData
      }).then(() => {
        message.success('新增成功！', 2);
        this.goBack();
      });
    }
  };

  /**
   * 新增保存
   */
  handleSubmit = e => {
    e.preventDefault();
    const {
      form: { validateFieldsAndScroll }
    } = this.props;
    validateFieldsAndScroll((err, values) => {
      if (err) {
        return;
      }
      // 构建需要提交的数据
      const submitData = this.createSubmitObj(values);
      // 发送数据
      this.handleSendData(submitData);
    });
  };

  /**
   * 返回列表页
   */
  goBack = () => {
    const { history } = this.props;
    history.goBack();
  };

  render() {
    const {
      form,
      form: { getFieldDecorator }
    } = this.props;
    const { identifiedFaceUrl, identifiedBackUrl, isEdit } = this.state;

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
    return (
      <Card title='配送员基础信息' bordered={false}>
        <Form>
          <FormItem {...formItemLayout} label='姓名'>
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '请输入配送员姓名!', whitespace: true }]
            })(<Input placeholder='请输入配送员姓名，不得超过30个字符' maxLength={30} />)}
          </FormItem>
          <FormItem {...formItemLayout} label='手机号码'>
            {getFieldDecorator('mobile', {
              rules: [
                {
                  required: true,
                  message: '请输入配送员手机号码!',
                  whitespace: true
                },
                {
                  validator: this.checkPhone
                }
              ]
            })(<Input placeholder='请输入配送员手机号码' maxLength={11} />)}
          </FormItem>
          <FormItem {...formItemLayout} label='身份证号'>
            {getFieldDecorator('identifiedCode', {
              rules: [
                {
                  required: true,
                  message: '请输入配送员身份证号!'
                },
                {
                  validator: this.checkIdentified
                }
              ]
            })(<Input placeholder='请输入配送员身份证号' maxLength={18} />)}
          </FormItem>
          <FormItem {...formItemLayout} label='车辆类型'>
            {getFieldDecorator('vehicleType', {
              rules: [{ required: true }],
              initialValue: 'motorbike'
            })(
              <RadioGroup>
                <Radio value='motorbike'>摩托车</Radio>
                <Radio value='car'>电动车</Radio>
              </RadioGroup>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label='在职类型'>
            {getFieldDecorator('jobType', {
              rules: [{ required: true }],
              initialValue: 'full_job'
            })(
              <RadioGroup>
                <Radio value='full_job'>全职</Radio>
                <Radio value='part_job'>兼职</Radio>
              </RadioGroup>
            )}
          </FormItem>
          <UploadImg
            form={form}
            formItemLayout={formItemLayout}
            label='身份证照正面'
            required
            isEdit={isEdit}
            id='identifiedFace'
            imageUrl={identifiedFaceUrl}
          />
          <UploadImg
            form={form}
            formItemLayout={formItemLayout}
            label='身份证照背面'
            required
            isEdit={isEdit}
            id='identifiedBack'
            imageUrl={identifiedBackUrl}
          />
          <FormItem {...formItemLayout} label='车牌号'>
            {getFieldDecorator('licensePlate')(<Input placeholder='请输入配送员车牌号' />)}
          </FormItem>
          <FormItem {...formItemLayout} label='驾照号'>
            {getFieldDecorator('licenseDrive')(<Input placeholder='请输入配送员驾照号' />)}
          </FormItem>
          <FormItem {...formItemLayout} label='保险号'>
            {getFieldDecorator('insuranceNo')(<Input placeholder='请输入配送员保险号' />)}
          </FormItem>
          <FormItem {...formItemLayout} label='车架号'>
            {getFieldDecorator('licenseVehicle')(<Input placeholder='请输入配送员车架号' />)}
          </FormItem>
          <BtnGroup
            className='btn-group'
            leftText='取消'
            leftOnClick={this.goBack}
            rightText='保存'
            rightOnClick={this.handleSubmit}
          />
        </Form>
      </Card>
    );
  }
}

export default AddOrEditCourier;
