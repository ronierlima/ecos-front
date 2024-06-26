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

                <div v-if="evolucaoGerada && modelosFinal.length">

                    <v-expansion-panels multiple>

                        <v-expansion-panel v-for="(modelo, index) in modelosFinal" :key="index">

                            <v-expansion-panel-header>
                                <h2>{{ index + 1 + " - " + modelo.titulo }}</h2>
                            </v-expansion-panel-header>

                            <v-expansion-panel-content>

                                <div class="evolucao-modelo-imagem">
                                    <img :src="getPreview(modelo.codigo)" alt="preview" />
                                </div>
                                <div class="evolucao-modelo-tabela">
                                    <v-data-table hide-default-footer :key="modelo.codigo"
                                        :headers="[{ text: modelo.data[0][0], value: 'name' }, { text: modelo.data[0][1], value: 'total' }]"
                                        :items="modelo.data.map((m, i) => i != 0 ? ({ name: m[0], total: m[1] }) : null).filter(v => v)"
                                        class="elevation-1">
                                        <template v-slot:item.total="{ item }">
                                            <v-chip dark>
                                                {{ item.total }}
                                            </v-chip>
                                        </template>

                                        <template v-slot:footer>
                                            <v-alert outlined type="info" prominent border="left">
                                                Total de {{
                                                    modelo.total
                                                }}
                                                componentes
                                            </v-alert>
                                        </template>
                                    </v-data-table>
                                </div>

                                <div class="evolucao-modelo-chart">
                                    <BarChart :options="{ ...options, title: modelo.titulo + ' - Gráfico Numérico' }"
                                        :type="type" v-bind:data="modelo.data" />
                                </div>

                                <div class="evolucao-modelo-chart">
                                    <BarChart :options="{ ...options, title: modelo.titulo + ' - Gráfico Percentual' }"
                                        :type="type" v-bind:data="modelo.percent" />
                                </div>

                            </v-expansion-panel-content>
                        </v-expansion-panel>

                        <v-expansion-panel key="serial1">
                            <v-expansion-panel-header>
                                <h2>{{
                                `${this.modelosFinal.length + 1} - Comparação entre as versões dos modelos
                                do ECOS` }}</h2>
                            </v-expansion-panel-header>

                            <v-expansion-panel-content>
                                <BarChart :options="{
                                    ...{
                                        chart: {
                                            title: 'Comparação entre modelos',
                                        },
                                
                                        height: 600,
                                    }, title: 'Comparação numérica entre os modelos'
                                }" :type="type" :data="modelosFinalComparacao" :multiple="true" />

                                <BarChart :options="{
                                    ...{
                                        chart: {
                                            title: 'Comparação percentual entre modelos %',
                                        },
                                
                                        height: 600,
                                    }, title: 'Comparação percentual entre os modelos'
                                }" :type="type" :data="modelosFinalCompararPercent" />

                                <BarChart :options="{
                                    ...{
                                
                                        height: 600,
                                    }, title: 'Quantidade de Componentes e Relacionamentos'
                                }" :type="type" :data="compararComponentes" :multiple="true" />

                                <BarChart :options="{
                                    ...{
                                
                                        height: 600,
                                    }, title: 'Quantidade apenas de Relacionamentos'
                                }" :type="type" :data="compararRelacionamentos" :multiple="true" />

                                <BarChart :options="{
                                    ...{
                                
                                        height: 600,
                                    }, title: 'Diferença numérica'
                                }" :type="type"
                                    :data="diferenca(modelosFinal[0], modelosFinal[modelosFinal.length - 1])" />

                                <BarChart :options="{
                                    ...{
                                
                                        height: 600,
                                    }, title: 'Variação Percentual'
                                }" :type="type"
                                    :data="diferencaPercentual(modelosFinal[0], modelosFinal[modelosFinal.length - 1])" />
                            </v-expansion-panel-content>

                            <v-expansion-panel-content>

                                <div v-for="({ numerico: modelo, percentual: modeloP, media, name }) in gerarComparacaoEndToEnd(modelosFinal)"
                                    :key="modelo.codigo">
                                    <v-chip class="ma-2 ml-0" color="red" label text-color="white">
                                        <v-icon left>
                                            mdi-label
                                        </v-icon>
                                        {{ name }}
                                    </v-chip>
                                    <v-data-table hide-default-footer
                                        :headers="[{ text: modelo[0][0], value: 'name' }, { text: 'Diferença Numérica', value: 'total' }, { text: 'Diferença Percentual', value: 'percentual' }, { text: 'Média', value: 'media' }]"
                                        :items="modelo.map((m, i) => i != 0 ? ({ name: m[0], total: m[1], percentual: modeloP[i][2], media: media[i][1] }) : null).filter(v => v)"
                                        class="elevation-1 mb-7">
                                        <template v-slot:item.total="{ item }">
                                            <v-chip dark>
                                                {{ item.total }}
                                            </v-chip>
                                        </template>
                                        <template v-slot:item.percentual="{ item }">
                                            <v-chip dark>
                                                {{ item.percentual.replace('Infinity', '0.00') }}
                                            </v-chip>
                                        </template>
                                        <template v-slot:item.media="{ item }">
                                            <v-chip dark>
                                                {{ item.media }}
                                            </v-chip>
                                        </template>
                                    </v-data-table>

                                </div>

                                <v-chip class="ma-2 ml-0" color="red" label text-color="white">
                                    <v-icon left>
                                        mdi-label
                                    </v-icon>
                                   Métricas Quantitativas
                                </v-chip>
                                <v-data-table hide-default-footer
                                    :headers="[{ text: `Métrica`, value: 'title' }, { text: `Total`, value: 'valor' }]"
                                    :items="metricasQuantitativas" class="elevation-1 mb-7">
                                    <template v-slot:item.valor="{ item }">
                                        <v-chip dark>
                                            {{ item.valor }}
                                        </v-chip>
                                    </template>
                                </v-data-table>
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-expansion-panels>
                </div>

                <v-item-group v-else>
                    <v-container>
                        <v-row alignIte="center">
                            <v-col v-for="modelo in modelos" :key="modelo.codigo">
                                <v-card class="mx-auto d-flex flex-column align-center" max-width="350" min-width="350">

                                    <v-checkbox v-model="modelosChecked" :value="modelo.codigo"></v-checkbox>

                                    <v-item>
                                        <CardModelo :modelo="modelo" :canEdit="false" :refresh="getModelos" />
                                    </v-item>
                                    <v-checkbox v-model="modelosChecked" :value="modelo.codigo"></v-checkbox>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-item-group>

            </div>

        </section>

    </MainPage>
