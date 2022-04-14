let cartIcon = document.querySelector('#cart-icon');
let cart = document.querySelector('.cart');
let closeCart = document.querySelector('#close-cart');

var total = 0;

/*open cart*/
cartIcon.onclick = () => {
    cart.classList.add("active");

}

/*close cart*/
closeCart.onclick = () => {
    cart.classList.remove("active");
}

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

/*prepares input to be read from the add cart button, remove item icon, or change of quantity inputs*/
function ready() {

    var removeCartButtons = document.getElementsByClassName("cart-remove");
    for (var i = 0; i < removeCartButtons.length; i++) {
        var button = removeCartButtons[i];
        button.addEventListener('click', removeCartItem);
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity');
    for (var i = 0; i < quantityInputs.length; i++) {
        var inputs = quantityInputs[i];
        inputs.addEventListener('change', quantityChanged);
    }

    var addCart = document.getElementsByClassName('add-cart');
    for (var i = 0; i < addCart.length; i++) {
        var button = addCart[i];
        button.addEventListener('click', addCartClicked);
    }

    document.getElementsByClassName('btn-buy')[0].addEventListener('click', buyButtonClicked); /*document is always listening for the buy button to be pressed*/
}

/*when buy button is clicked, the items in the cart are cleared and the showTotal method is called before the total is cleared in the updateTotal method*/
function buyButtonClicked() {
    var cartContent = document.getElementsByClassName('cart-content')[0];
    while (cartContent.hasChildNodes()) {
        cartContent.removeChild(cartContent.firstChild);
    }
    showTotal();
    updateTotal();
    
}

/*opens checkout page and sends subtotal as query string so it can be retrieved by the checkout page*/
function showTotal() {
    window.document.location = './index.html' + '?subTotal=' + total;
}

/*when remove cart icon is clicked, its item is removed from the cart and the total cost is updated*/
function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updateTotal();
}

/*if quantity of an item is changed, the total will be updated*/
function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
   updateTotal();   
}

/*if the add cart button is clicked, that particular item will have its information retrieved and displayed in the cart*/
function addCartClicked(event) {
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName('product-title')[0].innerText;
    var price = shopProducts.getElementsByClassName('price')[0].innerText;
    var productImg = shopProducts.getElementsByClassName('product-img')[0].src;
    addProductToCart(title, price, productImg);
    updateTotal();
}

/*takes product info and makes a new element in the cart for that product to be displayed*/
function addProductToCart(title, price, productImg) {
    var cartShopBox = document.createElement('div');
    cartShopBox.classList.add('cart-box');
    var cartItems = document.getElementsByClassName('cart-content')[0];
    console.log("test", cartItems);

    var cartItemsNames = cartItems.getElementsByClassName('cart-product-title');

    for (var i = 0; i < cartItemsNames.length; i++) {
        if (cartItemsNames[i].innerText == title) {
            alert('You have already added this item to cart');
            return;
        }
    }

        var cartBoxContent = `<img src="${productImg}" alt="" class="cart-img"/> <div class="detail-box"> <div class="cart-product-title">${title}</div> <div class="cart-price">${price}</div> <input type="number" value="1" class="cart-quantity"/> </div> <i class="fa-solid fa-trash cart-remove"></i>`;

        cartShopBox.innerHTML = cartBoxContent;
        cartItems.append(cartShopBox);
        cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItem);
        cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged);
       
}

/*updates the total cost of the cart order*/
function updateTotal() {
    
    var cartContent = document.getElementsByClassName("cart-content")[0];
    var cartBoxes = cartContent.getElementsByClassName("cart-box");
     total = 0;
    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName("cart-price")[0];
        var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
        var quantity = quantityElement.value;
        var price = parseFloat(priceElement.innerText.replace("$", ""));
        total = total + (price * quantity);
    }
        total = Math.round(total * 100) / 100;
        document.getElementsByClassName("total-price")[0].innerText = '$' + total;
    }
