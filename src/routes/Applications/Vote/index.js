import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Button, Icon, List } from 'antd';
import { routerRedux } from 'dva/router';
import Ellipsis from 'components/Ellipsis';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';

import styles from '../../List/CardList.less';

@connect(({ vote, loading }) => ({
  list: vote.list,
  loading: loading.models.vote,
}))
export default class RegistrationList extends PureComponent {
  componentDidMount() {
    this.props.dispatch({
      type: 'vote/fetchVoteList',
    });
  }

  render() {
    const { list, loading, dispatch } = this.props;

    const onAdd = () => {
      dispatch(routerRedux.push('/appList/bs/vote/create'))
    };

    const content = (
      <div className={styles.pageHeaderContent}>
        <p>
          简单几步，即可创造您的线上投票系统。
        </p>
        <div className={styles.contentLink}>
          <a>
            <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/MjEImQtenlyueSmVEfUD.svg" />{' '}
            快速开始
          </a>
          <a>
            <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/NbuDUAuBlIApFuDvWiND.svg" />{' '}
            产品简介
          </a>
          <a>
            <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/ohOEPSYdDTNnyMbGuyLb.svg" />{' '}
            产品文档
          </a>
        </div>
      </div>
    );

    const extraContent = (
      <div className={styles.extraImg}>
        <img
          alt="这是一个标题"
          src="https://gw.alipayobjects.com/zos/rmsportal/RzwpdLnhmvDJToTdfDPe.png"
        />
      </div>
    );

    return (
      <PageHeaderLayout title="投票" content={content} extraContent={extraContent}>
        <div className={styles.cardList}>
          <List
            rowKey="id"
            loading={loading}
            grid={{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }}
            dataSource={['', ...list]}
            renderItem={item =>
              item ? (
                <List.Item key={item._id}>
                  <Card hoverable className={styles.card} actions={[<a>查看</a>]}>
                    <Card.Meta
                      avatar={<img alt="" className={styles.cardAvatar} src={item.avatar} />}
                      title={<a href="#">{item.name}</a>}
                      description={
                        <Ellipsis className={styles.item} lines={3}>
                          {item.desc}
                        </Ellipsis>
                      }
                    />
                  </Card>
                </List.Item>
              ) : (
                <List.Item>
                  <Button type="dashed" className={styles.newButton} onClick={onAdd}>
                    <Icon type="plus" /> 新增投票
                  </Button>
                </List.Item>
              )
            }
          />
        </div>
      </PageHeaderLayout>
    );
  }
}
