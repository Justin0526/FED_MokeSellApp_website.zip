document.addEventListener("DOMContentLoaded", function(){
    const APIKEY = "678fbb8a58174779225315d5";
    const createListingUrl = "https://fedassg2-66ea.restdb.io/rest/create-listing";
    // getProducts();

    document.getElementById("listing-submit").addEventListener("click", function (e) {
        e.preventDefault();

        // Get form values
        let productName = document.getElementById("product-name").value;
        let productPrice = parseFloat(document.getElementById("product-price").value);
        let productDesc = document.getElementById("product-description").value;
        let productCat = document.getElementById("product-category").value;
        let productCondition = document.getElementById("product-condition").value;
        let productQty = parseInt(document.getElementById("product-quantity").value);
        let productPic = document.getElementById("product-picture").value.trim();

        let quantity = document.getElementById("quantity-error");
        let price = document.getElementById('price-error');
        let isValid = true;

        // isNan() checks whether if the product is a number
        // returns true if it cannot be converted to a number, false otherwise
        if (productQty <= 0 || isNaN(productQty)){  
            isValid = false;
            quantity.style.display = 'block';
        }
        else{
            quantity.style.display = 'none'
        }
        if (productPrice <= 0 || isNaN(productPrice)){
            isValid = false;
            price.style.display = 'block';
        }
        else{
            price.style.display = 'none';
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