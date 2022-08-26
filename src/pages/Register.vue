<template>
    <Main>
        <section class="content" id="modelos">

            <h1>Faça seu cadastro</h1>

            <form @submit="checkForm" novalidate="true">
                <ul class="flex-outer">
                    <li>
                        <label for="username">Name</label>
                        <input v-model="usuarioInput.nome" type="text" id="username"
                            placeholder="Enter your first name here">
                    </li>

                    <li>
                        <label for="email">Email</label>
                        <input v-model="usuarioInput.email" type="email" id="email" placeholder="Enter your email here">
                    </li>
                    <li>
                        <label for="company">Instituição</label>
                        <input v-model="usuarioInput.instituicao" type="text" id="company"
                            placeholder="Enter your company here">
                    </li>

                    <li>
                        <label for="password">Senha</label>
                        <input v-model="usuarioInput.senha" type="password" id="password"
                            placeholder="Enter your password">
                    </li>

                    <li>
                        <label for="passwordCheck">Confirme a Senha</label>
                        <input v-model="senhaCheck" type="password" id="passwordCheck"
                            placeholder="Enter your password to check">
                    </li>

                    <li>
                        <button type="submit">Submit</button>
                    </li>
                </ul>
            </form>

        </section>

    </Main>
</template>

<script>
import { services } from "../../services";
import language from "../helpers/language";
import Main from "../components/Main.vue"

export default {
    name: "Index",
    components: {
        Main,
    },

    data() {
        return {
            loading: false,
            usingLang: {},
            error: false,
            usuarioInput: {
                nome: "",
                email: "",
                instituicao: "",
                senha: ""
            },
            senhaCheck: "",

        };
    },

    created: function () {
        const token = localStorage.getItem("token");
        const nome = localStorage.getItem("nome");

        if (token) {
            this.token = token;
            this.logado = true;
            this.nome = nome;
        }

        this.getModelos();
        this.changeLang();
    },

    methods: {
        checkForm: function (e) {

            if (!this.usuarioInput.nome) {
                this.$toast.error('O nome é obrigatório.');
                this.error = true
            }

            if (!this.usuarioInput.email) {
                this.$toast.error('O e-mail é obrigatório.');
                this.error = true
            } else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.usuarioInput.email))) {
                this.$toast.error('Utilize um e-mail válido.');
                this.error = true
            }

            if (!this.usuarioInput.senha) {
                this.$toast.error('A senha é obrigatório.');
                this.error = true
            }

            if (!this.senhaCheck) {
                this.$toast.error('Repetir a senha é obrigatório.');
                this.error = true
            }

            e.preventDefault();

            if (!this.error) {

                services.user
                    .register(this.usuarioInput)
                    .then(() => {
                        services.user
                            .login(this.usuarioInput.email, this.usuarioInput.senha)
                            .then((res) => {
                                this.token = res.data.access_token;
                                this.nome = res.data.nome_completo;
                                this.codigo_usuario = res.data.codigo_usuario;


                                localStorage.setItem("token", res.data.access_token);
                                localStorage.setItem("nome", res.data.nome_completo);
                                localStorage.setItem("codigo_usuario", res.data.codigo_usuario);
                                this.$router.push("/");
                                this.$toast.success("Seja bem vindo, " + res.data.nome_completo);
                            })
                            .catch((error) => {
                                this.$toast.error(error.response.data.error_description || "Ocorreu um erro desconhecido");
                            });
                    })
                    .catch((error) => {
                        this.$toast.error(error.response.data.userMessage || "Ocorreu um erro desconhecido");
                    });
                this.error = false;
            }


        },

    },

};
</script>

<style>
.flex-outer,
.flex-inner {
    list-style-type: none;
    padding: 0;
}

.flex-outer {
    max-width: 800px;
    margin: 0 auto;
}

.flex-outer li,
.flex-inner {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
}

.flex-inner {
    padding: 0 8px;
    justify-content: space-between;
}

.flex-outer>li:not(:last-child) {
    margin-bottom: 20px;
}

.flex-outer li label,
.flex-outer li p {
    padding: 8px;
    font-weight: 300;
    letter-spacing: .09em;
    text-transform: uppercase;
}

.flex-outer>li>label,
.flex-outer li p {
    flex: 1 0 120px;
    max-width: 220px;
}

.flex-outer>li>label+*,
.flex-inner {
    flex: 1 0 220px;
}

.flex-outer li p {
    margin: 0;
}

.flex-outer li input:not([type='checkbox']),
.flex-outer li textarea {
    padding: 15px;
    border: none;
}

.flex-outer li button {
    margin-left: auto;
    padding: 8px 16px;
    border: none;
    background: #333;
    color: #f2f2f2;
    text-transform: uppercase;
    letter-spacing: .09em;
    border-radius: 2px;
}

.flex-inner li {
    width: 100px;
}
</style>