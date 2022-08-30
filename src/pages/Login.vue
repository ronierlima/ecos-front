<template>
    <Main>
        <section class="content">
            <div class="register">
                <h1 class="title">Login</h1>
                <div class="registerContent">
                    <form @submit="login">
                        <div class="user-details">

                            <div class="input-box">
                                <span class="details">*Email</span>
                                <input v-model="usuarioInput.email" type="email" placeholder="Enter your email" required
                                    name="email">
                            </div>

                            <div class="input-box">
                                <span class="details">*Password</span>
                                <input v-model="usuarioInput.senha" type="password" placeholder="Enter your password"
                                    required name="senha">
                            </div>

                        </div>
                        <div class="button">
                            <input type="submit" value="Login">
                        </div>
                    </form>
                </div>
            </div>
        </section>
    </Main>
</template>

<script>
import { services } from "../../services";
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
                    .login(this.usuarioInput.email, this.usuarioInput.senha)
                    .then((res) => {
                        this.token = res.data.access_token;
                        this.nome = res.data.nome_completo;
                        this.codigo_usuario = res.data.codigo_usuario;

                        this.logado = true;

                        localStorage.setItem("token", res.data.access_token);
                        localStorage.setItem("nome", res.data.nome_completo);
                        localStorage.setItem("codigo_usuario", res.data.codigo_usuario);

                        this.$router.push("/")
                        this.$toast.success("Seja bem vindo, " + res.data.nome_completo);

                    })
                    .catch((error) => {
                        this.$toast.error(error.response.data.error_description || "Ocorreu um erro desconhecido");
                    });

            } else {
                this.$toast.error("Preencha todos os campos");
            }
        },
    },

};
</script>