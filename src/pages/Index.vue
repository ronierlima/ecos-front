<template>
  <div>
    <div class="superinfo-bg">
      <div class="superinfo">
        <p>Seg / Sex - 08:00 às 14:00</p>
        <a href="tel:+552199999999">+55 88 98114-8531</a>
        <p>Av. do Multirão, 956, Quixadá - CE</p>
      </div>
    </div>

    <header class="menu-bg">
      <div class="menu">
        <div class="menu-logo">
          <a href="#">FlexBlog</a>
        </div>
        <nav class="menu-nav">
          <ul>
            <li><a href="#sobre">Sobre</a></li>
            <li><a href="#produtos">Produtos</a></li>
            <li><a href="#preco">Preço</a></li>
            <li><a href="#qualidade">Qualidade</a></li>
          </ul>
        </nav>
      </div>
    </header>

    <h1 class="introducao">Novos valores e<br />Propriedades de CSS</h1>

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
        <img src="src/img/sobre1.jpg" alt="Sobre 1" />
      </div>
      <div class="sobre-img">
        <img src="src/img/sobre2.jpg" alt="Sobre 2" />
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

    <footer class="footer">
      <p>Ronier Lima © Todos os direitos reservados.</p>
    </footer>
  </div>
</template>

<script>
import { services } from "../../services";
import Modelagem from "../components/Modelagem.vue";

export default {
  name: "Index",
  components: {
    Modelagem,
  },

  data() {
    return {
      loader: null,
      loading: false,
      token: null,
      logado: false,
      nome: "",
      usuario: { nome: "teste" },
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
  },

  methods: {
    login() {
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
  },
};
</script>

<style>
.text-center {
}
</style>
