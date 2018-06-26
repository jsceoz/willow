import { routerRedux } from 'dva/router';
import { message } from 'antd';
import {queryRegistrationList, SubmitRegistrationForm} from '../services/api';

export default {
  namespace: 'registration',

  state: {
    list: [],
    createRegistration: {
      name: '武汉大学学生会',
      time: [],
      fields: [{
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
        options: [1,2,3,4,5,6,7,8,9,10]
      },{
        label: 'phone',
        title: '联系电话',
        type: 'input'
      }]
    },
  },

  effects: {
    *submitStepForm({ payload }, { call, put }) {
      const response = yield call(SubmitRegistrationForm, payload);
      yield put({
        type: 'saveRegistrationFormData',
        payload,
      });
      if (response.status === 'ok') {
        yield put(routerRedux.push({
          pathname: '/appList/xf/registration/create/result',
          query:{status: 'ok'}
        }));
      }
      if (response.status === 'error') {
        yield put(routerRedux.push({
          pathname: '/appList/xf/registration/create/result',
          query:{status: 'error'}
        }));
      }
    },
    *fetchRegistrationList({ payload }, { call, put }) {
      const response = yield call(queryRegistrationList, payload);
      yield put({
        type: 'queryList',
        payload: Array.isArray(response) ? response : [],
      });
    },
  },

  reducers: {
    saveRegistrationFormData(state, { payload }) {
      return {
        ...state,
        createRegistration: {
          ...state.createRegistration,
          ...payload,
        },
      };
    },
    queryList(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
  },
};
