import React from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Alert, Divider, Col, Row, Select, Dropdown, Menu, Icon, Tooltip } from 'antd';
import { routerRedux } from 'dva/router';
import styles from './style.less';

const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};

@Form.create()
class Step2 extends React.PureComponent {
  constructor(props) {
    super(props);
    this.deleteField = this.deleteField.bind(this);
    this.deleteOptions = this.deleteOptions.bind(this);
    this.addField = this.addField.bind(this);
    this.addOption = this.addOption.bind(this);
    this.changeField = this.changeField.bind(this);
  }

  deleteField = index => {
    let fields = this.props.data.fields;
    fields.splice(index,1);
    this.props.dispatch({
      type: 'registration/saveRegistrationFormData',
      payload: {fields: fields}
    });
  };

  deleteOptions = (index, optionIndex)=> {
    let fields = this.props.data.fields;
    fields[index].options.splice(optionIndex, 1);
    this.props.dispatch({
      type: 'registration/saveRegistrationFormData',
      payload: {fields: fields}
    });
  };

  addField = e => {
    console.log(e);
    let type = e.key;
    let fields = this.props.data.fields,
      index = fields.length;

    if (type === 'input') {
      fields.push({
        label: 'field-' + index,
        title: '字段名',
        type: 'input'
      });
    }
    if (type === 'select') {
      fields.push({
        label: 'field-' + index,
        title: '字段名',
        type: 'select',
        options: ['选项一','选项二','选项三']
      });
    }

    this.props.dispatch({
      type: 'registration/saveRegistrationFormData',
      payload: {fields: fields}
    });
  };

  addOption = index => {
    let fields = this.props.data.fields;
    fields[index].options.push('新选项');
    this.props.dispatch({
      type: 'registration/saveRegistrationFormData',
      payload: {fields: fields}
    });
  };

  changeField = (value, index, optionIndex) => {
    let fields = this.props.data.fields;
    if (!optionIndex) {
      fields[index].title = value
    } else {
      fields[index].options[optionIndex] = value
    }
    this.props.dispatch({
      type: 'registration/saveRegistrationFormData',
      payload: {fields: fields}
    });
  };

