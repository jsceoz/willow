import { routerRedux } from 'dva/router';
import { message } from 'antd';
import {queryVoteList, SubmitRegistrationForm} from '../services/api';

export default {
  namespace: 'vote',

  state: {
    list: [],
    form: {},
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
    *fetchVoteList({ payload }, { call, put }) {
      const response = yield call(queryVoteList, payload);
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
          ...state.form,
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
