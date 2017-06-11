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
      url : baseUrl + '/events'
    });
  }

  static createEvent(event) {
    let auth = new Auth();

    return jquery.ajax({
      type: "POST",
      url : baseUrl + '/events',
      dataType : "json",
      data: JSON.stringify(event)
    });
  }

  static updateEvent(event) {
    let auth = new Auth();

    return jquery.ajax({
      type: "PUT",
      dataType : "json",
      url : baseUrl + '/event/' + event.id,
      
      data: JSON.stringify(event)
    });
  }
}

export default EventsApi;