document.addEventListener("DOMContentLoaded", function(){
    const restDBUrl = "https://fedassg2-66ea.restdb.io/rest/reverblisting";
    const APIKEY = "678fbb8a58174779225315d5";
    
    let settings = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "x-apikey": APIKEY,
            "Cache-Control": "no-cache"
       }
   }

    fetch(restDBUrl, settings)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0){
                console.log("displaying data....")
                displayData(data);
            }
            else{
                console.log("No data found in RestDB");
            }
        })

    function displayData(data){
        let itemContainer = document.getElementById("item-container");

        let allItemsContent = "";
        item = data[0];
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
                        <img src=${imageLink} alt="Product Image" class="img-fluid rounded" id="product-picture">
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
                        <p class="product-category" id="product-availability"><strong>Avalibality:</strong> ${item['reverb-availability']}</p>
                        <p class="product-category" id="product-quantity"><strong>Quantity:</strong> ${item['reverb-quantity']}</p>
            
                        <!-- Buttons Section -->
                        <div class="d-flex flex-column gap-3">
                            <div class="d-flex">
                                <input type="number" class="quantity form-control me-2 w-100" placeholder="e.g 1" required>
                                <small id="quantity-error" style="color: red; display: none;">Quantity must be greater than 0!</small>
                            </div>
                            <button class="btn w-100" onclick="location.href='chat.html'">Chat</button>
                            <button class="btn w-100" onclick="location.href='transaction.html'">Buy</button>
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
})