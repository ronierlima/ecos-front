import api from "./api";
import qs from "qs";

export const services = {
  user: {
    async login(username, password) {
      return api({
        method: "post",
        url: "http://localhost:8080/ecos-api/oauth/token",
        data: qs.stringify({
          username: username,
          password: password,
          grant_type: "password",
        }),
        headers: {
          ContentType: "application/x-www-form-urlencoded",
          Authorization: "Basic b2lzb2w6YWRtaW4=",
        },
      });
    },
    async checkToken(token) {
      return api({
        method: "post",
        url: process.env.REACT_APP_GATEWAY_AUTH + "/check_token",
        data: qs.stringify({
          token: token,
        }),
        headers: {
          ContentType: "application/x-www-form-urlencoded",
          Authorization: "Basic b2lzb2w6YWRtaW4=",
        },
      });
    },

    async forgotPassword(user) {
      return await api({
        method: "put",
        url: process.env.REACT_APP_GATEWAY + "/usuarios/recuperar-senha",
        data: user,
        headers: {
          ContentType: "application/x-www-form-urlencoded",
          Authorization: "Basic b2lzb2w6YWRtaW4=",
        },
      });
    },
  },
  models: {
    async post(data) {
      return api({
        method: "post",
        url: "http://localhost:8080/ecos-api/modelos",
        data,
        headers: {
          ContentType: "multipart/form-data",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
    },
    async list(params) {
      return api({
        method: "get",
        url: "http://localhost:8080/ecos-api/modelos",
        params,
      });
    },
    async getMyModels() {
      return api({
        method: "get",
        url: "http://localhost:8080/ecos-api/usuarios/modelos",
      });
    },
    async get(codigo) {
      return api({
        method: "get",
        url: `http://localhost:8080/ecos-api/modelos/${codigo}/arquivo`,
      });
    },
    async index(codigo) {
      return api({
        method: "get",
        url: `http://localhost:8080/ecos-api/modelos/${codigo}`,
      });
    },
  },
};
