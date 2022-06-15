import Home from "../pages/Index.vue";
import Modelagem from "../components/Modelagem.vue";
import ModelagemEn from "../components/ModelagemEn.vue";
import ModelagemEs from "../components/ModelagemEs.vue"


export default [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/en",
    name: "EN",
    component: ModelagemEn,
  },
  {
    path: "/es",
    name: "ES",
    component: ModelagemEs,
  }
];
