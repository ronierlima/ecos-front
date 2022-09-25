<template>
  <div id="modelo">
    <Superinfo></Superinfo>

    <header class="menu-bg">

      <div class="menu">
        <div class="menu-logo">
          <router-link :to="usingLang.routes.home"><img width="220px" src="../assets/logo.png" /></router-link>
        </div>
        <nav class="menu-nav">

          <ul>

            <li>
              <img width="30px" @click="showModalSalvar = true" src="../assets/exportar.svg" :alt="usingLang.export"
                :title="usingLang.export" />
            </li>
            <li>
              <img width="30px" @click="showModal = true" src="../assets/import.svg" :alt="usingLang.import"
                :title="usingLang.import" />
            </li>
            <li>
              <img width="30px" @click="zoomMais()" src="../assets/zoom_in.svg" :alt="usingLang.zoomin"
                :title="usingLang.zoomin" />
            </li>
            <li>
              <img width="30px" @click="zoomMenos()" src="../assets/zoom_out.svg" :alt="usingLang.zoomout"
                :title="usingLang.zoomout" />
            </li>
            <li>
              <img width="30px" @click="zommAtual()" src="../assets/zoom_actual.svg" :alt="usingLang.zoomDefault"
                :title="usingLang.zoomDefault" />
            </li>
            <li>
              <img width="30px" @click="apagar()" src="../assets/delete.svg" :alt="usingLang.delete"
                :title="usingLang.delete" />
            </li>
            <li>
              <img width="30px" @click="recortar()" src="../assets/recortar.svg" :alt="usingLang.recort"
                :title="usingLang.recort" />
            </li>
            <li>
              <img width="30px" @click="copiar()" src="../assets/copiar.svg" :alt="usingLang.copy"
                :title="usingLang.copy" />
            </li>
            <li>
              <img width="30px" @click="colar()" src="../assets/colar.svg" :alt="usingLang.colar"
                :title="usingLang.colar" />
            </li>
            <li>
              <img width="30px" @click="desfazer()" src="../assets/desfazer.svg" :alt="usingLang.desfazer"
                :title="usingLang.desfazer" />
            </li>
            <li>
              <img width="30px" @click="refazer()" src="../assets/refazer.svg" :alt="usingLang.refazer"
                :title="usingLang.refazer" />
            </li>
            <li>
              <img width="32px" @click="selecionarRelacoes()" src="../assets/select_vertices.svg"
                :alt="usingLang.italico" :title="usingLang.italico" />
            </li>

          </ul>
        </nav>

        <div class="dropdown">
          <button class="dropbtn" @click="!logado ? showModalLogin = true : null">{{ logado ? nome : "entrar"
          }}</button>
          <div class="dropdown-content" v-if="logado">
            <a v-if="codigo_usuario !== modelo.criador.codigo" @click="logado ? showModalRegister = true : null">Salvar
              modelo</a>
            <a :href="usingLang.routes.editor">
              Novo modelo
            </a>
            <a v-if="logado && (codigo_usuario === modelo.criador.codigo)" @click="openUpdate()">Atualizar
              modelo</a>
            <a :href="usingLang.routes.privateModels">
              {{ usingLang.privateModels }}
            </a>
            <a id="exit" @click="logout()">Sair</a>
          </div>
        </div>

      </div>
    </header>
    <section>
      <aside class="left-sidebar" id="sidebar">
      </aside>
      <button id="sidebar-togle" @click="togleNav()">
        {{this.navIsOpen ? "❮":"❯"}}
      </button>
      <div id="container"></div>

      <aside class="right-sidebar" id="tool">
        <div id="italico">
          <img width="30px" @click="italico()" src="../assets/italico.svg" :alt="usingLang.italico"
            :title="usingLang.italico" />
        </div>

        <div id="sublinhado">
          <img width="30px" @click="sublinhado()" src="../assets/sublinhado.svg" :alt="usingLang.sublinhado"
            :title="usingLang.sublinhado" />
        </div>

        <div id="negrito">
          <img width="30px" @click="negrito()" src="../assets/negrito.svg" :alt="usingLang.negrito"
            :title="usingLang.negrito" />
        </div>

        <div id="prafrente">
          <img width="30px" @click="praFrente()" src="../assets/tofront.svg" :alt="usingLang.frente"
            :title="usingLang.frente" />
        </div>

        <div id="pratras">
          <img width="30px" @click="praTras()" src="../assets/toback.svg" :alt="usingLang.tras"
            :title="usingLang.tras" />
        </div>

        <div id="desagrupar">
          <img width="30px" @click="desagrupar()" src="../assets/desagrupar.svg" :alt="usingLang.desagrupar"
            :title="usingLang.desagrupar" />
        </div>

        <div id="agrupar">
          <img width="30px" @click="agrupar()" src="../assets/agrupar.svg" :alt="usingLang.agrupar"
            :title="usingLang.agrupar" />
        </div>

        <div id="desfazer_selecao">
          <img width="30px" @click="none()" src="../assets/none.svg" :alt="usingLang.desfazer_selecao"
            :title="usingLang.desfazer_selecao" />
        </div>

        <div id="selecionar">
          <img width="30px" @click="selecionarTudo()" src="../assets/selecionar.svg" :alt="usingLang.all"
            :title="usingLang.all" />
        </div>

        <hr>

        <div id="propriedades">
          <img width="30px" @click="(showModalPropriedades = true), propriedades()" src="../assets/propriedades.svg"
            :alt="usingLang.propriedades" :title="usingLang.propriedades" />
        </div>

        <div id="selecionar">
          <img width="30px" @click="(showModalRelatorio = true), gerarRelario()" src="../assets/estatisticas.svg"
            :alt="usingLang.estatisticas" :title="usingLang.estatisticas" />
        </div>

        <div id="show">
          <img width="30px" @click="show()" src="../assets/show.svg" :alt="usingLang.visualizar"
            :title="usingLang.visualizar" />
        </div>

        <div id="imprimir">
          <img width="30px" @click="imprimir()" src="../assets/imprimir.svg" :alt="usingLang.print"
            :title="usingLang.print" />
        </div>
      </aside>
    </section>

    <transition name="modal" v-if="showModalRegister">
      <div class="modal-mask">
        <div class="modal-wrapper">



          <div class="modal-body">

            <div class="register">
              <h1 class="title">Salvar modelo atual</h1>
              <button class="closeButton" @click="showModalRegister = false">
                x
              </button>
              <div class="registerContent">
                <form @submit="(e) => { isUpdate ? atualizarOnline(e) : salvarOnline(e); }">
                  <div class="user-details">

                    <div class="input-box">
                      <span class="details">*Titulo</span>
                      <input v-model="modelo.titulo" type="text" placeholder="Enter titulo model" required
                        name="modelName">
                    </div>

                    <div class="input-box">
                      <span class="details">*Descrição</span>
                      <textarea v-model="modelo.descricao" placeholder="Enter description model" required
                        name="description"></textarea>
                    </div>

                  </div>
                  <div class="button">
                    <input type="submit" value="Update">
                  </div>
                </form>
              </div>
            </div>
          </div>

        </div>

      </div>
    </transition>


    <transition name="modal" v-if="showModalLogin">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-body">
            <div class="register">
              <h1 class="title">{{ usingLang.login }}</h1>
              <button class="closeButton" @click="showModalLogin = false">
                x
              </button>
              <div class="registerContent">
                <form @submit="login">
                  <div class="user-details">

                    <div class="input-box">
                      <span class="details">*Email</span>
                      <input v-model="input.username" type="email" :placeholder="usingLang.enterEmail" required
                        name="email">
                    </div>

                    <div class="input-box">
                      <span class="details">*Password</span>
                      <input v-model="input.password" type="password" :placeholder="usingLang.enterPassword" required
                        name="senha">
                    </div>

                  </div>
                  <div class="button">
                    <button type="submit">{{ usingLang.login }}</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <transition name="modal" v-if="showModal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">
            <div class="modal-header">
              <h3 name="header">{{ usingLang.import2 }}</h3>
            </div>

            <div class="modal-body">
              <input type="file" id="myFile" name="filename" accept=".xml" />
            </div>

            <div class="modal-footer">
              <slot name="footer">
                <button class="modal-default-button cancel" @click="showModal = false">
                  {{ usingLang.cancel }}
                </button>
                <button class="modal-default-button" @click="importar()">
                  {{ usingLang.importar }}
                </button>
              </slot>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <transition name="modal2" v-if="showModalSalvar">
      <div class="modal2-mask">
        <div class="modal2-wrapper">
          <div class="modal2-container">
            <div class="modal2-header">
              <h3 name="header">{{ usingLang.baixar }}</h3>
            </div>

            <div class="modal2-body">
              <button class="modal2-button-png" @click="pngSalvar(), (showModalSalvar = false)">
                {{ usingLang.imagem_PNG }}
              </button>

              <button class="modal2-button-svg" @click="svgExportar(), (showModalSalvar = false)">
                {{ usingLang.imagem_SVG }}
              </button>

              <button class="modal2-button-xml" @click="exportarXml(), (showModalSalvar = false)">
                {{ usingLang.xml }}
              </button>

              <!-- <button class="modal2-button-json" @click="exportarJson(), (showModalSalvar = false)">
                {{ usingLang.json }}
              </button> -->
            </div>

            <div class="modal2-footer">
              <slot name="footer">
                <button class="modal2-default-button cancel" @click="showModalSalvar = false">
                  {{ usingLang.cancel }}
                </button>
              </slot>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <transition name="modal3" v-if="showModalPropriedades">
      <div class="modal3-mask">
        <div class="modal3-wrapper">
          <div class="modal3-container">
            <div class="modal3-header">
              <h3 name="header">{{ usingLang.propriedades }} </h3>
            </div>

            <div class="modal3-body">
              <pre><code> {{ this.XMLTree(this.mostarPropriedades, "  ") }}</code></pre>
            </div>

            <div class="modal3-footer">
              <slot name="footer">
                <button class="modal3-default-button cancel" @click="showModalPropriedades = false">
                  {{ usingLang.sair }}
                </button>
                <button @click="copy()">📎</button>
              </slot>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <transition name="modal3" v-if="showModalRelatorio">
      <div class="modal3-mask">
        <div class="modal3-wrapper">
          <div class="modal3-container">
            <div class="modal3-header">
              <h3 name="header">{{ this.usingLang.estatisticas }}</h3>
            </div>

            <div class="modal3-body">
              <ul style="
                  display: flex;
                  flex-direction: column;
                  gap: 10px;
                  padding: 20px;
                ">
                <li :key="index" v-for="(value, index) in relatorio">
                  {{ value.nome }}: {{ value.total }}
                </li>
              </ul>
            </div>

            <div class="modal3-footer">
              <slot name="footer">
                <button class="modal3-default-button cancel" @click="showModalRelatorio = false">
                  {{ usingLang.sair }}
                </button>

                <button class="modal3-default-button pdf" @click="printRelatorio">
                  PDF
                </button>
              </slot>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Superinfo from "../components/Superinfo"

