document.addEventListener("DOMContentLoaded", function(){
    let APIKEY = "678fbb8a58174779225315d5";
    let userProfileUrl = "https://fedassg2-66ea.restdb.io/rest/user-profile";
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
    fetch (userIDUrl, settings)
      .then(response => response.json())
      .then(data => {
        if (data.length === 0){
            console.error("User profile not found");
            return;
        }

        let userProfile = data[0];
        console.log(userProfile);

        let userNameDisplay = document.getElementById("username-display");
        let userNameInput = document.getElementById("username-input");
        let editUserNameBtn = document.getElementById("edit-userName-btn");

        userNameInput.style.display = "none";
        // Set initial username display
        userNameDisplay.textContent = userProfile["user-username"];

        // When edit button is clicked, switch display 
        editUserNameBtn.addEventListener("click", function(){
            userNameDisplay.style.display = "none"; // Hide text
            userNameInput.style.display="block"; // Show input field
            userNameInput.value = userNameDisplay.textContent; // Set input field value
            userNameInput.focus();
        });

        // When the user clicks away, update display and hide input
        userNameInput.addEventListener("blur", function(){
            userNameDisplay.textContent = userNameInput.value; // Update text display
            userNameDisplay.style.display = "block"; // Show text
            userNameInput.style.display = "none"; // Hide input field
        })

        userNameInput.addEventListener("keypress", function(event){
            if (event.key === "Enter"){
                event.preventDefault();
                userNameInput.blur(); // Trigger blur event to update display
            }
        });
      })
      .catch(error => {
        console.error("Error: ", error);
        alert("Error loading profile. Please try again later");
      })
})