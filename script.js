document.addEventListener("DOMContentLoaded", function(){
    const APIKEY = "678fbb8a58174779225315d5";
    
    // ---- Login API ---- //
    // Step 1: Create login listener
    if (document.getElementById("login-form")){
        document.getElementById("login-form").addEventListener("submit", function (e) {
            e.preventDefault();
        
            // Retrieve form data
            let userEmail = document.getElementById("user-email").value;
            let userPassword = document.getElementById("user-password").value;
        
            // Validate inputs
            if (!validateInput(userPassword)) {
                console.log("Validation failed!");
                return;
            }
        
            // Prepare data for API call
            let jsondata = {
                "userEmail": userEmail,
                "userPassword": userPassword
            };
        
            // Create settings for Fetch API
            let settings = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-apikey": APIKEY,
                    "Cache-Control": "no-cache"
                },
                body: JSON.stringify(jsondata)
            };
        
            // Disable login button while processing
            const loginButton = document.getElementById("user-login");
            loginButton.disabled = true;
        
            // Send Fetch request
            fetch("https://fedassg2-66ea.restdb.io/rest/login", settings)
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Failed to log in. Check your credentials.");
                    }
                    return response.json();
                })
                .then(data => {
                    console.log("Login successful:", data);
        
                    // Redirect after successful login
                    alert("Login successful!");
                    window.location.href = "home.html";
                })
                .catch(error => {
                    console.error("Error:", error);
                    alert("An error occurred while logging in. Please try again.");
                })
                .finally(() => {
                    loginButton.disabled = false; // Re-enable the login button
                });
        });
        
        function validateInput(password){
            if (password.length < 6){
                alert("Password must be at least 6 characters long.");
                return false;
            }
            return true;
        }
        // ------------------  // 
    }
    else{
        // ---- Listing (Reverb API) ---- //
        const reverbApiUrl = "https://api.reverb.com/api/listings/?page=1&per_page=1";
        const listingUrl = "https://fedassg2-66ea.restdb.io/rest/reverblisting";

        const header = {
            "Content-Type": "application/hal+json",
            "Accept": "application/hal+json",
            "Accept-Version": "3.0"
        };

        getReverbData();
        // get and display data when the page loads
        getAndDisplayRestDBData();

        // Function to fetch data from Reverb API
        function getReverbData() {
            let settings = {
                method: "GET",
                headers: header,
            };

            fetch(reverbApiUrl, settings)
                .then(response => response.json())
                .then(data => {
                if (data.listings && data.listings.length > 0) {
                    // Proceed to fetch data from RestDB
                    getRestDBData(data.listings);
                } else {
                    console.log("No listings found in Reverb API.");
                }
                })
                .catch(error => {
                console.error(error.message)
                })
        }

        // Function to fetch existing data from RestDB
        function getRestDBData(reverbListings) {
            fetch(listingUrl, {
                method: "GET", // HTTP method
                headers: {
                    "Content-Type": "application/json",
                    "x-apikey": APIKEY,
                    "Cache-Control": "no-cache"
                }
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json(); // Parse the JSON response
                })
                .then(restDbData => {
                    const existingIds = restDbData.map(record => record["reverb-id"]); // Extract existing product IDs
                    insertNewDataToRestDB(reverbListings, existingIds); // Insert new data
                })
                .catch(error => {
                    console.error("Error fetching data from RestDB:", error);
                });
        }

        // Function to insert New data into restDB
        function insertNewDataToRestDB(reverbListings, existingIds) {
            reverbListings.forEach(listing => {
                const productId = listing.id; // Unique product ID
                if (!existingIds.includes(productId)) {
                    // Convert price to a numeric value
                    let price = 0;
                    if (listing.price && listing.price.display) {
                        // Extract numeric value from the price string (e.g., "$500.00" -> 500.00)
                        price = parseFloat(listing.price.display.replace(/[^0-9.-]+/g, '')) || 0;
                    }
        
                    // Generate random quantity as a number
                    const quantity = Math.floor(Math.random() * 100) + 1;
        
                    // Build product data for insertion
                    const productData = {
                        "reverb-id": productId,
                        "reverb-title": listing.title || "No title",
                        "reverb-price": price, // Converted price as a number
                        "reverb-availability": "Available", // Default value
                        "reverb-quantity": quantity, // Numeric quantity
                        "reverb-details": listing.description || "No description",
                        "reverb-condition": listing.condition ? listing.condition.display_name : "Unknown",
                        "reverb-shopname": listing.shop_name || "Unknown",
                        "reverb-category": listing.categories
                            ? listing.categories.map(c => c.full_name).join(", ")
                            : "Uncategorized",
                        "reverb-links": listing._links || {} // Save links for later use
                    };
        
                    // Log the product data being sent
                    console.log("Product Data Being Sent:", productData);
        
                    // Insert the product into RestDB using Fetch API
                    fetch(listingUrl, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "x-apikey": APIKEY
                        },
                        body: JSON.stringify(productData) // Stringify the product data
                    })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error(`HTTP error! Status: ${response.status}`);
                            }
                            console.log("Inserted new product:", productId);
                        })
                        .catch(error => {
                            console.error("Error inserting data into RestDB:", error);
                        });
                } else {
                    console.log("Product already exists in RestDB:", productId);
                }
            });
        }

        // Function to fetch and display data from RestDB
        function getAndDisplayRestDBData() {
            fetch(listingUrl, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "x-apikey": APIKEY,
                    "Cache-Control": "no-cache"
                }
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json(); // Parse the JSON response
                })
                .then(data => {
                    if (data.length > 0) {
                        if (window.location.pathname.includes('home.html')){
                            displayGalleryData(data);
                        }
                        else{
                            displayData(data); // Display the fetched data
                        }
                        
                    } else {
                        console.log("No data found in RestDB.");
                        document.getElementById("product-list").innerHTML = "<p>No products found.</p>";
                    }
                })
                .catch(error => {
                    console.error("Error fetching data from RestDB:", error);
                    document.getElementById("product-list").innerHTML = "<p>Error fetching data from RestDB.</p>";
                });
        }
        
        // Function to display data on the webpage
        function displayData(data) {
            let allItemsContent = "";

            // Loop through each product and generate HTML
            data.forEach(data, function (index, item) {
                imageLink = item["reverb-links"] && item["reverb-links"].photo ? item["reverb-links"].photo.href : null;

                allItemsContent += `
                    <div class="item">
                        ${imageLink ? `<img src="${imageLink}" alt="${item["reverb-title"]}" style="width: 150px; height: auto; margin-bottom: 10px;">` : "<p>No image available</p>"}
                        <h3>Product Title: ${item["reverb-title"]}</h3>
                        <p>Price: ${item["reverb-price"]}</p>
                        <p>Availability: ${item["reverb-availability"]}</p>
                        <p>Quantity: ${item["reverb-quantity"]}</p>
                        <p>Details: ${item["reverb-details"]}</p>
                        <p>Condition: ${item["reverb-condition"]}</p>
                        <p>Shop Name: ${item["reverb-shopname"]}</p>
                        <p>Category: ${item["reverb-category"]}</p>
                    </div>
                    <hr/>
                `;
            });

            // Append the generated HTML to the container
            $("#product-list").html(allItemsContent);
        }

        // Function to display data for home page
        function displayGalleryData(data) {
            galleryContainer = document.getElementById("trending-items-gallery");
            if (!galleryContainer) {
                console.error("Trending items gallery not found in the DOM.");
                return;
            }

            let cardsHTML = "";
            data.slice(0,4).forEach(item => {
                const imageLink = item["reverb-links"]?.photo?.href || "default-placeholder.jpg";
                cardsHTML += `
                    <div class="col-md-3">
                        <div class="card custom-card text-light shadow-sm">
                            <!-- User Information Section -->
                            <div class="d-flex align-items-center p-3">
                                <img src="images/man.jpg" alt="User Photo" class="rounded-circle me-3" width="50" height="50">
                                <div>
                                    <p class="mb-0 fw-bold">sustainable_thr</p>
                                    <small class="text-muted">20 days ago</small>
                                </div>
                            </div>
                            <!-- Product Image -->
                            <a href="product-details.html">
                                <img src="${imageLink}" alt="${item["reverb-title"]}" class="card-img-top">
                            </a>
                            <!-- Card Body -->
                            <div class="card-body text-start">
                                <p class="card-title fw-bold mb-2">${item["reverb-title"]}</p>
                                <p class="text-warning fw-bold">S$${item["reverb-price"]} <span class="text-decoration-line-through text-muted">S$${item["reverb-price"]}</span></p>
                            </div>
                        </div>
                    </div>
                `;
            });
            galleryContainer.innerHTML = cardsHTML;
             // ----------------------------- //
        } 
    } 
})