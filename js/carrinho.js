// Objetivo 1 - quando clicar no botao de adicionar ao carrinho temos que atualizar o
// contador, adicionar o produto no localStorage e atualizar o html do carrinho
//     parte 1 - vamos adicionar +1 no icone do carrinho
//     

//     passo 3 - pega as informações do produto clicado e adicionar no localStorage
//     passo 4 - atualizar o contador do carrinho de compras
//     passo 5 - renderizar a tabela do carrinho de compras

// Objetivo 2 - remover produtos
//     passo 1 - pegar o botão de deletar do html
//     passo 2 - adicionar evento de escuta no botão
//     passo 3 - remover o produto do localStorage
//     passo 4 - atualizar o html do carrinho retirando o produto
//     passo 5 - atualizar o valor

// Objetivo 3 - Atualizar os valores do carrinho
//     passo 1 - pegar o input de quantidade do carrinho
//     passo 2 - adicionar evento de escuta no input
//     passo 3 - atualizar o valor total do produto
//     passo 4 - atualizar o valor total do carrinho

// passo 1 - pegar os botões de adicionar ao carrinho do html
const botoesAdicionarAoCarrinho = document.querySelectorAll(".adicionar-ao-carrinho");
console.log(botoesAdicionarAoCarrinho);

//     passo 2 - adicionar uma evento de escuta nesses botões pra quando clicar disparar uma acao
botoesAdicionarAoCarrinho.forEach((botao) => {
    botao.addEventListener("click", (evento) => {
        console.log("Botão de adicionar ao carrinho clicado");
    });
});

// passo 3 - pega as informações do produto clicado e adicionar no localStorage




