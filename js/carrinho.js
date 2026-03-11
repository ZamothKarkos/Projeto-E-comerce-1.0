const botoesAdicionarAoCarrinho = document.querySelectorAll('.adicionar-ao-carrinho');
//     passo 2 - adicionar uma evento de escuta nesses botões pra quando clicar disparar uma ação.
botoesAdicionarAoCarrinho.forEach((botao) => {
    botao.addEventListener("click", (evento) => {
        console.log("Botão de adicionar ao carrinho clicado!");
        //passo 3 - pega as informações do produto clicado e adicionar no localStorage
        const elementoProduto = evento.target.closest(".produto");
        const produtoId = elementoProduto.dataset.id;
        const produtoNome = elementoProduto.querySelector(".nome").textContent;
        const produtoImagem = elementoProduto.querySelector("img").getAttribute("src");
        const produtoPreco = parseFloat(elementoProduto.querySelector(".preco").textContent.replace("R$ ", "").replace(".", " ").replace(",", "."));

        //buscar a lista de produtos do localStorage
        const carrinho = obterProdutosDoCarrinho();
        //testar se o produto já existe no carrinho
        const existeProduto = carrinho.find(produto => produto.id === produtoId);
        //se existe produto, incrementar a quantidade
        if (existeProduto) { // Changed 'existente' to 'existeProduto'
            existeProduto.quantidade += 1;
        } else {
            //se não existe, adicionar produto com quantidade 1
            const produto = {
                id: produtoId,
                nome: produtoNome,
                imagem: produtoImagem,
                preco: produtoPreco,
                quantidade: 1,
            };
            carrinho.push(produto);
        }
        salvarProdutosNoCarrinho(carrinho);
        atualizarContadorCarrinho();
    });
});

function salvarProdutosNoCarrinho(carrinho) {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

function obterProdutosDoCarrinho() {
    // console.log(obterProdutosDoCarrinho);
    const produtos = localStorage.getItem("carrinho");
    return produtos ? JSON.parse(produtos) : [];
}

//passo 4 - atualizar o contador do carrinho de compras
function atualizarContadorCarrinho() {
    const produtos = obterProdutosDoCarrinho();
    let total = 0;

    produtos.forEach(produto => {
        total += produto.quantidade;
    });

    document.getElementById("contador-carrinho").textContent = total;
}

atualizarContadorCarrinho();
// console.log(atualizarContadorCarrinho);

//passo 5 - renderizar a tabela do carrinho de compras
function renderizarTabelaDoCarrinho() {
    const produtos = obterProdutosDoCarrinho();
    const corpoTabela = document.querySelector("#modal-1-content tbody");
    corpoTabela.innerHTML = ""; // limpar tabela antes de renderizar
    produtos.forEach(produto => {
        const tr = document.createElement("tr");
        tr.dataset.id = produto.id;
        const precoTotal = produto.preco * produto.quantidade;
        tr.innerHTML = `<td class="td-produto">
        <img 
            src="${produto.imagem}"
            alt="${produto.nome}"
        </td>
        <td class="td-preco-unitario">R$ ${produto.preco.toFixed(2).replace(".", ",")}</td>
        <td class="td-quantidade"><input class="quantidade-input" type="number" value="${produto.quantidade}" min="1"></td>
        <td class="td-preco-total">R$ ${precoTotal.toFixed(2).replace(".", ",")}</td>
        <td><button class="btn-remover" data-id="${produto.id}" id="deletar"></button></td>`;
        corpoTabela.appendChild(tr);
    });
    atualizarValorTotalCarrinho();
}

renderizarTabelaDoCarrinho();

// Objetivo 2 - remover produtos do carrinho
//     passo 1 - pegar o botão de deletar do html
const corpoTabela = document.querySelector("#modal-1-content table tbody");
if (corpoTabela) {
    corpoTabela.addEventListener("click", evento => {
        // identificamos o botão com a classe usada na renderização
        if (evento.target.classList.contains('btn-remover')) {
            const id = evento.target.dataset.id;
            removerDoCarrinho(id);
        }
    });
}

function removerDoCarrinho(id){
    console.log(removerDoCarrinho);
    const produtos = obterProdutosDoCarrinho();
    // filtrar os produtos que não têm o id por parâmetro
    const carrinhoAtualizado = produtos.filter(produto => produto.id !== id);
    salvarProdutosNoCarrinho(carrinhoAtualizado);
    atualizarContadorCarrinho();
    renderizarTabelaDoCarrinho();
}

corpoTabela.addEventListener("input", evento => {
    const inputQuantidade = evento.target;
    if (!inputQuantidade.matches("input[type='number']")) return;

    const linhaProduto = inputQuantidade.closest("tr");
    if (!linhaProduto) return;

    const idProduto = linhaProduto.dataset.id;
    let novaQuantidade = parseInt(inputQuantidade.value, 10);
    if (Number.isNaN(novaQuantidade) || novaQuantidade < 1) {
        novaQuantidade = 1;
        inputQuantidade.value = 1;
    }

    const carrinho = obterProdutosDoCarrinho();
    const produto = carrinho.find(item => item.id === idProduto);
    if (!produto) return;

    produto.quantidade = novaQuantidade;
    salvarProdutosNoCarrinho(carrinho);
    atualizarContadorCarrinho();

    const precoTotalCelula = linhaProduto.querySelector(".td-preco-total");
    if (precoTotalCelula) {
        const novoPrecoTotal = produto.preco * produto.quantidade;
        precoTotalCelula.textContent = "R$ " + novoPrecoTotal.toFixed(2).replace(".", ",");
    }

    atualizarValorTotalCarrinho();
});

function atualizarValorTotalCarrinho() {
    const produtos = obterProdutosDoCarrinho();
    const total = produtos.reduce((soma, produto) => soma + produto.preco * produto.quantidade, 0);
    const elementoTotal = document.getElementById("total-carrinho");
    if (elementoTotal) {
        elementoTotal.textContent = `Total: R$ ${total.toFixed(2).replace(".", ",")}`;
    }
}
