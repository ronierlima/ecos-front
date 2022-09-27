<template>
    <Main>
        <section class="content">
            <div class="register">
                <h1 class="title">{{ language.account.titleProfile}}</h1>
                <div class="registerContent">
                    <form @submit="updateUser">
                        <div class="user-details">
                            <div class="input-box">
                                <span class="details">*{{ language.account.name }}</span>
                                <input v-model="usuarioInput.nome" type="text" id="username" required
                                    :placeholder="language.account.placeholdernName">
                            </div>

                            <div class="input-box">
                                <span class="details">*{{ language.account.email }}</span>
                                <input v-model="usuarioInput.email" type="email" :placeholder="language.account.placeholderEmail"
                                    required>
                            </div>
                            <div class="input-box">
                                <span class="details">{{ language.account.institution }}</span>
                                <input v-model="usuarioInput.instituicao" type="text" :placeholder="language.account.placeholderEmail">
                            </div>

                        </div>
                        <div class="button">
                            <button type="submit">{{ language.account.save }}</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    </Main>
</template>

<script>
import { services } from "../services";
import Main from "../components/MainPage.vue"

export default {
    name: "User",
    inject: ['getLanguage', 'getLogado', 'getUsuario'],
    components: {
        Main,
    },

    data() {
        return {
            loading: false,
            error: false,
            usuarioInput: {
                nome: "",
                email: "",
                instituicao: "",
            },
            senhaCheck: "",

        };
    },

    methods: {
        getUser() {
            services.user
                .getDetails(this.usuario.codigo)
                .then(({ data }) => {

                    this.usuarioInput = {
                        nome: data.nome,
                        email: data.email,
                        instituicao: data.instituicao,
                    };

                })
                .catch((error) => {
                    this.$toast.error(error.response.data.error_description || this.language.messages.error);
                });
        },
        updateUser: function (e) {
            e.preventDefault();

            // if (!this.usuarioInput.nome) {
            //     this.$toast.error('O nome é obrigatório.');
            //     this.error = true
            // }

            // if (!this.usuarioInput.email) {
            //     this.$toast.error('O e-mail é obrigatório.');
            //     this.error = true
            // } else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.usuarioInput.email))) {
            //     this.$toast.error('Utilize um e-mail válido.');
            //     this.error = true
            // }

            if (!this.error) {

                services.user
                    .update(this.usuario.codigo, this.usuarioInput)
                    .then((res) => {
                        localStorage.setItem("nome", res.data.nome);
                        this.$router.push("/");
                        this.$toast.success(this.language.messages.update);
                    })
                    .catch((error) => {
                        this.$toast.error(error.response.data.userMessage || this.language.messages.error);
                    });

                this.error = false;
            }
        },
    },
    computed: {
        language() {
            return this.getLanguage();
        },

        logado() {
            return this.getLogado();
        },
        usuario() {
            return this.getUsuario();
        },

    },
    created: function () {

        this.getUser();
    },

};
</script>