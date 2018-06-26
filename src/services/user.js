import request from '../utils/request';

export async function query() {
  return request('/api/users');
}

export async function queryCurrent() {
  return request('/auth/getCurrentUser', {
    headers: {
      'Authorization': 'Bearer '+ localStorage.getItem('jwt'),
    }
  });
}
