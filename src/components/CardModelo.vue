<template>
    <v-hover>
        <template v-slot:default="{ hover }">
            <v-card class="mx-auto" max-width="350" min-width="350">

                <v-card-text>
                    <v-list-item class="grow">
                        <v-list-item-avatar>
                            <v-img class="elevation-6" alt="user" :src="getProfile(modelo)"></v-img>
                        </v-list-item-avatar>

                        <v-list-item-content>
                            <v-list-item-title class="font-weight-black primary--text">{{
                                modelo.criador.nome
                            }}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-card-text>

                <v-img contain :src="getPreview(modelo.codigo)" height="200px">
                    <template v-slot:placeholder>
                        <v-row class="fill-height ma-0" align="center" justify="center">
                            <v-progress-circular indeterminate :size="70" :width="7"
                                color="primary"></v-progress-circular>
                        </v-row>
                    </template>
                    <v-expand-transition>
                        <div v-if="hover"
                            class="d-flex transition-fast-in-fast-out darken-2 v-card--reveal justify-center align-center"
                            style="height: 100%; background-color: #33333333;">
                            <v-btn x-large color="primary" @click="dialog = true">
                                <v-icon left dark>
                                    mdi-eye
                                </v-icon>{{ language.model.seeDetails }}
                            </v-btn>
                        </div>
                    </v-expand-transition>
                </v-img>

                <v-card-title>
                    <v-tooltip top>
                        <template v-slot:activator="{ on, attrs }">
                            <span class="d-inline-block text-truncate" v-bind="attrs" v-on="on">{{
                                modelo.titulo
                            }}</span>
                        </template>
                        <span>{{ modelo.titulo }}</span>
                    </v-tooltip>
                </v-card-title>

                <v-card-subtitle>
                    {{ getMoment(modelo.dataCadastro) }}
                </v-card-subtitle>

                <v-divider v-if="canEdit"></v-divider>

                <v-card-actions v-if="canEdit">

                    <v-btn color="primary" @click="open(modelo.codigo)">
                        <v-icon>
                            mdi-square-edit-outline
                        </v-icon>
                    </v-btn>

                    <v-spacer />

                    <v-btn color="blue" @click.stop="dialogEdit = true">
                        <v-icon>mdi-cached</v-icon>
                    </v-btn>

                    <v-spacer />

                    <v-btn color="error" @click.stop="dialogDelete = true">
                        <v-icon>mdi-delete</v-icon>
                    </v-btn>

                </v-card-actions>

                <v-dialog id="detailsModal" v-model="dialog" scrollable max-width="80vw">

                    <v-card>
                        <v-card-title>{{ modelo.titulo }}</v-card-title>
                        <v-divider></v-divider>
                        <v-card-text style="height: 80vh;">
                            <v-card :elevation="1" class="mx-5 mt-5 pa-5">
                                <v-img contain :src="getPreview(modelo.codigo)">
                                    <template v-slot:placeholder>
                                        <v-row class="fill-height ma-0" align="center" justify="center">
                                            <v-progress-circular indeterminate :size="70" :width="7"
                                                color="primary"></v-progress-circular>
                                        </v-row>
                                    </template>
                                </v-img>
                            </v-card>
                            <v-card :elevation="1" class="mx-5 mt-5 pa-5">
                                <v-simple-table>
                                    <template v-slot:default>

                                        <tbody>
                                            <tr>
                                                <td class="font-weight-black">{{ language.model.title }}:</td>
                                                <td>{{ modelo.titulo }}</td>
                                            </tr>
                                            <tr>
                                                <td class="font-weight-black">{{ language.model.description }}:</td>
                                                <td>{{ modelo.descricao }}</td>
                                            </tr>
                                            <tr>
                                                <td class="font-weight-black">{{ language.model.autor }}:</td>
                                                <td>{{ modelo.criador.nome }}</td>
                                            </tr>
                                            <tr>
                                                <td class="font-weight-black">{{ language.model.createAt }}:</td>
                                                <td>{{ getMoment(modelo.dataCadastro) }}</td>
                                            </tr>
                                            <tr>
                                                <td class="font-weight-black">{{ language.model.updateAt }}:</td>
                                                <td>{{ getMoment(modelo.dataAtualizacao) }}</td>
                                            </tr>
                                        </tbody>
                                    </template>
                                </v-simple-table>
                            </v-card>
                        </v-card-text>

                        <v-divider></v-divider>
                        <v-card-actions class="d-flex justify-end">
                            <v-btn color="error" text @click="dialog = false">
                                {{ language.menu.logout }}
                            </v-btn>

                            <v-btn v-if="canEdit" color="blue" text @click="dialog = false; dialogEdit = true">
                                {{ language.model.update }}
                            </v-btn>

                            <v-btn color="primary" text @click="open">
                                {{ language.model.openInEditor }}
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>

                <v-dialog id="editModal" v-model="dialogEdit" scrollable max-width="50vw">
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-card>

                            <v-card-title>
                                {{ modelo.titulo }}
                            </v-card-title>
                            <v-card-text style="height: 50vh;">

                                <v-text-field v-model="input.titulo" :rules="nameRules" :label="language.model.title"
                                    required>
                                </v-text-field>
                                <v-textarea auto-grow v-model="input.descricao" :rules="nameRules"
                                    :label="language.model.description" required :value="modelo.descricao">
                                </v-textarea>


                            </v-card-text>
                            <v-card-actions class="d-flex justify-end">
                                <v-btn text @click="dialogEdit = false">
                                    {{ language.model.no }}
                                </v-btn>
                                <v-btn color="primary" @click="atualizar">
                                    {{ language.model.update }}
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-form>

                </v-dialog>

                <v-dialog id="deleteModal" v-model="dialogDelete" max-width="50vw">
                    <v-card>
                        <v-card-title>
                            {{ language.model.deleteConfirm.replace("${0}", modelo.titulo) }}
                        </v-card-title>

                        <v-card-actions>
                            <v-spacer></v-spacer>

                            <v-btn text @click="dialogDelete = false">
                                {{ language.model.no }}
                            </v-btn>

                            <v-btn color="error" text @click="deleteModel">
                                {{ language.model.yes }}
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>

            </v-card>
        </template>
    </v-hover>
