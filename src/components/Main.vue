<template>
  <div>
    <div class="superinfo-bg">
      <div class="superinfo">
        <select v-model="selected" name="language" id="language" class="chave">
          <option value="pt-BR">pt-BR</option>
          <option value="en">en</option>
          <option value="es">es</option>
        </select>
      </div>
    </div>

    <header class="menu-bg">
      <div class="menu">
        <div class="menu-logo">
          <router-link :to="usingLang.routes.home"><img width="220px" src="../assets/logo.png" /></router-link>
        </div>
        <nav class="menu-nav">
          <ul>
            <li><a :href="usingLang.routes.home">Home</a></li>
            <li><a :href="usingLang.routes.editor">Editor</a></li>
            <li>
              <a :href="usingLang.routes.publicModels">
                {{ usingLang.publicModels }}
              </a>
            </li>
            <li v-if="logado">
              <a :href="usingLang.routes.privateModels">
                {{ usingLang.privateModels }}
              </a>
            </li>

            <li v-if="!logado"><a :href="usingLang.routes.register">Cadastro</a></li>
            <li v-if="!logado"><a @click="showModal = true">Entrar</a></li>
            <li v-if="logado"><a>| {{ nome }} |</a></li>
            <li v-if="logado"><a id="exit" @click="logout()">| Sair |</a></li>
          </ul>
        </nav>
      </div>
    </header>

    <slot></slot>


  </div>
</template>

<script>
import { services } from "../services";

export default {
  name: "Main",

  data() {
    return {
      loader: null,
      loading: false,
      token: null,
      logado: false,
      nome: "",
      usuario: { nome: "teste" },
      showModal: false,
      selected: "pt-BR",
      input: {
        username: "",
        password: ""
      },
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


    this.changeLang();
  },

  methods: {

    logout() {
      this.token = null;
      this.logado = false;
      localStorage.removeItem("token");
       localStorage.removeItem("nome");
      this.$router.push(this.usingLang.routes.home)
    },
    
  
  },

  watch: {

    selected: function (newValue) {
      if (newValue === "pt-BR") {
        this.$router.push("/pt-br");
      } else if (newValue === "en") this.$router.push("/en");
      else if (newValue === "es") this.$router.push("/es");
      this.changeLang();
    },

  },

};
</script>