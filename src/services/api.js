import axios from 'axios';

export default axios.create({
  // baseURL: 'https://www.travelpcrtest.com/',
  baseURL: 'http://localhost:9090/',

  headers : {
      'Authorization' : 'Basic QXp1cmXEaWFtb45kOmh1bnRlcjO='
  }
});