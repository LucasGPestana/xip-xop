import { renderizarCatalogo } from "./src/cartaoProduto";
import { inicializarFiltros } from "./src/filtrosCatalogo";
import { catalogo } from "./src/utilidades";
import { atualizarPrecoCarrinho, inicializarCarrinho, renderizarProdutosCarrinho } from "./src/menu-carrinho";

renderizarCatalogo(catalogo);
renderizarProdutosCarrinho();
inicializarFiltros();
inicializarCarrinho();
atualizarPrecoCarrinho();