<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import './app.css';

import language from "./helpers/language";
import { services } from "./services";

export default {
  name: "app",

  data() {
    return {
      usuario: { nome: "" },
      language: language.pt,
      selectLanguage: "pt-br"
    }
  },

  provide() {
    return {
      getLanguage: () => this.language,
      getUsuario: () => this.usuario,
      getLogado: () => this.logado,
      logout: () => {
        this.usuario = null;
        this.logado = false;

        localStorage.removeItem("token");
        localStorage.removeItem("nome");
        localStorage.removeItem("codigo_usuario");
        this.$router.push("/");
        document.location.reload(true);
      }
    }
  },

  methods: {
    changeLanguage() {
      if (window.location.pathname.includes("/en/")) {
        this.language = language.en;

      }
      else if (window.location.pathname.includes("/es/")) {
        this.language = language.es;

      }
      else {
        this.language = language.pt;

      }
    },
    getCredentials() {

      const token = localStorage.getItem("token");
      const nome = localStorage.getItem("nome");
      const codigo_usuario = localStorage.getItem("codigo_usuario");

      if (token) {

        this.logado = true;

        this.usuario.token = token;
        this.usuario.nome = nome;
        this.usuario.codigo = codigo_usuario;

      }
    },
    async check() {

      try {

        const token = localStorage.getItem("token");
        const nome = localStorage.getItem("nome");
        const codigo_usuario = localStorage.getItem("codigo_usuario");

        if (token) {

          await services.user.checkToken(token);


          this.logado = true;

          this.usuario.token = token;
          this.usuario.nome = nome;
          this.usuario.codigo = codigo_usuario;

        }

      } catch (error) {



        this.logado = false;

        this.usuario.token = null;
        this.usuario.nome = null;
        this.usuario.codigo = null;

        localStorage.removeItem("token");
        localStorage.removeItem("nome");
        localStorage.removeItem("codigo_usuario");

        this.$router.push("/");
        this.$toast.error('login inspirado');

      }

    },
  },

  created: function () {
    this.check()
    this.getCredentials();
    this.changeLanguage();
  },

  watch: {
    $route() {
      this.changeLanguage();
      this.getCredentials();
    }
  }
};
</script>