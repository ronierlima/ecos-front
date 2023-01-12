<template>
    <div>
        <Superinfo></Superinfo>
        <Menu></Menu>
        <slot></slot>
    </div>
</template>


<script>

import Superinfo from "../components/Superinfo.vue";
import Menu from "../components/Menu.vue";

export default {
    name: "MainPage",
    components: {
        Superinfo,
        Menu,
    },

    data() {
        return {}
    },

};
</script>
