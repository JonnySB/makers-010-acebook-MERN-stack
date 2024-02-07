// docs: https://vitejs.dev/guide/env-and-mode.html
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const getUserById = async (userId, token) => {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(`${BACKEND_URL}/users/${userId}`, requestOptions);

  if (response.status !== 200){
    throw new Error("Unable to get user. Does this user exist?");
  }
  // console.log("user", response)
  const data = await response.json();

  return data; 
};

//TODO: 
export const updateBio = async (bioContent, token) => {
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`, 
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(bioContent)
  };

  const response = await fetch(`${BACKEND_URL}/users/${token.user_id}/bio`, requestOptions);

  if (response.status !==201){
    throw new Error("Couldn't update bio");
  }else{
    console.log("Updated bio successfuly")
  }

  const data = await response.json();
  return data; 
}

export const updateCurrentLocation = async (currentLocationContent, token) => {
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'applicatoin/json'
    },
    body: JSON.stringify(currentLocationContent) 
  }

  const response = await fetch(`${BACKEND_URL}/users/${token.user_id}/currentLocation`, requestOptions);

  if (response.status !==201){
    throw new Error("Couldn't update current location");
  }else{
    console.log("Updated current location successfuly")
  }

  const data = await response.json();
  return data; 
}

export const updateWorkplace = async (workplaceContent, token) => {
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'applicatoin/json'
    },
    body: JSON.stringify(workplaceContent) 
  }

  const response = await fetch(`${BACKEND_URL}/users/${token.user_id}/workplace`, requestOptions);

  if (response.status !==201){
    throw new Error("Couldn't update workplace");
  }else{
    console.log("Updated workplace successfuly")
  }

  const data = await response.json();
  return data; 
}

export const updateEducation = async (educationContent, token) => {
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'applicatoin/json'
    },
    body: JSON.stringify(educationContent) 
  }

  const response = await fetch(`${BACKEND_URL}/users/${token.user_id}/education`, requestOptions);

  if (response.status !==201){
    throw new Error("Couldn't update education");
  }else{
    console.log("Updated education successfuly")
  }

  const data = await response.json();
  return data; 
}


