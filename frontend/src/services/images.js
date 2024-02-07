const URL = "https://api.cloudinary.com/v1_1/dapj3ww2j/image/upload";

export const uploadImage = async (fileDataURL, publicID) => {
    const payload = {
      file: fileDataURL,
      upload_preset: "ql98gqww",
      public_id: publicID,
    }
  
    const requestOptions = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    };
  
    const response = await fetch(`${URL}/`, requestOptions);
  
    if (response.status !== 200) {
      throw new Error("Unable to make POST request");
    }
  
    const data = await response.json();
    return data;
   };