document.addEventListener("DOMContentLoaded", function(){
    let APIKEY = "678fbb8a58174779225315d5";  // 67972e07f9d2bb46c9181e32 67875f7d9e18b182ee6941f0
    let cartUrl = "https://fedassg2-66ea.restdb.io/rest/cart"; // https://experiment-d5c7.restdb.io/rest/cart https://tryuse-a494.restdb.io/rest/cart
    let listingUrl = "https://fedassg2-66ea.restdb.io/rest/reverblisting"; // https://experiment-d5c7.restdb.io/rest/reverblisting https://tryuse-a494.restdb.io/rest/testreverbapi

    let header = {
        "Content-Type": "application/json",
        "x-apikey": APIKEY,
        "Cache-Control": "no-cache"
    }

    let selectedTransaction = sessionStorage.getItem("selectedTransaction");
    let userID = sessionStorage.getItem("userID");
    
    if (!selectedTransaction){
        console.error("No transaction data found");
        return;
    }

    let transactionData = JSON.parse(selectedTransaction);
    console.log(transactionData);
    let itemID = transactionData[0]._id;
    console.log(itemID)

    displayOrderSummary(transactionData);

    let checkoutBtn = document.getElementById("checkout-btn");
    checkoutBtn.disabled = true;

    // Use event listener to validate before enabling checkout button
    document.querySelectorAll("input").forEach(input => {
        input.addEventListener("input", function(){
            validateForm();
        });
    });

    checkoutBtn.addEventListener("click", function(e){
        e.preventDefault();

        let name = document.getElementById("name").value;
        let email = document.getElementById("email").value;
        let address = document.getElementById("address").value;
        let city = document.getElementById("city").value;
        let state = document.getElementById("state").value;
        let postalCode = document.getElementById("postalCode").value;

        let cardName = document.getElementById("cardName").value;
        let cardNumber = document.getElementById("cardNumber").value;
        let expMonth = document.getElementById("expMonth").value;
        let expYear = document.getElementById("expYear").value;
        let cvvNumber = document.getElementById("cvvNumber").value;

        if (!validateBill(name, email, address, city, state, postalCode) || 
            !validatePayment(cardName, cardNumber, expMonth, expYear, cvvNumber)) {
            console.log("Validation failed! Checkout button remains disabled.");
            return;
        }

        alert("Payment successful! Processing your order...")
        deleteCartItem(transactionData);

        setTimeout(() => {
            location.href = "transaction-receipt.html";
        }, 3000);
    })

    function deleteCartItem(cartItems){
        cartItems.forEach(item => {
            let itemID = item._id;
            if (!itemID){
                console.log("No itemID found. Skipping cart deletion");
                return;
            }

            let checkItemUrl = `${cartUrl}/${itemID}`;
            let GETsettings = {
                method: "GET",
                headers: header
            }

            fetch(checkItemUrl, GETsettings)
            .then(response => {
                if (response.status === 404){
                    console.log(`Cart item ${itemID} not found. Skipping deletion`);
                    return null;
                }
                return response.json();
            })
            .then((data) => {
                if (!data) return;

                let DELETEsettings = {
                    method: "DELETE",
                    headers: header
                };
                return fetch(checkItemUrl, DELETEsettings);
            })
            .then(response => {
                if (response && response.ok){
                    console.log(`Item ${itemID} deleted from cart successfully`);
                }
            })
            .catch(error => {
                console.error("Error deleting cart item: ", error);
            })
        })
    }

});
function displayOrderSummary(cartItems){
    let orderSummaryContainer = document.getElementById("order-summary");
    let totalAmount = 0;
    let totalProducts = 0;
    let orderSummaryContent = 
        ` <h4 class="mb-3">Order Summary</h4>
        <div class="order-summary-header">
            <span>Product</span><span>Qty</span><span>Price</span>
        </div> `;
    
    cartItems.forEach(item => {
        let totalPrice = item["product-price"] * item["product-quantity"];
        totalAmount += totalPrice;

        orderSummaryContent += `
        <div class="order-summary-item">
            <span><a href="product-details.html" class="product-link">${item["product-name"]}</a></span><span>${item["product-quantity"]}</span><span>S$${totalPrice.toFixed(2)}</span>
        </div>
        <hr> `;
        totalProducts += item["product-quantity"];
    })

    orderSummaryContent += `
    <div class="order-summary-total">
            <span>Total Due</span><span>${cartItems.length * totalProducts}</span><span>S$ ${totalAmount.toFixed(2)}</span>
        </div>`;
        
    orderSummaryContainer.innerHTML = orderSummaryContent;
}

