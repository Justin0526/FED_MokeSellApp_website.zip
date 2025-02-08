document.addEventListener("DOMContentLoaded", function(){
    let APIKEY = "678fbb8a58174779225315d5";  //    67972e07f9d2bb46c9181e32 67875f7d9e18b182ee6941f0
    let reverbApiUrl = "https://api.reverb.com/api/listings/?page=1&per_page=1";
    let listingUrl = "https://fedassg2-66ea.restdb.io/rest/reverblisting"; //  https://experiment-d5c7.restdb.io/rest/reverblisting https://tryuse-a494.restdb.io/rest/testreverbapi
    let createListingUrl = "https://fedassg2-66ea.restdb.io/rest/create-listing"; //  https://experiment-d5c7.restdb.io/rest/create-listing https://tryuse-a494.restdb.io/rest/create-listing
    let reverbHeader = {
        "Content-Type": "application/hal+json",
        "Accept": "application/hal+json",
        "Accept-Version": "3.0"
    };
    
    let header = {
        "Content-Type": "application/json",
        "x-apikey": APIKEY,
        "Cache-Control": "no-cache"
    }

    let shuffledData = []; 

    document.querySelectorAll(".listings-btn")
      .forEach(button => {
        button.addEventListener("click", function(){
            let selectedCategory = this.innerText.trim(); //Get Button text
            console.log(selectedCategory);
            sessionStorage.setItem("selectedCategory", selectedCategory);
            window.location.href = "listings.html";
        })
      })

    // getReverbData();
    // get and display data when the page loads
    getAndDisplayRestDBData();

    function getAndDisplayRestDBData() {
        let settings = {
            method: "GET",
            headers: header
        };
    
        fetch(listingUrl, settings)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (data.length > 0) {
                    displayListings(data, "trending");
                    displayListings(data, "recommended");
                } else {
                    console.log("No data found in RestDB.");
                    document.getElementById("product-list").innerHTML = "<p>No products found.</p>";
                }
            })
            .catch(error => {
                console.error("Error fetching data from RestDB:", error);
                document.getElementById("product-list").innerHTML = "<p>Error fetching data from RestDB.</p>";
            });
    
        fetch(createListingUrl, settings)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    displayListings(data, "user");
                } else {
                    console.log("User hasn't created listings yet");
                    document.getElementById("user-listing-title").textContent = "";
                }
            });
    }
    
    function displayListings(data, type) {
        let containerId = type === "trending" ? "trending-items-gallery" :
                          type === "recommended" ? "recommended-items-gallery" :
                          "user-listings-gallery";
        
        let container = document.getElementById(containerId);
        if (!container) {
            console.error(`${type} gallery not found in the DOM.`);
            return;
        }
    
        let cardsHTML = "";
        let shuffledData = type !== "user" ? data.sort(() => Math.random() - 0.5) : data;
        let count = 0;
        let maxItems = type === "user" ? data.length : 4;
    
        shuffledData.slice(0, maxItems).forEach((item, index) => {
            let randomDays = Math.floor(Math.random() * 30) + 1;
            let imageLink = type !== "user" ? item["reverb-links"]?.photo?.href : item["product-picture"];
            if (!imageLink) return;
    
            let cardHTML = `
                <div class="col-md-3">
                    <div class="card custom-card text-light shadow-sm">
                        <div class="d-flex align-items-center p-3 profile-info">
                            <img src="images/man.jpg" alt="User Photo" class="rounded-circle me-3" width="50" height="50">
                            <div>
                                <p class="mb-0 fw-bold profile-name">${item["product-shopname"]}</p>
                                <small class="text-muted join-date">${randomDays} days ago</small>
                            </div>
                        </div>
                        <div class="product-link" data-id="${item["product-id"]}" role="button">
                            <img src="${imageLink}" alt="${item["product-name"]}" class="card-img-top">
                        </div>
                        <div class="card-body text-start">
                            <p class="card-title fw-bold mb-2">${item["product-name"]}</p>
                            <p class="text-warning fw-bold">S$${item["product-price"]}</p>
                        </div>
                    </div>
                </div>
            `;
            cardsHTML += cardHTML;
            count++;
        });
    
        container.innerHTML = cardsHTML;
    
        document.querySelectorAll(".product-link").forEach((element) => {
            element.addEventListener("click", function (event) {
                event.preventDefault();
                let itemId = this.getAttribute("data-id");
                let selectedItem = shuffledData.find(item => item["product-id"] == itemId);
                alert(selectedItem);
                if (selectedItem) {
                    sessionStorage.setItem("selectedProduct", JSON.stringify(selectedItem));
                    window.location.href = "product-details.html";
                } else {
                    console.error("Error: selectedItem is undefined.");
                }
            });
        });
    }
    

    // Function to fetch data from Reverb API
    function getReverbData() {
        let settings = {
            method: "GET",
            headers: reverbHeader,
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
        let settings = {
            method: "GET",
            headers: header
        }
        fetch(listingUrl, settings)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json(); // Parse the JSON response
            })
            .then(restDbData => {
                existingIds = restDbData.map(record => record["product-id"]); // Extract existing product IDs
                insertNewDataToRestDB(reverbListings, existingIds); // Insert new data
            })
            .catch(error => {
                console.error("Error fetching data from RestDB:", error);
            });
    }

    // Function to insert New data into restDB
    function insertNewDataToRestDB(reverbListings, existingIds) {
        reverbListings.forEach(listing => {
            productId = listing.id; // Unique product ID
            if (!existingIds.includes(productId)) {
                // Convert price to a numeric value
                let price = 0;
                if (listing.price && listing.price.display) {
                    // Extract numeric value from the price string (e.g., "$500.00" -> 500.00)
                    price = parseFloat(listing.price.display.replace(/[^0-9.-]+/g, '')) || 0;
                }
    
                // Generate random quantity as a number
                quantity = Math.floor(Math.random() * 100) + 1;
    
                // Build product data for insertion
                productData = {
                    "product-id": productId,
                    "product-name": listing.title || "No title",
                    "product-price": price, // Converted price as a number
                    "product-availability": "Available", // Default value
                    "product-quantity": quantity, // Numeric quantity
                    "product-description": listing.description || "No description",
                    "product-condition": listing.condition ? listing.condition.display_name : "Unknown",
                    "product-shopname": listing.shop_name || "Unknown",
                    "product-category": listing.categories
                        ? listing.categories.map(c => c.full_name).join(", ")
                        : "Uncategorized",
                    "reverb-links": listing._links || {} // Save links for later use
                };
    
                // Log the product data being sent
                console.log("Product Data Being Sent:", productData);
    
                // Insert the product into RestDB using Fetch API
                let settings = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "x-apikey": APIKEY
                    },
                    body: JSON.stringify(productData) // Stringify the product data
                };
                fetch(listingUrl, settings)
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

})

