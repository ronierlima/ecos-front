import api from "./api";
import qs from "qs";

export const services = {
  user: {
    async login(username, password) {
      return api({
        method: "post",
        url: process.env.VUE_APP_BASE_URL + "/oauth/token",
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
        url: process.env.VUE_APP_BASE_URL + "/oauth/check_token",
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

    async register(user) {
      return await api({
        method: "post",
        url: `${process.env.VUE_APP_BASE_URL}/usuarios`,
        data: user,
        headers: {
          ContentType: "application/x-www-form-urlencoded",
          Authorization: "Basic b2lzb2w6YWRtaW4=",
        },
      });
    },

    async getDetails(codigo) {
      return await api({
        method: "get",
        url: `${process.env.VUE_APP_BASE_URL}/usuarios/${codigo}`,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
    },
    async update(codigo, user) {

      return await api({
        method: "patch",
        url: `/usuarios/${codigo}`,
        data: user,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
    },
    async updatePass(codigo, senhas) {

      return await api({
        method: "put",
        url: `/usuarios/${codigo}/senha`,
        data: senhas,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
    },
  },
  models: {
    async post(data) {
      return api({
        method: "post",
        url: "/modelos",
        data,
        headers: {
          ContentType: "multipart/form-data",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
    },
    async put(codigo, data) {
      return api({
        method: "put",
        url: "/modelos/" + codigo,
        data,
        headers: {
          ContentType: "multipart/form-data",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
    },
    async patch(codigo, data) {
      return api({
        method: "patch",
        url: "/modelos/" + codigo,
        data,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
    },
    async list(params) {
      return api({
        method: "get",
        url: "/modelos",
        params,
      });
    },
    async getMyModels() {
      return api({
        method: "get",
        url: "/usuarios/modelos",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
    },
    async get(codigo) {
      return api({
        method: "get",
        url: `/modelos/${codigo}/arquivo`,
      });
    },
    async delete(codigo) {
      return api({
        method: "delete",
        url: `/modelos/${codigo}`,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
    },
    async index(codigo) {
      return api({
        method: "get",
        url: `/modelos/${codigo}`,
      });
    },
    preview: (codigo) =>
      `${process.env.VUE_APP_BASE_URL}/modelos/${codigo}/preview`,
  },
};
