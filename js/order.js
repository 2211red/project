let orderItems = [];
try { orderItems = JSON.parse(sessionStorage.getItem("selectedOrder")) || []; } catch(e){ orderItems = []; }
if(orderItems.length === 0) {
  const singleProduct = JSON.parse(sessionStorage.getItem("selectedProduct"));
  if(singleProduct) orderItems.push(singleProduct);
}

const summaryContainer = document.querySelector(".product-details");
const grandTotalDiv = document.querySelector(".order-summary-bottom .order-grand-total");
const errorText = document.getElementById("formError");

function updateOrderSummary() {
  summaryContainer.innerHTML = "";
  if(orderItems.length === 0) {
    summaryContainer.innerHTML = "<p>No items to order.</p>";
    grandTotalDiv.textContent = `Grand Total: ₱0.00`;
  } else {
    let grandTotal = 0;
    orderItems.forEach(item => {
      grandTotal += Number(item.total) || 0;
      const div = document.createElement("div");
      div.classList.add("order-item");
      div.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <div class="details">
          <h3>${item.name}</h3>
          <p>Quantity: ${item.quantity}</p>
          <p>Price: ₱${Number(item.price).toFixed(2)}</p>
          <p><strong>Total: ₱${Number(item.total).toFixed(2)}</strong></p>
        </div>
      `;
      summaryContainer.appendChild(div);
    });
    grandTotalDiv.textContent = `Grand Total: ₱${grandTotal.toFixed(2)}`;
  }
}
updateOrderSummary();

const orderNotification = document.getElementById("orderNotification");
const orderNotificationText = document.getElementById("orderNotificationText");

function showOrderNotification(message) {
  orderNotificationText.textContent = message;
  orderNotification.style.transform = "translateY(0)";
  setTimeout(()=>{ orderNotification.style.transform="translateY(-100%)"; }, 3000);
}

const receiptPopup = document.createElement("div");
receiptPopup.classList.add("receipt-popup");
receiptPopup.innerHTML = `
  <div class="receipt-content">
    <span class="close-receipt">&times;</span>
    <div class="receipt-left">
      <h2>Ordered Items</h2>
      <div class="receipt-items"></div>
    </div>
    <div class="receipt-right">
      <h2>Order Receipt</h2>
      <div class="receipt-details"></div>
    </div>
  </div>
`;
document.body.appendChild(receiptPopup);

receiptPopup.querySelector(".close-receipt").addEventListener("click", ()=>{
  receiptPopup.classList.remove("active");
  document.body.classList.remove("popup-active");
  window.location.href = "product.html"; 
});

const placeOrderBtn = document.querySelector(".place-order");
if(placeOrderBtn){
  placeOrderBtn.addEventListener("click", e=>{
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const address = document.getElementById("address").value.trim();
    const payment = document.querySelector('input[name="payment"]:checked');
    if(!name||!phone||!address||!payment){ errorText.textContent="Please fill in all required information."; return; }
    errorText.textContent="";

    if(orderItems.length === 0) {
      const singleProduct = JSON.parse(sessionStorage.getItem("selectedProduct"));
      if(singleProduct) orderItems.push(singleProduct);
    }
    if(orderItems.length === 0){ errorText.textContent="Your cart is empty!"; return; }

    showOrderNotification("Your order has been placed successfully!");

    const receiptItemsContainer = receiptPopup.querySelector(".receipt-items");
    const receiptDetails = receiptPopup.querySelector(".receipt-details");
    receiptItemsContainer.innerHTML="";
    let grandTotal=0;
    orderItems.forEach(item=>{
      grandTotal += Number(item.total);
      const itemDiv = document.createElement("div");
      itemDiv.classList.add("receipt-item");
      itemDiv.innerHTML=`
        <img src="${item.image}" alt="${item.name}">
        <div>
          <p><strong>${item.name}</strong></p>
          <p>Qty: ${item.quantity}</p>
          <p>₱${Number(item.total).toFixed(2)}</p>
        </div>
      `;
      receiptItemsContainer.appendChild(itemDiv);
    });
    receiptDetails.innerHTML=`
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Address:</strong> ${address}</p>
      <p><strong>Payment:</strong> ${payment.value.toUpperCase()}</p>
      <hr>
      <h2>Total Payment: ₱${grandTotal.toFixed(2)}</h2>
    `;
    receiptPopup.classList.add("active");
    document.body.classList.add("popup-active");
    sessionStorage.removeItem("cart");
    document.getElementById("orderForm").reset();
  });
}

const cancelBtn = document.querySelector(".cancel-btn");
if(cancelBtn){
  cancelBtn.addEventListener("click", ()=>{
    sessionStorage.removeItem("selectedOrder");
    sessionStorage.removeItem("selectedProduct");
    window.location.href="product.html";
  });
}
