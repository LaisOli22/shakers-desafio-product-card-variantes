# shakers-desafio-product-card-variantes

## Sobre o desafio

Este projeto tem como objetivo demonstrar a implementação de um **Product Card customizado** na Shopify sem utilizar o formulário nativo `<product-form>`.

O desafio trabalha conceitos fundamentais de qualquer e-commerce:

- Produtos
- Variantes
- Manipulação de dados via Liquid
- Interação com o carrinho utilizando a Cart API
- Integração entre Liquid e JavaScript

---

#  Objetivo

Criar um **Product Card customizado** capaz de:

- Exibir informações de um produto
- Permitir seleção dinâmica de variantes
- Atualizar o preço de acordo com a variante selecionada
- Adicionar o produto ao carrinho utilizando **JavaScript e Cart API**
- Funcionamento sem recarregar a página

---

#  Conceito de Variantes na Shopify

Na Shopify, um produto pode possuir diferentes **variantes**, que representam combinações de opções.

Neste desafio foi criado um produto chamado "Jogo de cama" com duas opções:

**Cor**
- Listrado
- Azul

**Tamanho**
- Solteiro
- Casal
- Queen
- King

Isso gera diferentes combinações, cada combinação corresponde a uma **variant** com seu próprio `variant_id`.

---

# Implementação

##  Produto com variantes

Foi criado um produto no Admin da Shopify contendo duas opções:

- Cor
- Tamanho

Cada combinação gera automaticamente uma variante.

---

##  Product Card Customizado

Foi desenvolvido um card customizado contendo:

- Imagem do produto
- Título
- Preço da variante selecionada
- Seletores de Cor
- Seletores de Tamanho
- Botão próprio de **Add to Cart**

Sem utilizar o `<product-form>` padrão da Shopify.

Arquivo:

snippets/product-card-custom.liquid


---

##  Exposição das variantes para JavaScript

As variantes do produto são convertidas para JSON dentro do snippet:

```liquid
<script type="application/json" class="product-variants">
  {{ product.variants | json }}
</script> 
```

Isso permite que o JavaScript manipule os dados de variantes.

---

##  Seleção dinâmica de variantes

No JavaScript:

Os botões de seleção foram capturados, depois as opções escolhidas são armazenadas e a variante correspondente é buscada utilizando find()

Exemplo:
````
variants.find((variant) => {
  return (
    variant.option1 === selectedOptions["Cor"] &&
    variant.option2 === selectedOptions["Tamanho"]
  );
});
````
Quando a variante correta é encontrada:

O preço é atualizado

O variant_id é armazenado

---

## Add to Cart com Cart API

O botão customizado utiliza a API do carrinho da Shopify:

POST /cart/add.js

Implementado utilizando:

fetch

async/await

try/catch

Exemplo:
````
await fetch('/cart/add.js', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    id: selectedVariant.id,
    quantity: 1
  })
});
````
O produto é adicionado ao carrinho sem reload da página.


## Como rodar localmente

### Instalar Shopify CLI

```bash
npm install -g @shopify/cli @shopify/theme
```

### Login na loja

```bash
shopify login
```

### Rodar ambiente de desenvolvimento

```bash
shopify theme dev
```

### Abrir o editor do tema e adicionar a section:

`product-grid`

---

### Link do Pull request
https://github.com/LaisOli22/shakers-desafio-product-card-variantes/pull/1

### Link do Vídeo
https://drive.google.com/file/d/1OCoSPWw2EnseZ2xBB4aXf5xcpnKvt7lu/view?usp=sharing
