import axios from "axios";

const API_URL = "https://alwaysnearme.com/api/";

const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

var cookie = document.cookie;
console.log("cookie: " + cookie);

class AuthService {
  login(username, password, callback) {
    console.log("url: " + API_URL + "login");
    const requestOptions = {
      method: "POST",
      url: API_URL + "login",
      data: {
        username: username,
        password: password,
      },
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "https://alwaysnearme.com",
      },
    };
    axios(requestOptions)
      .then((response) => {
        if (response.data) {
          var thisCookie = "accessToken=" + response.data.accessToken;
          document.cookie = thisCookie;
        }
        callback(null, response.data);
      })
      .catch((error) => {
        callback(error, null);
      });
  }

  logout(username, callback) {
    document.cookie = `${"accessToken"}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    axios
      .post(API_URL + "logout", {
        username,
      })
      .then((response) => {
        if (response.data) {
          console.log("logout resp: " + response);
        }
        callback(null, response.data);
      })
      .catch((error) => {
        callback(error, null);
      });
  }

  verifyResetCode(username, code, callback) {
    console.log("url: " + API_URL + "verifyResetCode");
    const requestOptions = {
      method: "POST",
      url: API_URL + "verifyResetCode",
      data: { username, code },
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "https://alwaysnearme.com",
      },
    };
    axios(requestOptions)
      .then((response) => callback(null, response.data))
      .catch((error) => callback(error, null));
  }

  pwdreset(username, callback) {
    console.log("url: " + API_URL + "pwdreset");
    const requestOptions = {
      method: "POST",
      url: API_URL + "pwdreset",
      data: {
        username: username,
      },
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "https://alwaysnearme.com",
      },
    };
    axios(requestOptions)
      .then((response) => {
        if (response.data) {
          var thisCookie = "accessToken=" + response.data.accessToken;
          document.cookie = thisCookie;
        }
        callback(null, response.data);
      })
      .catch((error) => {
        callback(error, null);
      });
  }

  pwdset(token, username, password, callback) {
    console.log("url: " + API_URL + "pwdset");
    const requestOptions = {
      method: "POST",
      url: API_URL + "pwdset",
      data: {
        token: token,
        username: username,
        password: password,
      },
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "https://alwaysnearme.com",
      },
    };
    axios(requestOptions)
      .then((response) => {
        if (response.data) {
          var thisCookie = "accessToken=" + response.data.accessToken;
          document.cookie = thisCookie;
        }
        callback(null, response.data);
      })
      .catch((error) => {
        callback(error, null);
      });
  }

  register(username, firstname, lastname, phonenumber, password) {
    console.log("url: " + API_URL + "registerWithCode");
    return axiosInstance
      .post(API_URL + "registerWithCode", {
        username,
        firstname,
        lastname,
        phonenumber,
        password,
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        if (error.response && error.response.status === 409) {
          throw new Error("User already exists");
        } else {
          throw new Error("Registration failed");
        }
      });
  }

  verifyRegistrationCode(username, code, callback) {
    console.log("url: " + API_URL + "verifyRegistrationCode");
    const requestOptions = {
      method: "POST",
      url: API_URL + "verifyRegistrationCode",
      data: { username, code },
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "https://alwaysnearme.com",
      },
    };
    axios(requestOptions)
      .then((response) => callback(null, response.data))
      .catch((error) => callback(error, null));
  }

  getprofile(username) {
    console.log("API_URL: " + API_URL);
    return axios
      .post(API_URL + "getprofile", {
        username,
      })
      .then((response) => response.data)
      .catch((error) => {
        console.log(error.response);
        return error;
      });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("username"));
  }
}

export default new AuthService();
