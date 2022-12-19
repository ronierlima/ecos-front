<template>
    
    <div class="container">
        <div class="card" v-for="modelo in modelos" v-bind:key="modelo.codigo">
            <div class="user">
                <img :src="getProfile(modelo)" alt="user" />
                <div class="user-info">
                    <h5>{{ modelo.criador.nome }}</h5>
                    <small>{{ getMoment(modelo.dataCadastro) }}</small>
                </div>
            </div>
            <div class="card-header">
                <img class="image" :src="getPreview(modelo.codigo)" alt="preview" />

                <div class="middle">
                    <div class="text" @click="open(modelo.codigo)">{{ language.model.openInEditor }}</div>
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
                <span v-if="canEdit" class="tag tag-purple" @click="handleOpenDetails(modelo, 'edit')">
                    {{ language.model.update }}
                </span>
                <span v-if="canEdit" class="tag tag-red" @click="handleOpenDelete(modelo)">
                    {{ language.model.delete }}
                </span>
                <span v-if="!canEdit" class="tag tag-purple" @click="handleOpenDetails(modelo, 'view')">
                    {{ language.model.seeDetails }}
                </span>
            </div>

        </div>

        <transition name="modal" v-if="showModalDetails">
            <div class="modal-mask xl">
                <div class="modal-wrapper">
                    <div class="modal-body">
                        <div class="register modeloDetails">
                            <h1 class="title">{{ modelInShow.titulo }}</h1>
                            <button class="closeButton" @click="showModalDetails = false">x</button>
                            <div class="registerContent">

                                <img class="imageDetails" :src="getPreview(modelInShow.codigo)" alt="rover" />
                                <div class="details">
                                    <dl>
                                        <dt>{{ language.model.title }}</dt>
                                        <dd>{{ modelInShow.titulo }}</dd>
                                        <dt>{{ language.model.description }}</dt>
                                        <dd>{{ modelInShow.descricao }}</dd>
                                        <dt>{{ language.model.autor }}</dt>
                                        <dd>{{ modelInShow.criador.nome }}</dd>
                                        <dt>{{ language.model.createAt }}</dt>
                                        <dd>{{ getMoment(modelInShow.dataCadastro) }}</dd>
                                        <dt>{{ language.model.updateAt }}</dt>
                                        <dd>{{ getMoment(modelInShow.dataAtualizacao) }}</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>

        <transition name="modal" v-if="showModalDetailsEdit">
            <div class="modal-mask">
                <div class="modal-wrapper xl">
                    <div class="modal-body">
                        <div class="register modeloDetails">
                            <h1 class="title">{{ modelInShow.titulo }}</h1>
                            <button class="closeButton" @click="showModalDetailsEdit = false">x</button>
                            <div class="registerContent">

                                <form @submit="atualizar">
                                    <div class="user-details">

                                        <div class="input-box">
                                            <span class="details">*{{ language.model.title }}</span>
                                            <input v-model="input.titulo" type="text" placeholder="Enter titulo modelo"
                                                required name="modelName">
                                        </div>

                                        <div class="input-box">
                                            <span class="details">*{{ language.model.description }}</span>
                                            <textarea v-model="input.descricao" placeholder="Enter description model"
                                                required name="description"></textarea>
                                        </div>

                                    </div>
                                    <div class="button">
                                        <input type="submit" :value="language.account.saveUpdates">
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
                            <h1 class="title">{{language.model.deleteConfirm.replace("${0}", modelInShow.titulo ) }}
                            </h1>
                            <button class="closeButton" @click="showModalDelete = false">x</button>
                            <div class="registerContent">

                                <form @submit="deleteModel" @reset="showModalDelete = false">

                                    <div class="button">
                                        <button type="reset">{{language.model.no}}</button>
                                    </div>

                                    <div class="button">
                                        <button class="excluir" type="submit">
                                            {{language.model.yes}}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>

    </div>


</template>

<script>

import { services } from "../services";
import moment from 'moment'

