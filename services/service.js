import axios from "axios";
const ConstantsUrl = "http://localhost:3002/";
// const ConstantsUrl = "https://find-my-stay-backend2.onrender.com/";

function Api(method, url, data, router, params) {
  return new Promise(function (resolve, reject) {
    let token = "";
    if (typeof window !== "undefined") {
      token = localStorage?.getItem("token") || "";
    }

    axios({
      method,
      url: ConstantsUrl + url,
      data,
      headers: { Authorization: `jwt ${token}` },
      params,
    }).then(
      (res) => {
        resolve(res.data);
      },
      (err) => {
        if (err.response) {
          const status = err.response.status;
          const message = err.response?.data?.message || "";
          if (
            (status === 401 || status === 403) &&
            typeof window !== "undefined"
          ) {
            if (
              message.toLowerCase().includes("jwt expired") ||
              message.toLowerCase().includes("No token provided") ||
              message.toLowerCase().includes("unauthorized")
            ) {
              localStorage.removeItem("token");
              localStorage.removeItem("userDetail");
              router?.push("/login");
            }
          }

          reject(err.response.data);
        } else {
          reject(err);
        }
      }
    );
  });
}

function ApiFormData(method, url, data, router) {
  return new Promise(function (resolve, reject) {
    let token = "";
    if (typeof window !== "undefined") {
      token = localStorage?.getItem("token") || "";
    }
    axios({
      method,
      url: ConstantsUrl + url,
      data,
      headers: {
        Authorization: `jwt ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }).then(
      (res) => {
        resolve(res.data);
      },
      (err) => {
        if (err.response) {
          if (err?.response?.status === 401) {
            if (typeof window !== "undefined") {
              localStorage.removeItem("userDetail");
              router?.push("/");
            }
          }
          reject(err.response.data);
        } else {
          reject(err);
        }
      }
    );
  });
}

const replaceUrl = (url) => {
  return url?.replace(
    "https://surfacegallery.s3.eu-north-1.amazonaws.com",
    "https://d1wm56uk2e4fvb.cloudfront.net"
  );
};

export { Api, ApiFormData, replaceUrl };
