// Initialize an empty cart
let cart = [];

/**
 * Add item to cart
 * @param {Object} product - Product object with productId, productName, quantity, and price
 */
const addItemToCart = (product) => {
  cart.push(product);
  console.log(`Added ${product.productName} to cart`);
};

/**
 * Remove item from cart by product ID
 * @param {Number} productId - ID of the product to remove
 */
const removeItemFromCart = (productId) => {
  const index = cart.findIndex((product) => product.productId === productId);
  if (index !== -1) {
    cart.splice(index, 1);
    console.log(`Removed product with ID ${productId} from cart`);
  } else {
    console.log(`Product with ID ${productId} not found in cart`);
  }
};

/**
 * Update item quantity in cart
 * @param {Number} productId - ID of the product to update
 * @param {Number} newQuantity - New quantity for the product
 */
const updateItemQuantity = (productId, newQuantity) => {
  const product = cart.find((product) => product.productId === productId);
  if (product) {
    product.quantity = newQuantity;
    console.log(`Updated quantity of product with ID ${productId} to ${newQuantity}`);
  } else {
    console.log(`Product with ID ${productId} not found in cart`);
  }
};

/**
 * Calculate total cost of items in cart
 * @returns {Number} Total cost of items in cart
 */
const calculateTotalCost = () => {
  return cart.reduce((acc, product) => acc + product.price * product.quantity, 0);
};

/**
 * Display cart summary
 * @returns {Array} Array of product summaries
 */
const displayCartSummary = () => {
  return cart
    .filter((product) => product.quantity > 0)
    .map((product) => ({
      productName: product.productName,
      quantity: product.quantity,
      totalProductPrice: product.price * product.quantity,
    }));
};

/**
 * Apply discount code to total cost (Bonus feature)
 * @param {String} discountCode - Discount code to apply
 * @returns {Number} Total cost with discount applied
 */
const applyDiscount = (discountCode) => {
  const totalCost = calculateTotalCost();
  let discountAmount = 0;
  switch (discountCode) {
    case "SUMMER20":
      discountAmount = totalCost * 0.2;
      break;
    case "WELCOME15":
      discountAmount = totalCost * 0.15;
      break;
    default:
      console.log("Invalid discount code");
  }
  return totalCost - discountAmount;
};

// Example usage
addItemToCart({ productId: 1, productName: "Product A", quantity: 2, price: 10.99 });
addItemToCart({ productId: 2, productName: "Product B", quantity: 3, price: 5.99 });
addItemToCart({ productId: 3, productName: "Product C", quantity: 1, price: 7.99 });

console.log("Cart summary:");
console.log(JSON.stringify(displayCartSummary(), null, 2));

updateItemQuantity(2, 4);
console.log("Updated cart summary:");
console.log(JSON.stringify(displayCartSummary(), null, 2));

removeItemFromCart(3);
console.log("Cart summary after removal:");
console.log(JSON.stringify(displayCartSummary(), null, 2));

console.log("Total cost:", calculateTotalCost());

console.log("Total cost with discount (SUMMER20):", applyDiscount("SUMMER20"));