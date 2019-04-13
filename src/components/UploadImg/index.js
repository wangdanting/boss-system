import React, { PureComponent } from 'react';
import ImageCompressor from 'image-compressor.js';
import { Form, Row, Col, Upload, Icon } from 'antd';
import PropTypes from 'prop-types';
import request from '@/utils/request';

const FormItem = Form.Item;

class UploadImg extends PureComponent {
  static propTypes = {
    form: PropTypes.object.isRequired, // 表单引用
    formItemLayout: PropTypes.object, // labelCol和wrapperCol
    label: PropTypes.string, // form label
    id: PropTypes.string.isRequired, // form 识别field
    required: PropTypes.bool, // form验证 是否必传
    isDisabled: PropTypes.bool, // 是否禁止操作
    explanation: PropTypes.oneOfType([PropTypes.string, PropTypes.object]), // 额外的提示信息
    isEdit: PropTypes.bool, // 是否是表单编辑
    imageUrl: PropTypes.string // 图片path
  };

  static defaultProps = {
    formItemLayout: {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 3 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 }
      }
    },
    label: '',
    required: false,
    isDisabled: false,
    explanation: '',
    isEdit: false,
    imageUrl: ''
  };

  state = {
    loading: false,
    imgUrl: '',
    imageIdProps: {} // 商品图片验证属性
  };

  /**
   *  限制用户上传的图片大小
   */
  beforeUpload = file => {
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      this.setState({
        loading: false,
        imageIdProps: {
          validateStatus: 'error',
          help: '上传的图片必须小于 2MB!'
        }
      });
    }
    return isLt2M;
  };

  /**
   *  获得图片id
   */
  requestImgId = formData => {
    const { type, id } = this.props;
    const api = type === 'private' ? '/resource/private' : '/resource';

    request(`${api}`, {
      urlPrefix: '/api/common',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      method: 'post',
      data: formData
    })
      .then(({ path, resourceId }) => {
        const {
          form: { setFieldsValue }
        } = this.props;
        this.setState({
          imgUrl: path,
          imageIdProps: {}
        });
        setFieldsValue({
          [id]: resourceId
        });
      })
      .finally(() => {
        this.setState({
          loading: false
        });
      });
  };

  /**
   *  压缩图片
   */
  customRequest = ({ file }) => {
    this.setState({
      loading: true
    });

    // eslint-disable-next-line no-new
    new ImageCompressor(file, {
      quality: 0.6,
      success: result => {
        if (!this.beforeUpload(result)) {
          return;
        }

        const formData = new FormData();
        formData.append('file', result, result.name);
        this.requestImgId(formData);
      },
      error() {}
    });
  };

  uploadButton = () => {
    const { loading } = this.state;
    const { isEdit } = this.props;
    if (isEdit) {
      return <div className='ant-upload-text'>未上传图片</div>;
    }

    return (
      <div>
        <Icon type={loading ? 'loading' : 'plus'} />
        <div className='ant-upload-text'>点击上传</div>
      </div>
    );
  };

  render() {
    const {
      form: { getFieldDecorator, getFieldValue },
      formItemLayout,
      label,
      id,
      required,
      isDisabled,
      explanation,
      isEdit,
      imageUrl
    } = this.props;

    const { imageIdProps } = this.state;
    let { imgUrl } = this.state;
    if (isEdit) {
      imgUrl = imgUrl || imageUrl;
    }

    return (
      <FormItem {...formItemLayout} {...imageIdProps} label={label} extra={explanation}>
        <Row>
          <Col span={16}>
            {getFieldDecorator(id, {
              rules: [{ required, message: `请选择${label}图片!` }]
            })(
              <div className='upload-img'>
                <Upload
                  listType='picture-card'
                  showUploadList={false}
                  customRequest={this.customRequest}
                  disabled={isDisabled}
                  style={isDisabled ? { cursor: 'not-allowed' } : {}}
                >
                  {imgUrl && getFieldValue(id) ? (
                    <img src={imgUrl} alt={label} style={{ display: 'block', width: '200px' }} />
                  ) : (
                    this.uploadButton()
                  )}
                </Upload>
              </div>
            )}
          </Col>
          <Col span={8}>
            <span>图片大小建议小于2MB</span>
          </Col>
        </Row>
      </FormItem>
    );
  }
}
export default UploadImg;
