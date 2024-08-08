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

// Assuming axiosInstance is already configured and imported

async getBookAudio(userName, productSKU) {
  try {
      const response = await axiosInstance.post('getUserBookAudio', { userName, productSKU });
      const audiosBase64 = response.data;

      // Convert base64 encoded data to blobs for rendering as audio
      const audios = audiosBase64.map(audio => {
          const byteCharacters = atob(audio.data.split(',')[1]);
          const byteArrays = [];

          for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
              const slice = byteCharacters.slice(offset, offset + 1024);
              const byteNumbers = new Array(slice.length).fill().map((_, i) => slice.charCodeAt(i));
              byteArrays.push(new Uint8Array(byteNumbers));
          }

          const blob = new Blob(byteArrays, { type: 'audio/wav' });
          const audioUrl = URL.createObjectURL(blob);
          return { filename: audio.filename, url: audioUrl };
      });

      return audios;
  } catch (error) {
      console.error("Error in getBookAudio:", error);
      throw error;
  }
}

async saveAudioFile(userName, productSKU, currentPageIndex, audioBlob, fileExtension) {
  const formData = new FormData();
  formData.append('audioFile', audioBlob, `audio.${fileExtension}`);
  formData.append('userName', userName);
  formData.append('productSKU', productSKU);
  formData.append('currentPageIndex', currentPageIndex);

  try {
    const response = await fetch('https://localhost:4000/api/saveAudioFile', {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();
    console.log('File saved successfully', data);
  } catch (error) {
    console.error('Error saving file', error);
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
