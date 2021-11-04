
<template>
  <div>
    <div id="container"></div>
    <div id="sidebar"></div>
    <div id="nav">
      <div id="nav-content">
        <ul>
          <li><a @click="pngSalvar()">Exportar em PNG</a></li>
          <li><a @click="svgExportar()">Exportar em SVG</a></li>
          <li><a @click="exportarXml()">Exportar em XML</a></li>
          <li><a @click="exportarJson()">Exportar em JSON</a></li>
        </ul>
      </div>
    </div>
    <div id="rodape">
      <span class="caption"
        >Universidade Federal do Ceará - Campus Quixadá &copy;
        {{ new Date().getFullYear() }}</span
      >
    </div>

    <div id="menu">
      <div id="logo">
        <img
          width="220px"
          src="../assets/logo.png"
          :title="usingLang.company_of_interest"
        />
      </div>

      <div id="salvar">
        <img
          width="30px"
          @click="pngSalvar()"
          src="../assets/salvar.svg"
          :alt="usingLang.save"
          :title="usingLang.save"
        />
      </div>

      <div id="exportar">
        <img
          width="30px"
          @click="exportarXml()"
          src="../assets/exportar.svg"
          :alt="usingLang.export"
          :title="usingLang.export"
        />
      </div>

      <div id="zoom_in">
        <img
          width="30px"
          @click="zoomMais()"
          src="../assets/zoom_in.svg"
          :alt="usingLang.zoomin"
          :title="usingLang.zoomin"
        />
      </div>

      <div id="zoom_out">
        <img
          width="30px"
          @click="zoomMenos()"
          src="../assets/zoom_out.svg"
          :alt="usingLang.zoomout"
          :title="usingLang.zoomout"
        />
      </div>

      <div id="zoom_actual">
        <img
          width="30px"
          @click="zommAtual()"
          src="../assets/zoom_actual.svg"
          :alt="usingLang.zoomDefault"
          :title="usingLang.zoomDefault"
        />
      </div>

      <div id="deletar">
        <img
          width="30px"
          @click="apagar()"
          src="../assets/delete.svg"
          alt="Deletar"
          title="Deletar"
        />
      </div>

      <div id="recortar">
        <img
          width="30px"
          @click="recortar()"
          src="../assets/recortar.svg"
          alt="Recortar"
          title="Recortar"
        />
      </div>

      <div id="copiar">
        <img
          width="30px"
          @click="copiar()"
          src="../assets/copiar.svg"
          alt="Copiar"
          title="Copiar"
        />
      </div>

      <div id="colar">
        <img
          width="30px"
          @click="colar()"
          src="../assets/colar.svg"
          alt="Colar"
          title="Colar"
        />
      </div>

      <div id="desfazer">
        <img
          width="30px"
          @click="desfazer()"
          src="../assets/desfazer.svg"
          alt="Desfazer"
          title="Desfazer"
        />
      </div>

      <div id="refazer">
        <img
          width="30px"
          @click="refazer()"
          src="../assets/refazer.svg"
          alt="Refazer"
          title="Refazer"
        />
      </div>

      <div id="selecionar">
        <img
          width="30px"
          @click="selecionarTudo()"
          src="../assets/selecionar.svg"
          alt="Selecionar Tudo"
          title="Selecionar Tudo"
        />
      </div>

      <div id="none">
        <img
          width="28px"
          @click="none()"
          src="../assets/none.svg"
          alt="Desfazer Seleção"
          title="Desfazer Seleção"
        />
      </div>

      <div id="imprimir">
        <img
          width="30px"
          @click="imprimir()"
          src="../assets/imprimir.svg"
          alt="Imprimir"
          title="Imprimir"
        />
      </div>

      <div id="show">
        <img
          width="30px"
          @click="show()"
          src="../assets/show.svg"
          alt="Show"
          title="Show"
        />
      </div>

      <div id="propriedades">
        <img
          width="30px"
          @click="propriedades()"
          src="../assets/propriedades.svg"
          alt="Propriedades"
          title="Propriedades"
        />
      </div>

      <div id="agrupar">
        <img
          width="30px"
          @click="agrupar()"
          src="../assets/agrupar.svg"
          alt="Agrupar"
          title="Agrupar"
        />
      </div>

      <div id="desagrupar">
        <img
          width="30px"
          @click="desagrupar()"
          src="../assets/desagrupar.svg"
          alt="desagrupar"
          title="Desagrupar"
        />
      </div>

      <div id="pratras">
        <img
          width="30px"
          @click="praTras()"
          src="../assets/toback.svg"
          alt="Para Atrás"
          title="Para Atrás"
        />
      </div>

      <div id="prafrente">
        <img
          width="30px"
          @click="praFrente()"
          src="../assets/tofront.svg"
          alt="Para Frente"
          title="Para Frente"
        />
      </div>

      <div id="negrito">
        <img
          width="30px"
          @click="negrito()"
          src="../assets/negrito.svg"
          alt="Negrito"
          title="Negrito"
        />
      </div>

      <div id="sublinhado">
        <img
          width="30px"
          @click="sublinhado()"
          src="../assets/sublinhado.svg"
          alt="Sublinhado"
          title="Sublinhado"
        />
      </div>

      <div id="italico">
        <img
          width="30px"
          @click="italico()"
          src="../assets/italico.svg"
          alt="Itálico"
          title="Itálico"
        />
      </div>
    </div>
  </div>
