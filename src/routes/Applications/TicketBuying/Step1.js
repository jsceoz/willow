import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Select, Divider, DatePicker, Col, Switch, InputNumber } from 'antd';
import { routerRedux } from 'dva/router';
import styles from './style.less';

const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

const formItemLayout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

@Form.create()
class Step1 extends React.PureComponent {
  render() {
    const { form, dispatch, data } = this.props;
    const { getFieldDecorator, validateFields } = form;
    const onValidateForm = () => {
      validateFields((err, values) => {
        if (!err) {
          dispatch({
            type: 'ticketBuying/submitStepForm',
            payload: values,
          });
        }
      });
    };
    return (
      <Fragment>
        <Form layout="horizontal" className={styles.stepForm} hideRequiredMark>

          <Form.Item {...formItemLayout} label="活动名称">
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '请输入活动名称' }],
            })(<Input placeholder="请输入活动名称" />)}
          </Form.Item>

          <Form.Item {...formItemLayout} label="活动时间">
            {getFieldDecorator('time', {
              rules: [{ required: true, message: '请输入活动时间' }],
            })(<RangePicker
                style={{ width: '100%' }}
                showTime={{ format: 'HH:mm' }}
                format="YYYY-MM-DD HH:mm"
                placeholder={['开始时间', '结束时间']}
              />
            )}
          </Form.Item>

          <Form.Item {...formItemLayout} label="活动描述">
            {getFieldDecorator('desc', {
              rules: [{ required: true, message: '请输入活动描述' }],
            })(<TextArea rows={4} />)}
          </Form.Item>

          <Form.Item {...formItemLayout} label="门票（奖品）名称">
            {getFieldDecorator('prize', {
              rules: [{ required: true, message: '请输入门票（奖品）名称' }],
            })(<Input placeholder="请输入门票（奖品）名称" />)}
          </Form.Item>

          <Form.Item
            {...formItemLayout}
            label="门票（奖品）数量"
          >
            {getFieldDecorator('prizeQuantity', {
              rules: [{ required: true, message: '请输入门票（奖品）数量' }],
            })(
              <InputNumber min={1} />
            )}
            <span className="ant-form-text"> 张（个）</span>
          </Form.Item>

          <Form.Item
            {...formItemLayout}
            label="要求集赞数量"
          >
            {getFieldDecorator('requiredLikeQuantity', {
              rules: [{ required: true, message: '请输入要求集赞数量' }],
            })(
              <InputNumber min={1} />
            )}
            <span className="ant-form-text">个</span>
          </Form.Item>

          <Form.Item
            {...formItemLayout}
            label="仅面向校内学生"
          >
            {getFieldDecorator('isVerify', { valuePropName: 'checked', initialValue: true })(
              <Switch />
            )}
          </Form.Item>

          <Form.Item
            wrapperCol={{
              xs: { span: 24, offset: 0 },
              sm: {
                span: formItemLayout.wrapperCol.span,
                offset: formItemLayout.labelCol.span,
              },
            }}
            label=""
          >
            <Button type="primary" onClick={onValidateForm}>
              提交
            </Button>
          </Form.Item>
        </Form>
        <Divider style={{ margin: '40px 0 24px' }} />
        <div className={styles.desc}>
          <h3>抢票</h3>
          <h4>转账到支付宝账户</h4>
          <p>
            如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。
          </p>
          <h4>转账到银行卡</h4>
          <p>
            如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。
          </p>
        </div>
      </Fragment>
    );
  }
}

export default connect(({ ticketBuying }) => ({
  data: ticketBuying.form,
}))(Step1);
