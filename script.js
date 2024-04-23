//variable section
const productContainer = document.querySelector('#productContainer');
const itemCounter = document.querySelector('.itemCounter');
const cartListContainer = document.querySelector('#cartListContainer');
const totalCartPrice = document.querySelector('#totalCartPrice');
const cartmsg = document.querySelector('#cartmsg');
const cartIcon = document.querySelector('#cartIcon');
console.log(cartIcon)
console.log(totalCartPrice)
let totalCartAmount = 0;
console.log(totalCartAmount)
let newtotalCartAmount = totalCartAmount.toFixed(2);
totalCartPrice.textContent = `Total - $${newtotalCartAmount}`;

let url = 'https://fakestoreapi.com/products';

//item conuter value
let currentItemValue = 0;
itemCounter.textContent = currentItemValue;


async function getProduct() {
    let response = await fetch(url);
    let data = await response.json();
    showProduct(data);
}
getProduct(); // calling async function here

//show item on web page
function showProduct(data) {
    console.log(data)
    data.map((item) => {
        let productCard = document.createElement('div');
        productCard.setAttribute('class', 'productCard');
        let inputString = item.category;
        let outputString = inputString.replace(/[^a-zA-Z0-9]/g, '');
        productCard.classList.add(outputString);
        productCard.classList.add('hidden')
        let imgElement = document.createElement('img');
        imgElement.setAttribute('src', item.image);
        imgElement.setAttribute('class', 'proimg');
        let paraElement1 = document.createElement('p');
        paraElement1.setAttribute('class', 'proTitle');
        paraElement1.textContent = item.title;
        let paraElement2 = document.createElement('p');
        paraElement2.setAttribute('class', 'proPrice');
        paraElement2.textContent = `$${Math.floor(item.price)}`;
        let buttonElement = document.createElement('button');
        buttonElement.setAttribute('class', 'cartBtn');
        buttonElement.textContent = 'Add to Cart'
        productCard.append(imgElement, paraElement1, paraElement2, buttonElement);
        productContainer.append(productCard);

        buttonElement.addEventListener('click', () => addToCart(item.image, item.price));

    })
}
// add to cart item in cart box
function addToCart(img, price) {
    // create html elemetn and append into html document
     console.log(Math.floor(price))
    let cartItemElm = document.createElement('div');
    cartItemElm.setAttribute('class', 'cartItem');
    let cartImgelm = document.createElement('img');
    cartImgelm.setAttribute('src', img);
    cartImgelm.setAttribute('class', 'cartImg')
    let cartPrice = document.createElement('p');
    cartPrice.setAttribute('class', 'cartProPrice');
    cartPrice.textContent = `$${Math.floor(price)}`;
    let deletIconelm = document.createElement('i');
    deletIconelm.setAttribute('class', 'fa-solid fa-trash');
    deletIconelm.setAttribute('onclick', 'deletCartItem(this)')
    cartItemElm.append(cartImgelm, cartPrice, deletIconelm);
    console.log('cartelm',cartItemElm)
        cartListContainer.append(cartItemElm);
    

    // assigne add cartItem price to TotalCartPrice;
    totalCartAmount = eval(totalCartAmount + Math.floor(price));
        totalCartPrice.textContent = `Total - $${totalCartAmount}`;

    // change item counter value 
    currentItemValue = currentItemValue + 1;
    itemCounter.textContent = currentItemValue;

    //cheack cartList is empty or note
    if (cartListContainer.hasChildNodes()) {
        cartmsg.textContent = 'Your Cart Items'
    }
}


//Delete cart item logic
function deletCartItem(e) {
    let parentElm = e.parentNode;
    parentElm.remove();
    currentItemValue = currentItemValue - 1;
    itemCounter.textContent = currentItemValue;
    let deletItemPrice = e.previousElementSibling.textContent.slice(1);
    totalCartAmount = totalCartAmount - deletItemPrice;
    totalCartPrice.textContent = `Total - $${totalCartAmount}`;
    if (cartListContainer.childNodes.length == 0) {
        cartmsg.textContent = 'Your Cart Is Empty'
    }

}

/*********************************************************************** */
//filter product logic
window.onload = () => {
    // getProduct();
    filterProduct('All')
}

function filterProduct(value) {
    let buttons = document.querySelectorAll('.btn-value');
    console.log(buttons)
    buttons.forEach((button) => {
        let outputString = button.textContent.replace(/[^a-zA-Z0-9]/g, '');

        if (value == outputString) {
            button.classList.add('active')
        } else {
            button.classList.remove('active')
        }
    });

    setTimeout(() => {
        let cards = document.querySelectorAll('.productCard');
        cards.forEach((card) => {
            if (value == 'All') {
                card.classList.remove('hidden')
            } else {
                if (card.classList.contains(value)) {
                    card.classList.remove('hidden')
                }
                else {
                    card.classList.add('hidden')
                }
            }
        })

    }, 500);



}

//searching item 
const inputSearch = document.querySelector('#searchBar')
const searchBtn = document.querySelector('#searchBtn')

searchBtn.addEventListener('click', () => {
    let inputValue = inputSearch.value.toLowerCase(); // Convert input value to lowercase
    console.log(inputValue)
    let cards = document.querySelectorAll('.productCard');
    cards = Array.from(cards); // Convert NodeList to Array
    let filterProduct = cards.filter((card) => card.textContent.toLowerCase().includes(inputValue));
    let productContainer = document.querySelector('#productContainer')
    productContainer.innerHTML = ''; // Clear previous content
    filterProduct.forEach((card) => {
        productContainer.appendChild(card);
    });
})

const checkoutBtn = document.querySelector('button[type="submit"]');

checkoutBtn.addEventListener("click", (e) => {
    e.preventDefault();
    window.open('checkout.html', '_blank');
});

document.addEventListener('DOMContentLoaded', function() {
    const checkoutPriceElement = document.getElementById('checkoutPrice');
    if (checkoutPriceElement) {
        checkoutPriceElement.textContent = '$100.00'; // Example value, replace with your actual total price
    } else {
        console.error('Element with ID "checkoutPrice" not found');
    }
});
















