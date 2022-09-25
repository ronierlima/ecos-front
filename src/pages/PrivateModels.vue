<template>
    <MainPage>
        <section class="content" id="modelos">

            <h1 class="">{{ language.model.myModels }}</h1>
            <Models :modelos="modelos" canEdit :refresh="getModelos" />
        </section>

    </MainPage>
</template>
<script>
import { services } from "../services";
import MainPage from "../components/MainPage.vue"
import Models from "../components/Models.vue";


export default {
    name: "PrivateModels",
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