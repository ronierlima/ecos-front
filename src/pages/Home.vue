<template>
  <MainPage>

    <h1 class="introducao">Ecos Modeling<br />{{ language.sub }}</h1>

    <section class="sobre" id="sobre">
      <div class="sobre-info">
        <h1>{{ language.about }}</h1>
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
      <h1>{{ language.publicModels }}</h1>
      <div class="container">
        <div class="card" v-for="modelo in modelos" v-bind:key="modelo.codigo">
          <div class="user">
            <img :src="'https://joeschmoe.io/api/v1/' + modelo.criador.codigo" alt="user" />
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
      <a id="plusModels" :href="language.routes.publicModels">
        + {{ language.publicModels }}
      </a>
    </section>

  </MainPage>
</template>

<script>
import { services } from "../../services";
import MainPage from "../components/MainPage.vue"

export default {
  name: "Home",
  components: {

    MainPage
  },
  inject: ['getLanguage'],
  data() {
    return {
      modelos: []
    };
  },

  methods: {

    getModelos() {
      services.models
        .list({ size: 6 })
        .then((res) => {
          this.modelos = res.data.content;
        })
        .catch(() => {
         this.$toast.error(this.language.loadModelErro)
        });
    },

    open(modelo) {
      this.$router.push("/pt-br/editor/" + modelo);
    },

    getPreview(codigo) {
      return services.models.preview(codigo)
    },

  },

  computed: {

    language() {
      return this.getLanguage();
    },

  },
  created: function() {
    this.getModelos();
  }

};
</script>

<style>
  #plusModels {
    max-width: 100%;
    display: block;
    border: 4px solid;
    color: #222222;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 2em;
    padding: 15px 0;
    text-align: center;
  }
</style>
