<template>
    <MainPage>

        <section class="content" id="modelos">

            <h1>{{ language.publicModels }}</h1>

            <div class="container">
                <div class="card" v-for="modelo in modelos" v-bind:key="modelo.codigo">
                    <div class="user">
                        <img :src="'https://joeschmoe.io/api/v1/' + modelo.criador.codigo" alt="user" />
                        <div class="user-info">
                            <h5>{{ modelo.criador.nome }}</h5>
                            <small>{{ modelo.dataCadastro | moment("DD/MM/YYYY") }}</small>
                        </div>
                    </div>
                    <div class="card-header">
                        <img class="image" :src="getPreview(modelo.codigo)" alt="rover" />

                        <div class="middle">
                            <div class="text" @click="open(modelo.codigo)">{{ language.openEditor }}</div>
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

                </div>
            </div>

        </section>
    </MainPage>
</template>

<script>
import { services } from "../../services";
import MainPage from "../components/MainPage.vue"


export default {
    name: "Index",
    inject: ['getLanguage', 'getLogado', 'getUsuario'],
    components: {
        MainPage,
    },

    data() {
        return {
            modelos: []
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

        open(modelo) {
            this.$router.push(this.language.routes.modelEditor.replace(":codigo", modelo));
        },

        getPreview(codigo) {
            return services.models.preview(codigo)
        }
    },

    computed: {
        language() {
            return this.getLanguage();
        },
        usuario() {
            return this.getUsuario();
        },
        logado() {
            return this.getLogado();
        },

    }
};
</script>

<style>
.container {
    display: flex;
    width: 100%;
    justify-content: space-evenly;
    flex-wrap: wrap;
}

.image {
    opacity: 1;
    display: block;
    width: 100%;
    height: auto;
    transition: .5s ease;
    backface-visibility: hidden;
}

.middle {
    transition: .5s ease;
    opacity: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    text-align: center;
}

.card-header:hover .image {
    opacity: 0.3;
}

.card-header:hover .middle {
    opacity: 1;
}

.text {
    background-color: #5e5e5e;
    color: white;
    font-size: 1rem;
    padding: 1rem 2rem;
    cursor: pointer;
}

.card {
    margin: 10px;
    border-radius: 10px;
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    width: 300px;
}

.card-header {
    padding: 1rem;
    position: relative;

}

.card-header img {
    width: 100%;
    height: 200px;
    object-fit: cover;
}

.card-body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 0 20px;
    border-top: #5e5e5e1e dotted 4px;

}

.card-actions {
    display: flex;
    justify-content: space-evenly;
    background-color: #5e5e5e1e;
    padding: 20px;
    gap: .5rem;
}

.tag {
    background: #3498db;
    font-size: 1rem;
    margin: 0;
    color: #fff;
    padding: .25rem .75rem;
    text-transform: uppercase;
    cursor: pointer;
}


.tag-teal {
    background-color: #3498db;
}

.tag-teal:hover {
    background-color: #2980b9;
}

.tag-purple {
    background-color: #1abc9c;
}

.tag-purple:hover {
    background-color: #16a085;
}


.tag-red {
    background-color: #e74c3c;
}

.tag-red:hover {
    background-color: #c0392b;
}


.card-body p {
    font-size: 13px;
    margin: 0 0 40px;
}

.user {
    display: flex;
    padding: 1rem;
    background-color: #5e5e5e1e;
}

.user img {
    border-radius: 50%;
    width: 40px;
    height: 40px;
    margin-right: 10px;
}

.user-info h5 {
    margin: 0;
}

.user-info small {
    color: #545d7a;
}
</style>