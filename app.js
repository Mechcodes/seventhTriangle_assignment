
const API_URL = "https://run.mocky.io/v3/92348b3d-54f7-4dc5-8688-ec7d855b6cce?mocky-delay=500ms";


const fetchProductsBtn = document.getElementById("fetchProductsBtn");
const productGrid = document.getElementById("productGrid");


fetchProductsBtn.addEventListener("click", fetchProducts);


async function fetchProducts() {
  try {
    productGrid.innerHTML = "";


    const response = await fetch(API_URL);
    const data = await response.json(); 

    data.forEach(({ product }) => displayProduct(product));
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

function displayProduct({ images, title, variants, body_html }) {
  const productCard = document.createElement("div");
  productCard.classList.add("product-card");

  const [image] = images;
  const [{ price }] = variants;

  const addToCartButton = document.createElement("button");
  addToCartButton.classList.add("add-to-cart");
  addToCartButton.textContent = " 🛒 Add to Cart";
  addToCartButton.addEventListener("click", () => addToCart(title, price));

  productCard.innerHTML = `
    <img src="${image.src}" alt="${image.alt || 'Product image'}">
    <h2 class="product-name">${title}</h2>
    <p class="product-price">$${price}</p>
  `;

  productCard.appendChild(addToCartButton);

  productGrid.appendChild(productCard);

  setTimeout(() => {
    productCard.style.transform = "translateY(0)";
    productCard.style.opacity = "1";
  }, 10);
}

function addToCart(title, price) {
  alert(`${title} has been added to your cart. Price: $${price}`);
}
