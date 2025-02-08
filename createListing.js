document.addEventListener("DOMContentLoaded", function(){
    let APIKEY = "678fbb8a58174779225315d5";  //    67972e07f9d2bb46c9181e32 67875f7d9e18b182ee6941f0
    let createListingUrl = "https://fedassg2-66ea.restdb.io/rest/create-listing"; //  https://experiment-d5c7.restdb.io/rest/create-listing https://tryuse-a494.restdb.io/rest/create-listing
    let listingUrl = "https://fedassg2-66ea.restdb.io/rest/reverblisting"; //  https://experiment-d5c7.restdb.io/rest/reverblisting https://tryuse-a494.restdb.io/rest/testreverbapi
    let header = { 
        "Content-Type": "application/json",
        "x-apikey": APIKEY,
        "Cache-Control": "no-cache"
    };

    let UserID = sessionStorage.getItem("userID"); // Get linked-userID from session Storage
    console.log("User ID: ", UserID);

    let listingID = sessionStorage.getItem("editingListingID"); // Check if editing mode
    console.log("ListingID: ",listingID);
    let listingTitle = document.getElementById("listingTitle");
    if (listingID){
        // Fetch listing details if editing
        listingTitle.textContent = "UPDATE YOUR LISTING";

        let updateSettings = {
            method: "GET",
            headers: header
        }

        fetch(`${createListingUrl}/${listingID}`, updateSettings)
          .then(response => response.json())
          .then(data => {
            console.log("Editing Listing Data: ", data);
            document.getElementById("product-name").value = data["product-name"];
            document.getElementById("product-description").value = data["product-description"];
            document.getElementById("product-category").value = data["product-category"];
            document.getElementById("product-condition").value = data["product-condition"];
            document.getElementById("product-quantity").value = data["product-quantity"];
            document.getElementById("product-price").value = data["product-price"];
            document.getElementById("product-picture").value = data["product-picture"];

            // Change the button text to "Update"
            document.getElementById("listing-submit").textContent = "Update Listing";
          })
          .catch(error => console.error("Error fetching listing: ", error));
    }

    document.getElementById("listing-submit").addEventListener("click", function (e) {
        e.preventDefault();

        // Get form values
        let productName = document.getElementById("product-name").value.trim();
        let productPrice = parseFloat(document.getElementById("product-price").value);
        let productDesc = document.getElementById("product-description").value.trim();
        let productCat = document.getElementById("product-category").value;
        let productCondition = document.getElementById("product-condition").value;
        let productQty = parseInt(document.getElementById("product-quantity").value);
        let productPic = document.getElementById("product-picture").value.trim();

        if (!UserID){
            alert("User not found. Please log in again");
            return;
        }

        let nameError = document.getElementById("name-error");
        let descError = document.getElementById("description-error");
        let catError = document.getElementById("category-error");
        let conditionError = document.getElementById("condition-error");
        let picError = document.getElementById("picture-error");
        let quantityError = document.getElementById("quantity-error");
        let priceError = document.getElementById('price-error');
        let isValid = true;

        // isNan() checks whether if the product is a number
        // returns true if it cannot be converted to a number, false otherwise
        if (productQty <= 0 || isNaN(productQty)){  
            isValid = false;
            quantityError.style.display = 'block';
        }
        else{
            quantityError.style.display = 'none'
        }
        if (productPrice <= 0 || isNaN(productPrice)){
            isValid = false;
            priceError.style.display = 'block';
        }
        else{
            priceError.style.display = 'none';
        }

        // Name validation
        if (productName === "") { 
            isValid = false;
            nameError.style.display = 'block';
        } 
        else {
            nameError.style.display = 'none';
        }

        if (productDesc === ""){
            isValid = false;
            descError.style.display = 'block';
        }
        else{
            descError.style.display = 'none'
        }
        
        // Category validation 
        if (productCat === "") { 
            isValid = false;
            catError.style.display = 'block';
        } 
        else {
            catError.style.display = 'none';
        }
        
        // Condition validation 
        if (productCondition === "") { 
            isValid = false;
            conditionError.style.display = 'block';
        } 
        else {
            conditionError.style.display = 'none';
        }
        
        // Picture validation 
        if (productPic === "") { 
            isValid = false;
            picError.style.display = 'block';
        } 
        else {
            picError.style.display = 'none';
        }

        if (!isValid){
            alert ("Invalid Value Entered!");
            return;
        }

        let userName = sessionStorage.getItem("userName");

        // Prepare data for API
        let userListingdata = {
            "product-name": productName,
            "product-price": productPrice,
            "product-description": productDesc,
            "product-category": productCat,
            "product-condition": productCondition,
            "product-quantity": productQty,
            "product-picture": productPic,
            "linked-userID": UserID,
            "product-shopname": userName
        };

        // API settings
        let userListingSettings = {
            method: listingID ? "PUT" : "POST", // PUT if updating, POST if creating
            headers: header,
            body: JSON.stringify(userListingdata),
        };     

        // If the listing exist means we are updating the listing, if not we are creating.
        let requestUrlForUserListing = listingID ? `${createListingUrl}/${listingID}` : createListingUrl;

        // Disable the button during the fetch
        document.getElementById("listing-submit").disabled = true;
        let isNewListing = !listingID; // true if creating, false if updating

        // Create or update product
        fetch(requestUrlForUserListing, userListingSettings)
            .then((response) => response.json())
            .then((data) => {
                console.log(listingID ? "Listing Updated: " : "New Listing Created: ", data);
                listingID = data._id; // RestDB Auto generated ID
                console.log(isNewListing ? "New Listing Created: " : "Listing Updated: ", data);

                let allListingData = {
                    "product-name": productName,
                    "product-price": productPrice,
                    "product-description": productDesc,
                    "product-category": productCat,
                    "product-condition": productCondition,
                    "product-quantity": productQty,
                    "product-picture": productPic,
                    "linked-userID": UserID,
                    "product-shopname": userName,
                    "product-id": listingID
                }

                let requestUrlForAllListing = listingID ? `${listingUrl}/${listingID}` : listingUrl;
            
                let allListingSettings = {
                    method: listingID ? "PUT" : "POST", // PUT if updating, POST if creating
                    headers: header,
                    body: JSON.stringify(allListingData),
                }

                fetch(requestUrlForAllListing, allListingSettings)
                  .then((response) => response.json())
                  .then((data) => {
                    // Alert user
                        alert (isNewListing ? "Listing created successfully!" : "Listing updated successfully!");                  
                        console.log(data);
                        document.getElementById("listing-submit").disabled = false;
                        document.getElementById("create-listing-form").reset();
                  })
                  .catch((error) => console.error("Failed inserting into listing API: ", error))
            })
            .catch((error) => console.error("Error creating product:", error));
    });

})