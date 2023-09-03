import { adicionarAoCarrinho } from "./menu-carrinho";

export function renderizarCatalogo(catalogo_selecionado) {

  catalogo_selecionado.forEach(produto => {
  
    const cartaoProduto = `
    <div class="border-solid shadow-xl shadow-slate-400 p-2 m-2 w-80 rounded-lg flex flex-col gap-2 group ${produto.plataforma.toLowerCase().split(" ").join("-")}" id="card-produto-${produto.id}">
      <img src="./assets/img/${produto.imagem}" alt="Capa do jogo ${produto.nome} de ${produto.plataforma}" class="h-[300px] group-hover:scale-105 duration-200 my-3 rounded-lg">
      <div class="flex flex-col items-center justify-between">
        <p class="plataforma font-bold">${produto.plataforma}</p>
        <p class="text-sm">${produto.nome}</p>
        <p class="text-sm">R$${produto.preco}</p>
      </div>
      <button class="bg-slate-950 text-slate-200 hover:bg-slate-700" id=adicionar-${produto.id}><i class="fa-solid fa-cart-plus"></i></button>
    </div>`;
  
    document.querySelector("#container-produto").innerHTML += cartaoProduto;
  
  })

  mudarCorPlataforma() // Altera a cor do texto da plataforma

  for (const produtoCatalogo of catalogo_selecionado) {
    document.querySelector(`#adicionar-${produtoCatalogo.id}`).addEventListener("click", () => adicionarAoCarrinho(produtoCatalogo.id));
  }

}

function mudarCorPlataforma() {

  // document.getElementsByClassName retorna um HTML Collection
  for (const paragrafo of document.getElementsByClassName("plataforma")) {
    if (paragrafo.innerText == "Playstation 3") {
      paragrafo.style.setProperty("color", "rgb(45, 45, 45)");
    }
  
    if (paragrafo.innerText == "Playstation 4") {
      paragrafo.style.setProperty("color", "blue");
    }

    if (paragrafo.innerText == "Xbox 360") {
      paragrafo.style.setProperty("color", "rgb(146, 200, 63)");
    }

    if (paragrafo.innerText == "Xbox One") {
      paragrafo.style.setProperty("color", "rgb(16, 124, 16)");
    }

    if (paragrafo.innerText == "Nintendo Switch") {
      paragrafo.style.setProperty("color", "red");
    }
  }

}
