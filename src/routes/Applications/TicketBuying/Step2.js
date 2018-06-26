import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Button, Row, Col } from 'antd';
import { routerRedux } from 'dva/router';
import Result from 'components/Result';
import styles from './style.less';

class Step2 extends React.PureComponent {
  render() {
    const { dispatch, location, data } = this.props;
    let result,title,desc,actions;

    const onFinish = () => {
      dispatch(routerRedux.push('/dashboard/analysis'));
    };

    const onPrev = () => {
      dispatch(routerRedux.push('/appList/xf/ticketBuying/create/info'));
    };

    const information = (
      <div className={styles.information}>
        <Row>
          <Col xs={24} sm={8} className={styles.label}>
            付款账户：
          </Col>
          <Col xs={24} sm={16}>
            {data.payAccount}
          </Col>
        </Row>
        <Row>
          <Col xs={24} sm={8} className={styles.label}>
            收款账户：
          </Col>
          <Col xs={24} sm={16}>
            {data.receiverAccount}
          </Col>
        </Row>
        <Row>
          <Col xs={24} sm={8} className={styles.label}>
            收款人姓名：
          </Col>
          <Col xs={24} sm={16}>
            {data.receiverName}
          </Col>
        </Row>
        <Row>
          <Col xs={24} sm={8} className={styles.label}>
            转账金额：
          </Col>
          <Col xs={24} sm={16}>
            <span className={styles.money}>{data.amount}</span> 元
          </Col>
        </Row>
      </div>
    );

    if (location.query.status === 'ok') {
      result = 'success';
      title = '创建报名成功';
      desc = '您的报名活动已经创建成功，扫描下方二维码即可查看活动页面。';
      actions =
        (<Fragment>
          <Button type="primary" onClick={onFinish}>
            查看活动监控
          </Button>
        </Fragment>)
    }

    if (location.query.status === 'error') {
      result = 'error';
      title = '创建报名失败';
      desc = '请核对并修改以下信息后，再重新提交。';
      actions =
        (<Fragment>
          <Button type="primary" onClick={onPrev}>
            返回修改
          </Button>
        </Fragment>)
    }

    return (
      <Result
        type={result}
        title={title}
        description={desc}
        extra={information}
        actions={actions}
        className={styles.result}
      />
    );
  }
}

export default connect(({ ticketBuying }) => ({
  data: ticketBuying.form,
}))(Step2);
