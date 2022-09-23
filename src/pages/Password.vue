<template>
    <Main>
        <section class="content">
            <div class="register">
                <h1 class="title">{{ language.account.titlePassordChange }}</h1>
                <div class="registerContent">
                    <form @submit="updatePass">
                        <div class="user-details">

                            <div class="input-box">
                                <span class="details">*{{ language.account.oldPassword }}</span>
                                <input v-model="SenhaInput.senhaAtual" type="password"
                                    :placeholder="language.account.oldPassword" required>
                            </div>
                            <div class="input-box">
                                <span class="details">*{{ language.account.newPassword }}</span>
                                <input v-model="SenhaInput.novaSenha" type="password"
                                    :placeholder="language.account.newPassword" required>
                            </div>
                            <div class="input-box">
                                <span class="details">*{{ language.account.repeatNewPassword }}</span>
                                <input v-model="senhaCheck" type="password"
                                    :placeholder="language.account.repeatNewPassword" required>
                            </div>

                        </div>
                        <div class="button">
                            <button type="submit">{{ language.account.saveUpdates }}</button>
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