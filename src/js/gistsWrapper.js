const axios = require('axios');
const token = require("./config.js")



class gistsWrapper {
    constructor(token) {
      this.token = token
      this.client = axios.create({
        baseURL: 'https://api.github.com/',
        responseType: 'json',
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'Authorization': 'token ' + this.token
        }
      })
    }

      getRequest(path) {
        return this.client.get(path)
      }

      
      createGist(payload) {
        return this.postRequest('/gists', payload)
      }
    

      postRequest(path, payload) {
        return this.client.post(path, payload)
      }
    
      root() {
        return this.getRequest('/')
      }
    
      getGist(gistId) {
        return this.getRequest(`/gists/${gistId}`)
      }
    }


    // let ghWrapper = new gistsWrapper(token)
    // let gistPayload = {
    //   "description": "test",
    //   "public": true,
    //   "files": {
    //     "czy dziala.txt": {
    //       "content": "ni chuja :D"
    //     }
    //   }
    // }
    
    
    //ghWrapper.root().then((response) => console.log(response.data))
    //ghWrapper.getGist('4840102b0553184fb6853fb70a6b49ff').then((response) => console.log(response.data))
    //ghWrapper.createGist(gistPayload).then((response) => console.log(response.data))
    //ghWrapper.getRequest('/gists').then((response) => console.log(response.data))
    //ghWrapper.validation().then((response) => console.log(response.data))

    export default gistsWrapper

