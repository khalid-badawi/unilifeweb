import axios from "axios";
import env from "react-dotenv";
const BASE_URL = "http://localhost:3000/api/v1/unilife";
//const RAPIDAPI_HOST = "investing-cryptocurrency-markets.p.rapidapi.com";
//const RAPIDAPI_KEY = "3bd39bcb8dmshb5db9a8e916f20dp198b41jsn95ca2c49a7d2";
export async function getData(endpoint, token, ...params) {
  try {
    //console.log("The value", value);
    //console.log("The URL", env.BASE_URL);
    const ids = params.join("/");
    console.log("my token", token);
    const res = await axios.get(
      `${BASE_URL}/${endpoint}/${ids}`,
      //JSON.stringify(value),
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    //await storeTokenInKeychain(response.data.token);
    //const token = await getTokenFromKeychain();
    return res;
  } catch (err) {
    console.log(err.message);
    return err;
  }
}
export async function postData(endpoint, value, token = null, ...params) {
  try {
    // console.log("The URL", env.BASE_URL);
    const ids = params.join("/");
    const res = await axios.post(
      `${BASE_URL}/${endpoint}/${ids}`,
      JSON.stringify(value),
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    //await storeTokenInKeychain(response.data.token);
    //const token = await getTokenFromKeychain();
    // console.log(res);
    return res;
  } catch (err) {
    console.log(err.message);
    return err;
  }
}
export async function postDataFiles(
  endpoint,
  data,
  file,
  token = null,
  ...params
) {
  try {
    console.log("The URL", process.env.BASE_URL);
    const formData = new FormData();
    formData.append("data", data);
    formData.append("image", file);
    const ids = params.join("/");
    const res = await axios.post(`${BASE_URL}/${endpoint}/${ids}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        /*"x-rapidapi-host": RAPIDAPI_HOST,
        "x-rapidapi-key": RAPIDAPI_KEY,*/
        Authorization: `Bearer ${token}`,
      },
    });
    //await storeTokenInKeychain(response.data.token);
    //const token = await getTokenFromKeychain();
    // console.log(res);
    return res;
  } catch (err) {
    console.log(err.message);
    return err;
  }
}
export async function putDataFiles(
  endpoint,
  data,
  file,
  token = null,
  ...params
) {
  try {
    console.log("The URL", process.env.BASE_URL);
    const formData = new FormData();
    formData.append("data", data);
    formData.append("image", file);
    const ids = params.join("/");
    const res = await axios.patch(`${BASE_URL}/${endpoint}/${ids}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        /*"x-rapidapi-host": RAPIDAPI_HOST,
        "x-rapidapi-key": RAPIDAPI_KEY,*/
        Authorization: `Bearer ${token}`,
      },
    });
    //await storeTokenInKeychain(response.data.token);
    //const token = await getTokenFromKeychain();
    // console.log(res);
    return res;
  } catch (err) {
    console.log(err.message);
    return err;
  }
}
export async function putData(endpoint, value = null, token = null, ...params) {
  try {
    console.log("The URL", process.env.BASE_URL);
    const ids = params.join("/");
    const res = await axios.patch(
      `${BASE_URL}/${endpoint}/${ids}`,
      value && JSON.stringify(value),
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res;
  } catch (err) {
    console.log(err.message);
    return err;
  }
}
export async function deleteData(endpoint, token = null, ...params) {
  try {
    console.log("The URL", process.env.BASE_URL);
    console.log("params", params);
    const ids = params.join("/");
    const res = await axios.delete(`${BASE_URL}/${endpoint}/${ids}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (err) {
    console.log(err.message);
    return err;
  }
}
