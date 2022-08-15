<template>
    <Main>

        <section class="content" id="modelos">

            <h1>Modelos públicos /</h1>

            <ul class="cards">
                <li v-for="modelo in modelos" v-bind:key="modelo.codigo">
                    <a href="" class="card" v-on:click="open(modelo.codigo)">
                        <img :src="'http://localhost:8080/ecos-api/modelos/' + modelo.codigo + '/preview'"
                            class="card__image" alt="" />
                        <div class="card__overlay">
                            <div class="card__header">
                                <svg class="card__arc" xmlns="http://www.w3.org/2000/svg">
                                    <path />
                                </svg>
                                <img class="card__thumb" :src="'https://joeschmoe.io/api/v1/' + modelo.criador.email"
                                    alt="" />
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

        </section>
    </Main>
</template>

<script>
import { services } from "../../services";
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
            usingLang: {},
            modelos: []
        };
    },

    created: function () {

        this.getModelos();
    },

    methods: {

        getModelos() {
            services.models
                .list()
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



};
</script>

<style>
:root {
    --surface-color: #fff;
    --curve: 40;
}

* {
    box-sizing: border-box;
}

body {
    font-family: 'Noto Sans JP', sans-serif;
    background-color: #fef8f8;
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
    border: solid 2px #6A515E;
}

.card__image {
    width: 100%;
    height: auto;
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
    color: #6A515E;
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
</style>
