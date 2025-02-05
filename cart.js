document.addEventListener("DOMContentLoaded", function(){
    let APIKEY = "678fbb8a58174779225315d5";  //  67875f7d9e18b182ee6941f0   67972e07f9d2bb46c9181e32
    let cartUrl = "https://fedassg2-66ea.restdb.io/rest/cart"; //  https://tryuse-a494.restdb.io/rest/cart

    let userID = sessionStorage.getItem("userID");

    if (!userID){
        console.log("User not logged in.");
        return;
    }
    
    let header = {
        "Content-Type": "application/json",
        "x-apikey": APIKEY,
        "Cache-Control": "no-cache"
    }

    let GETsettings = {
        method: "GET",
        headers: header
    }

    let userCartUrl = `${cartUrl}?q={"linked-userID": "${userID}"}`;

    fetch(userCartUrl, GETsettings)
      .then(response => response.json())
      .then(data => {
        if (data.length > 0){
            displayCart(data);
        }
      })
      .catch(error => {
        console.log("Error fetching cart: ", error);
      })

    function displayCart(data){
        let cartContainer = document.getElementById("shop-box");
        let shopGroups = {};

        data.forEach(item => {
            let shopName = item["shopname"];
            if (!shopGroups[shopName]){
                shopGroups[shopName] = []; // Create an empty array for this shop
            }
            shopGroups[shopName].push(item); // Add the item to the shop's array
        });

        for (let shop in shopGroups){
            let shopItems = shopGroups[shop];
            let totalDue = 0;

            let shopSection = document.createElement("div");
            shopSection.classList.add("shop-section");
            shopSection.id = `cart-${shop.replace(/\s+/g, '-')}`;

            let shopContent = `
                <div class="shop-header">
                    <img src="images/man.jpg" alt="Shop Logo">
                    <h5>${shop}</h5>
                </div>
                <div class="table-responsive">
                    <table class="table text-white">
                        <thead class="product-category">
                            <tr>
                                <th>Product</th>
                                <th>Price</th>
                                <th class="text-center">Quantity</th>
                                <th>Total</th>
                                <th></th> 
                            </tr>
                        </thead>
                        <tbody>
            `;

            shopItems.forEach(item => {
                let productName = item["product-name"];
                let productPrice = parseFloat(item["product-price"]);
                let productQuantity = parseInt(item["product-quantity"]);
                let cartID = item["_id"];
                let imageLink = item["product-picture"];
                let totalPrice = productPrice * productQuantity;
                totalDue += totalPrice;

                // .toFixed(2) helps to format to two decimal places
                shopContent += `
                <tr id="cart-${cartID}">
                    <td class="d-flex align-items-center">
                        <img src="${imageLink}" alt="${productName}" class="product-image">
                        <div class="product-info">
                            <p class="product-name"><a href="product-details.html" target="_blank">${productName}</a></p>
                        </div>
                    </td>
                    <td class="price">S$${productPrice.toFixed(2)}</td> 
                    <td class="text-center quantity">${productQuantity}</td>
                    <td class="total-price">S$${totalPrice.toFixed(2)}</td>
                    <td class="text-center">
                        <span class="remove-btn" data-id="${cartID}">
                            <i class="fa-solid fa-trash"></i>
                        </span>
                    </td>
                </tr>
            `;
            })
            shopContent += `
                        </tbody>
                    </table>
                </div>
                <div class="text-end total-due-info">
                    <h5><strong>Total Due: S$${totalDue.toFixed(2)}</strong></h5>
                </div>
                <div class="button-container">
                    <button class="checkout-btn" onclick="window.location.href='transaction.html'">Checkout</button>
                </div>
            </div>
            `;

            shopSection.innerHTML = shopContent;
            cartContainer.appendChild(shopSection);
        }

        document.querySelectorAll(".remove-btn")
            .forEach(button => {
                button.addEventListener("click", function(){
                    let cartID = this.getAttribute("data-id")
                    console.log(cartID);
                    deleteCart(cartID);
                })
            })
        
    }

    function deleteCart(cartID){
        if (!confirm("Are you sure you want to delete this listing")) return

        let DELETEsettings = {
            method: "DELETE",
            headers: header
        }

        fetch(`${cartUrl}/${cartID}`, DELETEsettings)
          .then(response => response.json())
          .then(() =>{
            let cartElement = document.getElementById(`cart-${cartID}`);
            if (cartElement) {
                let shopContainer = cartElement.closest(".shop-section");
                cartElement.remove();
                console.log(`Cart ${cartID} deleted successfully`);
                alert("Item Removed successfully")

                // Check if the shop has any remaining listings
                let remainingItems = shopContainer.querySelector("tbody").children.length;
                if (remainingItems === 0) {
                    shopContainer.remove(); // Remove the shop section if empty
                }
            }        
          })
          .catch(error => console.error("Error deleting cart", error))
    }
})