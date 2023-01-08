<template>
    <v-card class="mx-auto" max-width="344">
        <v-card-text>
            <v-list-item class="grow">
                <v-list-item-avatar color="grey darken-3">
                    <v-img class="elevation-6" alt=""
                        src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                    <v-list-item-title>Evan You</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-card-text>
        <div class="card-header">
            <v-img :src="getPreview(modelo.codigo)" height="200px">
                <template v-slot:placeholder>
                    <v-row class="fill-height ma-0" align="center" justify="center">
                        <v-progress-circular indeterminate :size="70" :width="7" color="primary"></v-progress-circular>
                    </v-row>
                </template></v-img>

            <div class="middle">
                <v-btn x-large color="primary" @click="open(modelo.codigo)">
                    <v-icon left dark>
                        mdi-pencil
                    </v-icon>
                    {{ language.model.openInEditor }}</v-btn>
            </div>
        </div>

        <v-card-title>
            <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                    <span class="d-inline-block text-truncate" v-bind="attrs" v-on="on">{{ modelo.titulo }}</span>
                </template>
                <span>{{ modelo.titulo }}</span>
            </v-tooltip>
        </v-card-title>

        <v-card-subtitle>
            {{ getMoment(modelo.dataCadastro) }}
        </v-card-subtitle>

        <v-divider class="mx-4"></v-divider>

        <v-card-actions>
 
            <v-btn v-if="canEdit" text  @click="handleOpenDetails(modelo, 'edit')">
                {{ language.model.update }}
            </v-btn>
            <v-btn v-if="canEdit" text @click="handleOpenDelete(modelo)">
                {{ language.model.delete }}
            </v-btn>
            <v-btn v-if="!canEdit" text  @click="handleOpenDetails(modelo, 'view')">
                {{ language.model.seeDetails }}
            </v-btn>

            <v-spacer></v-spacer>

            <v-btn icon @click="show = !show">
                <v-icon>{{ show? 'mdi-chevron-up': 'mdi-chevron-down' }}</v-icon>
            </v-btn>
        </v-card-actions>

        <v-expand-transition>
            <div v-show="show">
                <v-divider></v-divider>

                <v-card-text>
                    I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time
                    for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data
                    file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got
                    to find a way to escape.
                </v-card-text>
            </div>
        </v-expand-transition>
    </v-card>
</template>

<script>

import moment from "moment";
import { services } from "../services";

export default {
    inject: ['getLanguage', 'getLogado', 'getUsuario'],
    props: { modelo: Object, canEdit: Boolean, refresh: Function },
    name: "CardModelo",
    data: () => ({
        show: false,
    }),

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
        // handleOpenDetails(modelo, mode) {

        //     this.modelInShow = modelo;

        //     this.input = {
        //         titulo: modelo.titulo,
        //         descricao: modelo.descricao
        //     }

        //     mode == "edit" ? this.showModalDetailsEdit = true : this.showModalDetails = true;

        // },
        // handleOpenDelete(modelo) {

        //     this.modelInShow = modelo;
        //     this.showModalDelete = true;

        //     this.input = {
        //         titulo: modelo.titulo,
        //         descricao: modelo.descricao
        //     }

        // },
        // atualizar(e) {
        //     e.preventDefault();

        //     services.models
        //         .patch(this.modelInShow.codigo, this.input)
        //         .then(() => {
        //             this.refresh();
        //             this.$toast.success(this.language.messages.update)
        //         })
        //         .catch(() => {
        //             this.$toast.error(this.language.messages.updateErro)
        //         });

        //     this.showModalDetailsEdit = false;
        // },

        // deleteModel(e) {

        //     e.preventDefault();

        //     services.models
        //         .delete(this.modelInShow.codigo)
        //         .then(() => {
        //             this.refresh();
        //             this.$toast.success(this.language.messages.delete);
        //         })
        //         .catch((error) => {
        //             this.$toast.error(this.language.messages.deleteErro)
        //         });

        //     this.showModalDelete = false;
        // },

    },
    computed: {
        language() {
            return this.getLanguage();
        },
    }
}
</script>