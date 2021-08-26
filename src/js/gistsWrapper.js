const axios = require("axios");

class gistsWrapper {
  constructor(token) {
    this.token = token;
    this.client = axios.create({
      baseURL: "https://api.github.com/",
      responseType: "json",
      headers: {
        Accept: "application/vnd.github.v3+json",
        Authorization: "token " + this.token,
      },
    });
  }

  getRequest(path) {
    return this.client.get(path);
  }

  deleteRequest(path) {
    return this.client.delete(path);
  }

  postRequest(path, payload) {
    return this.client.post(path, payload);
  }

  root() {
    return this.getRequest("/");
  }

  // createGist(payload) {
  //   return this.postRequest("/gists", payload);
  // }

  createGist(description, isPublic, files) {
    return this.postRequest("/gists", {
      description: description,
      public: isPublic,
      files: files,
    });
  }

  getGist(gistId) {
    return this.getRequest(`/gists/${gistId}`);
  }

  deleteGist(gistId) {
    return this.deleteRequest(`/gists/${gistId}`);
  }

  getAllGists() {
    return this.getRequest("/gists");
  }

  validate() {
    return this.getRequest("/user");
  }
}

export default gistsWrapper;
