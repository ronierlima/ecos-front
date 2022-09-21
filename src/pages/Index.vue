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
      <div class="container">
        <div class="card" v-for="modelo in modelos" v-bind:key="modelo.codigo">
          <div class="user">
            <img :src="getProfile(modelo)" alt="user" />
            <div class="user-info">
              <h5>{{ modelo.criador.nome }}</h5>
              <small>{{ modelo.dataCadastro | moment("DD/MM/YYYY") }}</small>
            </div>
          </div>
          <div class="card-header">
            <img class="image" :src="getPreview(modelo.codigo)" alt="preview" />

            <div class="middle">
              <div class="text" @click="open(modelo.codigo)">Abrir no editor</div>
            </div>
          </div>
          <div class="card-body">

            <h4>
              {{ modelo.titulo }}
            </h4>
            <p>
              {{ modelo.descricao }}
            </p>

          </div>

        </div>
      </div>
      <a id="plusModels" :href="usingLang.routes.publicModels">
        + {{ usingLang.publicModels }}
      </a>
    </section>

  </Main>
</template>

<script>
import { services } from "../services";

import Main from "../components/Main.vue"

export default {
  name: "Index",
  components: {
    Main,
  },
  props: { usingLang: Object },
  data() {
    return {
      loader: null,
      loading: false,
      token: null,
      logado: false,
      nome: "",
      usuario: { nome: "teste" },
      showModal: false,
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

            this.showModalLogin = false;

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

    getPreview(codigo) {
      return services.models.preview(codigo)
    }
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
