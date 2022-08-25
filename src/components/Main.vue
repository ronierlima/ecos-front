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

            <li v-if="!logado"><a @click="showModal = true">Entrar</a></li>
            <li v-if="logado"><a>| {{ nome }} |</a></li>
            <li v-if="logado"><a id="exit" @click="logout()">| Sair |</a></li>
          </ul>
        </nav>
      </div>
    </header>

    <slot></slot>

    <transition name="modal" v-if="showModal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">
            <div class="modal-header">
              <h3 name="header">{{ usingLang.login }}</h3>
            </div>

            <div class="modal-body">
              <form>

                <label for="username">Username</label>
                <input type="text" v-model="input.username" placeholder="Email" id="username" name="username">

                <label for="password">Password</label>
                <input type="password" v-model="input.password" placeholder="Password" id="password" name="password">
              </form>
            </div>

            <div class="modal-footer">
              <slot name="footer">
                <button class="modal-default-button cancel" @click="showModal = false">
                  {{ usingLang.cancel }}
                </button>
                <button class="modal-default-button" @click="login()">
                  {{ usingLang.login }}
                </button>
              </slot>
            </div>
          </div>
        </div>
      </div>
    </transition>

  </div>
</template>

<script>
import { services } from "../../services";
import language from "../helpers/language";

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
      usingLang: {},
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

    login() {
      if (this.input.username != "" && this.input.password != "") {
        services.user
          .login(this.input.username, this.input.password)
          .then((res) => {
            this.token = res.data.access_token;
            this.nome = res.data.nome_completo;
            this.codigo_usuario = res.data.codigo_usuario;

            this.logado = true;

            localStorage.setItem("token", res.data.access_token);
            localStorage.setItem("nome", res.data.nome_completo);
            localStorage.setItem("codigo_usuario", res.data.codigo_usuario);

            this.showModal = false;

            this.$toast.success("Seja bem vindo, " + res.data.nome_completo);
          })
          .catch((error) => {
            this.$toast.error(error.response.data.error_description || "Ocorreu um erro desconhecido");
          });

      } else {
        this.$toast.error("Preencha todos os campos");
      }
    },

    logout() {
      this.token = null;
      this.logado = false;
      localStorage.removeItem("token");
       localStorage.removeItem("nome");
      this.$router.push(this.usingLang.routes.home)
    },
    
    changeLang() {


      if (this.selected === "en") this.usingLang = language.en;
      else if (this.selected === "es") this.usingLang = language.es;
      else {
        this.usingLang = language.pt;
        this.selected = "pt-BR";
      }
    }
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

<style>
form {
  width: 80%;
  padding: 2rem;
}

form * {
  color: #5e5e5e;
  letter-spacing: 0.5px;
  outline: none;
  border: none;
}

label {
  display: block;
  margin-top: 30px;
  font-size: 16px;
  font-weight: 500;
}

input {
  display: block;
  height: 50px;
  width: 100%;
  background-color: #f2f0e6;
  border-radius: 3px;
  padding: 0 10px;
  margin-top: 8px;
  font-size: 14px;
  font-weight: 300;
}

::placeholder {
  color: #5e5e5e;
}
</style>