import mxgraph from "mxgraph";
import graphConfig from "../configs/mxGraph/graphConfig";
import { jsPDF } from "jspdf";

import { saveAs } from "file-saver";
import { saveSvgAsPng } from "save-svg-as-png";
import convert from "xml-js";
import { services } from "../services";

import language from "../helpers/language";
import ssn from "../helpers/ssn";

import logo from "../assets/logo.png"

let editor;
import "../assets/css/modal.css";

function occurrences(string, subString, allowOverlapping) {
  string += "";
  subString += "";
  if (subString.length <= 0) return string.length + 1;

  var n = 0,
    pos = 0,
    step = allowOverlapping ? 1 : subString.length;

  while (true) {
    pos = string.indexOf(subString, pos);
    if (pos >= 0) {
      ++n;
      pos += step;
    } else break;
  }
  return n;
}

export default {
  name: "Editor",
  components: { Superinfo },
  data() {
    return {
      mostarPropriedades: "",
      showModalPropriedades: false,
      showModalRelatorio: false,
      showModalSalvar: false,
      showModalRegister: false,
      showModal: false,
      showModalLogin: false,
      usingLang: {},
      currentCell: null,
      relatorio: null,
      logado: false,
      codigo_usuario: null,
      isUpdate: false,
      navIsOpen: true,
      toolsIsOpen: true,
      input: {
        username: "",
        password: ""
      },
      modelo: {
        titulo: "",
        descricao: "",
        criador: {
          codigo: ""
        }
      }
    };
  },

  methods: {
    login(e) {
      e.preventDefault();
      if (this.input.username != "" && this.input.password != "") {
        services.user
          .login(this.input.username, this.input.password)
          .then((res) => {
            this.token = res.data.access_token;
            this.nome = res.data.nome_completo;
            this.codigo_usuario = res.data.codigo_usuario;

            this.logado = true;

            localStorage.setItem("token", res.data.access_token);
            localStorage.setItem("nome", res.data.nome_completo);
            localStorage.setItem("codigo_usuario", res.data.codigo_usuario);

            this.showModalLogin = false;

            this.$toast.success("Seja bem vindo, " + res.data.nome_completo);
          })
          .catch((error) => {
            this.$toast.error(error.response.data.error_description || "Ocorreu um erro desconhecido");
          });

      } else {
        this.$toast.error("Preencha todos os campos");
      }
    },

    logout() {

      this.token = null;
      this.logado = false;
      this.nome = null;

      localStorage.removeItem("nome");
      localStorage.removeItem("token");
      localStorage.removeItem("codigo_usuario");

      this.$router.push("/");
      document.location.reload(true);
    },

    async salvarOnline(e) {
      e.preventDefault();
      try {
        if (this.modelo.titulo && this.modelo.descricao) {

          var fileXML = new Blob([this.getXML()], { type: "text/xml" });
          var fileSVG = new Blob([this.getSVG()], { type: "image/svg+xml" });

          var formData = new FormData();

          formData.append("modelo", fileXML);
          formData.append("descricao", this.modelo.descricao);
          formData.append("titulo", this.modelo.titulo);
          formData.append("preview", fileSVG);

          services.models
            .post(formData)
            .then(({ data: modelo }) => {
              this.showModalRegister = false;
              window.location.replace(this.usingLang.routes.editor + "/" + modelo.codigo)
              this.$toast.success("Modelo salvo com sucesso");

            })
            .catch(() => {
              this.showModalRegister = false;
              this.$toast.error("Não foi possível salvar o modelo");
            });
        } else {
          this.$toast.error("Preencha todos os campos");
        }
      } catch (error) {
        this.showModalRegister = false;
        this.$toast.error("Não foi possível salvar o modelo");
      }

    },

    async atualizarOnline(e) {
      e.preventDefault();
      try {
        if (this.modelo.titulo && this.modelo.descricao) {

          var fileXML = new Blob([this.getXML()], { type: "text/xml" });
          var fileSVG = new Blob([this.getSVG()], { type: "image/svg+xml" });

          var formData = new FormData();

          formData.append("modelo", fileXML);
          formData.append("descricao", this.modelo.descricao);
          formData.append("titulo", this.modelo.titulo);
          formData.append("preview", fileSVG);

          services.models
            .put(this.$route.params.id, formData)
            .then(() => {
              this.showModalRegister = false;

              this.$toast.success("Modelo atualizado com sucesso");

            })
            .catch(() => {
              this.showModalRegister = false;
              this.$toast.error("Não foi possível atualizar o modelo");
            });
        } else {
          this.$toast.error("Preencha todos os campos");
        }
      } catch (error) {
        this.showModalRegister = false;
        this.$toast.error("Não foi possível salvar o modelo");
      }

    }
    ,

    togleNav() {

      document.getElementById("sidebar").classList.toggle("colapse")

      this.navIsOpen = !this.navIsOpen;
    },

    togleTool() {

      document.getElementById("tool").classList.toggle("colapse")

      this.toolsIsOpen = !this.toolsIsOpen;
    },

    XMLTree(xmlString, indent) {
      indent = indent || "\t"; //can be specified by second argument of the function

      var tabs = "";  //store the current indentation

      var result = xmlString.replace(
        /\s*<[^>\/]*>[^<>]*<\/[^>]*>|\s*<.+?>|\s*[^<]+/g, //pattern to match nodes (angled brackets or text)
        function (m, i) {
          m = m.replace(/^\s+|\s+$/g, "");  //trim the match just in case

          if (i < 38)
            if (/^<[?]xml/.test(m)) return m + "\n";  //if the match is a header, ignore it

          if (/^<[/]/.test(m))  //if the match is a closing tag
          {
            tabs = tabs.replace(indent, "");  //remove one indent from the store
            m = tabs + m;  //add the tabs at the beginning of the match
          }
          else if (/<.*>.*<\/.*>|<.*[^>]\/>/.test(m))  //if the match contains an entire node
          {
            //leave the store as is or
            m = m.replace(/(<[^\/>]*)><[\/][^>]*>/g, "$1 />");  //join opening with closing tags of the same node to one entire node if no content is between them
            m = tabs + m; //add the tabs at the beginning of the match
          }
          else if (/<.*>/.test(m)) //if the match starts with an opening tag and does not contain an entire node
          {
            m = tabs + m;  //add the tabs at the beginning of the match
            tabs += indent;  //and add one indent to the store
          }
          else  //if the match contain a text node
          {
            m = tabs + m;  // add the tabs at the beginning of the match
          }

          //return m+"\n";
          return "\n" + m; //content has additional space(match) from header
        }//anonymous function
      );//replace

      return result;
    },

    openUpdate() {

      this.showModalRegister = true;
      this.isUpdate = true
    },

    // altera o selecionado em um painel separado
    // e transfere o objeto para o ambiente VUE
    selectionChanged() {
      let cell = editor.graph.getSelectionCell();
      this.$set(this, "currentCell", cell);
    },

    //sidebar icon XOU
    addSidebarIconXou: function (graph, sidebar, prototype) {
      let funct = function (graph, evt) {
        graph.stopEditing(false);

        let pt = graph.getPointForEvent(evt);

        let parent = graph.getDefaultParent();
        let model = graph.getModel();

        let v1 = model.cloneCell(prototype);

        // Sets a background image and restricts child movement to its bounds
        //graph.setBackgroundImage(new mxImage('images/gradient_background.jpg', 360, 200));

        model.beginUpdate();

        try {
          v1.geometry.x = pt.x;
          v1.geometry.y = pt.y;
          //v1.style = editor.graph.stylesheet.getDefaultEdgeStyle();

          v1.geometry.alternateBounds = new mxRectangle(
            0,
            0,
            v1.geometry.width,
            v1.geometry.height,
            ""
          );

          graph.addCell(v1, parent);
        } finally {
          model.endUpdate();
        }
      };
      //Cria a imagem que serve de ícone da barra lateral (fonte de arrastar) - texto
      let xou = document.createElement("div");
      xou.classList.add("ssnObjeto");

      xou.innerHTML = ssn.xor();

      xou.title = "XOU";
      sidebar.appendChild(xou);
      // Creates the image which is used as the drag icon (preview)
      let dragXou = xou.cloneNode(true);
      mxUtils.makeDraggable(xou, graph, funct, dragXou);
    },

    //sidebar icon OU
    addSidebarIconOu: function (graph, sidebar, prototype) {
      let funct = function (graph, evt) {
        graph.stopEditing(false);

        let pt = graph.getPointForEvent(evt);

        let parent = graph.getDefaultParent();
        let model = graph.getModel();

        let v1 = model.cloneCell(prototype);

        // Sets a background image and restricts child movement to its bounds
        //graph.setBackgroundImage(new mxImage('images/gradient_background.jpg', 360, 200));

        model.beginUpdate();

        try {
          v1.geometry.x = pt.x;
          v1.geometry.y = pt.y;
          //v1.style = editor.graph.stylesheet.getDefaultEdgeStyle();

          v1.geometry.alternateBounds = new mxRectangle(
            0,
            0,
            v1.geometry.width,
            v1.geometry.height,
            ""
          );

          graph.addCell(v1, parent);
        } finally {
          model.endUpdate();
        }
      };
      //Cria a imagem que serve de ícone da barra lateral (fonte de arrastar) - texto
      let ou = document.createElement("div");
      ou.classList.add("ssnObjeto");

      ou.innerHTML = ssn.or(this.usingLang.or);
      ou.title = this.usingLang.or;

      sidebar.appendChild(ou);
      // Creates the image which is used as the drag icon (preview)
      let dragOu = ou.cloneNode(true);
      mxUtils.makeDraggable(ou, graph, funct, dragOu);
    },

    //sidebar icon relacao
    addSidebarIconRealacao: function (graph, sidebar, prototype) {
      let funct = function (graph, evt) {
        graph.stopEditing(false);

        let pt = graph.getPointForEvent(evt);

        let parent = graph.getDefaultParent();
        let model = graph.getModel();

        let v1 = model.cloneCell(prototype);

        // Sets a background image and restricts child movement to its bounds
        //graph.setBackgroundImage(new mxImage('images/gradient_background.jpg', 360, 200));

        model.beginUpdate();

        try {
          v1.geometry.x = pt.x;
          v1.geometry.y = pt.y;
          //v1.style = editor.graph.stylesheet.getDefaultEdgeStyle();

          v1.geometry.alternateBounds = new mxRectangle(
            0,
            0,
            v1.geometry.width,
            v1.geometry.height,
            ""
          );

          graph.addCell(v1, parent);
        } finally {
          model.endUpdate();
        }
      };

      //Cria a imagem que serve de ícone da barra lateral (fonte de arrastar) - relaçao comercial
      let relacao = document.createElement("div");

      relacao.classList.add("ssnObjeto");

      relacao.innerHTML = ssn.business_relationship();

      relacao.title = ssn.business_relationship();
      sidebar.appendChild(relacao);

      // Creates the image which is used as the drag icon (preview)
      let dragRelacao = relacao.cloneNode(true);
      mxUtils.makeDraggable(relacao, graph, funct, dragRelacao);
    },

    //sidebar icon agregador
    addSidebarIconAgregador: function (graph, sidebar, prototype) {
      let funct = function (graph, evt) {
        graph.stopEditing(false);

        let pt = graph.getPointForEvent(evt);

        let parent = graph.getDefaultParent();
        let model = graph.getModel();

        let v1 = model.cloneCell(prototype);

        // Sets a background image and restricts child movement to its bounds
        //graph.setBackgroundImage(new mxImage('images/gradient_background.jpg', 360, 200));

        model.beginUpdate();

        try {
          v1.geometry.x = pt.x;
          v1.geometry.y = pt.y;
          //v1.style = editor.graph.stylesheet.getDefaultEdgeStyle();

          v1.geometry.alternateBounds = new mxRectangle(
            0,
            0,
            v1.geometry.width,
            v1.geometry.height,
            ""
          );

          graph.addCell(v1, parent);
        } finally {
          model.endUpdate();
        }
      };
      //Cria a imagem que serve de ícone da barra lateral (fonte de arrastar) - agregador
      let agregador = document.createElement("div");
      agregador.classList.add("ssnObjeto");
      agregador.innerHTML = ssn.aggregator(this.usingLang.aggregator);

      agregador.title = this.usingLang.aggregator;

      sidebar.appendChild(agregador);

      // Creates the image which is used as the drag icon (preview)
      let dragAgregador = agregador.cloneNode(true);
      mxUtils.makeDraggable(agregador, graph, funct, dragAgregador);
    },

    //sidebar icon cliente do cliente
    addSidebarIconClienteDoCliente: function (graph, sidebar, prototype) {
      let funct = function (graph, evt) {
        graph.stopEditing(false);

        let pt = graph.getPointForEvent(evt);

        let parent = graph.getDefaultParent();
        let model = graph.getModel();

        let v1 = model.cloneCell(prototype);

        model.beginUpdate();

        try {
          v1.geometry.x = pt.x;
          v1.geometry.y = pt.y;
          //v1.style = editor.graph.stylesheet.getDefaultEdgeStyle();

          v1.geometry.alternateBounds = new mxRectangle(
            0,
            0,
            v1.geometry.width,
            v1.geometry.height,
            ""
          );

          graph.addCell(v1, parent);
        } finally {
          model.endUpdate();
        }
      };

      //Cria a imagem que serve de ícone da barra lateral (fonte de arrastar) - Cliente do cliente
      let clienteDoCliente = document.createElement("div");
      clienteDoCliente.classList.add("ssnObjeto");
      clienteDoCliente.innerHTML = ssn.customers(
        this.usingLang.customer_customer
      );

      clienteDoCliente.title = this.usingLang.customer_customer;
      sidebar.appendChild(clienteDoCliente);

      // Creates the image which is used as the drag icon (preview)
      let dragClienteDoCliente = clienteDoCliente.cloneNode(true);
      mxUtils.makeDraggable(
        clienteDoCliente,
        graph,
        funct,
        dragClienteDoCliente
      );
    },

    //sidebar icon intermediario
    addSidebarIconIntermediario: function (graph, sidebar, prototype) {
      let funct = function (graph, evt) {
        graph.stopEditing(false);

        let pt = graph.getPointForEvent(evt);

        let parent = graph.getDefaultParent();
        let model = graph.getModel();

        let v1 = model.cloneCell(prototype);

        model.beginUpdate();

        try {
          v1.geometry.x = pt.x;
          v1.geometry.y = pt.y;
          //v1.style = editor.graph.stylesheet.getDefaultEdgeStyle();

          v1.geometry.alternateBounds = new mxRectangle(
            0,
            0,
            v1.geometry.width,
            v1.geometry.height,
            ""
          );

          graph.addCell(v1, parent);
        } finally {
          model.endUpdate();
        }
      };

      //Cria a imagem que serve de ícone da barra lateral (fonte de arrastar) - intermediario
      let intermediario = document.createElement("div");
      intermediario.classList.add("ssnObjeto");

      intermediario.innerHTML = ssn.intermediary(this.usingLang.intermediary);

      intermediario.title = this.usingLang.intermediary;

      sidebar.appendChild(intermediario);

      // Creates the image which is used as the drag icon (preview)
      let dragIntermediario = intermediario.cloneNode(true);
      mxUtils.makeDraggable(intermediario, graph, funct, dragIntermediario);
    },

    //sidebar icon cliente
    addSidebarIconCliente: function (graph, sidebar, prototype) {
      let funct = function (graph, evt) {
        graph.stopEditing(false);

        let pt = graph.getPointForEvent(evt);

        let parent = graph.getDefaultParent();
        let model = graph.getModel();

        let v1 = model.cloneCell(prototype);

        model.beginUpdate();

        try {
          v1.geometry.x = pt.x;
          v1.geometry.y = pt.y;
          //v1.style = editor.graph.stylesheet.getDefaultEdgeStyle();

          v1.geometry.alternateBounds = new mxRectangle(
            0,
            0,
            v1.geometry.width,
            v1.geometry.height,
            ""
          );

          graph.addCell(v1, parent);
        } finally {
          model.endUpdate();
        }
      };

      //  // =================================================================================================================
      //Cria a imagem que serve de ícone da barra lateral (fonte de arrastar) - cliente
      let cliente = document.createElement("div");

      cliente.innerHTML = ssn.customer(this.usingLang.customer);
      cliente.classList.add("ssnObjeto");

      cliente.title = this.usingLang.customer;
      sidebar.appendChild(cliente);

      // Creates the image which is used as the drag icon (preview)
      let dragCliente = cliente.cloneNode(true);
      mxUtils.makeDraggable(cliente, graph, funct, dragCliente);
    },

    //sidebar icon fornecedor
    addSidebarIconFornecedor: function (graph, sidebar, prototype) {
      let funct = function (graph, evt) {
        graph.stopEditing(false);

        let pt = graph.getPointForEvent(evt);

        let parent = graph.getDefaultParent();
        let model = graph.getModel();

        let v1 = model.cloneCell(prototype);

        model.beginUpdate();

        try {
          v1.geometry.x = pt.x;
          v1.geometry.y = pt.y;
          //v1.style = editor.graph.stylesheet.getDefaultEdgeStyle();

          v1.geometry.alternateBounds = new mxRectangle(
            0,
            0,
            v1.geometry.width,
            v1.geometry.height,
            ""
          );

          graph.addCell(v1, parent);
        } finally {
          model.endUpdate();
        }
      };

      // =================================================================================================================
      //Cria a imagem que serve de ícone da barra lateral (fonte de arrastar) - fornecedor
      let fornecedor = document.createElement("div");
      fornecedor.classList.add("ssnObjeto");
      fornecedor.innerHTML = ssn.supplier(this.usingLang.supplier);
      fornecedor.title = this.usingLang.supplier;
      sidebar.appendChild(fornecedor);

      // Creates the image which is used as the drag icon (preview)
      let dragFornecedor = fornecedor.cloneNode(true);
      mxUtils.makeDraggable(fornecedor, graph, funct, dragFornecedor);
    },

    //sidebar icon empresa de interesse
    addSidebarIconEmpresa: function (graph, sidebar, prototype) {
      let funct = function (graph, evt) {
        graph.stopEditing(false);

        let pt = graph.getPointForEvent(evt);

        let parent = graph.getDefaultParent();
        let model = graph.getModel();

        let v1 = model.cloneCell(prototype);

        model.beginUpdate();

        try {
          v1.geometry.x = pt.x;
          v1.geometry.y = pt.y;
          //v1.style = editor.graph.stylesheet.getDefaultEdgeStyle();

          v1.geometry.alternateBounds = new mxRectangle(
            0,
            0,
            v1.geometry.width,
            v1.geometry.height,
            ""
          );

          graph.addCell(v1, parent);
        } finally {
          model.endUpdate();
        }
      };

      // =================================================================================================================
      //Cria a imagem que serve de ícone da barra lateral (fonte de arrastar) - empresa de interesse
      let empresa = document.createElement("div");
      empresa.classList.add("ssnObjeto");

      empresa.innerHTML = ssn.company_of_interest(
        this.usingLang.company_of_interest
      );

      empresa.title = this.usingLang.company_of_interest;
      sidebar.appendChild(empresa);

      // Cria a imagem que é usada como ícone de arrastar (visualização)
      let dragEmpresa = empresa.cloneNode(true);
      mxUtils.makeDraggable(empresa, graph, funct, dragEmpresa);
    },

    addSidebarIconTexto: function (graph, sidebar, prototype) {
      let funct = function (graph, evt) {
        graph.stopEditing(false);

        let pt = graph.getPointForEvent(evt);

        let parent = graph.getDefaultParent();
        let model = graph.getModel();

        let v1 = model.cloneCell(prototype);

        // Sets a background image and restricts child movement to its bounds
        //graph.setBackgroundImage(new mxImage('images/gradient_background.jpg', 360, 200));

        model.beginUpdate();

        try {
          v1.geometry.x = pt.x;
          v1.geometry.y = pt.y;
          //v1.style = editor.graph.stylesheet.getDefaultEdgeStyle();

          v1.geometry.alternateBounds = new mxRectangle(
            0,
            0,
            v1.geometry.width,
            v1.geometry.height,
            ""
          );

          graph.addCell(v1, parent);
        } finally {
          model.endUpdate();
        }
      };

      // =================================================================================================================
      //Cria a imagem que serve de ícone da barra lateral (fonte de arrastar) - texto
      let texto = document.createElement("div");
      texto.classList.add("ssnObjeto");

      texto.style.backgroundColor = "transparent";

      texto.title = "Texto";
      texto.style.fontSize = "30pt";
      texto.innerHTML = '<div id="ssntexto" style="color: #00000;">T</div>';
      sidebar.appendChild(texto);

      // Creates the image which is used as the drag icon (preview)
      let dragTexto = texto.cloneNode(true);
      mxUtils.makeDraggable(texto, graph, funct, dragTexto);
    },

    createGraphXou() {
      // Verifica se o navegador é compatível
      if (!mxClient.isBrowserSupported()) {
        // Exibe uma mensagem de erro se o navegador não for compatível.
        mxUtils.error("Navegador não suportado!", 200, false);
      } else {
        if (mxClient.IS_QUIRKS) {
          document.body.style.overflow = "hidden";
        }

        let object = new mxCell(
          this.usingLang.xor,
          new mxGeometry(0, 0, 40, 40),
          "shape=rhombus;fillColor=black;strokeColor=black;fontColor=white;tipo=xou"
        );

        object.setVertex(true);
        object.setConnectable(false);

        this.addSidebarIconXou(editor.graph, sidebar, object);
      }
    },

    createGraphOu() {
      // Verifica se o navegador é compatível
      if (!mxClient.isBrowserSupported()) {
        // Exibe uma mensagem de erro se o navegador não for compatível.
        mxUtils.error("Navegador não suportado!", 200, false);
      } else {
        if (mxClient.IS_QUIRKS) {
          document.body.style.overflow = "hidden";
        }

        let object = new mxCell(
          this.usingLang.or,
          new mxGeometry(0, 0, 40, 40),
          "shape=rhombus;fillColor=black;strokeColor=black;fontColor=white;tipo=ou"
        );

        object.setVertex(true);
        object.setConnectable(false);

        this.addSidebarIconOu(editor.graph, sidebar, object);
      }
    },

    createGraphRelacao() {
      // Verifica se o navegador é compatível
      if (!mxClient.isBrowserSupported()) {
        // Exibe uma mensagem de erro se o navegador não for compatível.
        mxUtils.error("Navegador não suportado!", 200, false);
      } else {
        if (mxClient.IS_QUIRKS) {
          document.body.style.overflow = "hidden";
        }

        let object = new mxCell(
          "X:Y",
          new mxGeometry(0, 0, 50, 25),
          "shape=singleArrow;fillColor=white;strokeColor=black;fontColor=black;tipo=relacao"
        );

        object.setVertex(true);
        object.setConnectable(false);

        this.addSidebarIconRealacao(editor.graph, sidebar, object);
      }
    },

    createGraphAgregador() {
      // Verifica se o navegador é compatível
      if (!mxClient.isBrowserSupported()) {
        // Exibe uma mensagem de erro se o navegador não for compatível.
        mxUtils.error("Navegador não suportado!", 200, false);
      } else {
        if (mxClient.IS_QUIRKS) {
          document.body.style.overflow = "hidden";
        }

        // Parallelogram shape
        function ParallelogramShape() {
          mxActor.call(this);
        }
        mxUtils.extend(ParallelogramShape, mxActor);
        ParallelogramShape.prototype.size = 0.2;
        ParallelogramShape.prototype.fixedSize = 20;
        ParallelogramShape.prototype.isRoundable = function () {
          return true;
        };
        ParallelogramShape.prototype.redrawPath = function (c, x, y, w, h) {
          var fixed = mxUtils.getValue(this.style, "fixedSize", "0") != "0";

          var dx = fixed
            ? Math.max(
              0,
              Math.min(
                w,
                parseFloat(
                  mxUtils.getValue(this.style, "size", this.fixedSize)
                )
              )
            )
            : w *
            Math.max(
              0,
              Math.min(
                1,
                parseFloat(mxUtils.getValue(this.style, "size", this.size))
              )
            );
          var arcSize =
            mxUtils.getValue(
              this.style,
              mxConstants.STYLE_ARCSIZE,
              mxConstants.LINE_ARCSIZE
            ) / 2;
          this.addPoints(
            c,
            [
              new mxPoint(0, h),
              new mxPoint(dx, 0),
              new mxPoint(w, 0),
              new mxPoint(w - dx, h),
            ],
            this.isRounded,
            arcSize,
            true
          );
          c.end();
        };

        mxCellRenderer.registerShape("parallelogram", ParallelogramShape);

        let object = new mxCell(
          this.usingLang.aggregator,
          new mxGeometry(0, 0, 200, 50),
          "shape=parallelogram;fillColor=red;strokeColor=black;fontColor=black;tipo=agregador"
        );

        object.setVertex(true);
        object.setConnectable(true);

        this.addSidebarIconAgregador(editor.graph, sidebar, object);
      }
    },

    createGraphClienteDoCliente() {
      // Verifica se o navegador é compatível
      if (!mxClient.isBrowserSupported()) {
        // Exibe uma mensagem de erro se o navegador não for compatível.
        mxUtils.error("Navegador não suportado!", 200, false);
      } else {
        if (mxClient.IS_QUIRKS) {
          document.body.style.overflow = "hidden";
        }

        // clientedocliente shape
        function StepShape() {
          mxActor.call(this);
        }

        mxUtils.extend(StepShape, mxActor);
        StepShape.prototype.size = 0.15;
        StepShape.prototype.fixedSize = 20;

        StepShape.prototype.isRoundable = function () {
          return true;
        };
        StepShape.prototype.redrawPath = function (c, x, y, w, h) {
          var fixed = mxUtils.getValue(this.style, "fixedSize", "0") != "0";
          var s = fixed
            ? Math.max(
              0,
              Math.min(
                w,
                parseFloat(
                  mxUtils.getValue(this.style, "size", this.fixedSize)
                )
              )
            )
            : w *
            Math.max(
              0,
              Math.min(
                1,
                parseFloat(mxUtils.getValue(this.style, "size", this.size))
              )
            );
          var arcSize =
            mxUtils.getValue(
              this.style,
              mxConstants.STYLE_ARCSIZE,
              mxConstants.LINE_ARCSIZE
            ) / 2;
          this.addPoints(
            c,
            [
              //correto aproximado
              new mxPoint(0, 0),
              new mxPoint(w - s, 0),
              new mxPoint(w - s, 0),
              new mxPoint(w - s, h),
              new mxPoint(0, h),
              new mxPoint(s, h / 2),
            ],
            this.isRounded,
            arcSize,
            true
          );
          c.end();
        };

        mxCellRenderer.registerShape("step", StepShape);

        let object = new mxCell(
          this.usingLang.customer_customer,
          new mxGeometry(0, 0, 235, 50),
          "shape=step;fillColor=LightGrey;strokeColor=black;fontColor=black;flipH=1;tipo=cliente2"
        );

        object.setVertex(true);
        object.setConnectable(true);

        this.addSidebarIconClienteDoCliente(editor.graph, sidebar, object);
      }
    },

    createGraphFornecedor() {
      // Verifica se o navegador é compatível
      if (!mxClient.isBrowserSupported()) {
        // Exibe uma mensagem de erro se o navegador não for compatível.
        mxUtils.error("Navegador não suportado!", 200, false);
      } else {
        if (mxClient.IS_QUIRKS) {
          document.body.style.overflow = "hidden";
        }

        let object = new mxCell(
          this.usingLang.supplier,
          new mxGeometry(0, 0, 200, 50),
          "shape=singleArrow;fillColor=orange;strokeColor=black;fontColor=black;tipo=fornecedor;"
        );

        object.setVertex(true);
        object.setConnectable(true);

        this.addSidebarIconFornecedor(editor.graph, sidebar, object);
      }
    },

    createGraphIntermediario() {
      // Verifica se o navegador é compatível
      if (!mxClient.isBrowserSupported()) {
        // Exibe uma mensagem de erro se o navegador não for compatível.
        mxUtils.error("Navegador não suportado!", 200, false);
      } else {
        if (mxClient.IS_QUIRKS) {
          document.body.style.overflow = "hidden";
        }

        let object = new mxCell(
          this.usingLang.intermediary,
          new mxGeometry(0, 0, 200, 50),
          "shape=doubleArrow;fillColor=LimeGreen;strokeColor=black;fontColor=black;tipo=intermediario"
        );

        object.setVertex(true);
        object.setConnectable(true);

        this.addSidebarIconIntermediario(editor.graph, sidebar, object);
      }
    },

    createGraphCliente() {
      // Verifica se o navegador é compatível
      if (!mxClient.isBrowserSupported()) {
        // Exibe uma mensagem de erro se o navegador não for compatível.
        mxUtils.error("Navegador não suportado!", 200, false);
      } else {
        if (mxClient.IS_QUIRKS) {
          document.body.style.overflow = "hidden";
        }
        // Arrow
        function SingleArrowShape() {
          mxActor.call(this);
        }
        mxUtils.extend(SingleArrowShape, mxActor);
        SingleArrowShape.prototype.arrowWidth = 1;
        SingleArrowShape.prototype.arrowSize = 0.2;
        SingleArrowShape.prototype.redrawPath = function (c, x, y, w, h) {
          var aw =
            h *
            Math.max(
              0,
              Math.min(
                1,
                parseFloat(
                  mxUtils.getValue(this.style, "arrowWidth", this.arrowWidth)
                )
              )
            );
          var as =
            w *
            Math.max(
              0,
              Math.min(
                1,
                parseFloat(
                  mxUtils.getValue(this.style, "arrowSize", this.arrowSize)
                )
              )
            );
          var at = (h - aw) / 2;
          var ab = at + aw;

          var arcSize =
            mxUtils.getValue(
              this.style,
              mxConstants.STYLE_ARCSIZE,
              mxConstants.LINE_ARCSIZE
            ) / 2;
          this.addPoints(
            c,
            [
              new mxPoint(0, at),
              new mxPoint(w - as, at),
              new mxPoint(w - as, 0),
              new mxPoint(w, h / 2),
              new mxPoint(w - as, h),
              new mxPoint(w - as, ab),
              new mxPoint(0, ab),
            ],
            this.isRounded,
            arcSize,
            true
          );
          c.end();
        };

        mxCellRenderer.registerShape("singleArrow", SingleArrowShape);

        // Arrow
        function DoubleArrowShape() {
          mxActor.call(this);
        }
        mxUtils.extend(DoubleArrowShape, mxActor);
        DoubleArrowShape.prototype.redrawPath = function (c, x, y, w, h) {
          var aw =
            h *
            Math.max(
              0,
              Math.min(
                1,
                parseFloat(
                  mxUtils.getValue(
                    this.style,
                    "arrowWidth",
                    SingleArrowShape.prototype.arrowWidth
                  )
                )
              )
            );
          var as =
            w *
            Math.max(
              0,
              Math.min(
                1,
                parseFloat(
                  mxUtils.getValue(
                    this.style,
                    "arrowSize",
                    SingleArrowShape.prototype.arrowSize
                  )
                )
              )
            );
          var at = (h - aw) / 2;
          var ab = at + aw;

          var arcSize =
            mxUtils.getValue(
              this.style,
              mxConstants.STYLE_ARCSIZE,
              mxConstants.LINE_ARCSIZE
            ) / 2;
          this.addPoints(
            c,
            [
              new mxPoint(0, h / 2),
              new mxPoint(as, 0),
              new mxPoint(as, at),
              new mxPoint(w - as, at),
              new mxPoint(w - as, 0),
              new mxPoint(w, h / 2),

              new mxPoint(w - as, h),
              new mxPoint(w - as, ab),
              new mxPoint(as, ab),
              new mxPoint(as, h),
            ],
            this.isRounded,
            arcSize,
            true
          );
          c.end();
        };

        mxCellRenderer.registerShape("doubleArrow", DoubleArrowShape);

        let object = new mxCell(
          this.usingLang.customer,
          new mxGeometry(0, 0, 200, 50),
          "shape=singleArrow;fillColor=yellow;strokeColor=black;fontColor=black;flipH=1;tipo=cliente1"
        );

        object.setVertex(true);
        object.setConnectable(true);

        this.addSidebarIconCliente(editor.graph, sidebar, object);
      }
    },

    createGraphEmpresa() {
      // Verifica se o navegador é compatível
      if (!mxClient.isBrowserSupported()) {
        // Exibe uma mensagem de erro se o navegador não for compatível.
        mxUtils.error("Navegador não suportado!", 200, false);
      } else {
        mxClient.IS_QUIRKS && (document.body.style.overflow = "hidden");

        const object = new mxCell(
          this.usingLang.company_of_interest,
          new mxGeometry(0, 0, 200, 50),
          "fillColor=blue;strokeColor=black;fontColor=white;tipo=empresa"
        );

        object.setVertex(true);
        object.setConnectable(true);

        this.addSidebarIconEmpresa(editor.graph, sidebar, object);
      }
    },

    createGraphTexto() {
      // Verifica se o navegador é compatível
      if (!mxClient.isBrowserSupported()) {
        // Exibe uma mensagem de erro se o navegador não for compatível.
        mxUtils.error("Navegador não suportado!", 200, false);
      } else {
        if (mxClient.IS_QUIRKS) {
          document.body.style.overflow = "hidden";
        }

        let object = new mxCell(
          "..." + this.usingLang.text,
          new mxGeometry(0, 0, 200, 50),
          "fillColor=transparent;strokeColor=transparent;fontColor=black;tipo=texto"
        );

        object.setVertex(true);
        object.setConnectable(false);

        this.addSidebarIconTexto(editor.graph, sidebar, object);
      }
    },

    // cria e configura o editor
    createGraph() {
      // Verifica se o navegador é compatível
      if (!mxClient.isBrowserSupported()) {
        // Exibe uma mensagem de erro se o navegador não for compatível.
        mxUtils.error("Navegador não suportado!", 200, false);
      } else {
        mxEvent.disableContextMenu(document.body);

        mxConnectionHandler.prototype.connectImage = new mxImage(
          require("../assets/images/editor/connector.gif"),
          15,
          15
        );

        mxConnectionHandler.prototype.selectCells = function (edge) {
          this.graph.setSelectionCell(edge);
        };

        mxConnectionHandler.prototype.getEdgeColor = function (valid) {
          return valid ? mxConstants.VALID_COLOR : mxConstants.INVALID_COLOR;
        };

        mxConnectionHandler.prototype.connectIconOffset = new mxPoint(
          0,
          mxConstants.TOOLTIP_VERTICAL_OFFSET
        );

        // mxConnectionHandler.prototype.outlineConnect = false;

        if (mxClient.IS_QUIRKS) {
          document.body.style.overflow = "hidden";
          new mxDivResizer(container);
        }

        if (typeof mxLanguage != "undefined" && mxLanguage != null) {
          mxClient.language = mxLanguage;
        } else {
          mxClient.language = mxClient.IS_IE
            ? navigator.userLanguage
            : navigator.language;
        }

        if (
          typeof mxDefaultLanguage != "undefined" &&
          mxDefaultLanguage != null
        ) {
          mxClient.defaultLanguage = mxDefaultLanguage;
        } else {
          mxClient.defaultLanguage = "pt-br";
        }

        editor = new mxEditor();
        editor.setGraphContainer(container);

        editor.graph.allowAutoPanning = true;
        editor.graph.timerAutoScroll = true;

        // gerenciamento de conexão global
        editor.graph.setConnectable(true);
        editor.graph.setEnabled(true); // novo
        editor.graph.setTooltips(true); //novo
        editor.graph.setCellsDisconnectable(true);
        editor.graph.setPanning(true);
        editor.graph.setAllowDanglingEdges(false);

        // girar a figura
        mxVertexHandler.prototype.rotationEnabled = true;

        // Habilita guias
        mxGraphHandler.prototype.guidesEnabled = true;

        //mxGraphHandler.style[(mxConstants.CONNECT_HANDLE_FILLCOLOR, "red")];

        // Alt disables guides
        mxGuide.prototype.isEnabledForEvent = function (evt) {
          return !mxEvent.isAltDown(evt);
        };

        // Ativa o encaixe de pontos de referência nos terminais
        mxEdgeHandler.prototype.snapToTerminals = true;

        var keyHandler = new mxDefaultKeyHandler(editor);
        keyHandler.bindAction(46, "delete");

        // Clona a fonte se a nova conexão não tiver destino
        editor.graph.connectionHandler.setCreateTarget(false);

        // altera o selecionado em um painel separado
        editor.graph.getSelectionModel().addListener(mxEvent.CHANGE, () => {
          this.selectionChanged();
        });
        this.selectionChanged();

        editor.graph.connectionHandler.targetConnectImage = true;

        //================================================================================

        editor.graph.centerZoom = true;
        editor.graph.swimlaneNesting = false;
        editor.graph.dropEnabled = true;

        // Adds rotation handle and live preview
        mxVertexHandler.prototype.rotationEnabled = true;
        mxVertexHandler.prototype.manageSizers = true;
        mxVertexHandler.prototype.livePreview = true;
        mxGraphHandler.prototype.maxLivePreview = 16;

        new mxRubberband(editor.graph);
        // Increases default rubberband opacity (default is 20)
        mxRubberband.prototype.defaultOpacity = 30;

        // Enables connections along the outline, virtual waypoints, parent highlight etc
        mxConnectionHandler.prototype.outlineConnect = true;
        mxCellHighlight.prototype.keepOnTop = true;
        mxVertexHandler.prototype.parentHighlightEnabled = true;

        mxEdgeHandler.prototype.parentHighlightEnabled = true;
        mxEdgeHandler.prototype.dblClickRemoveEnabled = true;
        mxEdgeHandler.prototype.straightRemoveEnabled = true;
        mxEdgeHandler.prototype.virtualBendsEnabled = true;
        mxEdgeHandler.prototype.mergeRemoveEnabled = true;
        mxEdgeHandler.prototype.manageLabelHandle = true;
        mxEdgeHandler.prototype.outlineConnect = true;

        //================================================================================ novo

        //================================================================================

        // gráfico editável
        editor.graph.isCellEditable = function () {
          return true;
        };

        editor.graph.setHtmlLabels(true);

        // Retorna a propriedade do nome do objeto de usuário para o rótulo
        editor.graph.convertValueToString = function (cell) {
          if (cell.value != null && cell.value.name != null) {
            return cell.value.name;
          }
          return mxGraph.prototype.convertValueToString.apply(this, arguments); // "supercall"
        };

        // DEFINE O FORMATO DA LINHA DA LIGAÇÃO
        function LinkShape() {
          mxArrow.call(this);
        }
        // Use mxUtils.extend
        mxUtils.extend(LinkShape, mxArrow);
        LinkShape.prototype.paintEdgeShape = function (c, pts) {
          var width = 2;

          // Base vector (between end points)
          var p0 = pts[0];
          var pe = pts[pts.length - 1];

          var dx = pe.x - p0.x;
          var dy = pe.y - p0.y;
          var dist = Math.sqrt(dx * dx + dy * dy);
          var length = dist;

          // Computes the norm and the inverse norm
          var nx = dx / dist;
          var ny = dy / dist;
          var basex = length * nx;
          var basey = length * ny;
          var floorx = (width * ny) / 3;
          var floory = (-width * nx) / 3;

          // Computes points
          var p0x = p0.x - floorx / 2;
          var p0y = p0.y - floory / 2;
          var p1x = p0x + floorx;
          var p1y = p0y + floory;
          var p2x = p1x + basex;
          var p2y = p1y + basey;
          var p3x = p2x + floorx;
          var p3y = p2y + floory;
          // p4 not necessary
          var p5x = p3x - 3 * floorx;
          var p5y = p3y - 3 * floory;

          c.begin();
          c.moveTo(p1x, p1y);
          c.lineTo(p2x, p2y);
          c.moveTo(p5x + floorx, p5y + floory);
          c.stroke();
        };

        mxCellRenderer.registerShape("link", LinkShape);

        //estilo do grafico
        var style = editor.graph.getStylesheet().getDefaultVertexStyle();
        style["fillColor"] = "#FFFFFF";
        style["strokeColor"] = "#000000";
        style["fontColor"] = "#000000";
        style["fontStyle"] = "1";
        style["fontSize"] = "15";

        // estilo da conexão
        style = editor.graph.getStylesheet().getDefaultEdgeStyle();
        style["shape"] = "link";
        style["strokeColor"] = "#000000";
        style["fontColor"] = "#000000";
        style["fontStyle"] = "0";
        style["startSize"] = "1";
        style["endSize"] = "1";
        style[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
        style[mxConstants.STYLE_PERIMETER_SPACING] = 1;

        style[mxConstants.STYLE_EDGE] = mxConstants.CONNECT_HANDLE_FILLCOLOR =
          "#00FF00";
        style[mxConstants.STYLE_EDGE] = mxConstants.HANDLE_FILLCOLOR =
          "#00FF00";
      }
    },

    // =================================================================================================================================

    imprimir() {
      var preview = new mxPrintPreview(editor.graph);
      preview.print();
    },

    zoomMais() {
      editor.graph.zoomIn();
    },

    zoomMenos() {
      editor.graph.zoomOut();
    },

    zommAtual() {
      editor.graph.zoomActual();
    },

    apagar() {
      if (editor.graph.isEnabled()) editor.graph.removeCells();
    },

    recortar() {
      if (editor.graph.isEnabled()) {
        mxClipboard.cut(editor.graph);
      }
    },

    copiar() {
      if (editor.graph.isEnabled()) {
        mxClipboard.copy(editor.graph);
      }
    },

    colar() {
      if (editor.graph.isEnabled()) {
        mxClipboard.paste(editor.graph);
      }
    },

    desfazer() {
      if (editor.graph.isEnabled()) {
        editor.undo();
      }
    },

    refazer() {
      if (editor.graph.isEnabled()) {
        editor.redo();
      }
    },

    selecionarTudo() {
      if (editor.graph.isEnabled()) {
        editor.graph.selectAll();
      }
    },

    agrupar() {
      if (editor.graph.isEnabled()) {
        editor.graph.setSelectionCell(editor.groupCells());
      }
    },

    desagrupar() {
      if (editor.graph.isEnabled()) {
        editor.graph.setSelectionCells(editor.graph.ungroupCells());
      }
    },

    praTras() {
      if (editor.graph.isEnabled()) {
        editor.graph.orderCells(true);
      }
    },

    praFrente() {
      if (editor.graph.isEnabled());
      {
        editor.graph.orderCells(false);
      }
    },

    none() {
      if (editor.graph.isEnabled()) {
        editor.graph.clearSelection();
      }
    },

    gerarRelario() {
      var enc = new mxCodec(mxUtils.createXmlDocument());
      var node = enc.encode(editor.graph.getModel());
      var xmlString = mxUtils.getXml(node);

      const tipos = [
        {
          nome: this.usingLang.company_of_interest,
          total: occurrences(xmlString, "tipo=empresa").toString(),
        },
        {
          nome: this.usingLang.supplier,
          total: occurrences(xmlString, "tipo=fornecedor").toString(),
        },
        {
          nome: this.usingLang.customer,
          total: occurrences(xmlString, "tipo=cliente1").toString(),
        },
        {
          nome: this.usingLang.customer_customer,
          total: occurrences(xmlString, "tipo=cliente2").toString(),
        },
        {
          nome: this.usingLang.intermediary,
          total: occurrences(xmlString, "tipo=intermediario").toString(),
        },
        {
          nome: this.usingLang.aggregator,
          total: occurrences(xmlString, "tipo=agregador").toString(),
        },
      ];

      this.relatorio = [
        ...tipos,
        {
          nome: this.usingLang.relacionamentos,
          total: occurrences(xmlString, `edge="1"`).toString(),
        },
        {
          nome: this.usingLang.total || "Total",

          total: tipos.reduce((total, obj) => total + Number(obj.total), 0).toString(),
        },
      ];
    },

    propriedades() {
      var enc = new mxCodec(mxUtils.createXmlDocument());
      var node = enc.encode(editor.graph.getModel());
      var node2 = mxUtils.getXml(node);
      this.mostarPropriedades = node2;
    },

    selecionarRelacoes() {
      if (editor.graph.isEnabled()) {
        let contador = editor.graph.selectEdges();
        console.log(contador);
      }
    },

    // metodo do importar
    importar(xml = null) {
      console.log(xml)
      if (xml) {

        var xmlDoc = mxUtils.parseXml(xml);

        var node = xmlDoc.documentElement;
        var dec = new mxCodec(node.ownerDocument);
        dec.decode(node, editor.graph.getModel());
      } else {
        const input = document.querySelector('input[type="file"]');
        const file = input.files[0];
        var textType = /text.*/;

        if (file.type.match(textType)) {
          var reader = new FileReader();

          reader.onload = function (e) {
            var xmlDoc = mxUtils.parseXml(reader.result);

            var node = xmlDoc.documentElement;
            var dec = new mxCodec(node.ownerDocument);
            dec.decode(node, editor.graph.getModel());
          };

          reader.readAsText(file);
        } else {
          xmlFileInfo.innerText = "File not supported!";
        }
        this.showModal = false;
      }
    },

    exportarXml() {
      var enc = new mxCodec(mxUtils.createXmlDocument());
      var node = enc.encode(editor.graph.getModel());
      var node2 = mxUtils.getXml(node);

      var filename = "Diagrama.xml";
      var blob = new Blob([node2], { type: "text/xml" });
      saveAs(blob, filename);
    },

    // depreciated
    exportarJson() {
      var enc = new mxCodec(mxUtils.createXmlDocument());
      var node = enc.encode(editor.graph.getModel());
      var node2 = mxUtils.getXml(node);

      var result1 = convert.xml2json(node2, { compact: true, spaces: 4 });

      var filename = "Diagrama.json";
      var blob = new Blob([result1], { type: "text/json" });
      saveAs(blob, filename);
    },

    svgExportar() {
      var graph = editor.graph;
      var background = "#ffffff";
      var scale = 1;
      var border = 0;

      var imgExport = new mxImageExport();
      var bounds = graph.getGraphBounds();
      var vs = graph.view.scale;

      // Prepares SVG document that holds the output
      var svgDoc = mxUtils.createXmlDocument();
      var root =
        svgDoc.createElementNS != null
          ? svgDoc.createElementNS(mxConstants.NS_SVG, "svg")
          : svgDoc.createElement("svg");

      if (background != null) {
        if (root.style != null) {
          root.style.backgroundColor = background;
        } else {
          root.setAttribute("style", "background-color:" + background);
        }
      }

      if (svgDoc.createElementNS == null) {
        root.setAttribute("xmlns", mxConstants.NS_SVG);
        root.setAttribute("xmlns:xlink", mxConstants.NS_XLINK);
      } else {
        // KNOWN: Ignored in IE9-11, adds namespace for each image element instead. No workaround.
        root.setAttributeNS(
          "http://www.w3.org/2000/xmlns/",
          "xmlns:xlink",
          mxConstants.NS_XLINK
        );
      }

      root.setAttribute(
        "width",
        Math.ceil((bounds.width * scale) / vs) + 2 * border + "px"
      );
      root.setAttribute(
        "height",
        Math.ceil((bounds.height * scale) / vs) + 2 * border + "px"
      );
      root.setAttribute("version", "1.1");

      // Adds group for anti-aliasing via transform
      var group =
        svgDoc.createElementNS != null
          ? svgDoc.createElementNS(mxConstants.NS_SVG, "g")
          : svgDoc.createElement("g");
      group.setAttribute("transform", "translate(0.5,0.5)");
      root.appendChild(group);
      svgDoc.appendChild(root);

      // Renders graph. Offset will be multiplied with state's scale when painting state.
      var svgCanvas = new mxSvgCanvas2D(group);
      svgCanvas.translate(
        Math.floor((border / scale - bounds.x) / vs),
        Math.floor((border / scale - bounds.y) / vs)
      );
      svgCanvas.scale(scale / vs);

      // Displayed if a viewer does not support foreignObjects (which is needed to HTML output)
      svgCanvas.foAltText = "[Not supported by viewer]";

      imgExport.drawState(
        graph.getView().getState(graph.model.root),
        svgCanvas
      );

      var grupos = root.getElementsByTagName("g")[0];
      var g = grupos.getElementsByTagName("g");
      var arr = [...g];

      arr.forEach((g) => {
        var s = g.getElementsByTagName("switch")[0];
        var elemento = document.createElement("text");
        elemento = s.getElementsByTagName("text")[0];
        var texto =
          s.getElementsByTagName("foreignObject")[0].lastElementChild.innerText;
        elemento.innerText = texto;
        elemento.innerHTML = texto;

        s.remove();
        g.appendChild(elemento);
      });

      var xml = mxUtils.getXml(root);
      var filename = "Diagrama.svg";
      var blob = new Blob([xml], { type: "image/svg+xml" });
      saveAs(blob, filename);
    },

    show() {
      mxUtils.show(editor.graph, null, 100, 100);
    },

    pngSalvar() {
      var graph = editor.graph;
      var background = "";
      var scale = 1;
      var border = 0;

      var imgExport = new mxImageExport();
      var bounds = graph.getGraphBounds();
      var vs = graph.view.scale;

      // Prepares SVG document that holds the output
      var svgDoc = mxUtils.createXmlDocument();
      var root =
        svgDoc.createElementNS != null
          ? svgDoc.createElementNS(mxConstants.NS_SVG, "svg")
          : svgDoc.createElement("svg");

      if (background != null) {
        if (root.style != null) {
          root.style.backgroundColor = background;
        } else {
          root.setAttribute("style", "background-color:" + background);
        }
      }

      if (svgDoc.createElementNS == null) {
        root.setAttribute("xmlns", mxConstants.NS_SVG);
        root.setAttribute("xmlns:xlink", mxConstants.NS_XLINK);
      } else {
        // KNOWN: Ignored in IE9-11, adds namespace for each image element instead. No workaround.
        root.setAttributeNS(
          "http://www.w3.org/2000/xmlns/",
          "xmlns:xlink",
          mxConstants.NS_XLINK
        );
      }

      root.setAttribute(
        "width",
        Math.ceil((bounds.width * scale) / vs) + 2 * border + "px"
      );
      root.setAttribute(
        "height",
        Math.ceil((bounds.height * scale) / vs) + 2 * border + "px"
      );
      root.setAttribute("version", "1.1");

      // Adds group for anti-aliasing via transform
      var group =
        svgDoc.createElementNS != null
          ? svgDoc.createElementNS(mxConstants.NS_SVG, "g")
          : svgDoc.createElement("g");
      group.setAttribute("transform", "translate(0.5,0.5)");
      root.appendChild(group);
      svgDoc.appendChild(root);

      // Renders graph. Offset will be multiplied with state's scale when painting state.
      var svgCanvas = new mxSvgCanvas2D(group);
      svgCanvas.translate(
        Math.floor((border / scale - bounds.x) / vs),
        Math.floor((border / scale - bounds.y) / vs)
      );
      svgCanvas.scale(scale / vs);

      // Displayed if a viewer does not support foreignObjects (which is needed to HTML output)
      svgCanvas.foAltText = "[Not supported by viewer]";

      imgExport.drawState(
        graph.getView().getState(graph.model.root),
        svgCanvas
      );

      var grupos = root.getElementsByTagName("g")[0];
      var g = grupos.getElementsByTagName("g");
      var arr = [...g];

      arr.forEach((g) => {
        var s = g.getElementsByTagName("switch")[0];
        var elemento = document.createElement("text");
        elemento = s.getElementsByTagName("text")[0];
        var texto =
          s.getElementsByTagName("foreignObject")[0].lastElementChild.innerText;
        elemento.innerText = texto;
        elemento.innerHTML = texto;

        s.remove();
        g.appendChild(elemento);
      });

      saveSvgAsPng(root, "Diagrama.png");
    },

    jpegSalvar() {
      var graph = editor.graph;
      var background = "#ffffff";
      var scale = 1;
      var border = 0;

      var imgExport = new mxImageExport();
      var bounds = graph.getGraphBounds();
      var vs = graph.view.scale;

      // Prepares SVG document that holds the output
      var svgDoc = mxUtils.createXmlDocument();
      var root =
        svgDoc.createElementNS != null
          ? svgDoc.createElementNS(mxConstants.NS_SVG, "svg")
          : svgDoc.createElement("svg");

      if (background != null) {
        if (root.style != null) {
          root.style.backgroundColor = background;
        } else {
          root.setAttribute("style", "background-color:" + background);
        }
      }

      if (svgDoc.createElementNS == null) {
        root.setAttribute("xmlns", mxConstants.NS_SVG);
        root.setAttribute("xmlns:xlink", mxConstants.NS_XLINK);
      } else {
        // KNOWN: Ignored in IE9-11, adds namespace for each image element instead. No workaround.
        root.setAttributeNS(
          "http://www.w3.org/2000/xmlns/",
          "xmlns:xlink",
          mxConstants.NS_XLINK
        );
      }

      root.setAttribute(
        "width",
        Math.ceil((bounds.width * scale) / vs) + 2 * border + "px"
      );
      root.setAttribute(
        "height",
        Math.ceil((bounds.height * scale) / vs) + 2 * border + "px"
      );
      root.setAttribute("version", "1.1");

      // Adds group for anti-aliasing via transform
      var group =
        svgDoc.createElementNS != null
          ? svgDoc.createElementNS(mxConstants.NS_SVG, "g")
          : svgDoc.createElement("g");
      group.setAttribute("transform", "translate(0.5,0.5)");
      root.appendChild(group);
      svgDoc.appendChild(root);

      // Renders graph. Offset will be multiplied with state's scale when painting state.
      var svgCanvas = new mxSvgCanvas2D(group);
      svgCanvas.translate(
        Math.floor((border / scale - bounds.x) / vs),
        Math.floor((border / scale - bounds.y) / vs)
      );
      svgCanvas.scale(scale / vs);

      // Displayed if a viewer does not support foreignObjects (which is needed to HTML output)
      svgCanvas.foAltText = "[Not supported by viewer]";

      imgExport.drawState(
        graph.getView().getState(graph.model.root),
        svgCanvas
      );

      var grupos = root.getElementsByTagName("g")[0];

      var g = grupos.getElementsByTagName("g");

      var arr = [...g];

      arr.forEach((g) => {
        var s = g.getElementsByTagName("switch")[0];

        var elemento = document.createElement("text");

        elemento = s.getElementsByTagName("text")[0];

        var texto =
          s.getElementsByTagName("foreignObject")[0].lastElementChild.innerText;

        elemento.innerText = texto;
        elemento.innerHTML = texto;

        s.remove();

        g.appendChild(elemento);
      });

      saveSvgAsPng(root, "Diagrama.png");
    },

    negrito() {
      if (editor.graph.isEnabled()) {
        editor.graph.toggleCellStyleFlags(
          mxConstants.STYLE_FONTSTYLE,
          mxConstants.FONT_BOLD
        );
      }
    },

    italico() {
      if (editor.graph.isEnabled()) {
        editor.graph.toggleCellStyleFlags(
          mxConstants.STYLE_FONTSTYLE,
          mxConstants.FONT_ITALIC
        );
      }
    },

    sublinhado() {
      if (editor.graph.isEnabled()) {
        editor.graph.toggleCellStyleFlags(
          mxConstants.STYLE_FONTSTYLE,
          mxConstants.FONT_UNDERLINE
        );
      }
    },

    printRelatorio() {
      let pdfName = 'report';
      var doc = new jsPDF();

      doc.addImage(logo, "PNG", 10, 10)
      doc.table(10, 30, this.relatorio, ["nome", "total"])

      doc.save(pdfName + '.pdf');
    },
    // configurações
    init() {
      // chama o metodo criador do grafico
      this.createGraph();

      this.createGraphEmpresa();
      this.createGraphFornecedor();
      this.createGraphCliente();
      this.createGraphIntermediario();
      this.createGraphClienteDoCliente();
      this.createGraphAgregador();
      this.createGraphRelacao();
      this.createGraphOu();
      this.createGraphXou();
      this.createGraphTexto();


    },

    getXML() {

      var enc = new mxCodec(mxUtils.createXmlDocument());
      var node = enc.encode(editor.graph.getModel());
      return mxUtils.getXml(node);

    },

    getSVG() {
      var graph = editor.graph;
      var background = "#ffffff";
      var scale = 1;
      var border = 0;

      var imgExport = new mxImageExport();
      var bounds = graph.getGraphBounds();
      var vs = graph.view.scale;

      // Prepares SVG document that holds the output
      var svgDoc = mxUtils.createXmlDocument();
      var root =
        svgDoc.createElementNS != null
          ? svgDoc.createElementNS(mxConstants.NS_SVG, "svg")
          : svgDoc.createElement("svg");

      if (background != null) {
        if (root.style != null) {
          root.style.backgroundColor = background;
        } else {
          root.setAttribute("style", "background-color:" + background);
        }
      }

      if (svgDoc.createElementNS == null) {
        root.setAttribute("xmlns", mxConstants.NS_SVG);
        root.setAttribute("xmlns:xlink", mxConstants.NS_XLINK);
      } else {
        // KNOWN: Ignored in IE9-11, adds namespace for each image element instead. No workaround.
        root.setAttributeNS(
          "http://www.w3.org/2000/xmlns/",
          "xmlns:xlink",
          mxConstants.NS_XLINK
        );
      }

      root.setAttribute(
        "width",
        Math.ceil((bounds.width * scale) / vs) + 2 * border + "px"
      );
      root.setAttribute(
        "height",
        Math.ceil((bounds.height * scale) / vs) + 2 * border + "px"
      );
      root.setAttribute("version", "1.1");

      // Adds group for anti-aliasing via transform
      var group =
        svgDoc.createElementNS != null
          ? svgDoc.createElementNS(mxConstants.NS_SVG, "g")
          : svgDoc.createElement("g");
      group.setAttribute("transform", "translate(0.5,0.5)");
      root.appendChild(group);
      svgDoc.appendChild(root);

      // Renders graph. Offset will be multiplied with state's scale when painting state.
      var svgCanvas = new mxSvgCanvas2D(group);
      svgCanvas.translate(
        Math.floor((border / scale - bounds.x) / vs),
        Math.floor((border / scale - bounds.y) / vs)
      );
      svgCanvas.scale(scale / vs);

      // Displayed if a viewer does not support foreignObjects (which is needed to HTML output)
      svgCanvas.foAltText = "[Not supported by viewer]";

      imgExport.drawState(
        graph.getView().getState(graph.model.root),
        svgCanvas
      );

      var grupos = root.getElementsByTagName("g")[0];
      var g = grupos.getElementsByTagName("g");
      var arr = [...g];

      arr.forEach((g) => {
        var s = g.getElementsByTagName("switch")[0];
        var elemento = document.createElement("text");
        elemento = s.getElementsByTagName("text")[0];
        var texto =
          s.getElementsByTagName("foreignObject")[0].lastElementChild.innerText;
        elemento.innerText = texto;
        elemento.innerHTML = texto;

        s.remove();
        g.appendChild(elemento);
      });

      return mxUtils.getXml(root);
    }


  },

  async mounted() {
    this.init();

    if (this.$route.params.id) {

      try {

        const { data: arquivo } = await services.models.get(this.$route.params.id);
        const { data: modelo } = await services.models.index(this.$route.params.id);

        this.importar(arquivo);
        this.modelo = modelo;
        this.$toast.success("Modelo carregado");

      } catch (error) {
        this.$toast.error("Modelo não encontrado");
        this.$router.push("/pt-br/editor");
      }

    }

    const token = localStorage.getItem("token");
    const nome = localStorage.getItem("nome");
    const codigo_usuario = localStorage.getItem("codigo_usuario");

    if (token) {
      this.token = token;
      this.logado = true;
      this.nome = nome;
      this.codigo_usuario = codigo_usuario;
    }
  },

  created() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
      alert("Não recomendamos o uso nesse dispositivo")
    }

    const {
      mxClient,
      mxUtils,
      mxEvent,
      mxEditor,
      mxRectangle,
      mxImageShape,
      mxGraph,
      mxGeometry,
      mxCell,
      mxGraphModel,
      mxConstants,
      mxImage,
      mxDivResizer,
      mxObjectCodec,
      mxCodecRegistry,
      mxConnectionHandler,
      mxClipboard,
      mxPrintPreview,
      mxGuide,
      mxVertexHandler,
      mxGraphHandler,
      mxEdgeHandler,
      mxDefaultKeyHandler,
      mxPanningManager,
      mxConstraintHandler,
      mxShape,
      mxPerimeter,
      mxPoint,
      mxPolyline,
      mxCodec,
      mxActor,
      mxCellRenderer,
      mxArrowConnector,
      mxStyleRegistry,
      mxXmlRequest,
      mxXmlCanvas2D,
      mxImageExport,
      mxEdgeStyle,
      mxArrow,
      mxGraphComponent,
      mxSvgCanvas2D,
      mxEventObject,
      mxWindow,
      mxSelectionCellsHandler,
      mxConnectionConstraint,
      mxLog,
      mxResources,
      mxOutline,
      mxRubberband,
      mxPopupMenu,
      mxCellHighlight,
    } = mxgraph(graphConfig);

    window.mxClient = mxClient;
    window.mxUtils = mxUtils;
    window.mxRectangle = mxRectangle;
    window.mxImageShape = mxImageShape;
    window.mxGraph = mxGraph;
    window.mxEvent = mxEvent;
    window.mxCell = mxCell;
    window.mxGraphModel = mxGraphModel;
    window.mxConstants = mxConstants;
    window.mxGeometry = mxGeometry;
    window.mxImage = mxImage;
    window.mxEditor = mxEditor;
    window.mxDivResizer = mxDivResizer;
    window.mxObjectCodec = mxObjectCodec;
    window.mxCodecRegistry = mxCodecRegistry;
    window.mxConnectionHandler = mxConnectionHandler;
    window.mxClipboard = mxClipboard;
    window.mxPrintPreview = mxPrintPreview;
    window.mxGuide = mxGuide;
    window.mxVertexHandler = mxVertexHandler;
    window.mxGraphHandler = mxGraphHandler;
    window.mxEdgeHandler = mxEdgeHandler;
    window.mxDefaultKeyHandler = mxDefaultKeyHandler;
    window.mxPanningManager = mxPanningManager;
    window.mxConstraintHandler = mxConstraintHandler;
    window.mxShape = mxShape;
    window.mxPerimeter = mxPerimeter;
    window.mxPoint = mxPoint;
    window.mxPolyline = mxPolyline;
    window.mxCodec = mxCodec;
    window.mxActor = mxActor;
    window.mxCellRenderer = mxCellRenderer;
    window.mxArrowConnector = mxArrowConnector;
    window.mxStyleRegistry = mxStyleRegistry;
    window.mxXmlRequest = mxXmlRequest;
    window.mxXmlCanvas2D = mxXmlCanvas2D;
    window.mxImageExport = mxImageExport;
    window.mxEdgeStyle = mxEdgeStyle;
    window.mxArrow = mxArrow;
    window.mxGraphComponent = mxGraphComponent;
    window.mxSvgCanvas2D = mxSvgCanvas2D;
    window.mxEventObject = mxEventObject;
    window.mxWindow = mxWindow;
    window.mxSelectionCellsHandler = mxSelectionCellsHandler;
    window.mxConnectionConstraint = mxConnectionConstraint;
    window.mxLog = mxLog;
    window.mxResources = mxResources;
    window.mxOutline = mxOutline;
    window.mxRubberband = mxRubberband;
    window.mxPopupMenu = mxPopupMenu;
    window.mxCellHighlight = mxCellHighlight;

    window.addEventListener("copy", () => {
      this.copiar();
    });

    window.addEventListener("paste", () => {
      this.colar();
    });

    window.addEventListener("cut", () => {
      this.recortar();
    });

    document.onkeydown = (e) => {
      var evtobj = window.event ? event : e;
      if (evtobj.keyCode == 90 && evtobj.ctrlKey) {
        if (editor.graph.isEnabled()) {
          editor.undo();
        }
      } else if (evtobj.keyCode == 89 && evtobj.ctrlKey) {
        if (editor.graph.isEnabled()) {
          editor.redo();
        }
      } else if (evtobj.keyCode == 46 && evtobj.ctrlKey) {
        if (editor.graph.isEnabled()) editor.graph.removeCells();
      } else if (evtobj.keyCode == 48 && evtobj.ctrlKey) {
        editor.graph.zoomActual();
      }
    };

    if (window.location.pathname.includes("/en/")) {
      this.usingLang = language.en;

    }
    else if (window.location.pathname.includes("/es/")) {
      this.usingLang = language.es;

    }
    else {
      this.usingLang = language.pt;

    }


  },

};
</script>