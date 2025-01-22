import axios from "axios";

//const API_URL = "http://192.168.0.135:8080/api/reg/";
const API_URL = "http://alwaysnearme.com/api/reg/";

class RegService {
  login(username, password, email) {
    return axios
      .post(API_URL + "register", {
        username,
        password,
        email
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      })
      .catch(error => {
        console.log(error.response.data);  
        console.log(error.response.status);  
        console.log(error.response.headers); 
        return error;
      })
      ;
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password) {
    return axios.post(API_URL + "register", {
      username,

      password
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('username'));;
  }
}

export default new RegService();
