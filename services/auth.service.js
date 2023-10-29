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
  
    pwdreset(username, callback) {
      console.log('url: ' + API_URL + "pwdreset");
      const requestOptions = {
        method: 'POST',
        url: API_URL + 'pwdreset',
        data: {
          username: username,
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

      // set new password
      pwdset(token, username, password, callback) {
        console.log('url: ' + API_URL + "pwdset");
        const requestOptions = {
          method: 'POST',
          url: API_URL + 'pwdset',
          data: {
            token: token,
            username: username,
            password: password,
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
      
        register(username, firstname, lastname, email, password) {
      return axiosInstance
        .post(API_URL + "register", {
          username,
          firstname,
          lastname,
          email,
          password,
        })
        .then((response) => {
          // The user was registered successfully
          return response.data;
        })
        .catch((error) => {
          // Check if the error status is 409 Conflict (user already exists)
          if (error.response && error.response.status === 409) {
            throw new Error("User already exists"); // Throw the error to be caught in the component
          } else {
            throw new Error("Registration failed"); // Or handle other error cases if needed
          }
        });
    }
  

  getprofile(username) {
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
