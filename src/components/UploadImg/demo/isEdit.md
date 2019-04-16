## 编辑图片。

![编辑图片示例](../../../excludeFile/upload-img-edit.png)

````jsx
import UploadImg from '@/component/UploadImg';

const {
  form
} = this.props;

const {imageUrl, isEdit} = this.state;

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
    imageUrl={imageUrl}
    isEdit={isEdit}
    id='imageId'
  />
, mountNode);
````