</template>

<script>

import { services } from "../services";
import MainPage from "../components/MainPage.vue"
import { occurrences } from "../helpers";
import BarChart from '../components/Bar.vue'
import CardModelo from "../components/CardModelo.vue";

export default {
    name: "Evolucao",
    inject: ['getLanguage', 'getLogado', 'getUsuario'],
    components: {
        MainPage,
        BarChart,
        CardModelo
    },

    data() {
        return {
            evolucaoGerada: false,
            modelos: [],
            pageSize: 1,
            page: 1,
            modelosChecked: [],
            modelosCheckedDetais: [],
            diferencaNumericaComponentes: [],
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
                    title: 'Componentes SSN',
                    minValue: 0,
                },
                vAxis: {
                    title: 'Componentes SSN',
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

        getModelos(props = { size: 20 }) {
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

        async gerar() {

            await this.modelosChecked.forEach(async (id) => {

                const resposta = await services.models.get(id)
                const { data: atualModelo } = await services.models.getModel(id);

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
                {
                    nome: this.language.relacionamentos,
                    total: occurrences(resposta.data, `edge="1"`),
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
                    [this.language.aggregator + "_lable"]: occurrences(resposta.data, "tipo=agregador"),
                    [this.language.relacionamentos]: occurrences(resposta.data, `edge="1"`),
                    [this.language.relacionamentos + "_lable"]: occurrences(resposta.data, `edge="1"`)
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
                    [this.language.aggregator + "_lable"]: (occurrences(resposta.data, "tipo=agregador") / total * 100).toFixed(2) + '%',
                    [this.language.relacionamentos]: parseFloat((occurrences(resposta.data, `edge="1"`) / total * 100).toFixed(2)),
                    [this.language.relacionamentos + "_lable"]: (occurrences(resposta.data, `edge="1"`) / total * 100).toFixed(2) + '%'
                }

                this.modelosCheckedDetais = [...this.modelosCheckedDetais, {
                    ...atualModelo,
                    total,
                    data: [['Componentes', 'Quantidade', { role: 'annotation', type: 'string' }],
                    ...tipos.map(item => [item.nome, item.total, item.total])],
                    percent: [['Componentes', 'Porcentagem (%)', { role: 'annotation', type: 'string' }],
                    ...tipos.map(item => [item.nome, parseFloat((item.total / total * 100).toFixed(2)), (item.total / total * 100).toFixed(2) + "%"])], estatisticas, estatisticasPercent,
                    relacionamentos: [atualModelo.titulo, tipos.reduce((total, obj) => total + obj.total, 0), tipos.reduce((total, obj) => total + obj.total, 0)],
                    componentes: [atualModelo.titulo, occurrences(resposta.data, `edge="1"`), occurrences(resposta.data, `edge="1"`).toString()]
                }]
            }
            )

            this.evolucaoGerada = true;

        },

        diferenca(modelo1, modelo2) {

            const array = []
            if (modelo1.data.length && modelo2.data.length)

                modelo2?.data?.forEach((value, index) => {

                    if (index === 0) array.push([value[0], value[1], value[2]])
                    else {

                        array.push([value[0], value[1] - modelo1.data[index][1], value[2] - modelo1.data[index][2]])
                    }
                });

            return array;

        },

        diferencaPercentual(modelo1, modelo2) {

            const array = []
            if (modelo1.percent.length && modelo2.percent.length)

                modelo2?.percent?.forEach((value, index) => {

                    if (index === 0) array.push([value[0], "Percentual", value[2]])
                    else {

                        const maior = Math.max(value[1], modelo1.percent[index][1]);

                        const menor = Math.min(value[1], modelo1.percent[index][1]);

                        const diff = maior - menor;

                        const div = diff / menor;

                        const multiplicacao = div * 100;

                        array.push([value[0],
                        parseFloat(multiplicacao.toFixed(2)),
                        (multiplicacao).toFixed(2) + '%'
                        ])
                    }
                });

            return array;

        },

        media(modelo1, modelo2) {

            const array = []
            if (modelo1.data.length && modelo2.data.length)

                modelo2?.data?.forEach((value, index) => {

                    if (index === 0) array.push([value[0], "Média", value[2]])
                    else {
                        array.push([value[0], (value[1] + modelo1.data[index][1]) / 2])
                    }
                });

            return array;

        },

        gerarComparacaoEndToEnd(modelos) {
            const array = []

            if (modelos.length % 2 === 0) {

                for (let index = 0; index < modelos.length; index += 2) {
                    array.push({ name: `${modelos[index].titulo} X ${modelos[index + 1].titulo}`, numerico: this.diferenca(modelos[index], modelos[index + 1]), percentual: this.diferencaPercentual(modelos[index], modelos[index + 1]), media: this.media(modelos[index], modelos[index + 1]) })
                }

            } else {
                for (let index = 0; index < modelos.length - 1; index++) {
                    array.push({ name: `${modelos[index].titulo} X ${modelos[index + 1].titulo}`, numerico: this.diferenca(modelos[index], modelos[index + 1]), percentual: this.diferencaPercentual(modelos[index], modelos[index + 1]), media: this.media(modelos[index], modelos[index + 1]) })
                }
            }

            return array
        },

        limpar() {

            this.evolucaoGerada = false;
            this.modelosChecked = [];
            this.modelosCheckedDetais = [];
        },

        getPreview(codigo) {
            return services.models.preview(codigo)
        },
    },

    computed: {
        language() {
            return this.getLanguage();
        },
        modelosFinal() {
            return this.modelosChecked.map(id => this.modelosCheckedDetais.find(({ codigo }) => codigo === id))
        },
        modelosFinalComparacao() {

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
                this.language.relacionamentos,
                { role: 'annotation', type: 'string' },
            ]

            return [header, ...this.modelosChecked
                .map(id => this.modelosCheckedDetais
                    .find(({ codigo }) => codigo === id))
                .map((atualModelo) => [atualModelo.titulo, ...Object.values(atualModelo.estatisticas)])]

        },
        modelosFinalCompararPercent() {
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
                this.language.relacionamentos,
                { role: 'annotation', type: 'string' },
            ]
            return [header, ...this.modelosChecked
                .map(id => this.modelosCheckedDetais
                    .find(({ codigo }) => codigo === id))
                .map((atualModelo) => [atualModelo.titulo, ...Object.values(atualModelo.estatisticasPercent)])]

        },
        compararComponentes() {

            return [['Modelo', 'Componentes', { role: 'annotation', type: 'string' }], ...this.modelosChecked.map(id => this.modelosCheckedDetais.find(({ codigo }) => codigo === id).componentes)]
        },
        compararRelacionamentos() {
            return [['Modelo', 'Relacionamentos', { role: 'annotation', type: 'string' }], ...this.modelosChecked.map(id => this.modelosCheckedDetais.find(({ codigo }) => codigo === id).relacionamentos)]
        },
        metricasQuantitativas() {
            const obj = [
                { title: 'Alteração no número de componentes no geral', valor: this.modelosFinal[this.modelosFinal.length - 1].total - this.modelosFinal[0].total },
                { title: 'Alteração no número de empresa de interesse', valor: this.modelosFinal[this.modelosFinal.length - 1].estatisticas[this.language.company_of_interest] - this.modelosFinal[0].estatisticas[this.language.company_of_interest] },
                { title: 'Alteração no número de fornecedor', valor: this.modelosFinal[this.modelosFinal.length - 1].estatisticas[this.language.supplier] - this.modelosFinal[0].estatisticas[this.language.supplier] },
                { title: 'Alteração no número de cliente', valor: this.modelosFinal[this.modelosFinal.length - 1].estatisticas[this.language.customer] - this.modelosFinal[0].estatisticas[this.language.customer] },
                { title: 'Alteração no número de cliente do cliente', valor: this.modelosFinal[this.modelosFinal.length - 1].estatisticas[this.language.customer_customer] - this.modelosFinal[0].estatisticas[this.language.customer_customer] },
                { title: 'Alteração no número de intermediário', valor: this.modelosFinal[this.modelosFinal.length - 1].estatisticas[this.language.intermediary] - this.modelosFinal[0].estatisticas[this.language.intermediary] },
                { title: 'Alteração no número de agregador', valor: this.modelosFinal[this.modelosFinal.length - 1].estatisticas[this.language.aggregator] - this.modelosFinal[0].estatisticas[this.language.aggregator] },
                { title: 'Alteração no número de relacionamentos', valor: this.modelosFinal[this.modelosFinal.length - 1].estatisticas[this.language.relacionamentos] - this.modelosFinal[0].estatisticas[this.language.relacionamentos] },
                { title: 'Média de evolução dos componentes', valor: (this.modelosFinal[this.modelosFinal.length - 1].total + this.modelosFinal[0].total) / 2 },
                { title: 'Média de evolução por relacionamentos', valor: (this.modelosFinal[this.modelosFinal.length - 1].estatisticas[this.language.relacionamentos] + this.modelosFinal[0].estatisticas[this.language.relacionamentos]) / 2 },
            ]
            return obj
        }
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
