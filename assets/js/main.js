// لیست محصولات نمونه با تصاویر از jsonplaceholder
const products = [
  {
    id: 1,
    title: "گوشی موبایل",
    price: 13500000,
    image: "assets/img/mobile.jpg"
  },
  {
    id: 2,
    title: "گیم کنترلر",
    price: 15500000,
    image: "assets/img/car.webp"
  },
  {
    id: 3,
    title: "مانیتور1",
    price: 8100000,
    image: "assets/img/monitor2.png"
  },
  {
    id: 4,
    title: "مانیتور2",
    price: 7500000,
    image: "assets/img/monitor1.png"
  },
];

//نمایش محصولات در صفحه
const productsList = document.getElementById("products-list");

products.forEach(product => {
  const div = document.createElement("div");
  div.className = "product";
  div.innerHTML = `
    <img src="${product.image}" alt="${product.title}">
    <div class="product-title">${product.title}</div>
    <div class="product-price>"${product.price.toLocaleString()}تومان</div>
    <button class="add-btn" data-id="${product.id}">افزودن به سبد</button>
    `;
  productsList.appendChild(div);
})
//هندلر دکمه اضافه کردن به سبد
productsList.addEventListener("click", function (e) {
  if(e.target.classList.contains("add-btn")){
    const id = Number(e.target.dataset.id);

    addToCart(id);
  }
})

// سبد خرید به صورت آرایه ساده
const cart = [];

// اضافه کردن به سبد خرید
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if(!product) return;

  const item = cart.find(i => i.id === productId);
  if(item) {
    item.qty += 1
  } else {
    cart.push({id: product.id, title: product.title, price: product.price, qty: 1})
  }
  renderCart();
}
// دکمه حذف محصول از سبد
function removeFromCart(productId) {
  const index = cart.findIndex(p => p.id === productId);
  if (index !== -1) {
    cart.splice(index, 1);
    renderCart();
  }
}
// نمایش سبد خرید
function renderCart() {
  const cartList = document.getElementById("cart-list");
  cartList.innerHTML = ""

  cart.forEach(item => {
    const li = document.createElement("li");
    li.className = "cart-item";
    li.innerHTML = `
      <span class="cart-item-title">${item.title}</span>
      <span class="cart-item-qty">x${item.qty}<span>
      <button class="remove-btn" data-id="${item.id}">حذف</button>
      `;
    cartList.appendChild(li);
  })

  const total = cart.reduce((sum ,item) => sum + item.price * item.qty,0);
  document.getElementById("cart-total").textContent = `جمع:${total.toLocaleString()}تومان`
}
const cartList = document.getElementById("cart-list");
//هندلر دکمه حذف از سبد
cartList.addEventListener("click" , function (e) {
  if(e.target.classList.contains("remove-btn")) {
    const id = Number(e.target.dataset.id);

    removeFromCart(id);
  }
})

// نمایش اولیه سبد خرید
renderCart();