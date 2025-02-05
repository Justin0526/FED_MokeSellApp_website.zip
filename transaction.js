document.addEventListener("DOMContentLoaded", function(){
    let APIKEY = "678fbb8a58174779225315d5";  //  67875f7d9e18b182ee6941f0   67972e07f9d2bb46c9181e32
    let cartUrl = "https://fedassg2-66ea.restdb.io/rest/cart"; //  https://tryuse-a494.restdb.io/rest/cart

    let selectedTransaction = localStorage.getItem("selectedTransaction");
    let userID = sessionStorage.getItem("userID");

    if (!selectedTransaction){
        console.error("No transaction data found");
        return;
    }

    let transactionData = JSON.parse(selectedTransaction);
    let {cart, quantity} = transactionData;

    displayOrderSummary(cart, quantity);

});

function displayOrderSummary(cart, quantity){
    let orderSummaryContainer = document.getElementById("order-summary");

    let orderSummaryContent = 
        ` <h4 class="mb-3">Order Summary</h4>
        <div class="order-summary-header">
            <span>Product</span><span>Qty</span><span>Price</span>
        </div>
        <div class="order-summary-item">
            <span><a href="product-details.html" class="product-link">${cart["reverb-title"]}</a></span><span>${quantity}</span><span>S$${(cart["reverb-price"] * quantity).toFixed(2)}</span>
        </div>
        <hr>
        <div class="order-summary-total">
            <span>Total Due</span><span>${quantity}</span><span>S$ ${(cart["reverb-price"] * quantity).toFixed(2)}</span>
        </div>
        `;
    orderSummaryContainer.innerHTML = orderSummaryContent;
}