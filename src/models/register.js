import { fakeRegister } from '../services/api';
import { setAuthority } from '../utils/authority';
import { reloadAuthorized } from '../utils/Authorized';

export default {
  namespace: 'register',

  state: {
    status: undefined,
  },

  effects: {
    *submit({ payload }, { call, put }) {
      const response = yield call(fakeRegister, payload);
      if (response.status === 'ok') {
        yield put({
          type: 'registerHandle',
          payload: response,
        });
      }
    },
  },

  reducers: {
    registerHandle(state, { payload }) {
      setAuthority('admin', payload.token);
      reloadAuthorized();
      return {
        ...state,
        status: payload.status,
      };
    },
  },
};
