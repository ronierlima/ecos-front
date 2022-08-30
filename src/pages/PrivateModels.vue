<template>
    <MainPage>
        <section class="content" id="modelos">

            <h1 class="">{{ language.privateModels }}</h1>

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
                            <div class="text" @click="open(modelo.codigo)">{{ language.openEditor }}</div>
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
 
                        <span class="tag tag-purple">{{ language.update }}</span>
                        <span class="tag tag-red" @click="deleteModel(modelo.codigo)">{{ language.delete }}</span>
                    </div>
                </div>
            </div>

        </section>
    </MainPage>
</template>
<script>
import { services } from "../../services";
import MainPage from "../components/MainPage.vue"


export default {
    name: "PrivateModels",
    inject: ['getLanguage', 'getLogado', 'getUsuario'],
    components: {
        MainPage,
    },
    data() {
        return {
            modelos: []
        };
    },

    created: function () {


        if (!this.getLogado()) this.$router.push("/login");

        this.getModelos();

    },

    methods: {

        getModelos() {
            services.models
                .getMyModels()
                .then((res) => {
                    this.modelos = res.data.content;
                })
                .catch(() => {
                    this.$toast.error(this.language.loadModelErro)
                });
        },
        deleteModel(codigo) {
            services.models
                .delete(codigo)
                .then(() => {
                    this.getModelos();
                    this.$toast.success(this.language.deleteSuccess);
                })
                .catch((error) => {
                    this.$toast.error(error)
                });
        },

        open(modelo) {
            this.$router.push("/pt-br/editor/" + modelo);
        },

        getPreview(codigo) {
            return services.models.preview(codigo)
        }
    },


    computed: {
        language() {
            return this.getLanguage();
        },
        usuario() {
            return this.getUsuario();
        },

    }



};
</script>