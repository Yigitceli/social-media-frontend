import axios from "axios";

const instance = axios.create({
  baseURL: "https://share-me-backend.herokuapp.com/api/",
  headers: {
    "Content-Type": "application/json",
  },
});
instance.interceptors.request.use(
  (config) => {
    const token = JSON.parse(window.localStorage.getItem("accessToken"));
    if (token) {
      // config.headers["Authorization"] = 'Bearer ' + token;  // for Spring Boot back-end
      config.headers["authorization"] = token; // for Node.js Express back-end
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    if (originalConfig.url !== "/user/login" && err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        try {
          const rs = await instance.post("user/refresh-token", {
            refreshToken: JSON.parse(
              window.localStorage.getItem("refreshToken")
            ),
          });
          const access_token = rs.data.payload;

          window.localStorage.setItem(
            "accessToken",
            JSON.stringify(access_token)
          );
          return instance(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }
    return Promise.reject(err);
  }
);
export default instance;
