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
      localStorage.setItem("language", value)

      location.reload();

    }
  },
  created: function () {

    let lang = localStorage.getItem("language");

    if (lang && lang !== "null" && lang !== "undefined")
      this.selected = lang;
    else this.selected = "pt-br"

  }

};
</script>

<style>
.superinfo-bg {
  background: #5e5e5e;
  color: white;
  max-height: 2rem;
}

.superinfo {
  max-width: 90vw;
  margin: 0 auto;
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  padding: 0.5rem;
  height: 100%;
}

.superinfo p,
.superinfo a {
  margin: 0 10px 10px 10px;
}

.superinfo a {
  color: #5e5e5e;
}

.superinfo select {
  background: #f2f0e6;
  border-radius: 1px;
  border: none;
}
</style>
