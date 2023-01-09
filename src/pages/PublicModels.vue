<template>
    <MainPage>

        <section class="content" id="modelos">

            <h1>{{ language.model.models }}</h1>

            <v-pagination class="my-4" v-model="page" :length="pageSize" @input="pageChange"></v-pagination>
             
            <v-item-group>
                <v-container>
                    <v-row alignIte="center">
                        <v-col v-for="modelo in modelos" :key="modelo.codigo">
                            <v-item>
                                <CardModelo :modelo="modelo" :canEdit="false" :refresh="getModelos" />
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
import CardModelo from "../components/CardModelo.vue";

export default {
    name: "Index",
    inject: ['getLanguage', 'getLogado', 'getUsuario'],
    components: {
        MainPage,
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

        this.getModelos();
    },

    methods: {
        getModelos(props = { size: 6 }) {
            services.models
                .list(props)
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
    }
};
</script>
