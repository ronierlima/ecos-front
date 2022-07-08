<template>
    <div>
        <div class="superinfo-bg">
            <div class="superinfo">
                <select v-model="selected" name="language" id="language" class="chave">
                    <option value="pt-BR">pt-BR</option>
                    <option value="en">en</option>
                    <option value="es">es</option>
                </select>
            </div>
        </div>

        <header class="menu-bg">
            <div class="menu">
                <div class="menu-logo">
                    <img width="220px" src="../assets/logo.png" />
                </div>
                <nav class="menu-nav">
                    <ul>
                        <li><a :href="'/' + selected.toLowerCase().trim() + '/editor'">Editor</a></li>
                        <li><a
                                :href="'/' + selected.toLowerCase().trim() + '/' + usingLang.models.toLowerCase().trim()">{{
                                        usingLang.public
                                }}</a></li>
                        <li v-if="logado"><a href="#produtos">Meus modelos</a></li>
                        <li v-if="!logado"><a @click="showModal = true">Entrar</a></li>
                        <li v-if="logado"><a @click="showModal = true">| {{ nome }} |</a></li>
                        <li v-if="logado"><a @click="showModal = true">| Sair |</a></li>
                    </ul>
                </nav>
            </div>
        </header>

        <section class="produtos" id="produtos">
            <h1>{{ usingLang.models }}</h1>
            <div class="produtos-container">
                <div class="produtos-item grey" v-for="modelo in modelos" v-bind:key="modelo.codigo">
                    <h2>{{ modelo.titulo }}</h2>
                    <div class="preview">
                        <img :src="'http://localhost:8080/ecos-api/modelos/' + modelo.codigo + '/preview'"
                            alt="Produtos 1" />
                    </div>

                </div>
            </div>
        </section>

        <transition name="modal" v-if="showModal">
            <div class="modal-mask">
                <div class="modal-wrapper">
                    <div class="modal-container">
                        <div class="modal-header">
                            <h3 name="header">{{ usingLang.login }}</h3>
                        </div>

                        <div class="modal-body">
                            <form>

                                <label for="username">Username</label>
                                <input type="text" v-model="input.username" placeholder="Email" id="username"
                                    name="username">

                                <label for="password">Password</label>
                                <input type="password" v-model="input.password" placeholder="Password" id="password"
                                    name="password">
                            </form>
                        </div>

                        <div class="modal-footer">
                            <slot name="footer">
                                <button class="modal-default-button cancel" @click="showModal = false">
                                    {{ usingLang.cancel }}
                                </button>
                                <button class="modal-default-button" v-on:click="login()">
                                    {{ usingLang.login }}
                                </button>
                            </slot>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import { services } from "../../services";
import language from "../helpers/language";

export default {
    name: "Index",
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
            selected: "",
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


        this.changeLang();
        this.getModelos();
    },

    methods: {
        login() {
            if (this.input.username != "" && this.input.password != "")
                services.user
                    .login("ronier.lim@gmail.com", "1")
                    .then((res) => {
                        this.token = res.data.token;
                        this.nome = res.data.nome;
                        this.logado = true;
                        localStorage.setItem("token", res.data.token);
                        localStorage.setItem("nome", res.data.nome);
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

        changeLang() {
            this.selected = this.$router.history.current.path.split("/")[1]

            if (this.selected === "en") this.usingLang = language.en;
            else if (this.selected === "es") this.usingLang = language.es;
            else {
                this.usingLang = language.pt;
                this.selected = "pt-BR";
            }
        }
    },

    watch: {
        selected: function (newValue) {

            const currentValue = this.$router.history.current.path.split("/")[1];

            if (newValue === currentValue) return;

            if (newValue === "pt-BR") {
                this.$router.push("/pt-br/modelos");
            } else if (newValue === "en") this.$router.push("/en/models");
            else if (newValue === "es") this.$router.push("/es/models");
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
</style>
