import axios from "axios";

const BASE_URL = "http://192.168.29.221:3000/admin";
// const BASE_URL = "http://192.168.29.161:3000/admin";

class SublyApi {
  //token which interact with the API will be stored here.
  static token;
  static async request(endpoint, data = {}, method = "get", header) {
    const url = `${BASE_URL}/${endpoint}`;
    const headers = header || { Authorization: `Bearer ${SublyApi.token}` };
    const params = method === "get" ? data : {};
    try {
      const result = await axios({ url, method, data, params, headers });
      // console.log("main result", result)
      return result ? result.data : "There is no return for this route";
    } catch (err) {
      return err.response;
    }
  }

  /* ------LOGIN API-----*/

  static async LoginHandle(data) {
    let res = await this.request(`auth/signin`, data, "post", undefined);
    return res;
  }

  /* ------CREATE CATEGORY API-----*/

  static async createCategory(data, token) {
    let header = { Authorization: `Bearer ${token}` };
    let res = await this.request(`post/addcategories`, data, "post", header);
    return res;
  }

  /* ------GET CATEGORY API-----*/

  static async fetchCategory(token) {
    let header = { Authorization: `Bearer ${token}` };
    let res = await this.request(`post/cateogries`, undefined, "get", header);
    return res;
  }

  /* ------DELETE CATEGORY API-----*/

  static async deleteCategory(token, id) {
    let header = { Authorization: `Bearer ${token}` };
    let res = await this.request(
      `post/categories/delete/${id}`,
      undefined,
      "delete",
      header
    );
    return res;
  }

  /* ------CATEGORY DETAIL API-----*/

  static async detailCategory(token, id) {
    let header = { Authorization: `Bearer ${token}` };
    let res = await this.request(
      `post/categories/${id}`,
      undefined,
      "get",
      header
    );
    return res;
  }

  /* ------UPDATE CATEGORY API-----*/

  static async updateCategory(token, data, id) {
    let header = { Authorization: `Bearer ${token}` };
    let res = await this.request(
      `post/updatecategories/${id}`,
      data,
      "put",
      header
    );
    return res;
  }

  /* ------FETCH POST LIST API-----*/

  static async fetchPostList(token) {
    let header = { Authorization: `Bearer ${token}` };
    let res = await this.request(`post/getpost`, undefined, "get", header);
    return res;
  }

  /* ------FETCH POST DETAIL API-----*/

  static async fetchPostDetail(token, id) {
    let header = { Authorization: `Bearer ${token}` };
    let res = await this.request(
      `post/getpost/${id}`,
      undefined,
      "get",
      header
    );
    return res;
  }

  /* ------DELETE POST API-----*/

  static async deletePost(token, id) {
    let header = { Authorization: `Bearer ${token}` };
    let res = await this.request(
      `post/deletePost/${id}`,
      undefined,
      "delete",
      header
    );
    return res;
  }

  /* ------CREATE POST API-----*/

  static async createPost(token, data) {
    let header = { Authorization: `Bearer ${token}` };
    let res = await this.request(`post/addpost`, data, "post", header);
    return res;
  }

  /* ------SEARCH POST API-----*/

  static async searchPost(token, data) {
    let header = { Authorization: `Bearer ${token}` };
    let res = await this.request(`post/advanced-search`, data, "post", header);
    return res;
  }

  /* ------CREATE MEDIA CATEGORY API-----*/

  static async createMediaCategory(token, data) {
    let header = { Authorization: `Bearer ${token}` };
    let res = await this.request(`post/addMediaCategory`, data, "post", header);
    return res;
  }

  /* ------FETCH MEDIA LIST API-----*/

  static async mediaList(token) {
    let header = { Authorization: `Bearer ${token}` };
    let res = await this.request(
      `post/getMediaCategory-list`,
      undefined,
      "get",
      header
    );
    return res;
  }

  /* ------FETCH MEDIA LIST API-----*/

  static async mediaGalleryList(token, id) {
    let header = { Authorization: `Bearer ${token}` };
    let res = await this.request(
      `post/getMediaFiles-list?mediaFileCategory=${id}`,
      undefined,
      "get",
      header
    );
    return res;
  }

  /* ------CREATE MEDIA API-----*/

  static async createMedia(token, data) {
    let header = { Authorization: `Bearer ${token}` };
    let res = await this.request(`post/addMediaFiles`, data, "post", header);
    return res;
  }

  /* ------CATEGORY ADVANCE SEARCH API-----*/

  static async categoryAdvanceSearch(token, data) {
    let header = { Authorization: `Bearer ${token}` };
    let res = await this.request(
      `post/advanced-searchCategory`,
      data,
      "post",
      header
    );
    return res;
  }

  /* -----UPDATE POST API-----*/

  static async updatePost(token, data, id) {
    let header = { Authorization: `Bearer ${token}` };
    let res = await this.request(`post/updatepost/${id}`, data, "put", header);
    return res;
  }
}

export default SublyApi;
