<template>
    <Main>
        <section class="content">
            <div class="register">
                <h1 class="title">Registration</h1>
                <div class="registerContent">
                    <form @submit="registerUser">
                        <div class="user-details">
                            <div class="input-box">
                                <span class="details">*Nome</span>
                                <input v-model="usuarioInput.nome" type="text" id="username" required
                                    placeholder="Enter your name">
                            </div>

                            <div class="input-box">
                                <span class="details">*Email</span>
                                <input v-model="usuarioInput.email" type="email" placeholder="Enter your email"
                                    required>
                            </div>
                            <div class="input-box">
                                <span class="details">Instituição</span>
                                <input v-model="usuarioInput.instituicao" type="text" placeholder="Enter your company">
                            </div>
                            <div class="input-box">
                                <span class="details">*Password</span>
                                <input v-model="usuarioInput.senha" type="password" placeholder="Enter your password"
                                    required>
                            </div>
                            <div class="input-box">
                                <span class="details">*Confirm Password</span>
                                <input v-model="senhaCheck" type="password" placeholder="Confirm your password"
                                    required>
                            </div>
                        </div>
                        <div class="button">
                            <input type="submit" value="Register">
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
    name: "Register",
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

    methods: {
        registerUser: function (e) {
            e.preventDefault();

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
                this.error = true;

            } else if (this.usuarioInput.senha !== this.senhaCheck) {
                this.$toast.error('As senhas devem ser iguais');
                this.error = true
            }

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

<style >
.register {
    max-width: 700px;
    width: 100%;
    padding: 25px 30px;
    border-radius: 5px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
    background: #f2f0e6;
    position: relative;
}

.register .title {
    font-size: 25px;
    position: relative;
    color: #5e5e5e;
}

.register .title::before {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    height: 3px;
    width: 30px;
    border-radius: 5px;
    background: linear-gradient(135deg, #f2f0e6, #5e5e5e);
}

.registerContent form .user-details {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 20px 0 12px 0;
}

form .user-details .input-box {
    margin-bottom: 15px;
    width: 100%;
}

form .input-box span.details {
    display: block;
    font-weight: 500;
    margin-bottom: 5px;
}

form textarea {
    width: 100%;
    min-height: 150px;
    resize: none;
    font-weight: 500;
}

.user-details .input-box input, form textarea {
    height: 45px;
    width: 100%;
    outline: none;
    font-size: 16px;
    border-radius: 5px;
    padding-left: 15px;
    border: 1px solid #ccc;
    border-bottom-width: 2px;
    transition: all 0.3s ease;
}

.user-details .input-box input:focus, form textarea:focus,
.user-details .input-box input:valid {
    border-color: #5e5e5e;
}

form .gender-details .gender-title {
    font-size: 20px;
    font-weight: 500;
}

form .category {
    display: flex;
    width: 80%;
    margin: 14px 0;
    justify-content: space-between;
}

form .category label {
    display: flex;
    align-items: center;
    cursor: pointer;
}

form .category label .dot {
    height: 18px;
    width: 18px;
    border-radius: 50%;
    margin-right: 10px;
    background: #d9d9d9;
    border: 5px solid transparent;
    transition: all 0.3s ease;
}

form .button {
    height: 45px;
    margin: 35px 0
}

form .button input {
    height: 100%;
    width: 100%;
    border-radius: 5px;
    border: none;
    color: #fff;
    font-size: 18px;
    font-weight: 500;
    letter-spacing: 1px;
    cursor: pointer;
    transition: all 0.3s ease;
    background: #5e5e5e;
}

form .button input:hover {
    /* transform: scale(0.99); */
    background: #5e5e5e52;
}

@media(max-width: 584px) {
    .register {
        max-width: 100%;
    }

    form .user-details .input-box {
        margin-bottom: 15px;
        width: 100%;
    }

    form .category {
        width: 100%;
    }

    .content form .user-details {
        max-height: 300px;
        overflow-y: scroll;
    }

    .user-details::-webkit-scrollbar {
        width: 5px;
    }
}

@media(max-width: 459px) {
    .register .content .category {
        flex-direction: column;
    }
}
</style>