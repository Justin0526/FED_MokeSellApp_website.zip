document.addEventListener("DOMContentLoaded", function(){
    let APIKEY = "67875f7d9e18b182ee6941f0";  //   678fbb8a58174779225315d5 67972e07f9d2bb46c9181e32
    let cartUrl = "https://tryuse-a494.restdb.io/rest/cart"; // https://fedassg2-66ea.restdb.io/rest/cart https://experiment-d5c7.restdb.io/rest/cart
    let offerUrl = "https://tryuse-a494.restdb.io/rest/offer" //  https://fedassg2-66ea.restdb.io/rest/offer https://experiment-d5c7.restdb.io/rest/offer
 
    let storedProduct = sessionStorage.getItem("selectedProduct");
    let userID = sessionStorage.getItem("userID");
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

    let isUserListing = !!item["linked-userID"];
    let productData = {
        id: isUserListing ? item["_id"] : item["product-id"],
        shopname: item["product-shopname"], // Same for both listings
        imageLink: isUserListing 
            ? item["product-picture"] 
            : item["reverb-links"] && item["reverb-links"].photo ? item["reverb-links"].photo.href : "images/placeholder.jpg",
        productName: item["product-name"],
        productPrice: item["product-price"],
        productDetails: item["product-description"] || "No description available",
        productCondition: item["product-condition"] || "Condition not specified",
        productCategory: item["product-category"] || "Uncategorized",
        productAvailability: isUserListing ? "Available" : item["product-availability"],
        productQuantity: item["product-quantity"] || 0, // Default to 0 if not provided
    };
    displayData(productData);

    function displayData(product){
        let itemContainer = document.getElementById("item-container")
        let allItemsContent = "";
        allItemsContent += `
            <div class="product-details-section container py-5 position-relative">
                <!-- Seller Section: Adjusted layout to avoid overlapping the product image -->
                <div class="seller-profile text-center position-absolute p-3">
                    <img src="images/man.jpg" alt="Seller Profile" class="rounded-circle me-2" width="50" height="50">
                    <h5 class="seller-name mb-0"> ${product.shopname}</h5>
                </div> 
                <div class="row">
                    <!-- Product Image Section -->
                    <div class="product-image col-md-6 d-flex justify-content-center align-items-center">
                        <img src="${product.imageLink}" alt="Product Image" class="img-fluid rounded" id="product-picture">
                    </div>
            
                    <!-- Product Details Section -->
                    <div class="col-md-6">
                        <div class="product-name-price" >
                            <h2 class="product-name fw-bold" id="product-name">${product.productName}</h2>
                            <h3 class="product-price" id="product-price">SGD ${product.productPrice}</h3>
                        </div>
                        <p class="product-description" id="product-description">
                            ${product.productDetails}
                        </p>
                        <p class="product-condition" id="product-condition"><strong>Condition:</strong> ${product.productCondition}</p>
                        <p class="product-category" id="product-category"><strong>Category:</strong> ${product.productCategory}</p>
                        <p class="product-category" id="product-availability"><strong>Availability:</strong> ${product.productAvailability}</p>
                        <p class="product-category" id="product-quantity"><strong>Quantity:</strong> ${product.productQuantity}</p>
            
                        <!-- Buttons Section -->
                        <div class="d-flex flex-column gap-3">
                            <div class="d-flex">
                                <input type="number" class="quantity form-control me-2 w-100" id="input-quantity" placeholder="e.g 1" required>
                                <small class="errors" id="quantity-error">Quantity must be greater than 0!</small>
                                <small class="errors" id="quantity-too-large">Quantity cannot be more than the product quantity</small>
                            </div>
                            <button class="btn w-100" id="chat-btn">Chat</button>
                            <button class="btn w-100" id="buy-btn">Buy</button>
                            <div class="d-flex">
                                <input type="money" class="form-control me-2" id="offerPrice" placeholder="SGD 100">
                                <small class="errors" id="offerError">Invalid Offer value entered</small>
                                <button class="btn" id="offer-btn">Make Offer</button>
                            </div>
                            <button class="btn btn-success w-100" id="add-to-cart">Add to Cart</button>
                        </div>
                    </div>
                </div>
            </div>
        `          
       itemContainer.innerHTML = allItemsContent;
    }
    document.getElementById("chat-btn").addEventListener("click", function(){
        sessionStorage.setItem("chatID", productData.id);

        // Redirect to chat page
        location.href = "chat.html";
    })

    document.getElementById("buy-btn").addEventListener("click", function() {
        let validation = validateInput()
        if (!validation){
            return;
        }

        // Save selected product details with quantity for the transaction page
        let product = {
            "product-id": productData.id,
            "product-name": productData.productName,
            "product-price": productData.productPrice,
            "product-quantity": validation.quantity,
            "linked-userID": item["linked-userID"] || ""
        }
        sessionStorage.setItem("selectedTransaction", JSON.stringify([product]));
        console.log(product);

        location.href = "transaction.html";
    });

    document.getElementById("offer-btn").addEventListener("click", function(){  
        let validation = validateInput()
        if (!validation){
            return;
        }
        let offerError = document.getElementById("offerError");
        offerError.style.display = "none";

        let offerPrice = parseFloat(document.getElementById("offerPrice").value);

        if (isNaN(offerPrice) || offerPrice <= 0){
            console.log("No offer price entered");
            offerError.style.display = "block";
            return;
        }

        let offer = {
            "linked-userID": userID,
            "offer-price": offerPrice,
            "product-id": productData.id,
            "shopname": productData.shopname,
            "product-quantity": validation.quantity 
        }
        
        let settings = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-apikey": APIKEY,
                "Cache-Control": "no-cache"
            },
            body: JSON.stringify(offer)
        };

        fetch (offerUrl, settings)
          .then(response => response.json())
          .then(data => {
            console.log("Successfully made offer to seller: ", data);
            alert("Offer made successfully");
          })
          .catch(error => console.error("Error when sending offer: ", error))
    })

    document.getElementById("add-to-cart").addEventListener("click", function(){   
        let validation = validateInput()
        if (!validation){
            return;
        }

        if (!userID){
            console.log("User not logged in!");
            return;
        }
        console.log("Checking for productID", productData.id);
        let checkItemUrl = `${cartUrl}?q={"linked-userID": "${userID}", "product-id": "${productData.id}"}`;

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
                let updatedQuantity = existingItem["product-quantity"] + validation.quantity;

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
                    "product-id": productData.id,
                    "product-name": productData.productName,
                    "product-price": productData.productPrice,
                    "product-picture": productData.imageLink,
                    "product-quantity": validation.quantity,
                    "shopname": productData.shopname
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
        if (quantity > productData.productQuantity){
            quantityTooLarge.style.display = "block";
            return false;    
        }

        return { quantity };
    }
});