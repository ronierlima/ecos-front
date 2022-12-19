<template>
    <MainPage>

        <section class="content" id="modelos">

            <button v-if="modelosChecked.length && !evolucaoGerada" @click="gerar" class="excluir">
                <h1>Gerar Evolução</h1>
            </button>
            <button v-else-if="evolucaoGerada" @click="limpar" class="excluir">
                <h1>Voltar</h1>
            </button>

            <h1 v-else>Evolução</h1>


            <p v-if="!evolucaoGerada">Selecione os modelos para gerar evolução</p>

            <div class="container">


                <div v-if="evolucaoGerada && modelosCheckedDetais.length">
                    <div v-for="(modelo, index) in modelosCheckedDetais" v-bind:key="modelo.codigo">
                        <h2>{{ index + 1 + " - " + modelo.titulo }}</h2>
                        <img class="image" :src="getPreview(modelo.codigo)" alt="preview" width="600" />

                        <BarChart :options="{ ...options, title: modelo.titulo }" :type="type"
                            v-bind:data="modelo.data" />
                        <hr>
                    </div>
                    <BarChart :options="{
                        ...{
                            chart: {
                                title: 'Comparação entre modelos',
                                subtitle: 'Sales, Expenses, and Profit: 2014-2017',
                            },
                            width: 800,
                            height: 600,
                        }, title: 'Comparação entre os modelos'
                    }" :type="type" :data="modelosComparar" :multiple="true" />
                     <BarChart :options="{
                        ...{
                            width: 800,
                            height: 600,
                        }, title: 'Quantidade de Componentes'
                    }" :type="type" :data="compararComponentes" :multiple="true" />
                    <BarChart :options="{
                        ...{
                            width: 800,
                            height: 600,
                        }, title: 'Quantidade de Relacionamentos'
                    }" :type="type" :data="compararRelacionamentos" :multiple="true" />
                </div>


                <div v-else class="card" v-for="modelo in modelos" v-bind:key="modelo.codigo">
                    <div class="user">
                        <img :src="getProfile(modelo)" alt="user" />
                        <div class="user-info">
                            <h5>{{ modelo.criador.nome }}</h5>
                            <small>{{ getMoment(modelo.dataCadastro) }}</small>
                        </div>

                        <div style="display: flex; justify-content: end; width: 100%;">
                            <input type="checkbox" class="checked-model" name="true" v-bind:id="modelo.codigo"
                                @click="check">
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

                        <span class="tag tag-purple" @click="handleOpenDetails(modelo, 'view')">
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
                                                    <input v-model="input.titulo" type="text"
                                                        placeholder="Enter titulo modelo" required name="modelName">
                                                </div>

                                                <div class="input-box">
                                                    <span class="details">*{{ language.model.description }}</span>
                                                    <textarea v-model="input.descricao"
                                                        placeholder="Enter description model" required
                                                        name="description"></textarea>
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
                                    <h1 class="title">{{ language.model.deleteConfirm.replace("${0}", modelInShow.titulo
                                        )
                                    }}
                                    </h1>
                                    <button class="closeButton" @click="showModalDelete = false">x</button>
                                    <div class="registerContent">

                                        <form @submit="deleteModel" @reset="showModalDelete = false">

                                            <div class="button">
                                                <button type="reset">{{ language.model.no }}</button>
                                            </div>

                                            <div class="button">
                                                <button class="excluir" type="submit">
                                                    {{ language.model.yes }}
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

        </section>

    </MainPage>
</template>

<script>

import { services } from "../services";
import MainPage from "../components/MainPage.vue"
import moment from "moment";
import { occurrences } from "../helpers";
import BarChart from '../components/Bar.vue'

