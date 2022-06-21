<template>
  <div>
    <div class="superinfo-bg">
      <div class="superinfo">
        <select v-model="selected" name="language" id="language" class="chave">
          <option value="pt-BR">pt-BR</option>
          <option value="en">en</option>
          <option value="es">es</option>
        </select>
      </div>
    </div>

    <header class="menu-bg">
      <div class="menu">
        <div class="menu-logo">
          <img width="220px" src="../assets/logo.png" />
        </div>
        <nav class="menu-nav">
          <ul>
            <li><a href="#sobre">Modelos público</a></li>
            <li><a href="#produtos">Meus modelos</a></li>
            <li v-if="!logado"><a @click="showModal = true">Entrar</a></li>
            <li><a href="/en">Editor</a></li>
            <li v-if="logado"><a @click="showModal = true">| {{ nome }} |</a></li>
            <li v-if="logado"><a @click="showModal = true">| Sair |</a></li>
          </ul>
        </nav>
      </div>
    </header>

    <h1 class="introducao">Ecos Modeling<br />Modele ecossistemas de software</h1>

    <section class="sobre" id="sobre">
      <div class="sobre-info">
        <h1>Sobre</h1>
        <p>
          O que temos que ter sempre em mente é que a determinação clara de
          objetivos afeta positivamente a correta previsão das condições
          inegavelmente apropriadas objetivos.
        </p>
        <p>
          O que temos que ter sempre em mente é que a determinação clara de
          objetivos afeta positivamente a correta previsão das condições
          inegavelmente apropriadas objetivos.
        </p>
      </div>
      <div class="sobre-img">
        <img src="../assets/Diagrama.png" alt="Sobre 1" />
      </div>
     
    </section>

    <section class="produtos" id="produtos">
      <h1>Produtos</h1>
      <div class="produtos-container">
        <div class="produtos-item purple">
          <h2>Purple</h2>
          <img src="src/img/produtos1.jpg" alt="Produtos 1" />
        </div>
        <div class="produtos-item pink">
          <h2>Pink</h2>
          <img src="src/img/produtos2.jpg" alt="Produtos 2" />
        </div>
        <div class="produtos-item blue">
          <h2>Blue</h2>
          <img src="src/img/produtos3.jpg" alt="Produtos 3" />
        </div>
      </div>
    </section>

    <section class="preco" id="preco">
      <div class="preco-item">
        <h2>Cobre</h2>
        <span><sup>R$</sup>19</span>
        <ul>
          <li>Planos Ilimitados</li>
          <li>Acesso Restrito</li>
          <li>Conteúdo Secreto</li>
          <li>Suporte 24h</li>
        </ul>
        <a href="#">Comprar</a>
      </div>

      <div class="preco-item">
        <h2>Prata</h2>
        <span><sup>R$</sup>39</span>
        <ul>
          <li>Planos Ilimitados</li>
          <li>Acesso Restrito</li>
          <li>Conteúdo Secreto</li>
          <li>Suporte 24h</li>
          <li>Compra Exclusiva</li>
        </ul>
        <a href="#">Comprar</a>
      </div>

      <div class="preco-item">
        <h2>Ouro</h2>
        <span><sup>R$</sup>79</span>
        <ul>
          <li>Planos Ilimitados</li>
          <li>Acesso Restrito</li>
          <li>Conteúdo Secreto</li>
          <li>Suporte 24h</li>
          <li>Compra Exclusiva</li>
          <li>Download dos Itens</li>
        </ul>
        <a href="#">Comprar</a>
      </div>
    </section>

    <section class="qualidade" id="qualidade">
      <div class="qualidade-item">
        <h2>Inteligente</h2>
        <p>
          O que temos que ter sempre em mente é que a determinação clara de
          objetivos afeta positivamente a correta previsão
        </p>
      </div>

      <div class="qualidade-item">
        <h2>Compacto</h2>
        <p>
          O que temos que ter sempre em mente é que a determinação clara de
          objetivos afeta positivamente a correta previsão das condições
          inegavelmente
        </p>
      </div>

      <div class="qualidade-item">
        <h2>Econômico</h2>
        <p>
          O que temos que ter sempre em mente é que a determinação clara de
          objetivos afeta positivamente a correta previsão
        </p>
      </div>

      <div class="qualidade-item">
        <h2>Transparente</h2>
        <p>
          O que temos que ter sempre em mente é que a determinação clara de
          objetivos afeta positivamente a correta previsão
        </p>
      </div>

      <div class="qualidade-item">
        <h2>Opaco</h2>
        <p>
          O que temos que ter sempre em mente é que a determinação clara de
          objetivos afeta positivamente a correta previsão das condições
          inegavelmente
        </p>
      </div>

      <div class="qualidade-item">
        <h2>Sustentável</h2>
        <p>
          O que temos que ter sempre em mente é que a determinação clara de
          objetivos afeta positivamente a correta previsão
        </p>
      </div>
    </section>

    <section class="newsletter">
      <div class="newsletter-info">
        <h1>Newsletter</h1>
        <p>assine e fique por dentro das novidades</p>
      </div>
      <form class="newsletter-form">
        <input type="text" placeholder="Seu e-mail" />
        <button type="submit">Assinar</button>
      </form>
    </section>

    <transition name="modal" v-if="showModal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">
            <div class="modal-header">
              <h3 name="header">{{ usingLang.login }}</h3>
            </div>

            <div class="modal-body">
              <form>

                <label for="username">Username</label>
                <input type="text" v-model="input.username" placeholder="Email" id="username" name="username">

                <label for="password">Password</label>
                <input type="password" v-model="input.password" placeholder="Password" id="password" name="password">
              </form>
            </div>

            <div class="modal-footer">
              <slot name="footer">
                <button class="modal-default-button cancel" @click="showModal = false">
                  {{ usingLang.cancel }}
                </button>
                <button class="modal-default-button" v-on:click="login()">
                  {{ usingLang.login }}
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
import { services } from "../../services";
import language from "../helpers/language";

