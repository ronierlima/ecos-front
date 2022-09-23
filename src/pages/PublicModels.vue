<template>
    <MainPage>

        <section class="content" id="modelos">

            <h1>{{ language.home.models }}</h1>

            <Models :modelos="modelos" />

        </section>

    </MainPage>
</template>

<script>

import { services } from "../services";
import MainPage from "../components/MainPage.vue"
import Models from "../components/Models.vue"


export default {
    name: "Index",
    inject: ['getLanguage', 'getLogado', 'getUsuario'],
    components: {
        MainPage,
        Models
    },

    data() {
        return {
            modelos: [],
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
                .catch(() => {
                    this.$toast.error(this.language.loadModelErro)
                });
        },
    },

    computed: {
        language() {
            return this.getLanguage();
        },
    }
};
</script>
