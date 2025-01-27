document.addEventListener("DOMContentLoaded", function(){
    APIKEY = "678fbb8a58174779225315d5";
    createListingUrl = "https://fedassg2-66ea.restdb.io/rest/create-listing";
    // getProducts();

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

        // Prepare data for API
        let jsondata = {
            "product-name": productName,
            "product-price": productPrice,
            "product-description": productDesc,
            "product-category": productCat,
            "product-condition": productCondition,
            "product-quantity": productQty,
            "product-picture": productPic,
        };

        // API settings
        let settings = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-apikey": APIKEY,
                "Cache-Control": "no-cache",
            },
            body: JSON.stringify(jsondata),
        };          

        // Disable the button during the fetch
        document.getElementById("listing-submit").disabled = true;

        // Create product
        fetch(createListingUrl, settings)
            .then((response) => response.json())
            .then(() => {
                document.getElementById("listing-submit").disabled = false;
                document.getElementById("create-listing-form").reset();
                // getProducts(); // Fetch and update table
            })
            .catch((error) => console.error("Error creating product:", error));
    });

})