export default {
  name: "Index",


  data() {
    return {
      loader: null,
      loading: false,
      token: null,
      logado: false,
      nome: "",
      usuario: { nome: "teste" },
      showModal: false,
      usingLang: {},
      selected: "pt-BR",
      input: {
        username: "",
        password: ""
      }
    };
  },

  created: function () {
    const token = localStorage.getItem("token");
    const nome = localStorage.getItem("nome");

    if (token) {
      this.token = token;
      this.logado = true;
      this.nome = nome;
    }


    this.changeLang();
  },

  methods: {
    login() {
      if (this.input.username != "" && this.input.password != "")
        services.user
          .login("ronier.lim@gmail.com", "1")
          .then((res) => {
            this.token = res.data.token;
            this.nome = res.data.nome;
            this.logado = true;
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("nome", res.data.nome);
          })
          .catch((error) => {
            console.log(error);
          });
    },
    logout() {
      this.token = null;
      this.logado = false;
      localStorage.removeItem("token");
    },
    changeLang() {
      if (this.selected === "en") this.usingLang = language.en;
      else if (this.selected === "es") this.usingLang = language.es;
      else {
        this.usingLang = language.pt;
        this.selected = "pt-BR";
      }
    }
  },

  watch: {
    selected: function () {

      this.changeLang();
    },
  },

};
</script>

<style>
form {
  width: 80%;
  padding: 2rem;
}

form * {
  color: #5e5e5e;
  letter-spacing: 0.5px;
  outline: none;
  border: none;
}

label {
  display: block;
  margin-top: 30px;
  font-size: 16px;
  font-weight: 500;
}

input {
  display: block;
  height: 50px;
  width: 100%;
  background-color: #f2f0e6;
  border-radius: 3px;
  padding: 0 10px;
  margin-top: 8px;
  font-size: 14px;
  font-weight: 300;
}

::placeholder {
  color: #5e5e5e;
}
</style>
