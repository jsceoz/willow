import { routerRedux } from 'dva/router';
import { message } from 'antd';
import {queryTicketBuyingList, SubmitTicketBuyingForm} from '../services/api';

export default {
  namespace: 'ticketBuying',

  state: {
    list: [],
    form: {},
  },

  effects: {
    *submitStepForm({ payload }, { call, put }) {
      const response = yield call(SubmitTicketBuyingForm, payload);
      yield put({
        type: 'saveTicketBuyingFormData',
        payload,
      });
      if (response.status === 'ok') {
        console.log('ssss');
        yield put(routerRedux.push({
          pathname: '/appList/xf/ticketBuying/create/result',
          query:{status: 'ok'}
        }));
      }
      if (response.status === 'error') {
        yield put(routerRedux.push({
          pathname: '/appList/xf/ticketBuying/create/result',
          query:{status: 'error'}
        }));
      }
    },
    *fetchTicketBuyingList({ payload }, { call, put }) {
      const response = yield call(queryTicketBuyingList, payload);
      yield put({
        type: 'queryList',
        payload: Array.isArray(response) ? response : [],
      });
    },
  },

  reducers: {
    saveTicketBuyingFormData(state, { payload }) {
      return {
        ...state,
        form: {
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
