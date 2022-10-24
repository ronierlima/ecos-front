<template>
    <span>redirect</span>
</template>

<script>

export default {
    name: "Rate",
    data() {
        return {
        };
    },
    
    mounted() {
        window.location.href = process.env.VUE_APP_RATE_URL
    },
};
</script>