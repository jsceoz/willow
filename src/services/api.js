import { stringify } from 'qs';
import request from '../utils/request';

export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function queryRule(params) {
  return request(`/api/rule?${stringify(params)}`);
}

export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    body: params,
  });
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile() {
  return request('/api/profile/basic');
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}

export async function queryNotices() {
  return request('/api/notices');
}













export async function fakeAccountLogin(params) {
  return request('/auth/administratorUser/login', {
    method: 'POST',
    body: params,
  });
}

export async function fakeRegister(params) {
  return request('/auth/administratorUser/signUp', {
    method: 'POST',
    body: params,
  });
}

export async function SubmitRegistrationForm(params) {
  return request('/registration/registrationActivity', {
    method: 'POST',
    body: params,
  });
}

export async function queryRegistrationList() {
  return request('/registration/registrationActivity', {
    headers: {
      'Authorization': 'Bearer '+ localStorage.getItem('jwt'),
    }
  });
}

export async function SubmitTicketBuyingForm(params) {
  return request('/ticketBuying/ticketBuyingActivity', {
    method: 'POST',
    body: params,
  });
}

export async function queryTicketBuyingList() {
  return request('/ticketBuying/ticketBuyingActivity', {
    headers: {
      'Authorization': 'Bearer '+ localStorage.getItem('jwt'),
    }
  });
}

export async function queryVoteList() {
  return request('/vote/voteActivity', {
    headers: {
      'Authorization': 'Bearer '+ localStorage.getItem('jwt'),
    }
  });
}

