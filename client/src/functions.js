const BASE_URL = (path = "") => `http://localhost:4040/api/users/${path}`;
const POST_URL = (path = "") => `http://localhost:4040/api/posts/${path}`;
const COM_URL = (path = "") => `http://localhost:4040/api/comments/${path}`;

export const createAccount = data => {
  return fetch(BASE_URL(), {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" }
  })
    .then(res => res.json())
    .catch(err => console.log(err));
};

export const login = data => {
  return fetch(BASE_URL("login"), {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" }
  })
    .then(res => res.json())
    .catch(err => console.log(err));
};

export const getUserData = key => {
  return fetch(BASE_URL(key), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token")
    }
  })
    .then(res => res.json())
    .catch(err => console.log(err));
};

export const createPost = data => {
  return fetch(POST_URL(), {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token")
    }
  })
    .then(res => res.json())
    .catch(err => console.log(err));
};

export const getAllPosts = () => {
  return fetch(POST_URL(), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token")
    }
  })
    .then(res => res.json())
    .catch(err => console.log(err));
};

export const deletePost = id => {
  return fetch(POST_URL(id), {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token")
    }
  })
    .then(res => res.json())
    .catch(err => console.log(err));
};

export const currentUser = () => {
  return fetch(BASE_URL("current"), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token")
    }
  })
    .then(res => res.json())
    .catch(err => console.log(err));
};

export const createComment = data => {
  return fetch(COM_URL(), {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token")
    }
  })
    .then(res => res.json())
    .catch(err => console.log(err));
};

export const getPostById = id => {
  return fetch(POST_URL(id), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token")
    }
  })
    .then(res => res.json())
    .catch(err => console.log(err));
};
