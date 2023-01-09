<template>
    <MainPage>
        <section class="content" id="modelos">

            <h1 class="">{{ language.model.myModels }}</h1>

            <v-pagination class="my-4" v-model="page" :length="pageSize" @input="pageChange"></v-pagination>
           
            <v-item-group>
                <v-container>
                    <v-row alignIte="center">
                        <v-col v-for="modelo in modelos" :key="modelo.codigo">
                            <v-item>
                                <CardModelo :modelo="modelo"  :canEdit="true" :refresh="getModelos" />
                            </v-item>
                        </v-col>
                    </v-row>
                </v-container>
            </v-item-group>

        </section>

    </MainPage>
</template>
<script>
import { services } from "../services";
import MainPage from "../components/MainPage.vue"
import Models from "../components/Models.vue";
import CardModelo from "../components/CardModelo.vue";


export default {
    name: "PrivateModels",
    inject: ['getLanguage', 'getLogado', 'getUsuario'],
    components: {
    MainPage,
    Models,
    CardModelo
},
    data() {
        return {
            modelos: [],
            pageSize: 1,
            page: 1,
        };
    },

    created: function () {


        if (!this.getLogado()) this.$router.push("/login");

        this.getModelos();

    },

    methods: {

        getModelos(props = { size: 6 }) {
            services.models
                .getMyModels(props)
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