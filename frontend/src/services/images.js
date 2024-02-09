const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const uploadImage = async (fileDataURL, publicID, token) => {
    const payload = {
      file: fileDataURL,
      public_id: publicID,
    }
  
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    };
  
    const response = await fetch(`${BACKEND_URL}/images/profile`, requestOptions);
  
    if (response.status !== 200) {
      throw new Error("Unable to make POST request");
    }
  
    const data = await response.json();
    return data;
   };