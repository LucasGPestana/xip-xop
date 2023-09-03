import { renderizarCatalogo } from "./cartaoProduto";
import { catalogo } from "./utilidades";

const catalogoProdutos = document.querySelector("#container-produto");

// A função recebe a classe a qual não será escondida como parâmetro, e esconde os elementos que não tenham essa classe dentro de catalogoProdutos

function esconderOsDemais(classeMostrada) {

  mostrarTodos();

  const elementosEscondidos = [];

  for (const elementoHTML of catalogoProdutos.children) {

    if (!elementoHTML.classList.contains(classeMostrada)) {
      elementosEscondidos.push(elementoHTML)
    }

  }

  for (const elementoHTML of elementosEscondidos) {

    elementoHTML.classList.add("hidden");

  }

}

function mostrarTodos() {

  const elementosEscondidos = Array.from(catalogoProdutos.getElementsByClassName("hidden"));

  for (const elementoHTML of elementosEscondidos) {

    elementoHTML.classList.remove("hidden");

  }
}

export function inicializarFiltros() {

  const listaPlataformas = document.getElementById("plataformas");

  listaPlataformas.addEventListener("click", () => {
    
    if (listaPlataformas.value == "PS3") {
      esconderOsDemais("playstation-3");
    } else if (listaPlataformas.value == "X360") {
      esconderOsDemais("xbox-360");
    } else if (listaPlataformas.value == "PS4") {
      esconderOsDemais("playstation-4");
    } else if (listaPlataformas.value == "XONE") {
      esconderOsDemais("xbox-one");      
    } else if (listaPlataformas.value == "SWITCH") {
      esconderOsDemais("nintendo-switch");
    } else if (listaPlataformas.value == "ALL") {
      mostrarTodos();
    }

  })

  document.getElementById("exibir-menor-para-maior").addEventListener("click", () => {
    mostrarMenorParaMaior();
    listaPlataformas.value = "ALL";
  });
  document.getElementById("exibir-maior-para-menor").addEventListener("click", () => {
    mostrarMaiorParaMenor();
    listaPlataformas.value = "ALL";
  });
}

function mostrarMenorParaMaior() {

  const novo_catalogo = catalogo.sort((produto, produto2) => produto.preco - produto2.preco)
  document.querySelector("#container-produto").innerHTML = "";
  renderizarCatalogo(novo_catalogo)

}

function mostrarMaiorParaMenor() {

  const novo_catalogo = catalogo.sort((produto, produto2) => produto2.preco - produto.preco)
  document.querySelector("#container-produto").innerHTML = "";
  renderizarCatalogo(novo_catalogo)

}