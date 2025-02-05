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
    console.log(cart);
    console.log(userID);

    displayOrderSummary(cart, quantity);

    document.getElementById("checkout-btn").addEventListener("click", function(){
        
        let name = document.getElementById("name");
        let email = document.getElementById("email");
        let address = document.getElementById("address");
        let city = document.getElementById("city");
        let state = document.getElementById("state");
        let postalCode = document.getElementById("postalCode");
        
        if (!validateBill(name, email, address, city, state, postalCode)){
            console.log("Bill validation failed");
            return;
        }

        let cardName = document.getElementById("cardName");
        let cardNumber = document.getElementById("cardNumber");
        let expMonth = document.getElementById("expMonth");
        let expYear = document.getElementById("expYear");
        let cvvNumber = document.getElementById("cvvNumber");

        if (!validatePayment(cardName, cardNumber, expMonth, expYear, cvvNumber)){
            console.log("Payment validation failed!");
            return;
        }

        alert("Payment successful! Processing your order...")
        location.href = "payment-success.html";
    })

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
    let nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(name) || name === "") {
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
    if (city === "") {
        cityError.style.display = "block";
        return false;
    }

    // Validate State
    if (state === "") {
        stateError.style.display = "block";
        return false;
    }

    // Validate Postal Code (Numeric and at least 5 characters)
    let postalCodeRegex = /^\d{5,}$/; // Minimum 5 digits
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

    let nameRegex = /^[A-Za-z\s]+$/; // Ensures that name only contais letters and spaces
    if (!cardName.trim() || !nameRegex.test(cardName)){
        cardNameError.style.display = "block";
        return false;
    }

    // Validate Card Number (Must be 16 digits)
    let cardRegex = /^\d{16}$/
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

    if (isNaN(expYear) || exp < currentYear){
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