</template>

<script>
import mxgraph from "mxgraph";
import graphConfig from "../configs/mxGraph/graphConfig";

import { saveAs } from "file-saver";
import { saveSvgAsPng } from "save-svg-as-png";
import convert from "xml-js";

import language from "../helpers/language";
import ssn from "../helpers/ssn";

import "./modelagem.css";
alert("1")
var userLang = navigator.language || navigator.userLanguage;
let usingLang = userLang === "pt-BR" && language.pt;

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

let editor;
window.CustomUserObject = function () {
  this.name = usingLang.company_of_interest;
  this.clone = function () {
    return mxUtils.clone(this);
  };
};

window.Ou = function () {
  this.name = usingLang.or;
  this.clone = function () {
    return mxUtils.clone(this);
  };
};

window.Xou = function () {
  this.name = "";
  this.clone = function () {
    return mxUtils.clone(this);
  };
};

window.Cliente = function () {
  this.name = usingLang.customer;
  this.clone = function () {
    return mxUtils.clone(this);
  };
};

window.ClienteDoCliente = function () {
  this.name = usingLang.customer_customer;
  this.clone = function () {
    return mxUtils.clone(this);
  };
};

window.Intermediario = function () {
  this.name = usingLang.intermediary;
  this.clone = function () {
    return mxUtils.clone(this);
  };
};

window.Fornecedor = function () {
  this.name = usingLang.supplier;
  this.clone = function () {
    return mxUtils.clone(this);
  };
};

window.Agregador = function () {
  this.name = usingLang.aggregator;
  this.clone = function () {
    return mxUtils.clone(this);
  };
};

window.Texto = function () {
  this.name = `${usingLang.text} ...`;
  this.clone = function () {
    return mxUtils.clone(this);
  };
};

window.Relacao = function () {
  this.name = "X:Y";
  this.clone = function () {
    return mxUtils.clone(this);
  };
};

