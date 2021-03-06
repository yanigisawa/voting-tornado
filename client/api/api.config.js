import Auth from '../components/auth/auth';

export const wsUrl = 'ws://localhost:3500/api/ws/votes';
export const apiUrl = 'http://localhost:3500/api';

export class BaseRequest {
  constructor() {
    this.auth = new Auth();
    this.headers = {
      Authorization: 'Bearer: ' + this.auth.getIdToken()
    };
  }
}