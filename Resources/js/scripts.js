const itemList = document.getElementById('item-list')
const cartQty = document.getElementById('cart-qty')
const cartTotal = document.getElementById('cart-total')

const itemsContainer = document.getElementById('items')
import data from './data.js'

for (let i=0; i<data.length; ++i) {
  let newDiv = document.createElement('div');
    newDiv.className = 'item'
  let img = document.createElement('img');
  img.src = data[i].image
  img.width = 300
  img.height = 300
  newDiv.appendChild(img)

  let desc = document.createElement('P')
  desc.innerText =data[i].desc
  newDiv.appendChild(desc)
  let price = document.createElement('P')
  price.innerText = data[i].price
  newDiv.appendChild(price)

  let button = document.createElement('button')
  button.id = data[i].name
  button.dataset.price = data[i].price
  button.innerHTML = "Add to Cart"
  newDiv.appendChild(button)
  itemsContainer.appendChild(newDiv)
}
const all_items_button = Array.from(document.querySelectorAll("Button"))
all_items_button.forEach(et => Element.addEventListner('click', () =>{
  addItem(elt.getAttribute('id'), elt.getAttribute('data-price'))
  showItems()
}))

const cart = []
itemList.onchange = function(e) {
  if (e.target && e.target.classList.contains('update')) {
    const name = e.target.dateset.name
    const qty = parseInt(e.target.value)
    updateCart(name, qty)
  }
}
itemList.onclick = function() {
 if (e.target && e.target.classList.contains('remove')) {
  const name = e.target.dataset.name  
  removeItem(name)
 } else if (e.target && e.target.classList.contains('add-one')){
  const name = e.target.dataset.name
  addItem(name)
 } else if (e.target && e.target.classList.contains('remove-one')) {
  const name = e.target.dataset.name
  removeItem(name, 1)
 }
}
// Add item function
function addItem(name,price) {
  for (let i =0; i < cart.length; i +=1) {
    if (cart[i].name === name) {
      cart[i].qty += 1
      showItems()
      return
    }
  }
  
  const item = {name,price,qty:1}  
  cart.push(item)
}

function showItems() {
  const qty = getQty()
  //console.log(`You have ${qty} items in your cart`)
  cartQty.innerHTML = `You have ${qty} items in your cart`
  for (let i = 0; i < cart.length; i += 1) {
     
   } 
   
   let itemStr = ''
   for (let i = 0; i < cart.length; i+=1) {
     // console.log(`-${cart[i].name}, ${cart[i].price} x ${cart[i].qty}`)

     const { name, price, qty} = cart[i]
     
     itemStr += `<li> 
      ${name} $${price} x ${qty} = ${qty * price} 
      < button class="remove" data-name=${name}""> Remove</button>
      < button class="add-one" data-name=${name}""> Remove</button>
      < button class="remove-one" data-name=${name}""> Remove</button>
      < input class="update" type="number" min="0" data-name="${name}">
     </li>`
   }
   itemList.innerHTML = itemStr
   
   //console.log(`Total in cart: $${getTotal()}`)
   cartTotal.innerHTML = `Total in cart: $${getTotal()}`
}  
// Get Qty
function getQty() {
  let qty = 0
  for (let i =0; i < cart.length; i += 1) {
    qty += cart[i].qty
  }
  return qty
}

function getTotal() {
  let total = 0
  for (let i = 0; i < cart.length; i += 1){
    total += cart[i].price * cart[i].qty
  }

  return total.toFixed(2)
} 

function removeItem(name, qty = 0) {
  for (let i = 0; i < cart.length; i += 1) {
    if (cart[i].name === name) {
      if (qty > 0) {
        cart[i].qty -= qty
      }
      if (cart[i].qty < 1  || qty === 0) {
        cart.splice(i, 1)
      }
      showItems()
      return 
    }
  }
}

function updateCart(name,qty) {
  for (let i = 0; i < cart.length; i += 1) {
    if (cart[i].name === name) {
      if (qty < 1) {
        removeItem(name)
        return
      }
      cart[i].qty = qty
      showItems()
      return
    }
  }
}
addItem('Happy',5.99)

showItems()