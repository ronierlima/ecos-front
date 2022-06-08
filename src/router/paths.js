import Modelagem from "../components/Modelagem.vue";
import ModelagemEn from "../components/ModelagemEn.vue";
import ModelagemPt from "../components/ModelagemPt.vue"
import ModelagemEs from "../components/ModelagemEs.vue"
import Index from "../pages/"


export default [
  {
    path: "/",
    name: "Index",
    component: Index,
  },
  {
    path: "/en",
    name: "EN",
    component: ModelagemEn,
  },
  {
    path: "/pt-BR",
    name: "PT_BR",
    component: ModelagemPt,
  },
  {
    path: "/es",
    name: "ES",
    component: ModelagemEs,
  }
];
