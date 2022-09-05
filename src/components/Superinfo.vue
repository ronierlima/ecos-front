<template>
  <div class="superinfo-bg">
    <div class="superinfo">
      <select v-on:change="onSelect" v-model="selected" name="language" id="language" class="chave">
        <option value="pt-br">pt-br</option>
        <option value="en">en</option>
        <option value="es">es</option>
      </select>
    </div>
  </div>
</template>

<script>


export default {
  name: "SuperInfo",
  data() {
    return {
      selected: ""
    };
  },
  methods: {
    onSelect(e) {

      const { value } = e.target;

      if (window.location.pathname.includes("/en/") && value !== "en") {
        this.$router.push(window.location.pathname.replace("/en/", "/" + value + "/"));
      }
      else if (window.location.pathname.includes("/es/") && value !== "es") {
        this.$router.push(window.location.pathname.replace("/es/", "/" + value + "/"));
      }
      else {
        this.$router.push(window.location.pathname.replace("/pt-br/", "/" + value + "/"));
      }

      location.reload();

    }
  },
  created: function () {

    if (window.location.pathname.includes("/en/")) {
     
      this.selected = "en"

    }
    else if (window.location.pathname.includes("/es/")) {

      this.selected = "es"

    }
    else {
      this.selected = "pt-br"

    }

  }

};
</script>
