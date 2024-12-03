import axios from "axios";

const BASE_URL = "http://192.168.29.114:3000/admin";

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
}

export default SublyApi;