export default {
    name: "Models",
    inject: ['getLanguage'],
    props: { modelos: Array, canEdit: Boolean, refresh: Function },
    data() {
        return {
            modelInShow: {},
            showModalDetails: false,
            showModalDetailsEdit: false,
            showModalDelete: false,
            input: {
                titulo: "",
                descricao: ""
            }
        };
    },

    computed: {
        language() {
            return this.getLanguage();
        },
        usuario() {
            return this.getUsuario();
        },
        logado() {
            return this.getLogado();
        },
    },
    methods: {
        getMoment(date) {
            date = new Date(date);
            return this.language.model.dateFormat ? moment(date).format(this.language.model.dateFormat) : moment(date).format("MM/DD/YYYY")
        },

        getProfile(modelo) {
            return modelo.criador.fotoPerfil ? services.user.foto(modelo.criador.codigo) : `https://avatars.dicebear.com/api/identicon/${modelo.criador.email}.svg`
        },
        getPreview(codigo) {
            return services.models.preview(codigo)
        },
        open(modelo) {
            this.$router.push("/pt-br/editor/" + modelo);
        },
        handleOpenDetails(modelo, mode) {

            this.modelInShow = modelo;

            this.input = {
                titulo: modelo.titulo,
                descricao: modelo.descricao
            }

            mode == "edit" ? this.showModalDetailsEdit = true : this.showModalDetails = true;

        },
        handleOpenDelete(modelo) {

            this.modelInShow = modelo;
            this.showModalDelete = true;

            this.input = {
                titulo: modelo.titulo,
                descricao: modelo.descricao
            }

        },
        atualizar(e) {
            e.preventDefault();

            services.models
                .patch(this.modelInShow.codigo, this.input)
                .then(() => {
                    this.refresh();
                    this.$toast.success(this.language.messages.update)
                })
                .catch(() => {
                    this.$toast.error(this.language.messages.updateErro)
                });

            this.showModalDetailsEdit = false;
        },

        deleteModel(e) {

            e.preventDefault();

            services.models
                .delete(this.modelInShow.codigo)
                .then(() => {
                    this.refresh();
                    this.$toast.success(this.language.messages.delete);
                })
                .catch((error) => {
                    this.$toast.error(this.language.messages.deleteErro)
                });

            this.showModalDelete = false;
        },

    }

};
</script>


<style>
.container {
    display: flex;
    width: 100%;
    justify-content: space-evenly;
    flex-wrap: wrap;
}

.image {
    opacity: 1;
    display: block;
    width: 100%;
    height: auto;
    transition: .5s ease;
    backface-visibility: hidden;
}

.middle {
    transition: .5s ease;
    opacity: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    text-align: center;
}

.card-header:hover .image {
    opacity: 0.3;
}

.card-header:hover .middle {
    opacity: 1;
}

.text {
    background-color: #5e5e5e;
    color: #fff;
    font-size: 1rem;
    padding: 1rem 2rem;
    cursor: pointer;
}

.card {
    margin: 10px;
    border-radius: 10px;
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    width: 300px;
}

.card-header {
    padding: 1rem;
    position: relative;

}

.card-header img {
    width: 100%;
    height: 200px;
    object-fit: cover;
}

.card-body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 0 20px;
    border-top: #5e5e5e1e dotted 4px;

}

.card-actions {
    display: flex;
    justify-content: space-evenly;
    background-color: #5e5e5e1e;
    padding: 20px;
    gap: .5rem;
}

.tag {
    background: #3498db;
    font-size: 1rem;
    margin: 0;
    color: #fff;
    padding: .25rem .75rem;
    text-transform: uppercase;
    cursor: pointer;
}


.tag-teal {
    background-color: #3498db;
}

.tag-teal:hover {
    background-color: #2980b9;
}

.tag-purple {
    background-color: #1abc9c;
}

.tag-purple:hover {
    background-color: #16a085;
}


.tag-red {
    background-color: #e74c3c;
}

.tag-red:hover {
    background-color: #c0392b;
}


.card-body p {
    font-size: 13px;
    margin: 0 0 40px;
}

.user {
    display: flex;
    padding: 1rem;
    background-color: #5e5e5e1e;
}

.user img {
    border-radius: 50%;
    width: 40px;
    height: 40px;
    margin-right: 10px;
}

.user-info h5 {
    margin: 0;
}

.user-info small {
    color: #545d7a;
}

.modeloDetails {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.modeloDetails .user,
.modeloDetails small {
    background: #5e5e5e;
    color: #fff;
}

.registerContent {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-height: 60vh;
    overflow: scroll;
    width: 100%;
}

.registerContent img {
    max-width: 100%;
    max-height: 500px;
}

dt {
    float: left;
    clear: left;
    width: 110px;
    font-weight: bold;
    color: green;
}

dt::after {
    content: ":";
}

dd {
    margin: 0 0 0 80px;
    padding: 0 0 0.5em 0;
}
</style>
