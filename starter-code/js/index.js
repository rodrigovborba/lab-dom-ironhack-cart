// ITERATION 1

function updateSubtotal($product) {
  // First - Criate a variable that receive the DOM Nodes
  // from the price and quantities of the products.
  const $price = $product.querySelector(".price span");
  const $quantity = $product.querySelector(".quantity input");
  // Second - Get the values from the variables that have the DOM
  // Nodes
  const valuePrice = parseFloat($price.innerText);
  const valueQuantity = $quantity.valueAsNumber;
  // Third - Criate a variable the is going to be the subtotal of
  // the multiplication between the values into the two variables
  // criated before.
  const subTotal = valuePrice * valueQuantity;
  // Forth - Get the DOM Node which has the value of the subtotal,
  const $subTotal = $product.querySelector(".subtotal span");
  // Fifth - Then I can say that the last variable is going to be the new
  // value
  $subTotal.innerText = subTotal;
  // Last - Return the variable with the Math.
  return subTotal;
}

// ITERATION 2

function calculateAll() {
  //First - Get the DOM Node for each product
  const $products = document.getElementsByClassName('product');
  //Second - Declare a variable that will be the sum of each subtotal product
  let totalValue = 0;
  //Last - The total value is going to be the total value + updateSubTotal of the product
  for (let $product of $products) {
    totalValue += updateSubtotal($product);
  }

  // ITERATION 3

  //First - Display the total value of products in cart in the appropriate node
  document.querySelector('#total-value span').innerHTML = totalValue;
}
//Second - Select "calculate prices" button
const $calculateTrigger = document.getElementById('calculate');
//Last - Listener is going to take clicks from the "calculate prices" button and we need to call the
//calculateAll to do the operation
$calculateTrigger.addEventListener('click', calculateAll);

// ITERATION 4

function productRemoveListener(event) {
  // console.log(event);
  const $target = event.target;
  //console.dir($target)
  //Criate a variable that receives the row. To know where the row is, we need to console.dir($target)
  //In this case, the row is a parentNode of a parentNode.
   const $row = $target.parentNode.parentNode;
   //Then I have to access the parent node and call the function removeChild.
   //It's better to create a variable, that is going to receive the parent node from the row.
   const $parent = $row.parentNode;

   $parent.removeChild($row);
}

//First - We need to start querying the document from all removing buttons and click every event listener
//to it.
//The load is saying that I have to load all of the removeButtons, in my document, which is my btn-remove
window.addEventListener('load', () => {
  const $removeButtons = document.querySelectorAll('.btn-remove');
  //Now we do a "for of" passing to a variable that is gonna take one button to all removebuttons.
  for (let $removeButton of $removeButtons) {
    //so, whenever you click in the button, it calls the funcion productRemoveListener in this variable
    $removeButton.addEventListener('click', productRemoveListener);
  }
});

// ITERATION 5

function createProduct(event) {
  //First - Criate a variable the receive the DOM Node of the row.
  const $createRow = event.currentTarget.parentNode.parentNode;
  //Second - Criate 2 variables which are going to receive the inputs from the 
  const $productNameInput = $createRow.querySelector('input');
  const $productPriceInput = $createRow.querySelector('input[type="number"]');

  const nameValue = $productNameInput.value;
  const priceValue = $productPriceInput.valueAsNumber;

  const $tableRow = document.createElement('tr');
  $tableRow.classList.add('product');
  $tableRow.innerHTML += `
    <td class="name">
      <span>${nameValue}</span>
    </td>
    <td class="price">$<span>${priceValue.toFixed(2)}</span></td>
    <td class="quantity">
      <input type="number" value="0" min="0" placeholder="Quantity" />
    </td>
    <td class="subtotal">$<span>0</span></td>
    <td class="action">
      <button class="btn btn-remove">Remove</button>
    </td>
  `;

  const $removeButton = $tableRow.querySelector('.btn-remove');

  $removeButton.addEventListener('click', productRemoveListener);

  const $parent = document.querySelector('#cart tbody');

  $parent.appendChild($tableRow);

  $productNameInput.value = '';
  $productPriceInput.valueAsNumber = 0;
}

window.addEventListener('load', () => {
  const $createButton = document.getElementById('create');
  if ($createButton) {
    $createButton.addEventListener('click', createProduct);
  }
});