</template>

<script>

import moment from "moment";
import { services } from "../services";

export default {
    inject: ['getLanguage', 'getLogado', 'getUsuario'],
    props: { modelo: Object, canEdit: Boolean, refresh: Function },
    name: "CardModelo",
    data: () => ({
        dialog: false,
        dialogEdit: false,
        dialogDelete: false,

        input: {
            titulo: "",
            descricao: ""
        },
        nameRules: [
            v => !!v || 'Is required'
        ],
        valid: true,
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
        //FIXME: Arrumar esse bug
        open() {
            this.$router.push("/pt-br/editor/" + this.modelo.codigo);
        },

        atualizar() {
            if (this.$refs.form.validate()) 
                services.models
                    .patch(this.modelo.codigo, this.input)
                    .then(() => {
                        this.refresh();
                        this.$toast.success(this.language.messages.update)
                        this.dialogEdit = false;
                    })
                    .catch(() => {
                        this.$toast.error(this.language.messages.updateErro)
                    });

        },

        deleteModel() {

            services.models
                .delete(this.modelo.codigo)
                .then(() => {
                    this.refresh();
                    this.$toast.success(this.language.messages.delete);

                })
                .catch(() => {
                    this.$toast.error(this.language.messages.deleteErro)
                });

            this.dialogDelete = false;
        },

    },
    computed: {
        language() {
            return this.getLanguage();
        },
    },
    created: function () {
        this.input.titulo = this.modelo.titulo;
        this.input.descricao = this.modelo.descricao;
    },
}
</script>