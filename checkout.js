import { apagarDoLocalStorage, desenharProdutoCarrinhoSimples, lerLocalStorage, salvarLocalStorage } from "./src/utilidades";

function renderizarProdutosCheckout() {
  
  const quantidadeItensPorId = lerLocalStorage("carrinho") ?? {};

  for (const idProduto in quantidadeItensPorId) {

    desenharProdutoCarrinhoSimples(idProduto, "container-produtos-checkout", quantidadeItensPorId[idProduto]);

  }

  if (localStorage.getItem("total")) {
    document.getElementById("preco-total").innerText = `R$${lerLocalStorage("total").toFixed(2)}`
  }

}

function finalizarCompra(evento) {

  evento.preventDefault();

  const quantidadeItensPorId = lerLocalStorage("carrinho") ?? {};
  const total = lerLocalStorage("total") ?? 0;

  if(Object.keys(quantidadeItensPorId).length === 0) {
    alert("Não é possível finalizar a compra, pois não existem produtos no carrinho");
    return;
  }

  const dataAtual = new Date();

  const pedidoFeito = {
    dataPedido: dataAtual.toLocaleDateString("pt-BR", {hour: "2-digit", minute: "2-digit", second: "2-digit"}),
    pedido: quantidadeItensPorId,
    valor: total
  };

  const historicoDePedidos = lerLocalStorage("historico") ?? [];
  const historicoDePedidosAtualizado = [pedidoFeito, ...historicoDePedidos]; // ... = espalhamento dos elementos do Array, ou sprad

  salvarLocalStorage("historico", historicoDePedidosAtualizado);
  apagarDoLocalStorage("carrinho");
  apagarDoLocalStorage("total");

  window.location.href = "./pedidos.html";
}

renderizarProdutosCheckout();

document.addEventListener("submit", (evt) => finalizarCompra(evt))