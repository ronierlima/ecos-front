import Home from "../pages/Index.vue";
import PublicModels from "../pages/PublicModels.vue";
import PrivateModels from "../pages/PrivateModels.vue";

import Modelagem from "../pages/Editor.vue";

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
    path: "/pt-br/editor",
    name: "ptEditor",
    component: Modelagem,
  },
  {
    path: "/pt-br/editor/:id",
    name: "ptEditorId",
    component: Modelagem,
  },
  {
    path: "/pt-br/modelos",
    name: "ptPublicModels",
    component: PublicModels,
  },
  {
    path: "/pt-br/modelos/privado",
    name: "ptPrivateModels",
    component: PrivateModels,
  },
];
