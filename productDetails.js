document.addEventListener("DOMContentLoaded", function(){
    let APIKEY = "67875f7d9e18b182ee6941f0";  //    678fbb8a58174779225315d5 67972e07f9d2bb46c9181e32
    let cartUrl = "https://tryuse-a494.restdb.io/rest/cart"; //  https://fedassg2-66ea.restdb.io/rest/cart

    let storedProduct = sessionStorage.getItem("selectedProduct");
    console.log(storedProduct);

    if (!storedProduct || storedProduct === "undefined"){
        console.error("No product data found in localStorage");
        document.getElementById("item-container").innerHTML = "<p>Product not found</p>"
        return
    }

    let item = JSON.parse(storedProduct);
    console.log(item);
    
    if (!item){
        console.error("No product data found in localStorage");
        document.getElementById("item-container").innerHTML = "<p>Product not found</p>";
        return;
    }
    displayData();

    function displayData(){

        let itemContainer = document.getElementById("item-container")
        let allItemsContent = "";
        let imageLink = item["reverb-links"].photo.href;    
        allItemsContent += `
            <div class="product-details-section container py-5 position-relative">
                <!-- Seller Section: Adjusted layout to avoid overlapping the product image -->
                <div class="seller-profile text-center position-absolute p-3">
                    <img src="images/man.jpg" alt="Seller Profile" class="rounded-circle me-2" width="50" height="50">
                    <h5 class="seller-name mb-0"> ${item["reverb-shopname"]}</h5>
                </div> 
                <div class="row">
                    <!-- Product Image Section -->
                    <div class="product-image col-md-6 d-flex justify-content-center align-items-center">
                        <img src="${imageLink}" alt="Product Image" class="img-fluid rounded" id="product-picture">
                    </div>
            
                    <!-- Product Details Section -->
                    <div class="col-md-6">
                        <div class="product-name-price" >
                            <h2 class="product-name fw-bold" id="product-name">${item['reverb-title']}</h2>
                            <h3 class="product-price" id="product-price">SGD ${item['reverb-price']}</h3>
                        </div>
                        <p class="product-description" id="product-description">
                            ${item['reverb-details']}
                        </p>
                        <p class="product-condition" id="product-condition"><strong>Condition:</strong> ${item['reverb-condition']}</p>
                        <p class="product-category" id="product-category"><strong>Category:</strong> ${item['reverb-category']}</p>
                        <p class="product-category" id="product-availability"><strong>Availability:</strong> ${item['reverb-availability']}</p>
                        <p class="product-category" id="product-quantity"><strong>Quantity:</strong> ${item['reverb-quantity']}</p>
            
                        <!-- Buttons Section -->
                        <div class="d-flex flex-column gap-3">
                            <div class="d-flex">
                                <input type="number" class="quantity form-control me-2 w-100" id="input-quantity" placeholder="e.g 1" required>
                                <small id="quantity-error">Quantity must be greater than 0!</small>
                                <small id="quantity-too-large">Quantity cannot be more than the product quantity</small>
                            </div>
                            <button class="btn w-100" onclick="location.href='chat.html'">Chat</button>
                            <button class="btn w-100" id="buy-btn">Buy</button>
                            <div class="d-flex">
                                <input type="money" class="form-control me-2" placeholder="SGD 100">
                                <button class="btn">Make Offer</button>
                            </div>
                            <button class="btn btn-success w-100" id="add-to-cart">Add to Cart</button>
                        </div>
                    </div>
                </div>
            </div>
        `          
       itemContainer.innerHTML = allItemsContent;
    }

    document.getElementById("buy-btn").addEventListener("click", function() {
        let validation = validateInput()
        if (!validation){
            return;
        }
        let {cart, quantity} = validation;
        console.log("Checking for productID", cart["reverb-id"]);

        // Save selected product details with quantity for the transaction page
        let product = {
            "product-id": cart["reverb-id"],
            "product-name": cart["reverb-title"],
            "product-price": cart["reverb-price"],
            "product-quantity": quantity
        }
        sessionStorage.setItem("selectedTransaction", JSON.stringify([product]));
        console.log(product);

        location.href = "transaction.html";
    })

    document.getElementById("add-to-cart").addEventListener("click", function(){   
        let validation = validateInput()
        if (!validation){
            return;
        }

        let {cart, quantity} = validation;
        let userID = sessionStorage.getItem("userID");

        if (!userID){
            console.log("User not logged in!");
            return;
        }

        let productID = cart["reverb-id"];
        console.log("Checking for productID", productID);
        let checkItemUrl = `${cartUrl}?q={"linked-userID": "${userID}", "product-id": ${productID}}`;

        let GETsettings = {
            method : "GET",
            headers: {
                "Content-Type": "application/json",
                "x-apikey": APIKEY,
                "Cache-Control": "no-cache"
            }
        }

        fetch (checkItemUrl, GETsettings)
          .then(response => response.json())
          .then(cartItems => {
            if (cartItems.length > 0){
                // If the item exists, update just the quantity
                let existingItem = cartItems[0];
                let updatedQuantity = existingItem["product-quantity"] + quantity;

                let updateData = {
                    "product-quantity": updatedQuantity
                };

                let PUTsettings = {
                    method : "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "x-apikey": APIKEY,
                        "Cache-Control": "no-cache"
                    },
                    body: JSON.stringify(updateData)
                };

                fetch (`${cartUrl}/${existingItem._id}`, PUTsettings)
                  .then(response => response.json())
                  .then(updatedItem => {
                    console.log("Cart Item Updated", updatedItem);
                    alert ("Product successfully added to cart");
                  })
                  .catch(error => {
                    console.error("Error updating the cart item: ", error);
                  });
            }
            else {
                let product = {
                    "linked-userID": userID,
                    "product-id": productID,
                    "product-name": cart["reverb-title"],
                    "product-price": cart["reverb-price"],
                    "product-picture": cart["reverb-links"].photo.href,
                    "product-quantity": quantity,
                    "shopname": cart["reverb-shopname"]
                }
                let POSTsettings = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "x-apikey": APIKEY,
                        "Cache-Control": "no-cache"
                    },
                    body: JSON.stringify(product)
                }

                fetch (cartUrl, POSTsettings)
                .then(response => response.json())
                .then(data => {
                    console.log("Product added to cart: ", data);
                    alert("Product successfully added to cart!");
                })
                .catch(error => {
                console.error("Error adding product to cart: ", error)
                });
            }
          })
    });
    
    function validateInput(){
        let inputQty = document.getElementById("input-quantity");
        let quantity = parseInt(inputQty.value);
        let quantityError = document.getElementById("quantity-error");
        let quantityTooLarge = document.getElementById("quantity-too-large");

        quantityError.style.display = "none";
        quantityTooLarge.style.display = "none";

        if (isNaN(quantity) || quantity <=0){
            quantityError.style.display = "block";
            return false;
        }

        let storedProduct = sessionStorage.getItem("selectedProduct");

        if (!storedProduct || storedProduct == "Undefined"){
            console.log("Coouldn't retrieve the item!");
            return false;
        }
        let cart = JSON.parse(storedProduct);

        if (quantity > cart["reverb-quantity"]){
            quantityTooLarge.style.display = "block";
            return false;    
        }

        return {cart, quantity};
    }
});