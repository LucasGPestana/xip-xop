export const catalogo = [
  {
    id: "1",
    nome: "Rayman Origins",
    plataforma: "Playstation 3",
    preco: 40,
    imagem: "product-1.webp"
  },
  {
    id: "2",
    nome: "Rayman Legends",
    plataforma: "Playstation 3",
    preco: 80,
    imagem: "product-2.webp"
  },
  {
    id: "3",
    nome: "God Of War 3",
    plataforma: "Playstation 3",
    preco: 70,
    imagem: "product-3.webp"
  },
  {
    id: "4",
    nome: "Sombras de Mordor",
    plataforma: "Playstation 4",
    preco: 120,
    imagem: "product-4.webp"
  },
  {
    id: "5",
    nome: "God Of War 4",
    plataforma: "Playstation 4",
    preco: 100,
    imagem: "product-5.webp"
  },
  {
    id: "6",
    nome: "Assassin's Creed: Brotherhood",
    plataforma: "Playstation 3",
    preco: 60,
    imagem: "product-6.webp"
  },
  {
    id: "7",
    nome: "Deus Ex: Mankind Divided",
    plataforma: "Playstation 4",
    preco: 90,
    imagem: "product-7.webp"
  },
  {
    id: "8",
    nome: "The Legend Of Zelda: Breath of the Wild",
    plataforma: "Nintendo Switch",
    preco: 200,
    imagem: "product-8.webp"
  },
  {
    id: "9",
    nome: "Red Dead Redemption",
    plataforma: "Xbox 360",
    preco: 55,
    imagem: `product-9.webp`
  },
]

export function salvarLocalStorage(chave, informacao) {

  localStorage.setItem(chave, JSON.stringify(informacao));

}

export function lerLocalStorage(chave) {

  return JSON.parse(localStorage.getItem(chave));

}

export function apagarDoLocalStorage(chave) {

  localStorage.removeItem(chave);

}

export function desenharProdutoCarrinhoSimples(idProduto, idContainerHTML, quantidadeProduto) {

  const produto = catalogo.find(produto => produto.id === idProduto); // Similar ao filter, só que retorna o primeiro elemento cuja condição for True

  const containerProdutosCarrinho = document.getElementById(idContainerHTML);
  
  const elementoArticle = document.createElement("article"); // <article></article>
  const articleClasses = ["flex", "bg-stone-200", "rounded-lg", "relative", "mb-2", "w-96"]; 

  for (const articleClass of articleClasses) {

    elementoArticle.classList.add(articleClass);

  }

  const cartaoProdutoCarrinho = `
    <img src="./assets/img/${produto.imagem}" alt="Jogo ${produto.nome} de ${produto.plataforma} no Carrinho" class="h-24 rounded-lg">
    <div class="p-3 flex flex-col justify-between">
      <p class="text-slate-900 text-sm">${produto.nome}</p>
      <p class="text-green-700 text-lg">R$${produto.preco}</p>
    </div>
    <div class="absolute bottom-0 right-2 flex gap-2 text-slate-950 items-end text-l">
      <p id="quantidade-${produto.id}">${quantidadeProduto}</p>
    </div>
    `;
    
  // Remove o HTML interno ao containerProdutosCarrinho e transforma em texto, adiciona o novo cartão e monta de novo para HTML
  // No momento em que se é removido o HTML interno de containerProdutosCarrinho, o escutador de evento é perdido
  // Como um article sempre é criado quando um item é adicionado ao carrinho, o HTML interno ao article nunca será removido e, por consequência, nem o escutador de eventos dos botões HTML internos a ele
  elementoArticle.innerHTML += cartaoProdutoCarrinho;
  containerProdutosCarrinho.appendChild(elementoArticle);

}