export default {
  name: "Teste",
  components: {},
  data() {
    return {
      usingLang: {},
      dialog: false,
      currentCell: null,
    };
  },

  methods: {
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
      xou.style.cursor = "pointer";
      xou.innerHTML = ssn.xor();
      xou.style.margin = "auto";
      // xou.style.marginTop = "4%";
      xou.style.width = "60px";
      xou.style.height = "65px";
      xou.style.textAlign = "center";
      xou.style.display = "flex";
      xou.style.flexWrap = "wrap";
      xou.style.alignItems = "center";
      xou.style.justifyContent = "center";
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

      ou.style.cursor = "pointer";
      ou.innerHTML = ssn.or(usingLang.or);
      ou.style.margin = "auto";
      //ou.style.marginTop = "4%";
      ou.style.width = "60px";
      ou.style.height = "65px";
      ou.style.textAlign = "center";
      ou.style.display = "flex";
      ou.style.flexWrap = "wrap";
      ou.style.alignItems = "center";
      ou.style.justifyContent = "center";
      ou.title = usingLang.or;
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

      relacao.style.cursor = "pointer";
      relacao.style.margin = "auto";

      relacao.style.width = "60px";
      relacao.style.height = "40px";
      relacao.style.textAlign = "center";
      relacao.style.display = "flex";
      relacao.style.flexWrap = "wrap";
      relacao.style.alignItems = "center";
      relacao.style.justifyContent = "center";
      relacao.title = "Relação comercial";
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
      agregador.innerHTML = ssn.aggregator(usingLang.aggregator);
      agregador.style.cursor = "pointer";
      agregador.style.margin = "auto";
      //agregador.style.marginTop = "4%";
      agregador.style.width = "202px";
      agregador.style.height = "55px";
      agregador.style.textAlign = "center";
      agregador.style.display = "flex";
      agregador.style.flexWrap = "wrap";
      agregador.style.alignItems = "center";
      agregador.style.justifyContent = "center";
      agregador.title = usingLang.aggregator;

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
      clienteDoCliente.innerHTML = ssn.customers(usingLang.customer_customer);

      clienteDoCliente.style.cursor = "pointer";
      clienteDoCliente.style.margin = "auto";

      clienteDoCliente.style.width = "200px";
      clienteDoCliente.style.height = "55px";
      clienteDoCliente.style.textAlign = "center";
      clienteDoCliente.style.display = "flex";
      clienteDoCliente.style.flexWrap = "wrap";
      clienteDoCliente.style.alignItems = "center";
      clienteDoCliente.style.justifyContent = "center";
      clienteDoCliente.title = "Cliente do Cliente";
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

      intermediario.style.cursor = "pointer";
      intermediario.innerHTML = ssn.intermediary(usingLang.intermediary);
      intermediario.style.margin = "auto";
      //intermediario.style.marginTop = "4%";
      intermediario.style.width = "200px";
      intermediario.style.height = "53px";
      intermediario.style.textAlign = "center";
      intermediario.style.display = "flex";
      intermediario.style.flexWrap = "wrap";
      intermediario.style.alignItems = "center";
      intermediario.style.justifyContent = "center";
      intermediario.title = usingLang.intermediary;
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

      cliente.innerHTML = ssn.customer(usingLang.customer);
      cliente.classList.add("ssnObjeto");

      cliente.style.cursor = "pointer";
      cliente.style.margin = "auto";
      //cliente.style.marginTop = "4%";
      cliente.style.width = "200px";
      cliente.style.height = "52px";
      cliente.style.textAlign = "center";
      cliente.style.display = "flex";
      cliente.style.flexWrap = "wrap";
      cliente.style.alignItems = "center";
      cliente.style.justifyContent = "center";
      cliente.title = "Cliente";
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
      fornecedor.innerHTML = ssn.supplier(usingLang.supplier);

      fornecedor.style.cursor = "pointer";
      fornecedor.style.margin = "auto";
      fornecedor.style.width = "204px";
      fornecedor.style.height = "55px";
      fornecedor.style.textAlign = "center";
      fornecedor.style.display = "flex";
      fornecedor.style.flexWrap = "wrap";
      fornecedor.style.alignItems = "center";
      fornecedor.style.justifyContent = "center";
      fornecedor.title = "Fornecedor";
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
      empresa.style.cursor = "pointer";
      empresa.innerHTML = ssn.company_of_interest(
        usingLang.company_of_interest
      );
      empresa.style.margin = "auto";
      empresa.style.width = "205px";
      empresa.style.height = "60px";
      empresa.style.textAlign = "center";
      empresa.style.display = "flex";
      empresa.style.flexWrap = "wrap";
      empresa.style.alignItems = "center";
      empresa.style.justifyContent = "center";
      empresa.title = usingLang.company_of_interest;
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
      texto.style.cursor = "pointer";
      texto.style.backgroundColor = "transparent";
      texto.style.margin = "auto";
      //texto.style.marginTop = "4%";
      texto.style.width = "200x";
      texto.style.height = "60px";
      texto.style.textAlign = "center";
      texto.style.display = "flex";
      texto.style.flexWrap = "wrap";
      texto.style.alignItems = "center";
      texto.style.justifyContent = "center";
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
        let customObject = new window.Xou();

        let object = new mxCell(
          customObject,
          new mxGeometry(0, 0, 40, 40),
          "shape=rhombus;fillColor=black;strokeColor=black;fontColor=white;"
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
        let customObject = new window.Ou();

        let object = new mxCell(
          customObject,
          new mxGeometry(0, 0, 40, 40),
          "shape=rhombus;fillColor=black;strokeColor=black;fontColor=white;"
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

        let customObject = new window.Relacao();

        let object = new mxCell(
          customObject,
          new mxGeometry(0, 0, 50, 25),
          "shape=singleArrow;fillColor=white;strokeColor=black;fontColor=black;"
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
        let customObject = new window.Agregador();

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
          customObject,
          new mxGeometry(0, 0, 200, 50),
          "shape=parallelogram;fillColor=red;strokeColor=black;fontColor=black;"
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
        let customObject = new window.ClienteDoCliente();

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
          customObject,
          new mxGeometry(0, 0, 235, 50),
          "shape=step;fillColor=LightGrey;strokeColor=black;fontColor=black;flipH=1;"
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
        let customObject = new window.Fornecedor();

        let object = new mxCell(
          customObject,
          new mxGeometry(0, 0, 200, 50),
          "shape=singleArrow;fillColor=orange;strokeColor=black;fontColor=black;"
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
        let customObject = new window.Intermediario();

        let object = new mxCell(
          customObject,
          new mxGeometry(0, 0, 200, 50),
          "shape=doubleArrow;fillColor=LimeGreen;strokeColor=black;fontColor=black;"
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
        let customObject = new window.Cliente();

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
          customObject,
          new mxGeometry(0, 0, 200, 50),
          "shape=singleArrow;fillColor=yellow;strokeColor=black;fontColor=black;flipH=1"
          // ajeitar
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
          new window.CustomUserObject(),
          new mxGeometry(0, 0, 200, 50),
          "fillColor=blue;strokeColor=black;fontColor=white"
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
        let customObject = new window.Texto();

        let object = new mxCell(
          customObject,
          new mxGeometry(0, 0, 200, 50),
          "fillColor=transparent;strokeColor=transparent;fontColor=black;"
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
        mxConnectionHandler.prototype.connectImage = new mxImage(
          require("../assets/connector.gif"),
          15,
          15
        );

        mxConnectionHandler.prototype.selectCells = function (edge, target) {
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

        // gigrar a figura
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
        editor.graph.connectionHandler.setCreateTarget(true);

        // altera o selecionado em um painel separado
        editor.graph.getSelectionModel().addListener(mxEvent.CHANGE, () => {
          this.selectionChanged();
        });
        this.selectionChanged();

        editor.graph.connectionHandler.targetConnectImage = true;

        //================================================================================

        //================================================================================
        editor.graph.centerZoom = true;
        editor.graph.swimlaneNesting = false;
        editor.graph.dropEnabled = true;

        editor.graph.mxRubberband = true;

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

        // zoom com o mouse
        mxEvent.addMouseWheelListener(function (evt, up) {
          if (!mxEvent.isConsumed(evt)) {
            if (up) {
              editor.graph.zoomIn();
            } else {
              editor.graph.zoomOut();
            }
            mxEvent.consume(evt);
          }
        });

        //=================================
        editor.graph.cellRenderer.installCellOverlayListeners = function (
          state,
          overlay,
          shape
        ) {
          mxEvent.addGestureListeners(shape.node, function (evt) {
            editor.graph.connectionHandler.start(state, 1, 1);
            editor.graph.isMouseDown = true;
            editor.graph.isMouseTrigger = true;
            mxEvent.consume(evt);
          });
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

        var style = editor.graph.getStylesheet().getDefaultVertexStyle();
        style["fillColor"] = "#FFFFFF";
        style["strokeColor"] = "#000000";
        style["fontColor"] = "#000000";
        style["fontStyle"] = "1";
        style["fontSize"] = "15";

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

    teste() {
      if (editor.outline == null) {
        editor.showOutline();
      } else {
        editor.outline.setVisible(!editor.outline.isVisible());
      }
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

    propriedades() {
      var enc = new mxCodec(mxUtils.createXmlDocument());
      var node = enc.encode(editor.graph.getModel());
      alert(mxUtils.getPrettyXml(node));
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

    exportarXml() {
      var enc = new mxCodec(mxUtils.createXmlDocument());
      var node = enc.encode(editor.graph.getModel());
      var node2 = mxUtils.getXml(node);

      var filename = "Diagrama.xml";
      var blob = new Blob([node2], { type: "text/xml" });
      saveAs(blob, filename);
    },

    exportarJson() {
      var enc = new mxCodec(mxUtils.createXmlDocument());
      var node = enc.encode(editor.graph.getModel());
      var node2 = mxUtils.getXml(node);

      var result1 = convert.xml2json(node2, { compact: true, spaces: 4 });

      var filename = "Diagrama.json";
      var blob = new Blob([result1], { type: "text/json" });
      saveAs(blob, filename);
    },

    // configurações
    init() {
      // CÓDIGOS DOS CAMPOS PERSONALIZADOS para importação e exportação
      let codecCustomUserObject = new mxObjectCodec(
        new window.CustomUserObject()
      );

      // codificar
      codecCustomUserObject.encode = function (enc, obj) {
        let node = enc.document.createElement("Nome");
        mxUtils.setTextContent(node, JSON.stringify(obj));
        console.log(node);
        return node;
      };

      //decodificar
      codecCustomUserObject.decode = function (dec, node) {
        let obj = JSON.parse(mxUtils.getTextContent(node));
        let beatyObj = new window.CustomUserObject();
        obj = Object.assign(beatyObj, obj);
        return obj;
      };

      mxCodecRegistry.register(codecCustomUserObject);

      // chama o metodo criador do grafico
      this.createGraph();
      this.createGraphTexto();
      this.createGraphXou();
      this.createGraphOu();
      this.createGraphRelacao();
      this.createGraphAgregador();
      this.createGraphClienteDoCliente();
      this.createGraphIntermediario();
      this.createGraphCliente();
      this.createGraphFornecedor();
      this.createGraphEmpresa();
    },
  },

  mounted() {
    var userLang = navigator.language || navigator.userLanguage;
    usingLang = userLang === "pt-BR" && language.pt;
    console.log(window)
    this.init();
  },

  created() {
    window.addEventListener("copy", (e) => {
      this.copiar();
    });

    window.addEventListener("paste", (e) => {
      this.colar();
    });

    window.addEventListener("cut", (e) => {
      this.recortar();
    });

    function controlZ(e) {
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
    }

    document.onkeydown = controlZ;

    var userLang = navigator.language || navigator.userLanguage;
    this.usingLang = userLang === "pt-BR" && language.pt;
  },
};
</script>