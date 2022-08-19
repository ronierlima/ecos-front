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
                        <img class="image" :src="'https://whale-app-7vakw.ondigitalocean.app/ecos-api/modelos/' + modelo.codigo + '/preview'"
                            alt="rover" />

                        <div class="middle">
                            <div class="text" @click="open(modelo.codigo)">Abrir no editor</div>
                        </div>
                    </div>
                    <div class="card-body">

                        <h4>
                            {{ modelo.titulo }}
                        </h4>
                        <p>
                            {{ modelo.descricao || "aqui ficaria uma descição" }}
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
    },



};
</script>

<!-- <style>
:root {
    --surface-color: #f2f0e6;
    --curve: 40;
}

* {
    box-sizing: border-box;
}

body {
    font-family: 'Noto Sans JP', sans-serif;
    background-color: #f2f0e6;
}

.cards {
    display: flex;
    gap: 2rem;
    justify-content: center;
    padding: 0;
    list-style-type: none;
    flex-wrap: wrap;
}

.card {
    position: relative;
    display: block;
    width: 350px;
    height: 400px;
    border-radius: calc(var(--curve) * 1px);
    overflow: hidden;
    text-decoration: none;
    border: solid 2px #5e5e5e;
    text-align: center;
    background-color: #5e5e5e;
}

.card__image {
    width: 100%;
    position: absolute;
    top: 30%;
    left: 0;
    transition: transform .75s;
    transform: translateY(-30%);

    
}

.card:hover .card__image {
 position: absolute;
    top: 0;
    left: 0;
    transform: scale(.5);  
}

.card__overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;
    border-radius: calc(var(--curve) * 1px);
    background-color: var(--surface-color);
    transform: translateY(100%);
    transition: .2s ease-in-out;
}

.card:hover .card__overlay {
    transform: translateY(0);
}

.card__header {
    position: relative;
    display: flex;
    align-items: center;
    gap: 2em;
    padding: 2em;
    border-radius: calc(var(--curve) * 1px) 0 0 0;
    background-color: var(--surface-color);
    transform: translateY(-100%);
    transition: .2s ease-in-out;
}

.card__arc {
    width: 80px;
    height: 80px;
    position: absolute;
    bottom: 100%;
    right: 0;
    z-index: 1;
}

.card__arc path {
    fill: var(--surface-color);
    d: path("M 40 80 c 22 0 40 -22 40 -40 v 40 Z");
}

.card:hover .card__header {
    transform: translateY(0);
}

.card__thumb {
    flex-shrink: 0;
    width: 50px;
    height: 50px;
    border-radius: 50%;
}

.card__title {
    font-size: 1em;
    margin: 0 0 .3em;
    color: #5e5e5e;
}

.card__tagline {
    display: block;
    margin: 1em 0;
    font-family: "MockFlowFont";
    font-size: .8em;
    color: #D7BDCA;
}

.card__status {
    font-size: .8em;
    color: #D7BDCA;
}

.card__description {
    padding: 0 2em 2em;
    margin: 0;
    color: #D7BDCA;
    font-family: "MockFlowFont";
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
}
</style> -->
