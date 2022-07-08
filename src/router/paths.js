import Home from "../pages/Index.vue";
import Models from "../pages/MyModels.vue";
import Modelagem from "../components/Modelagem.vue";
import ModelagemEn from "../components/ModelagemEn.vue";
import ModelagemEs from "../components/ModelagemEs.vue";

export default [
  {
    path: "/",
    redirect: "/pt-br",
  },
  {
    path: "/pt-br",
    name: "Home",
    component: Home,
  },
  {
    path: "/en",
    name: "Home",
    component: Home,
  },
  {
    path: "/es",
    name: "Home",
    component: Home,
  },

  {
    path: "/es/editor",
    name: "ES",
    component: ModelagemEs,
  },

  {
    path: "/en/editor",
    name: "enEditor",
    component: ModelagemEn,
  },
  {
    path: "/en/models",
    name: "enModels",
    component: Models,
  },

  {
    path: "/pt-br/editor",
    name: "enEditor",
    component: Modelagem,
  },
  {
    path: "/pt-br/modelos",
    name: "ptModels",
    component: Models,
  },
];
