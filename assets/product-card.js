document.addEventListener("DOMContentLoaded", () => {

  const productCard = document.querySelector(".product-card");

  if (!productCard) return;

  const variants = JSON.parse(
    productCard.querySelector(".product-variants").textContent
  );

  const priceElement = productCard.querySelector(".product-price");

  const buttons = productCard.querySelectorAll(".variant-option");

  const addToCartBtn = productCard.querySelector(".add-to-cart");

  let selectedOptions = {};
  let selectedVariant = null;

  buttons.forEach((button) => {

    button.addEventListener("click", () => {

      const option = button.dataset.option;
      const value = button.dataset.value;

      selectedOptions[option] = value;

      findVariant();

    });

  });

  function findVariant() {

    selectedVariant = variants.find((variant) => {

      return (
        variant.option1 === selectedOptions["Cor"] &&
        variant.option2 === selectedOptions["Tamanho"]
      );

    });

    if (selectedVariant) {

      priceElement.textContent = formatMoney(selectedVariant.price);

    }

  }

  addToCartBtn.addEventListener("click", async () => {

    if (!selectedVariant) {
      alert("Selecione as opções");
      return;
    }

    try {

      const response = await fetch("/cart/add.js", {

        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          id: selectedVariant.id,
          quantity: 1
        })

      });

      const data = await response.json();

      alert("Produto adicionado ao carrinho!");

    } catch (error) {

      console.error(error);
      alert("Erro ao adicionar produto");

    }

  });

  function formatMoney(cents) {

    return "R$ " + (cents / 100).toFixed(2);

  }

});