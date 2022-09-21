<template>
    <Main>
        <section class="content">
            <div class="register">
                <h1 class="title">{{ language.register }}</h1>
                <div class="registerContent">
                    <form @submit="updatePass">
                        <div class="user-details">

                            <div class="input-box">
                                <span class="details">*{{ language.password }}</span>
                                <input v-model="SenhaInput.senhaAtual" type="password"
                                    :placeholder="language.enterPassword" required>
                            </div>
                            <div class="input-box">
                                <span class="details">*{{ language.password }}</span>
                                <input v-model="SenhaInput.novaSenha" type="password"
                                    :placeholder="language.enterPassword" required>
                            </div>
                            <div class="input-box">
                                <span class="details">*{{ language.confirmPassword }}</span>
                                <input v-model="senhaCheck" type="password" :placeholder="language.confirmPassword"
                                    required>
                            </div>

                        </div>
                        <div class="button">
                            <button type="submit">{{ language.save }}</button>
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
    name: "Password",
    inject: ['getLanguage', 'getLogado', 'getUsuario'],
    components: {
        Main,
    },

    data() {
        return {
            loading: false,
            error: false,
            SenhaInput: {
                senhaAtual: "",
                novaSenha: "",
            },
            senhaCheck: "",

        };
    },

    methods: {

        updatePass: function (e) {
            e.preventDefault();

            if (!this.SenhaInput.senhaAtual) {
                this.$toast.error('A senha é obrigatório.');
                this.error = true;

            }
            else if (!this.SenhaInput.novaSenha) {
                this.$toast.error('A senha é obrigatório.');
                this.error = true;

            } else if (this.SenhaInput.novaSenha !== this.senhaCheck) {
                this.$toast.error('As senhas devem ser iguais');
                this.error = true
            }

            if (!this.error) {

                services.user
                    .updatePass(this.usuario.codigo, this.SenhaInput)
                    .then(() => {

                        this.$toast.success("Senha atualizada com sucesso");
                    })
                    .catch((error) => {
                        this.$toast.error(error.response.data.userMessage || "Ocorreu um erro desconhecido");
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
    

};
</script>

<style >

</style>