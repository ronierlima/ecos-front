<template>
    <header class="menu-bg">
        <div class="menu">
            <div class="menu-logo">
                <router-link :to="language.routes.home"><img width="220px" src="../assets/logo.png" /></router-link>
            </div>
            <nav class="menu-nav">
                <ul>
                    <li :class="language.routes.home">
                        <router-link exact :to="language.routes.home">{{language.menu.home}}</router-link>
                    </li>
                    <li>
                        <router-link exact :to="language.routes.editor">{{language.menu.editor}}</router-link>
                    </li>
                    <li>
                        <router-link exact :to="language.routes.publicModels">
                            {{ language.menu.models }}
                        </router-link>
                    </li>
                    <li>
                        <router-link exact :to="language.routes.evolution">
                            {{ language.menu.evolution }}
                        </router-link>
                    </li>
                    <li v-if="logado">
                        <router-link exact :to="language.routes.privateModels">
                            {{ language.menu.myModels }}
                        </router-link>
                    </li>

                    <li v-if="!logado">
                        <router-link exact :to="language.routes.register">{{language.menu.registration}}</router-link>
                    </li>
                    <li v-if="!logado">
                        <router-link exact :to="language.routes.login">{{language.menu.login}}</router-link>
                    </li>

                    <div class="dropdown menu">
                        <li v-if="logado"><router-link :to="language.routes.user">| {{ usuario.nome }} |</router-link></li>
                        <div class="dropdown-content">
                            <router-link exact :to="language.routes.user">{{language.menu.myAccount}}</router-link>
                            <router-link exact :to="language.routes.photo">{{language.menu.changePhoto}}</router-link>
                            <router-link exact :to="language.routes.password">{{language.menu.changePassword}}</router-link>
                        </div>
                    </div>

                    <li v-if="logado"><a id="exit" @click="logout()">| {{language.menu.logout}} |</a></li>
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
