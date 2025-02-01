document.addEventListener("DOMContentLoaded", function(){
    let APIKEY = "678fbb8a58174779225315d5";  //  67875f7d9e18b182ee6941f0
    let userProfileUrl = "https://fedassg2-66ea.restdb.io/rest/user-profile";  //  https://tryuse-a494.restdb.io/rest/user-profile
    let createListingUrl = "https://fedassg2-66ea.restdb.io/rest/create-listing"; //   https://tryuse-a494.restdb.io/rest/create-listing
     
    let header = {
        "Content-Type": "application/json",
        "x-apikey": APIKEY,
        "Cache-Control": "no-cache"
    };

    let userID = sessionStorage.getItem("userID"); // Get the userID from session storage
    let userIDUrl = `${userProfileUrl}?q={"linked-userID": "${userID}"}`;

    let settings = {
        method: "GET",
        headers: header
    }

    fetch(userIDUrl, settings)
      .then(response => response.json())
      .then(data => {
        if (data.length === 0){
            console.error("User profile not found!");
            return;
        }

        let userProfile = data[0]; 

        console.log(userProfile)
        // Update User Name
        document.getElementById("user-name").textContent = userProfile["user-username"];

        // Update User Email
        document.getElementById("user-email").textContent = userProfile["user-email"];

        let userListings = `${createListingUrl}?q={"linked-userID": "${userProfile["linked-userID"]}"}`; // https://fedassg2-66ea.restdb.io/rest/create-listing?q={"linked-userID": "${userProfile["linked-userID"]}"}

        fetch (userListings, settings)
          .then(response => response.json())
          .then(listings => {
            console.log("User Listings: ", listings);
            if (listings.length !== 0){
              let listingTitle = document.getElementById("listing-title");
              listingTitle.textContent = "Listings";
              displayListing(listings);
            }
            else{
              console.log("No listings created yet!");
            }
          })
          .catch(error => console.error("Error fetching user listing: ", error));
      })
      .catch(error => {
        console.error("Error fetching user profile: ", error);
        alert("Error loading profile. Please try again later.");
      })

    document.getElementById("edit-profile-btn").addEventListener("click", function(){
        window.location.href = "profile-setting.html";
    })

    function displayListing(data){
      let totalListings = document.getElementById("totalListings");
      totalListings.textContent = data.length;

      console.log("Display Data...");
      let listingContainer = document.getElementById("listing-container"); 

      let listingContent = "";
      data.forEach(item => {
        let imageLink = item["product-picture"];
        listingContent += `  
          <div class="col-md-4">
            <div class="listing-card">
                <div class="listing-buttons">
                    <button class="edit-btn btn btn-primary" id="editListing" data-id="${item["_id"]}">Edit</button>
                    <button class="delete-btn">Delete</button>
                </div>
                <img src="${imageLink}" alt="${item["product-name"]}">
                <h5 class="mt-5">${item["product-name"]}</h5>
                <p>${item["product-description"]}</p>
                <p>S$ ${item["product-price"]}</p>
            </div>
        </div>`;

      })
      listingContainer.innerHTML = listingContent

      document.getElementById("editListing").addEventListener("click", function(){
        let listingID = this.getAttribute("data-id"); // Get the listing ID
        sessionStorage.setItem("editingListingID", listingID);
        window.location.href = "create-list.html";
      })
    }

   
})