// Chat Bot
document.addEventListener("DOMContentLoaded", function(){
    // http://api.duckduckgo.com/?q=x&format=json x being the search terms you're looking for. (Stackoverflow)
    let duckduckGoUrl = "https://api.duckduckgo.com";
    let sendButton = document.getElementById("sendMessage");
    let userInput = document.getElementById("userInput");
    let chatContainer = document.querySelector(".chat-container");
    let chatIcon = document.getElementById("chatIcon")
    let exitChat = document.getElementById("closeChat")

    chatContainer.style.display = "none";

    chatIcon.addEventListener("click", function(){
        chatContainer.style.display = "block";
        chatIcon.style.display = "none";
    })

    exitChat.addEventListener("click", function(){
        chatContainer.style.display = "none";
        chatIcon.style.display = "block";
    })

    sendButton.addEventListener("click", sendMessage);
    userInput.addEventListener("keypress", function(e){
        if(e.key === "Enter"){
            sendMessage(); // Send message by enter key
        }
    });

    function sendMessage(){
        let userInputValue = userInput.value.trim();
        if (userInputValue === "") return;

        appendMessage("user", userInputValue);
        userInput.value = ""; // reset user input

        getDuckDuckGoAnswer(userInputValue)
          .then(response => {
            appendMessage("bot", response) // Display bot message
          })
    };

    function getDuckDuckGoAnswer(input){
        return fetch(`${duckduckGoUrl}/?q=${input}&format=json`)
          .then(response => response.json())
          .then(data => {
            if (data.AbstractText && data.AbstractText.trim() !== ""){
                return data.AbstractText;
            }
            if (data.Answer && data.Answer.trim() !== ""){
                return data.Answer;
            }
            if (Array.isArray(data.RelatedTopics) && data.RelatedTopics.length > 0){
                return data.RelatedTopics[0].Text || "I found something, but I'm not sure how to display it.😭";
            }
            return "Sorry, I couldn't find an answer. Are you trying to tell me a joke🤯";
          })
          .catch(error => {
            console.error("Error fetching data: ", error);
            return "Error fetching data";
          });
    }

    function appendMessage(sender, message){
        let chatbox = document.getElementById("chatBox");
        let messageContainer = document.createElement("div");
        messageContainer.classList.add(
            "message-container",
            sender === "user" ? "user-container" : "bot-container" //User container if sender is user, else it is bot
        )

        let profilePic = document.createElement("img");
        profilePic.src = sender === "user" ? "images/man.jpg" : "images/paypal.png";
        profilePic.classList.add("profile-pic");

        let messageMsg = document.createElement("div");
        messageMsg.classList.add(sender === "user" ? "user-message" : "bot-message");
        messageMsg.innerHTML = `<span>${message}</span>`

        if (sender === "user"){
            messageContainer.appendChild(messageMsg);
            messageContainer.appendChild(profilePic);
        }
        else{
            messageContainer.appendChild(profilePic);
            messageContainer.appendChild(messageMsg);
        }

        chatbox.appendChild(messageContainer);
        // Auto scroll down to display the newest message
        chatbox.scrollTop = chatbox.scrollHeight;
    }
})


// For transformation

document.addEventListener("DOMContentLoaded", () => {
    const chatIcon = document.getElementById("chatIcon");
    const chatContainer = document.querySelector(".chat-container");
    const closeChat = document.getElementById("closeChat");

    // Open chat
    chatIcon.addEventListener("click", () => {
        chatContainer.classList.add("open"); // Add the 'open' class for animation
    });

    // Close chat
    closeChat.addEventListener("click", () => {
        chatContainer.classList.remove("open"); // Remove the 'open' class
        setTimeout(() => {
            chatContainer.style.display = "none"; // Hide after animation
        }, 400); // Match the animation duration
    });
});
