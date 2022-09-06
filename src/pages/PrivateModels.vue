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

                        <span class="tag tag-purple" @click="handleOpenDetails(modelo)">{{ language.update }}</span>
                        <span class="tag tag-red" @click="handleOpenDelete(modelo)">{{ language.delete }}</span>
                    </div>
                </div>
            </div>

        </section>

        <transition name="modal" v-if="showModalDetails">
            <div class="modal-mask">
                <div class="modal-wrapper xl">
                    <div class="modal-body">
                        <div class="register modeloDetails">
                            <h1 class="title">{{ modelInShow.titulo }}</h1>
                            <button class="closeButton" @click="showModalDetails = false">x</button>
                            <div class="registerContent">

                                <form @submit="atualizar">
                                    <div class="user-details">

                                        <div class="input-box">
                                            <span class="details">*Titulo</span>
                                            <input v-model="input.titulo" type="text" placeholder="Enter titulo modelo"
                                                required name="modelName">
                                        </div>

                                        <div class="input-box">
                                            <span class="details">*Descrição</span>
                                            <textarea v-model="input.descricao" placeholder="Enter description model"
                                                required name="description"></textarea>
                                        </div>

                                    </div>
                                    <div class="button">
                                        <input type="submit" value="Save">
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>

        <transition name="modal" v-if="showModalDelete">
            <div class="modal-mask">
                <div class="modal-wrapper">
                    <div class="modal-body">
                        <div class="register modeloDetails">
                            <h1 class="title">Deseja realmente excluir o modelo {{ modelInShow.titulo }}</h1>
                            <button class="closeButton" @click="showModalDelete = false">x</button>
                            <div class="registerContent">

                                <form @submit="deleteModel" @reset="showModalDelete = false">

                                    <div class="button">
                                        <button type="reset">no</button>
                                    </div>

                                    <div class="button">
                                        <button class="excluir" type="submit">yes</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </MainPage>
</template>
<script>
import { services } from "../services";
import MainPage from "../components/MainPage.vue"


export default {
    name: "PrivateModels",
    inject: ['getLanguage', 'getLogado', 'getUsuario'],
    components: {
        MainPage,
    },
    data() {
        return {
            modelos: [],
            showModalDetails: false,
            showModalDelete: false,
            modelInShow: { titulo: "" },
            input: {
                titulo: "",
                descricao: ""
            }
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
        atualizar(e) {
            e.preventDefault();

            services.models
                .patch(this.modelInShow.codigo, this.input)
                .then(() => {
                    this.getModelos();
                    this.$toast.success(this.language.update)
                })
                .catch(() => {
                    this.$toast.error(this.language.loadModelErro)
                });

            this.showModalDetails = false;
        },

        deleteModel(e) {

            e.preventDefault();

            services.models
                .delete(this.modelInShow.codigo)
                .then(() => {
                    this.getModelos();

                    this.$toast.success(this.language.deleteSuccess);
                })
                .catch((error) => {
                    this.$toast.error(error)
                });

            this.showModalDelete = false;
        },

        open(modelo) {
            this.$router.push("/pt-br/editor/" + modelo);
        },

        getPreview(codigo) {
            return services.models.preview(codigo)
        },
        handleOpenDetails(modelo) {

            this.modelInShow = modelo;
            this.showModalDetails = true;

            this.input = {
                titulo: modelo.titulo,
                descricao: modelo.descricao
            }

        },
        handleOpenDelete(modelo) {

            this.modelInShow = modelo;
            this.showModalDelete = true;

            this.input = {
                titulo: modelo.titulo,
                descricao: modelo.descricao
            }

        },
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

<style>
dl {
    width: 100%;
}
</style>