import Auth from '../components/auth/auth';
import jquery from 'jquery';
import {apiUrl, BaseRequest} from './api.config';

// TODO: Make API Configurable
const baseUrl = apiUrl;
const baseRequest = new BaseRequest();

class EventsApi {
  static getAllEvents() {
    
    return jquery.ajax({
      headers : baseRequest.headers,
      dataType : "json",
      url : baseUrl + '/events'
    });
  }

  static createEvent(event) {
    return jquery.ajax({
      headers : baseRequest.headers,
      method: "POST",
      url : baseUrl + '/events',
      dataType : "json",
      data: JSON.stringify(event)
    });
  }

  static updateEvent(event) {
    return jquery.ajax({
      headers : baseRequest.headers,
      method: "PUT",
      dataType : "json",
      url : baseUrl + '/event/' + event.id,
      data: JSON.stringify(event)
    });
  }
}

export default EventsApi;