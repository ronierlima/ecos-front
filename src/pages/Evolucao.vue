<template>
    <MainPage>

        <section class="content" id="modelos">

            <v-btn v-if="modelosChecked.length > 1 && !evolucaoGerada" @click="gerar" color="primary">
                Gerar relatório de evolução
            </v-btn>
            <v-btn v-else-if="evolucaoGerada" @click="limpar" fluid color="error">
                Voltar
            </v-btn>

            <h1 v-else>Relatório de evolução de ECOS</h1>
            <v-pagination v-if="!evolucaoGerada" class="my-4" v-model="page" :length="pageSize"
                @input="pageChange"></v-pagination>


            <p v-if="!evolucaoGerada">Selecione pelo menos 2 modelos para gerar evolução</p>

            <div class="container">

                <div v-if="evolucaoGerada && modelosCheckedDetais.length">

                    <div v-for="(modelo, index) in modelosCheckedDetais" v-bind:key="modelo.codigo">
                        <section class="evolucao">
                            <div class="evolucao-modelo-titulo">
                                <h2>{{ index + 1 + " - " + modelo.titulo }}</h2>
                            </div>
                            <div class="evolucao-modelo-imagem">
                                <img :src="getPreview(modelo.codigo)" alt="preview" />
                            </div>
                            <div class="evolucao-modelo-tabela">
                                <table id="customers">
                                    <tr>
                                        <th>
                                            {{ modelo.data[0][0] }}
                                        </th>
                                        <th>{{ modelo.data[0][1] }}</th>
                                    </tr>
                                    <tr v-for="(tmodelo, index) in modelo.data" v-bind:key="index">

                                        <td v-if="index != 0">{{ tmodelo[0] }}</td>
                                        <td v-if="index != 0">{{ tmodelo[1] }}</td>

                                    </tr>

                                </table>
                            </div>

                            <div class="evolucao-modelo-chart">
                                <BarChart :options="{ ...options, title: modelo.titulo }" :type="type"
                                    v-bind:data="modelo.data" />
                            </div>

                            <div class="evolucao-modelo-chart">
                                <BarChart :options="{ ...options, title: modelo.titulo }" :type="type"
                                    v-bind:data="modelo.percent" />
                            </div>

                        </section>
                        <hr>
                    </div>
                    <BarChart :options="{
                        ...{
                            chart: {
                                title: 'Comparação entre modelos',
                            },
                    
                            height: 600,
                        }, title: 'Comparação entre os modelos'
                    }" :type="type" :data="modelosComparar" :multiple="true" />

                    <BarChart :options="{
                        ...{
                            chart: {
                                title: 'Comparação entre modelos %',
                            },
                    
                            height: 600,
                        }, title: 'Comparação entre os modelos'
                    }" :type="type" :data="modelosCompararPercent" />
                    <BarChart :options="{
                        ...{
                    
                            height: 600,
                        }, title: 'Quantidade de Componentes'
                    }" :type="type" :data="compararComponentes" :multiple="true" />
                    <BarChart :options="{
                        ...{
                    
                            height: 600,
                        }, title: 'Quantidade de Relacionamentos'
                    }" :type="type" :data="compararRelacionamentos" :multiple="true" />
                </div>

                


                <div v-else class="card" v-for="modelo in modelos" v-bind:key="modelo.codigo">

                    <div class="user">
                        <div style="display: flex; align-content: center;">
                            <v-checkbox v-model="modelosChecked" :value="modelo.codigo"></v-checkbox>
                        </div>
                        <img :src="getProfile(modelo)" alt="user" />
                        <div class="user-info">
                            <h5>{{ modelo.criador.nome }}</h5>
                            <small>{{ getMoment(modelo.dataCadastro) }}</small>
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
                                    <h1 class="title">{{
                                        language.model.deleteConfirm.replace("${0}", modelInShow.titulo
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
            pageSize: 1,
            page: 1,
            modelosChecked: [],
            modelosCheckedDetais: [],
            modelosComparar: [],
            modelosCompararPercent: [],
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
            this.modelosCompararPercent = [header];
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

                const total = tipos.reduce((total, obj) => total + obj.total, 0)


                const estatisticas = {
                    [this.language.company_of_interest]: occurrences(resposta.data, "tipo=empresa"),
                    [this.language.company_of_interest + "_lable"]: occurrences(resposta.data, "tipo=empresa"),
                    [this.language.supplier]: occurrences(resposta.data, "tipo=fornecedor"),
                    [this.language.supplier + "_lable"]: occurrences(resposta.data, "tipo=fornecedor"),
                    [this.language.customer]: occurrences(resposta.data, "tipo=cliente1"),
                    [this.language.customer + "_lable"]: occurrences(resposta.data, "tipo=cliente1"),
                    [this.language.customer_customer]: occurrences(resposta.data, "tipo=cliente2"),
                    [this.language.customer_customer + "_lable"]: occurrences(resposta.data, "tipo=cliente2"),
                    [this.language.intermediary]: occurrences(resposta.data, "tipo=intermediario"),
                    [this.language.intermediary + "_lable"]: occurrences(resposta.data, "tipo=intermediario"),
                    [this.language.aggregator]: occurrences(resposta.data, "tipo=agregador"),
                    [this.language.aggregator + "_lable"]: occurrences(resposta.data, "tipo=agregador")
                }

                const estatisticasPercent = {
                    [this.language.company_of_interest]: parseFloat((occurrences(resposta.data, "tipo=empresa") / total * 100).toFixed(2)),
                    [this.language.company_of_interest + "_lable"]: (occurrences(resposta.data, "tipo=empresa") / total * 100).toFixed(2) + '%',
                    [this.language.supplier]: parseFloat((occurrences(resposta.data, "tipo=fornecedor") / total * 100).toFixed(2)),
                    [this.language.supplier + "_lable"]: (occurrences(resposta.data, "tipo=fornecedor") / total * 100).toFixed(2) + '%',
                    [this.language.customer]: parseFloat((occurrences(resposta.data, "tipo=cliente1") / total * 100).toFixed(2)),
                    [this.language.customer + "_lable"]: (occurrences(resposta.data, "tipo=cliente1") / total * 100).toFixed(2) + '%',
                    [this.language.customer_customer]: parseFloat((occurrences(resposta.data, "tipo=cliente2") / total * 100).toFixed(2)),
                    [this.language.customer_customer + "_lable"]: (occurrences(resposta.data, "tipo=cliente2") / total * 100).toFixed(2) + '%',
                    [this.language.intermediary]: parseFloat((occurrences(resposta.data, "tipo=intermediario") / total * 100).toFixed(2)),
                    [this.language.intermediary + "_lable"]: ((occurrences(resposta.data, "tipo=intermediario") / total * 100).toFixed(2)) + '%',
                    [this.language.aggregator]: parseFloat((occurrences(resposta.data, "tipo=agregador") / total * 100).toFixed(2)),
                    [this.language.aggregator + "_lable"]: (occurrences(resposta.data, "tipo=agregador") / total * 100).toFixed(2) + '%'
                }

                const atualModelo = this.modelos.find(({ codigo }) => codigo == id);

                this.modelosCheckedDetais = [...this.modelosCheckedDetais, {
                    ...atualModelo,
                    data: [['Componentes', 'Quantidade', { role: 'annotation', type: 'string' }],
                    ...tipos.map(item => [item.nome, item.total, item.total])],
                    percent: [['Componentes', 'Porcentagem (%)', { role: 'annotation', type: 'string' }],
                    ...tipos.map(item => [item.nome, parseFloat((item.total / total * 100).toFixed(2)), (item.total / total * 100).toFixed(2) + "%    "])], estatisticas
                }]

                this.modelosComparar = [...this.modelosComparar, [atualModelo.titulo, ...Object.values(estatisticas)]]
                this.modelosCompararPercent = [...this.modelosCompararPercent, [atualModelo.titulo, ...Object.values(estatisticasPercent)]]

                this.compararComponentes = [...this.compararComponentes, [atualModelo.titulo, tipos.reduce((total, obj) => total + obj.total, 0), tipos.reduce((total, obj) => total + obj.total, 0)]]
                this.compararRelacionamentos = [...this.compararRelacionamentos, [atualModelo.titulo, occurrences(resposta.data, `edge="1"`), occurrences(resposta.data, `edge="1"`).toString()]]
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

.evolucao {
    display: flex;
    flex-direction: column;
    width: 100%;
    flex-wrap: wrap;
    gap: 2rem;
    padding: 2rem;


}

.evolucao-modelo-imagem,
.evolucao-modelo-chart {
    width: 100%;
    padding: 2rem;
    display: flex;
}

.evolucao-modelo-imagem img {
    width: 100%;
}

#customers {
    font-family: Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    width: 100%;
}

#customers td,
#customers th {
    border: 1px solid #ddd;
    padding: 8px;
}

#customers tr:nth-child(even) {
    background-color: #f2f2f2;
}

#customers tr:hover {
    background-color: #ddd;
}

#customers th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: #5e5e5e;
    color: white;
}
</style>
