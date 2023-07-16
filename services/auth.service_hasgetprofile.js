import axios from "axios";

const API_URL = "http://localhost:4000/api/";

const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: API_URL
})

var cookie = document.cookie;
console.log("cookie: " + cookie);


class AuthService {

  login(username, password) {
    return axios
      .post(API_URL + "login", {
        username,
        password
      })
      .then(response => {
        console.log("response login here");
        if (response.data) {
          var thisCookie = "accessToken=" + response.data.accessToken;
          document.cookie= thisCookie;
//            document.cookie= "accessToken=" + response.data.accessToken;
//            document.cookie= response.data.accessToken;
//          document.cookie= (response.data.username + ";" + response.data.accessToken);
//          localStorage.setItem("user", JSON.stringify(response.data));
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

  register(username, firstname, lastname, email, password) {
    return axiosInstance.post(API_URL + "register", {
      username,
      firstname,
      lastname,
      email,
      password,

    });
  }

  getprofile(username) {
    let thisthing = document.cookie;
    console.log("API_URL: " + API_URL);
    var result = axios
    .post(API_URL + "getprofile",  {
      username
    }, {
      headers: { 'accessToken': document.cookie}})
    .then(response => {
		if (!response) {
			console.log("no response????");
		}
      console.log("response getprofile here");
	  console.log("profileData");
	  return(response.data);
      if (response.data.accessToken) {
        document.cookie= "token=" + JSON.stringify(response.data);
//          localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    })
    .catch(error => {
      console.log(error.response.data);  
      console.log(error.response.status);  
      console.log(error.response.headers); 
      return error;
    })

    console.log(" get profile ");
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('username'));;
  }
}

export default new AuthService();
