import { catalogo, lerLocalStorage, salvarLocalStorage } from "./utilidades";

const quantidadeItensPorId = lerLocalStorage("carrinho") ?? {};


function abrirCarrinho() {

    document.querySelector("#carrinho").classList.remove("right-[-360px]");
    document.querySelector("#carrinho").classList.add("right-[0px]");

}

function fecharCarrinho() {

  document.querySelector("#carrinho").classList.remove("right-[0px]");
  document.querySelector("#carrinho").classList.add("right-[-360px]");

}

function irParaCheckout() {

  if (Object.keys(quantidadeItensPorId).length === 0) {
    alert("Por favor, adicione um produto ao carrinho antes de finalizar o pedido!")
    return;
  }

  window.location.href = "./checkout.html";

}

export function inicializarCarrinho() {

  const botaoFecharCarrinho = document.querySelector("#fechar-carrinho");
  const botaoAbrirCarrinho = document.querySelector("#abrir-carrinho");
  const botaoIrParaCheckout = document.querySelector("#finalizar-compra")

  botaoFecharCarrinho.addEventListener("click", fecharCarrinho);
  botaoAbrirCarrinho.addEventListener("click", abrirCarrinho);
  botaoIrParaCheckout.addEventListener("click", irParaCheckout);

}

function incrementarQuantidadeProduto(idProduto) {

  quantidadeItensPorId[idProduto]++;
  salvarLocalStorage("carrinho", quantidadeItensPorId);
  atualizarInformacaoQuantidade(idProduto);
  atualizarPrecoCarrinho();

}

function decrementarQuantidadeProduto(idProduto) {

  if (quantidadeItensPorId[idProduto] === 1) {

    removerDoCarrinho(idProduto);
    return;

  }

  quantidadeItensPorId[idProduto]--;
  salvarLocalStorage("carrinho", quantidadeItensPorId);
  atualizarPrecoCarrinho();
  atualizarInformacaoQuantidade(idProduto);
  
}

function atualizarInformacaoQuantidade(idProduto) {

  document.querySelector(`#quantidade-${idProduto}`).innerText = quantidadeItensPorId[idProduto];

}

function removerDoCarrinho(idProduto) {

  delete quantidadeItensPorId[idProduto];
  salvarLocalStorage("carrinho", quantidadeItensPorId);
  atualizarPrecoCarrinho();
  renderizarProdutosCarrinho();
  
}

export function renderizarProdutosCarrinho() {

  const containerProdutosCarrinho = document.querySelector("#produtos-carrinho");

  containerProdutosCarrinho.innerHTML = "";

  for (const idProduto in quantidadeItensPorId) {

    desenharProdutoNoCarrinho(idProduto);

  }

}

function desenharProdutoNoCarrinho(idProduto) {

  const produto = catalogo.find(produto => produto.id === idProduto); // Similar ao filter, só que retorna o primeiro elemento cuja condição for True

  const containerProdutosCarrinho = document.querySelector("#produtos-carrinho");
  
  const elementoArticle = document.createElement("article"); // <article></article>
  const articleClasses = ["flex", "bg-slate-100", "rounded-lg", "relative"]; 

  for (const articleClass of articleClasses) {

    elementoArticle.classList.add(articleClass);

  }

  const cartaoProdutoCarrinho = `
    <button class="text-slate-500 absolute top-0 right-2 hover:text-slate-800" title="Remover Item" id="remover-${produto.id}"><i class="fa-solid fa-circle-xmark"></i></button>
    <img src="./assets/img/${produto.imagem}" alt="Jogo ${produto.nome} de ${produto.plataforma} no Carrinho" class="h-24 rounded-lg">
    <div class="p-3 flex flex-col justify-between">
      <p class="text-slate-900 text-sm">${produto.nome}</p>
      <p class="text-green-700 text-lg">R$${produto.preco}</p>
    </div>
    <div class="absolute bottom-0 right-2 flex gap-2 text-slate-950 items-end text-l">
      <button id="decrementar-produto-${produto.id}">-</button>
      <p id="quantidade-${produto.id}">${quantidadeItensPorId[produto.id]}</p>
      <button id="incrementar-produto-${produto.id}">+</button>
    </div>
    `;
    
  // Remove o HTML interno ao containerProdutosCarrinho e transforma em texto, adiciona o novo cartão e monta de novo para HTML
  // No momento em que se é removido o HTML interno de containerProdutosCarrinho, o escutador de evento é perdido
  // Como um article sempre é criado quando um item é adicionado ao carrinho, o HTML interno ao article nunca será removido e, por consequência, nem o escutador de eventos dos botões HTML internos a ele
  elementoArticle.innerHTML += cartaoProdutoCarrinho;
  containerProdutosCarrinho.appendChild(elementoArticle);
      
  document.querySelector(`#incrementar-produto-${produto.id}`).addEventListener("click", () => incrementarQuantidadeProduto(produto.id));
    
  document.querySelector(`#decrementar-produto-${produto.id}`).addEventListener("click", () => decrementarQuantidadeProduto(produto.id));

  document.querySelector(`#remover-${produto.id}`).addEventListener("click", () => removerDoCarrinho(produto.id));

}

export function adicionarAoCarrinho(idProduto) {

  // Verifica se o id do produto que foi clicado para adicionar ao carrinho existe como chave no objeto quantidadeItensPorId
  // Caso ele não exista, o cartão do produto será desenhado na seção containerProdutosCarrinho
  if (idProduto in quantidadeItensPorId) {

    incrementarQuantidadeProduto(idProduto);
    return;

  }

  quantidadeItensPorId[idProduto] = 1;
  salvarLocalStorage("carrinho", quantidadeItensPorId);
  desenharProdutoNoCarrinho(idProduto);
  atualizarPrecoCarrinho();

}

export function atualizarPrecoCarrinho() {

  const precoCarrinho = document.querySelector("#preco-total");
  let precoTotalCarrinho = 0;

  for (const idProdutoCarrinho in quantidadeItensPorId) {

    const produtoCarrinho = catalogo.find(produto => produto.id === idProdutoCarrinho);

    precoTotalCarrinho += produtoCarrinho.preco * quantidadeItensPorId[idProdutoCarrinho];

  }

  salvarLocalStorage("total", precoTotalCarrinho);

  precoCarrinho.innerText = `R$${precoTotalCarrinho.toFixed(2)}`;

}