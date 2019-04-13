import React, { PureComponent } from 'react';
import { Button } from 'antd';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './index.less';

class BtnGroup extends PureComponent {
  static propTypes = {
    leftText: PropTypes.string,
    leftType: PropTypes.oneOf(['primary', 'dashed', 'danger', '']),
    leftOnClick: PropTypes.func,
    rightText: PropTypes.string,
    rightType: PropTypes.oneOf(['primary', 'dashed', 'danger', '']),
    rightOnClick: PropTypes.func
  };

  static defaultProps = {
    leftText: '取消',
    leftType: '',
    leftOnClick: () => {},
    rightText: '确定',
    rightType: 'primary',
    rightOnClick: () => {}
  };

  render() {
    const {
      leftText,
      leftType,
      leftOnClick,
      rightText,
      rightType,
      rightOnClick,
      className
    } = this.props;
    const cls = classNames('btn-group-con', className);
    return (
      <div className={cls}>
        <Button type={leftType} onClick={leftOnClick} className='left'>
          {leftText}
        </Button>
        <Button type={rightType} onClick={rightOnClick} className='right'>
          {rightText}
        </Button>
      </div>
    );
  }
}

export default BtnGroup;
