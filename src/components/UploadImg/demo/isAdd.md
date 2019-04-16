## 新增图片。

![新增图片示例](../../../excludeFile/upload-img-add.png)

````jsx
import UploadImg from '@/component/UploadImg';

const {
  form
} = this.props;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 2 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 10 }
  }
};

ReactDOM.render(
  <UploadImg
    formItemLayout={formItemLayout}
    form={form}
    label='商品'
    required
    id='imageId'
  />
, mountNode);
````
