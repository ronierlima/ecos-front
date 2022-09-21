<template>
    <Main>
        <section class="content">
            <div class="register">
                <h1 class="title">{{ language.register }}</h1>
                <div class="registerContent">
                    <form @submit="updateUser">
                        <div class="user-details">
                            <div class="input-box">
                                <h1>{{usuarioInput.nome}}</h1>
                            </div>

                            <div class="input-box">
                                <div class="profile-pic">
                                    <label class="-label" for="file">
                                        <span class="glyphicon glyphicon-camera"></span>
                                        <span>⤒</span>
                                    </label>
                                    <input id="file" type="file" accept="image/png, image/svg+xml, image/jpeg"
                                        @change="loadFile" />
                                    <img :src="image.url" id="output" width="200" />
                                </div>
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
    name: "Photo",
    inject: ['getLanguage', 'getLogado', 'getUsuario'],
    components: {
        Main,
    },

    data() {
        return {
            loading: false,
            error: false,
            usuarioInput: {

            },
            image: { url: "" },
            senhaCheck: "",
            hasPhoto: false

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
            
                    if (data.fotoPerfil) {
                       
                        this.hasPhoto = true
                        this.image.url = services.user.foto(this.usuario.codigo)
                    }else{
                        this.image.url = `https://avatars.dicebear.com/api/identicon/${this.usuario.email}.svg`
                    }
                

                })
                .catch((error) => {
                    this.$toast.error(error.response.data.error_description || "Ocorreu um erro desconhecido");
                });

        },

        loadFile(event) {
            this.image.url = URL.createObjectURL(event.target.files[0]);
            this.image.file = event.target.files[0];
        },

        updateUser: function (e) {
            e.preventDefault();
            if (!this.image.file) {
                this.$toast.error('É preciso fazer upload de uma imagem');
                this.error = true
            }

            if (!this.error) {

                var formData = new FormData();
                formData.append("file", this.image.file);

                services.user
                    .updatePhoto(this.usuario.codigo, formData)
                    .then(() => {
                        this.$toast.success("Perfil atualizado com sucesso");
                        this.getUser();
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
    created: function () {

        this.getUser();
    },

};
</script>

<style >
.profile-pic {
    color: transparent;
    transition: all 0.3s ease;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    transition: all 0.3s ease;
}

.profile-pic input {
    display: none;
}

.profile-pic img {
    position: absolute;
    object-fit: cover;
    max-width: 200px;
    width: 100%;
    max-height: 200px;
    box-shadow: 0 0 10px 0 rgba(255, 255, 255, .35);
    z-index: 0;
    padding: 1rem;
}

.profile-pic .-label {
    cursor: pointer;
    width: 200px;
    height: 200px;
    font-size: 3rem;
}

.profile-pic:hover .-label {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, .5);
    z-index: 10000;
    color: #fafafa;
    transition: background-color 0.2s ease-in-out;
    margin-bottom: 0;
}

.profile-pic span {
    display: inline-flex;
}
</style>