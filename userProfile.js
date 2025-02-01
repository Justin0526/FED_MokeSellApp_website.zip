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

    fetch(userIDUrl, settings)
      .then(response => response.json())
      .then(data => {
        if (data.length === 0){
            console.error("User profile not found!");
            return;
        }

        let userProfile = data[0]; 

        console.log(userProfile)
        // // ✅ Update Profile Picture
        // document.getElementById("user-picture").innerHTML = 
        // `<img src="${userProfile["user-profile-picture"] || 'images/default-profile.png'}" 
        //     alt="User Profile" class="rounded-circle me-2" width="100" height="100">`;

        // ✅ Update User Name
        document.getElementById("user-name").textContent = userProfile["user-username"];

        // ✅ Update User Email
        document.getElementById("user-email").textContent = userProfile["user-email"];

      })
      .catch(error => {
        console.error("Error fetching user profile: ", error);
        alert("Error loading profile. Please try again later.");
      })
})