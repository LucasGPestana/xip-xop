import { lerLocalStorage, desenharProdutoCarrinhoSimples } from "./src/utilidades";

function criarPedidoHistorico(pedidoComData) {
  const elementoPedido = `<p class="text-xl font-bold my-4">${pedidoComData.dataPedido}</p>
  <section id="container-pedidos-${pedidoComData.dataPedido}" class= "bg-slate-300 p-3 rounded-md"></section>
  <p class="text-xl font-bold my-4">Total: R$${pedidoComData.valor.toFixed(2)}</p>
  `;

  const main = document.getElementsByTagName("main")[0]
  main.innerHTML += elementoPedido;

  for (const idProduto in pedidoComData.pedido) {

    desenharProdutoCarrinhoSimples(idProduto, `container-pedidos-${pedidoComData.dataPedido}`, pedidoComData.pedido[idProduto]);

  }
}

function renderizarHistoricoPedidos() {

  const historico = lerLocalStorage("historico");

  for (const pedidoComData of historico) {
    criarPedidoHistorico(pedidoComData);
  }

}

renderizarHistoricoPedidos();