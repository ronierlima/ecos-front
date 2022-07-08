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
    async list() {
      return api({
        method: "get",
        url: "http://localhost:8080/ecos-api/modelos",
        headers: {
          ContentType: "application/x-www-form-urlencoded",
          Authorization: "Basic b2lzb2w6YWRtaW4=",
        },
      });
    },
  }
};