function validateBill(name, email, address, city, state, postalCode){
    let nameError = document.getElementById("nameError");
    let emailError = document.getElementById("emailError");
    let addressError = document.getElementById("addressError");
    let cityError = document.getElementById("cityError");
    let stateError = document.getElementById("stateError");
    let postalCodeError = document.getElementById("postalCodeError");

    nameError.style.display = "none";
    emailError.style.display = "none";
    addressError.style.display = "none";
    cityError.style.display = "none";
    stateError.style.display = "none";
    postalCodeError.style.display = "none";

    // Ensure all inputs are treated as strings to avoid "trim is not a function" error
    name = String(name || "").trim();
    email = String(email || "").trim();
    address = String(address || "").trim();
    city = String(city || "").trim();
    state = String(state || "").trim();
    postalCode = String(postalCode || "").trim();

    // Validate Name (Only letters and spaces)
    let textRegex = /^[A-Za-z\s]+$/;
    if (!textRegex.test(name) || name === "") {
        nameError.style.display = "block";
        return false;
    }

    // Validate Email
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email) || email === "") {
        emailError.style.display = "block";
        return false;
    }

    // Validate Address
    if (address === "") {
        addressError.style.display = "block";
        return false;
    }

    // Validate City
    if (city === "" || !textRegex.test(city)) {
        cityError.style.display = "block";
        return false;
    }

    // Validate State
    if (state === "" || !textRegex.test(state)) {
        stateError.style.display = "block";
        return false;
    }

    // Validate Postal Code (Numeric and at least 5 characters)
    let postalCodeRegex = /^\d{6}$/; // Minimum 5 digits
    if (!postalCodeRegex.test(postalCode)) {
        postalCodeError.style.display = "block";
        return false;
    }
    return true;
}

function validatePayment(cardName, cardNum, month, year, cvv){
    let currentYear = new Date().getFullYear();
    let currentMonth = new Date().getMonth() + 1; // Months are 0-indexed

    let cardNameError = document.getElementById("cardNameError");
    let cardError = document.getElementById("cardError");
    let monthError = document.getElementById("monthError");
    let yearError = document.getElementById("yearError");
    let cvvError = document.getElementById("cvvError");

    cardNameError.style.display = "none";
    cardError.style.display = "none";
    monthError.style.display = "none";
    yearError.style.display = "none";
    cvvError.style.display = "none";

    let textRegex = /^[A-Za-z\s]+$/; // Ensures that name only contais letters and spaces
    if (!cardName.trim() || !textRegex.test(cardName)){
        cardNameError.style.display = "block";
        return false;
    }

    // Validate Card Number (Must be 16 digits)
    let cardRegex = /^\d{4}-\d{4}-\d{4}-\d{4}$/
    if (!cardRegex.test(cardNum)){
        cardError.style.display = "block";
        return false;
    }

    // Validate expiration month (must be between 01-12)
    let expMonth = parseInt(month, 10);
    let expYear = parseInt(year, 10);

    if (isNaN(expMonth) || expMonth < 1 || expMonth > 12){
        monthError.style.display = "block";
        return false;
    }

    if (isNaN(expYear) || expYear < currentYear){
        yearError.style.display = "block";
        return false;
    }

    if (expYear === currentYear && expMonth < currentMonth){
        alert("The card has expired!");
        return false;
    }

    // Validate CVV (Must be exactly 3 digit)
    let cvvRegex = /^\d{3}$/
    if (!cvvRegex.test(cvv)){
        cvvError.style.display = "block";
        return false;
    }
    return true;
}

function validateForm() {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let address = document.getElementById("address").value;
    let city = document.getElementById("city").value;
    let state = document.getElementById("state").value;
    let postalCode = document.getElementById("postalCode").value;

    let cardName = document.getElementById("cardName").value;
    let cardNumber = document.getElementById("cardNumber").value;
    let expMonth = document.getElementById("expMonth").value;
    let expYear = document.getElementById("expYear").value;
    let cvvNumber = document.getElementById("cvvNumber").value;

    let checkoutBtn = document.getElementById("checkout-btn");

    if (validateBill(name, email, address, city, state, postalCode) && 
    validatePayment(cardName, cardNumber, expMonth, expYear, cvvNumber)) {
    checkoutBtn.disabled = false;
    } 
    else {
        checkoutBtn.disabled = true;
    }

}