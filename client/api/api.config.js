import Auth from '../components/auth/auth';

export const apiUrl = 'http://localhost:3500/api';

export class BaseRequest {
  constructor() {
    this.auth = new Auth();
    this.headers = {
      Authentication: 'Bearer: ' + this.auth.getIdToken()
    };
  }
}