export default {
    name: "Evolucao",
    inject: ['getLanguage', 'getLogado', 'getUsuario'],
    components: {
        MainPage,
        BarChart
    },

    data() {
        return {
            evolucaoGerada: false,
            modelos: [],
            modelosChecked: [],
            modelosCheckedDetais: [],
            modelosComparar: [],
            compararComponentes: [],
            compararRelacionamentos: [],
            allHasChecked: false,
            requestModelos: [],
            modelInShow: {},
            showModalDetails: false,
            showModalDetailsEdit: false,
            showEvolucao: false,
            showModalDelete: false,
            input: {
                titulo: "",
                descricao: ""
            },
            type: "ColumnChart",
            options:
            {
                title: '',
                chartArea: { width: '100%' },
                hAxis: {
                    title: 'Número de componentes',
                    minValue: 0,
                },
                vAxis: {
                    title: 'Componentes',
                },
                width: 900,
                height: 900,
                legend: { position: "none" },
            }
        }
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
                    this.$toast.error(this.language.messages.loadErro)
                });
        },

        check({ target }) {
            if (target.checked)
                this.modelosChecked = [...this.modelosChecked, target.id]
            else {
                this.modelosChecked = [...this.modelosChecked].filter(id => id !== target.id);
                this.allHasChecked = false;
            }

        },
        checkAll({ target }) {

            this.allHasChecked = target.checked

            const forChecked = [...document.getElementsByClassName("checked-model")];

            forChecked.forEach(checkbox => checkbox.checked = target.checked)


            target.checked ? this.modelosChecked = this.modelos.map(({ codigo }) => codigo) : this.modelosChecked = []

        },
        async gerar() {

            let header = [
                this.language.model.models,
                this.language.company_of_interest,
                { role: 'annotation', type: 'string' },
                this.language.supplier,
                { role: 'annotation', type: 'string' },
                this.language.customer,
                { role: 'annotation', type: 'string' },
                this.language.customer_customer,
                { role: 'annotation', type: 'string' },
                this.language.intermediary,
                { role: 'annotation', type: 'string' },
                this.language.aggregator,
                { role: 'annotation', type: 'string' },
            ]

            this.modelosComparar = [header];
            this.compararComponentes = [['Modelo', 'Componentes', { role: 'annotation', type: 'string' }]]
            this.compararRelacionamentos = [['Modelo', 'Relacionamentos', { role: 'annotation', type: 'string' }]]


            await this.modelosChecked.forEach(async (id) => {

                const resposta = await services.models.get(id)

                const tipos = [{
                    nome: this.language.company_of_interest,
                    total: occurrences(resposta.data, "tipo=empresa"),
                },
                {
                    nome: this.language.supplier,
                    total: occurrences(resposta.data, "tipo=fornecedor"),
                },
                {
                    nome: this.language.customer,
                    total: occurrences(resposta.data, "tipo=cliente1"),
                },
                {
                    nome: this.language.customer_customer,
                    total: occurrences(resposta.data, "tipo=cliente2"),
                },
                {
                    nome: this.language.intermediary,
                    total: occurrences(resposta.data, "tipo=intermediario"),
                },
                {
                    nome: this.language.aggregator,
                    total: occurrences(resposta.data, "tipo=agregador"),
                },
                ];

                const estatisticas = {
                    [this.language.company_of_interest]: occurrences(resposta.data, "tipo=empresa"),
                    [this.language.company_of_interest+"_lable"]: occurrences(resposta.data, "tipo=empresa"),
                    [this.language.supplier]: occurrences(resposta.data, "tipo=fornecedor"),
                    [this.language.supplier+"_lable"]: occurrences(resposta.data, "tipo=fornecedor"),
                    [this.language.customer]: occurrences(resposta.data, "tipo=cliente1"),
                    [this.language.customer+"_lable"]: occurrences(resposta.data, "tipo=cliente1"),
                    [this.language.customer_customer]: occurrences(resposta.data, "tipo=cliente2"),
                    [this.language.customer_customer+"_lable"]: occurrences(resposta.data, "tipo=cliente2"),
                    [this.language.intermediary]: occurrences(resposta.data, "tipo=intermediario"),
                    [this.language.intermediary+"_lable"]: occurrences(resposta.data, "tipo=intermediario"),
                    [this.language.aggregator]: occurrences(resposta.data, "tipo=agregador"),
                    [this.language.aggregator+"_lable"]: occurrences(resposta.data, "tipo=agregador")
                }

                const atualModelo = this.modelos.find(({ codigo }) => codigo == id);

                this.modelosCheckedDetais = [...this.modelosCheckedDetais, { ...atualModelo, data: [['Componentes', 'Quantidade', { role: 'annotation', type: 'string' }], ...tipos.map(item => [item.nome, item.total, item.total])], estatisticas }]
                this.modelosComparar = [...this.modelosComparar, [atualModelo.titulo, ...Object.values(estatisticas)]]
                this.compararComponentes = [ ...this.compararComponentes, [atualModelo.titulo, tipos.reduce((total, obj) => total + obj.total, 0), tipos.reduce((total, obj) => total + obj.total, 0)]]
                this.compararRelacionamentos = [ ...this.compararRelacionamentos, [atualModelo.titulo, occurrences(resposta.data, `edge="1"`), occurrences(resposta.data, `edge="1"`).toString()]]
            }
            )

            this.evolucaoGerada = true

        },
        limpar() {

            this.evolucaoGerada = false;
            this.modelosChecked = [];
            this.modelosCheckedDetais = [];
        },

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
                .catch(() => {
                    this.$toast.error(this.language.messages.deleteErro)
                });

            this.showModalDelete = false;
        },

    },

    computed: {
        language() {
            return this.getLanguage();
        },
    }
};
</script>


<style >
#registerEvolucao {

    width: 100%;
    padding: 25px 30px;
    height: 90vh;
    border-radius: 5px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
    background: #f2f0e6;
    position: relative;

}

#registerEvolucao .registerContent {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-height: 75vh;
    overflow: scroll;
    width: 100%;
}

#registerEvolucao .registerContent img {
    max-width: 800px;
}
</style>
