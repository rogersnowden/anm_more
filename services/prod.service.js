// prod.service

import axios from "axios";
const API_URL = "https://localhost:4000/api/";

const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: API_URL
})

var cookie = document.cookie;
console.log("cookie: " + cookie);

class ProdService {

  async getLibrary(userName) {
    try {
      const response = await axiosInstance.post('getLibrary', { userName });
      return response.data;
    } catch (error) {
      // Handle or throw the error as needed
      console.error("Error in getLibrary:", error);
      throw error;
    }
  }

  async getUserBook(userName, productSKU) {
    try {
      const response = await axiosInstance.post('getUserBook', { userName, productSKU });
      return response.data;
    } catch (error) {
      // Handle or throw the error as needed
      console.error("Error in getUserBook:", error);
      throw error;
    }
  }

  async getBookImages(userName, productSKU) {
    try {
      const response = await axiosInstance.post('getUserBookImages', { userName, productSKU });
      const imagesBase64 = response.data;

      // Convert base64 encoded data to blobs for rendering as images
      const images = imagesBase64.map(image => {
        const byteCharacters = atob(image.data.split(',')[1]);
        const byteArrays = [];

        for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
          const slice = byteCharacters.slice(offset, offset + 1024);
          const byteNumbers = new Array(slice.length);

          for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
          }

          const byteArray = new Uint8Array(byteNumbers);
          byteArrays.push(byteArray);
        }

        const blob = new Blob(byteArrays, { type: 'image/png' });
        const imageUrl = URL.createObjectURL(blob);
        return { filename: image.filename, url: imageUrl };
      });

      return images;
    } catch (error) {
      console.error("Error in getBookImages:", error);
      throw error;
    }
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

export default new ProdService();
