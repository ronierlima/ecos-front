<template>
    <header class="menu-bg">
        <div class="menu">
            <div class="menu-logo">
                <router-link :to="language.routes.home"><img width="220px" src="../assets/logo.png" /></router-link>
            </div>
            <nav class="menu-nav">
                <ul>
                    <li :class="language.routes.home"><a :href="language.routes.home">Home</a></li>
                    <li><a :href="language.routes.editor">Editor</a></li>
                    <li>
                        <a :href="language.routes.publicModels">
                            {{ language.publicModels }}
                        </a>
                    </li>
                    <li v-if="logado">
                        <a :href="language.routes.privateModels">
                            {{ language.privateModels }}
                        </a>
                    </li>

                    <li v-if="!logado"><a :href="language.routes.register">{{language.register}}</a></li>
                    <li v-if="!logado"><a :href="language.routes.login">{{language.login}}</a></li>
                    <li v-if="logado"><a>| {{ usuario.nome }} |</a></li>
                    <li v-if="logado"><a id="exit" @click="logout()">| {{language.sair}} |</a></li>
                </ul>
            </nav>
        </div>
    </header>
</template>

<script>

export default {
    name: "Menu",
    inject: ['getLanguage', 'getLogado', 'getUsuario', 'logout'],
    data() {
        return {
        };
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