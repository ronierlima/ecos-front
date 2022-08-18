<template>
  <Main>
    <h1 class="introducao">Ecos Modeling<br />{{ usingLang.sub }}</h1>

    <section class="sobre" id="sobre">
      <div class="sobre-info">
        <h1>{{ usingLang.about }}</h1>
        <p>
          O que temos que ter sempre em mente é que a determinação clara de
          objetivos afeta positivamente a correta previsão das condições
          inegavelmente apropriadas objetivos.
        </p>
        <p>
          O que temos que ter sempre em mente é que a determinação clara de
          objetivos afeta positivamente a correta previsão das condições
          inegavelmente apropriadas objetivos.
        </p>
      </div>
      <div class="sobre-img">
        <img src="../assets/Diagrama.png" alt="Sobre 1" />
      </div>

    </section>

    <section class="produtos" id="produtos">
      <h1>{{ usingLang.publicModels }}</h1>
      <ul class="cards">
        <li v-for="modelo in modelos" v-bind:key="modelo.codigo">
          <a href="" class="card" v-on:click="open(modelo.codigo)">
            <img :src="'http://localhost:8080/ecos-api/modelos/' + modelo.codigo + '/preview'" class="card__image"
              alt="" />
            <div class="card__overlay">
              <div class="card__header">
                <svg class="card__arc" xmlns="http://www.w3.org/2000/svg">
                  <path />
                </svg>
                <img class="card__thumb" :src="'https://joeschmoe.io/api/v1/' + modelo.criador.codigo" alt="" />
                <div class="card__header-text">
                  <h3 class="card__title">{{ modelo.criador.nome }}</h3>
                  <span class="card__status">1 hour ago</span>
                </div>
              </div>
              <p class="card__description">Abrir modelo no editor</p>
            </div>
          </a>
        </li>
      </ul>
      <a id="plusModels" :href="usingLang.routes.publicModels">
        + {{ usingLang.publicModels }}
      </a>
    </section>

  </Main>
</template>

<script>
import { services } from "../../services";
import language from "../helpers/language";
import Main from "../components/Main.vue"

export default {
  name: "Index",
  components: {
    Main,
  },

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
      modelos: []
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

    this.getModelos();
    this.changeLang();
  },

  methods: {
    login() {
      if (this.input.username != "" && this.input.password != "")
        services.user
          .login("ronier.lim@gmail.com", "1")
          .then((res) => {
            this.token = res.data.access_token;
            this.nome = res.data.nome_completo;
            this.logado = true;
            localStorage.setItem("token", res.data.access_token);
            localStorage.setItem("nome", res.data.nome_completo);
            this.showModal = false;
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
    changeLang() {


      if (this.selected === "en") this.usingLang = language.en;
      else if (this.selected === "es") this.usingLang = language.es;
      else {
        this.usingLang = language.pt;
        this.selected = "pt-BR";
      }
    },

    getModelos() {
      services.models
        .list({ size: 6 })
        .then((res) => {
          this.modelos = res.data.content;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    open(modelo) {
      this.$router.push("/pt-br/editor/" + modelo);
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

#plusModels {
  max-width: 100%;
  display: block;
  margin: 20px auto;
  border: 4px solid;
  color: #222222;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 2em;
  padding: 15px 0;
  text-align: center;
}
</style>
