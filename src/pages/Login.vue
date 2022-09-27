<template>
    <Main>
        <section class="content">
            <div class="register">
                <h1 class="title">{{ language.account.titleLogin }}</h1>
                <div class="registerContent">
                    <form @submit="login">
                        <div class="user-details">

                            <div class="input-box">
                                <span class="details">*{{ language.account.email }}</span>
                                <input v-model="usuarioInput.email" type="email" :placeholder="language.account.placeholderEmail"
                                    required name="email">
                            </div>

                            <div class="input-box">
                                <span class="details">*{{ language.account.password }}</span>
                                <input v-model="usuarioInput.senha" type="password"
                                    :placeholder="language.account.placeholderPassword" required name="senha">
                            </div>

                        </div>
                        <div class="button">
                            <button type="submit">{{ language.account.buttonLogin }}</button>
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
    name: "Login",
    inject: ['getLanguage', 'getLogado'],
    components: {
        Main,
    },

    data() {
        return {
            usuarioInput: {
                email: "",
                senha: ""
            },

        };
    },
    mounted: function () {


        if (this.getLogado()) this.$router.push("/");


    },
    methods: {
        login(e) {
            e.preventDefault();
            if (this.usuarioInput.email !== "" && this.usuarioInput.senha !== "") {
                services.user
                    .login(this.usuarioInput.email.toLowerCase(), this.usuarioInput.senha)
                    .then((res) => {
                        this.token = res.data.access_token;
                        this.nome = res.data.nome_completo;
                        this.codigo_usuario = res.data.codigo_usuario;

                        this.logado = true;

                        localStorage.setItem("token", res.data.access_token);
                        localStorage.setItem("nome", res.data.nome_completo);
                        localStorage.setItem("codigo_usuario", res.data.codigo_usuario);

                        this.$router.push("/")
                        this.$toast.success(this.language.messages.welcome+", " + res.data.nome_completo);

                    })
                    .catch((error) => {
                        this.$toast.error(error.response.data.error_description || this.language.messages.error);
                    });

            } else {
                this.$toast.error(this.language.messages.allFields);
            }
        },
    },

    computed: {
        language() {
            return this.getLanguage();
        },

    }

};
</script>