  render() {
    const { form, data, dispatch, submitting } = this.props;
    const { getFieldDecorator, validateFields } = form;
    const onPrev = () => {
      dispatch(routerRedux.push('/appList/xf/registration/create'));
    };
    const onValidateForm = e => {
      e.preventDefault();
      validateFields((err, values) => {
        if (!err) {
          dispatch({
            type: 'registration/submitStepForm',
            payload: {
              ...data,
              ...values,
            },
          });
        }
      });
    };

    const recruitTemplate = () => {
      let fields = [{
        label: 'name',
        title: '姓名',
        type: 'input'
      },{
        label: 'sid',
        title: '学号',
        type: 'input'
      }, {
        label: 'school',
        title: '学院',
        type: 'select',
        options: ['文学院','国学院','计算机学院']
      },{
        label: 'department1',
        title: '第一志愿部门',
        type: 'select',
        options: ['部门一','部门二','部门三']
      },{
        label: 'department2',
        title: '第二志愿部门',
        type: 'select',
        options: ['部门一','部门二','部门三']
      },{
        label: 'desc',
        title: '自我介绍',
        type: 'input'
      },{
        label: 'phone',
        title: '联系电话',
        type: 'input'
      }];
      dispatch({
        type: 'registration/saveRegistrationFormData',
        payload: {fields: fields}
      });
    };

    const competitionTemplate = () => {
      let fields = [{
        label: 'name',
        title: '姓名',
        type: 'input'
      },{
        label: 'sid',
        title: '学号',
        type: 'input'
      }, {
        label: 'school',
        title: '学院',
        type: 'select',
        options: ['文学院','国学院','计算机学院']
      },{
        label: 'group',
        title: '报名组别',
        type: 'select',
        options: ['组别一','组别二','组别三']
      },{
        label: 'phone',
        title: '联系电话',
        type: 'input'
      }];
      dispatch({
        type: 'registration/saveRegistrationFormData',
        payload: {fields: fields}
      });
    };

    const previewForm = data.fields.map((item, index) => {
        switch (item.type) {
          case 'input':
            return <Form.Item {...formItemLayout} label='' key={index}>
                      <Input style={{ width: 120 }} value={item.title} onChange={e => this.changeField(e.target.value, index)}/>
                      ：
                      <Input style={{ width: 180 }}/>
                      <Button type="danger" icon="delete"  style={{ marginLeft: 8 }} onClick={e => this.deleteField(index)}/>
                   </Form.Item>;

          case 'select':
            return <Form.Item {...formItemLayout} label='' key={index} onChange={e => this.changeField(e.target.value, index)}>
                      <Input style={{ width: 120 }} value={item.title}/>
                      ：
                      <Select style={{ width: 180 }}>
                        {item.options.map(item => {
                          return <Option value={item}>{item}</Option>
                        })}
                      </Select>
                      <Button type="danger" icon="delete" style={{ marginLeft: 8 }} onClick={e => this.deleteField(index)}/>
                      <Row>
                        <Col span={8}>
                          <h5 style={{marginTop: '10px', float: 'right', fontSize: '14px'}}>选项：</h5>
                        </Col>
                        <Col span={16}>
                          <div style={{maxHeight:'250px', overflow: 'auto', margin: '10px 0'}}>
                            {item.options.map((item, optionIndex) => {
                              return <div>
                                <Input
                                  style={{ width: 160 }}
                                  value={item}
                                  onChange={e => this.changeField(e.target.value, index, optionIndex)}/>
                                <Button type="danger" icon="delete"  style={{ marginLeft: 8 }} onClick={e => this.deleteOptions(index, optionIndex)}/>
                              </div>
                            })}
                          </div>
                          <Button type="primary" icon="plus" onClick={e => this.addOption(index)}>选项</Button>
                        </Col>
                      </Row>
                   </Form.Item>;


        }
      });

    const addMenu = (
      <Menu onClick={this.addField}>
        <Menu.Item key="input">
          <Tooltip placement="right" title='适用于姓名、学号等简单输入字段'>
            <span>输入框</span>
          </Tooltip>
        </Menu.Item>
        <Menu.Item key="select">
          <Tooltip placement="right" title='适用于姓名、学号等简单输入字段'>
            <span>选择器</span>
          </Tooltip>
        </Menu.Item>
        <Menu.Item key="select">
          <Tooltip placement="right" title='适用于姓名、学号等简单输入字段'>
            <span>多行输入框</span>
          </Tooltip>
        </Menu.Item>
        <Menu.Item key="select">
          <Tooltip placement="right" title='适用于姓名、学号等简单输入字段'>
            <span>文件上传框</span>
          </Tooltip>
        </Menu.Item>
      </Menu>
    );

    return (
      <div>
        <Col span={8}>
          <h5 style={{fontSize: '18px', marginTop: '30px'}}>报名表模板</h5>
          <Button type="primary" onClick={recruitTemplate}>招新报名表</Button>
          <Button type="primary" onClick={competitionTemplate} style={{marginLeft: '8px'}}>比赛报名表</Button>
        </Col>

        <Col span={8}>
          <Form layout="horizontal" className={styles.stepForm}>

            {previewForm}
            <Divider/>
            <Form.Item
              {...formItemLayout}
              label=""
              wrapperCol={{
                xs: { span: 24, offset: 0 },
                sm: {
                  span: formItemLayout.wrapperCol.span,
                  offset: formItemLayout.labelCol.span,
                },
              }}
            >
              <Dropdown overlay={addMenu}>
                <Button style={{ marginLeft: 8 }} type='primary' icon='plus'>
                  添加字段 <Icon type="down" />
                </Button>
              </Dropdown>
            </Form.Item>

            <Form.Item
              style={{ marginBottom: 8 }}
              wrapperCol={{
                xs: { span: 24, offset: 0 },
                sm: {
                  span: formItemLayout.wrapperCol.span,
                  offset: formItemLayout.labelCol.span,
                },
              }}
              label=""
            >
              <Button type="primary" onClick={onValidateForm} loading={submitting}>
                提交
              </Button>
              <Button onClick={onPrev} style={{ marginLeft: 8 }}>
                上一步
              </Button>
            </Form.Item>
          </Form>
        </Col>

        <Col span={8}>

        </Col>

      </div>

    );
  }
}

export default connect(({ registration, loading }) => ({
  submitting: loading.effects['registration/submitStepForm'],
  data: registration.createRegistration,
}))(Step2);
