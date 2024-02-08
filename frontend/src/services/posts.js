// docs: https://vitejs.dev/guide/env-and-mode.html
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const getPosts = async (token) => {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(`${BACKEND_URL}/posts`, requestOptions);

  if (response.status !== 200) {
    throw new Error("Unable to fetch posts");
  }

  const data = await response.json();
  console.log("posts services", data)
  return data;
};

export const createPosts = async (token, message) => {
  const payload = {
    message: message,
    createdAt: new Date().toISOString(),
  };

  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  };

  const response = await fetch(`${BACKEND_URL}/posts`, requestOptions);

  if (response.status !== 201) {
    throw new Error("Unable to make POST request for fetch posts");
  }

  const data = await response.json();
  return data;
};

export const postLike = async (token, post_id) => {
  const payload = {
    post_id: post_id,
  };

  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  };

  const response = await fetch(`${BACKEND_URL}/posts/likes`, requestOptions);

  if (response.status !== 201) {
    throw new Error("Unable to like");
  }

  const data = await response.json();
  return data;
};

export const postUnlike = async (token, post_id) => {
  const payload = {
    post_id: post_id,
  };

  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  };

  const response = await fetch(`${BACKEND_URL}/posts/unlike`, requestOptions);

  if (response.status !== 201) {
    throw new Error("Unable to unlike");
  }

  const data = await response.json();
  return data;
};

export const createComment = async (token, post_id, message) => {
  const payload = {
    post_id: post_id,
    message: message,
  };

  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  };

  const response = await fetch(`${BACKEND_URL}/posts/comments`, requestOptions);

  if (response.status !== 201) {
    throw new Error("Unable to create comment");
  }

  const data = await response.json();
  return data;
};
