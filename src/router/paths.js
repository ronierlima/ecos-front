import Home from "../pages/Home.vue";
import PublicModels from "../pages/PublicModels.vue";
import PrivateModels from "../pages/PrivateModels.vue";
import Register from "../pages/Register.vue";
import Login from "../pages/Login.vue";
import User from "../pages/User.vue";
import Password from "../pages/Password.vue";
import Photo from "../pages/Photo.vue";

import Editor from "../pages/Editor.vue";

function getBase() {
  const language = localStorage.getItem("language");

  if (language && language !== "null" && language !== "undefined")
    return "/" + language + "/";

  return "/pt-br/home";
}

export default [
  {
    path: "/",
    redirect: getBase(),
  },
  {
    path: "/pt-br/",
    redirect: "/pt-br/home",
  },
  {
    path: "/pt-br/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/pt-br/editor",
    name: "ptEditor",
    component: Editor,
  },
  {
    path: "/pt-br/editor/:id",
    name: "ptEditorId",
    component: Editor,
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
  {
    path: "/pt-br/cadastro",
    name: "ptRegister",
    component: Register,
  },
  {
    path: "/pt-br/login",
    name: "ptLogin",
    component: Login,
  },
  {
    path: "/pt-br/conta",
    name: "ptUser",
    component: User,
  },
  {
    path: "/pt-br/conta/password",
    name: "ptPassword",
    component: Password,
  },
  {
    path: "/pt-br/conta/foto",
    name: "ptPhoto",
    component: Photo,
  },
  {
    path: "/en/",
    redirect: "/en/home",
  },
  {
    path: "/en/home",
    name: "enHome",
    component: Home,
  },
  {
    path: "/en/editor",
    name: "enEditor",
    component: Editor,
  },
  {
    path: "/en/editor/:id",
    name: "enEditorId",
    component: Editor,
  },
  {
    path: "/en/modelos",
    name: "enPublicModels",
    component: PublicModels,
  },
  {
    path: "/en/modelos/privado",
    name: "enPrivateModels",
    component: PrivateModels,
  },
  {
    path: "/en/cadastro",
    name: "enRegister",
    component: Register,
  },
  {
    path: "/en/login",
    name: "enLogin",
    component: Login,
  },
  {
    path: "/en/conta",
    name: "enUser",
    component: User,
  },
  {
    path: "/en/conta/password",
    name: "enPassword",
    component: Password,
  },
  {
    path: "/en/conta/foto",
    name: "enPhoto",
    component: Photo,
  },
  {
    path: "/es/",
    redirect: "/es/home",
  },
  {
    path: "/es/home",
    name: "esHome",
    component: Home,
  },
  {
    path: "/es/editor",
    name: "esEditor",
    component: Editor,
  },
  {
    path: "/es/editor/:id",
    name: "esEditorId",
    component: Editor,
  },
  {
    path: "/es/modelos",
    name: "esPublicModels",
    component: PublicModels,
  },
  {
    path: "/es/modelos/privado",
    name: "esPrivateModels",
    component: PrivateModels,
  },
  {
    path: "/es/cadastro",
    name: "esRegister",
    component: Register,
  },
  {
    path: "/es/login",
    name: "esLogin",
    component: Login,
  },
  {
    path: "/es/conta",
    name: "esUser",
    component: User,
  },
  {
    path: "/es/conta/password",
    name: "esPassword",
    component: Password,
  },
  {
    path: "/es/conta/foto",
    name: "esPhoto",
    component: Photo,
  },
];
