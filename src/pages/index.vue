<template>
  <!-- <div class="text-center">
    <h4 v-if="logado">Bem vindo {{ nome }}</h4>
    <button v-if="!logado" v-on:click="login">login</button>
    <button v-if="logado" v-on:click="logout">sair</button>
    
  </div> -->
  <Modelagem v-bind:usuario="usuario"/>
</template>

<script>
import { services } from "../../services";
import Modelagem from "../components/Modelagem.vue";

export default {
  name: "index",
  components: {
    Modelagem,
  },

  data() {
    return {
      loader: null,
      loading: false,
      token: null,
      logado: false,
      nome: "",
      usuario: { nome: "teste"}
    };
  },

  created: function () {
    const token = localStorage.getItem("token");
    const nome = localStorage.getItem("nome");

    if (token) {
      this.token = token;
      this.logado = true;
      this.nome = nome;
    }
  },

  methods: {
    login() {
      services.user
        .login("ronier.lim@gmail.com", "1")
        .then((res) => {
          this.token = res.data.token;
          this.nome = res.data.nome;
          this.logado = true;
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("nome", res.data.nome);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    logout() {
      this.token = null;
      this.logado = false;
      localStorage.removeItem("token");
    },
  },
};
</script>

<style>
.text-center {
  
}
</style>
