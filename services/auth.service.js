import axios from "axios";

const API_URL = "https://localhost:4000/api/";

const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: API_URL
})

var cookie = document.cookie;
console.log("cookie: " + cookie);


class AuthService {

  login(username, password, callback) {
    console.log('url: ' + API_URL + "login");
    const requestOptions = {
      method: 'POST',
      url: API_URL + 'login',
      data: {
        username: username,
        password: password
      },
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'https://localhost:3000'
      }
    };

    axios(requestOptions)
      .then(response => {
        if (response.data) {
          var thisCookie = 'accessToken=' + response.data.accessToken;
          document.cookie = thisCookie;
        }
        callback(null, response.data);
      })
      .catch(error => {
        callback(error, null);
      });
    }
  
    logout(username, callback) {
      // expire the cookie
      document.cookie = `${'accessToken'}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;      axios
        .post(API_URL + "logout", {
          username,
        })
        .then(response => {
          if (response.data) {
            console.log("logout resp: " + response);
          }
          callback(null, response.data);
        })
        .catch(error => {
          callback(error, null);
        });
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