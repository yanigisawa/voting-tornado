import jquery from 'jquery';
import {apiUrl, BaseRequest} from './api.config';

const baseUrl = apiUrl;
const baseRequest = new BaseRequest();

class VotesApi {
  static getVotesForEvent(eventId) {
    return jquery.ajax({
      headers : baseRequest.headers,
      dataType : "json",
      url : baseUrl + '/vote/' + eventId
    });
  }

  static saveVote(vote) {
    return jquery.ajax({
      headers : baseRequest.headers,
      method: 'POST',
      dataType : "json",
      url : baseUrl + '/vote',
      data: JSON.stringify(vote)
    });
  }
}

export default VotesApi;