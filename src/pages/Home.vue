<template>
  <MainPage>

    <h1 class="introducao">Ecos Modeling<br />{{ language.home.description }}</h1>

    <section class="sobre" id="sobre">
      <div class="sobre-info">
        <h1>{{ language.home.about }}</h1>
        <p>
          A ferramenta ECOS Modeling 3.0 surge com o intuito de agrupar modelos desenvolvidos por
          pesquisadores, de forma que a comunidade de ECOS possa colaborar para disseminar e impulsionar o crescimento
          da área.
        </p>
        <p>
          Além disso, tem o quesito principal que a modelagem de ECOS, ou seja, a criação dos modelos,
          funcionalidade já existente na versão 1.0 da ferramenta. As novas funcionalidades da ferramentas incluem
          consultar modelos e perceberem a importância de se construir uma modelagem adequada, além de expandir a
          ferramenta.
        </p>
      </div>
      <div class="sobre-img">
        <img src="../assets/images/diagram-example.png" :alt="language.home.about" />
      </div>

    </section>

    <section class="produtos" id="produtos">

      <h1>{{ language.home.models }}</h1>
      <v-pagination class="my-4" v-model="page" :length="pageSize" @input="pageChange"></v-pagination>
      <Models :modelos="modelos" />

      <div class="sectionPlus">
        <a id="plusModels" :href="language.routes.publicModels">
          + {{ language.publicModels }}
        </a>
      </div>

    </section>

    <section class="sobre" id="citar">
      <div class="sobre-info">
        <h1>{{ language.home.howToCite }}</h1>
        <ul>
          <li>
            <p>PINHEIRO, F. V. da S.; COUTINHO, E. F.; SANTOS, I.; BEZERRA, C. I. M. A Tool for Supporting the Teaching
              and Modeling of Software Ecosystems Using SSN Notation. Journal on Interactive Systems, Porto Alegre, RS,
              v.
              13, n. 1, p. 192–204, 2022. DOI: 10.5753/jis.2022.2602. {{ language.home.availableIn }}:
              <a
                href="https://sol.sbc.org.br/journals/index.php/jis/article/view/2602">https://sol.sbc.org.br/journals/index.php/jis/article/view/2602</a>.
            </p>
          </li>
          <li>

            <details>
              <summary>BibTeX <button @click="copy()">📎</button></summary>
              <textarea cols="50" rows="10" id="bibtex">
                @ARTICLE {Pinheiro_Coutinho_Santos_Bezerra_2022,
                  author       = "Pinheiro, Francisco Victor da S. and Coutinho, Emanuel Ferreira and Santos, Italo and Bezerra, Carla I. M.",
                  title        = "A Tool for Supporting the Teaching and Modeling of Software Ecosystems Using SSN Notation",
                  journal      = "Journal on Interactive Systems",
                  year         = "2022",
                  volume       = "13",
                  number       = "1",
                  pages        = "192–204",
                  month        = "Sep.",
                  place        = "Porto Alegre, RS",
                  url          = "https://sol.sbc.org.br/journals/index.php/jis/article/view/2602",
                  doi          = "10.5753/jis.2022.2602",
                  abstractnote = "\&amp;lt;p\&amp;gt;Software Ecosystems (SECO) are a set of actors and components that work as a unit, which {establish relationships based on} common interest to provide solutions or services for the software industry. As a company or organization expands its relationships and begins to interact with external actors, a network is formed and SECO includes both the actors and the involved artifacts. However, SECO is not commonly taught in the Software Engineering disciplines. The activity of modeling a SECO can assist in a better visualization and understanding of relationships. However, there is no official modeling standard for SECO, and the notations are quite varied. In this scenario, SSN (Software Supply Network) notation emerged to try to fill this gap. An eminent problem in the literature is the lack of support for modeling using SSN notation, the lack of available models and maintenance of models in general. In this context, this work aims to present a tool to support the teaching and modeling of SECO using the SSN notation, and thus alleviate the problem of the lack of specific modeling tools for SECO. In this work, the tool was applied in Software Engineering classes, where students filled out a questionnaire and a qualitative analysis was performed on the results. In general, the tool pleased both in terms of usability and understanding of SECO. Qualitative analysis revealed that the tool collaborates for SECO modeling, but it can improve usability and design, and there is a need for documentation and support for SECO teaching and modeling.\&amp;lt;/p\&amp;gt;"
              }
              </textarea>

            </details>

          </li>
        </ul>
      </div>

    </section>

  </MainPage>
</template>

<script>
import { services } from "../services";
import MainPage from "../components/MainPage.vue"
import Models from "../components/Models.vue"

export default {
  name: "Home",
  components: {
    Models,
    MainPage,
  },
  inject: ['getLanguage'],

  data() {
    return {
      modelos: [],
      modelInShow: null,
      showModalDetails: false,
      bibtex: "",
      pageSize: 1,
      page: 1,
    };
  },

  methods: {

    getModelos(props = { size: 6 }) {
      services.models
        .list(props)
        .then((res) => {
          this.modelos = res.data.content;
          this.pageSize = res.data.totalPages;
        })
        .catch(() => {
          this.$toast.error(this.language.messages.loadErro)
        });
    },

    pageChange(page) {
      this.getModelos({ size: 6, page: page - 1 })
    },

    copy() {
      var copyText = document.getElementById("bibtex");
      navigator.clipboard.writeText(copyText.value);
      this.$toast(this.language.messages.bibtex);
    }

  },

  computed: {

    language() {
      return this.getLanguage();
    },

  },

  created: function () {
    this.getModelos();
  }

};
</script>

<style>
.sectionPlus {
  width: 100%;
  display: flex;
  padding: 2.5rem;
  justify-content: center;
}

#plusModels {
  display: block;
  border: 4px solid;
  color: #222222;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 2em;
  padding: 1rem;
  text-align: center;
}

#plusModels:hover {

  color: #22222288;

}
</style>
