<template>
    <Main>

        <section class="content" id="modelos">

            <h1>Modelos públicos /</h1>

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
                    <div class="card-actions">
                        <span class="tag tag-teal">abrir</span>
                        <span class="tag tag-purple">atualizar</span>
                        <span class="tag tag-red">excluir</span>
                    </div>
                </div>
            </div>

        </section>
    </Main>
</template>
<script>
import { services } from "../../services";
import Main from "../components/Main.vue"


export default {
    name: "PrivateModels",

    components: {
        Main,
    },

    data() {
        return {
            loader: null,
            loading: false,
            usingLang: {},
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
            this.getModelos();
        } else {
            this.$router.push("/");
        }

    },

    methods: {

        getModelos() {
            services.models
                .getMyModels()
                .then((res) => {
                    this.modelos = res.data.content;
                })
                .catch(() => {
                    this.$toast.error("Ocorreu um erro ao carregar os modelos")
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