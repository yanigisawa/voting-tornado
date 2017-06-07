import Auth from '../components/auth/auth';
import jquery from 'jquery';

// TODO: Make API Configurable
const baseUrl = "http://localhost:3500/api";

class EventsApi {

  static getAllEvents() {
    let auth = new Auth();
    
    return jquery.ajax({
      headers : {},
      dataType : "json",
      url : baseUrl + '/getAllEvents'
    });
  }
}

export default EventsApi;