import Auth from '../components/auth/auth';


// TODO: Make API Configurable

class EventsApi {

  static getAllEvents() {
    let auth = new Auth();
    
    return $.ajax({
      headers : {},
      dataType : "json",
      url : 'http://localhost:3500/api/getAllEvents'
    });
  }
}

export default EventsApi;