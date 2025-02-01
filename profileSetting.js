document.addEventListener("DOMContentLoaded", function(){
    let APIKEY = "67875f7d9e18b182ee6941f0";  // 678fbb8a58174779225315d5
    let userProfileUrl = "https://tryuse-a494.restdb.io/rest/user-profile";  // https://fedassg2-66ea.restdb.io/rest/user-profile
    let header = {
        "Content-Type": "application/json",
        "x-apikey": APIKEY,
        "Cache-Control": "no-cache"
    };

    let userID = sessionStorage.getItem("userID"); // Get the userID from session storage
    let userIDUrl = `${userProfileUrl}?q={"linked-userID": "${userID}"}`; // fetch the user profile based on the linked-userID field
    
    let GETsettings = {
        method: "GET",
        headers: header
    }
    let fields = ["username", "email", "firstName", "lastName", "mobileNumber"];
    let gender = document.getElementById("gender");
    let saveChanges = document.getElementById("save-change");
    let updatedUserData = {};

    fields.forEach(field => {
        let displayElement = document.getElementById(`${field}-display`);
        let inputElement = document.getElementById(`${field}-input`);
        let editButton = document.getElementById(`edit-${field}-btn`);

        if (displayElement && inputElement && editButton){
            editButton.addEventListener("click", function(){
                console.log("Edit button clicked");
                displayElement.style.display = "none";
                inputElement.style.display = "block";
                inputElement.value = displayElement.textContent;
                inputElement.focus();
            });

            inputElement.addEventListener("blur", function(){
                displayElement.textContent = inputElement.value; // update text
                displayElement.style.display = "block";
                inputElement.style.display = "none";

                updatedUserData[`user-${field}`] = inputElement.value.trim();
                console.log("Updated User Data: ", updatedUserData);
            })

            inputElement.addEventListener("keypress", function(event){
                if (event.key === "Enter"){
                    event.preventDefault();
                    inputElement.blur();
                }
            })
        }
    })
        
    fetch (userIDUrl, GETsettings)
      .then(response => response.json())
      .then(data => {
        if (data.length === 0){
            console.error("User profile not found");
            return;
        }

        let userProfile = data[0];
        console.log(userProfile)

        let userProfileID = userProfile["_id"];
        let profileImage = document.getElementById("profileImage");
        let storedImage = userProfile["user-profile-picture"];
        
        if (storedImage && storedImage.trim() !== ""){
            profileImage.src = storedImage; // Load saved image from database
        }
        else{
            profileImage.src = "images/man.jpg"; // Default image
        }
        
        console.log("Fetched User Profile ID: ",userProfileID);
        sessionStorage.setItem("userProfileID", userProfileID); // Get the actual profile ID

        // Populate fields with user data
        fields.forEach(field => {
            let displayElement = document.getElementById(`${field}-display`);
            if (displayElement){
                let userData = userProfile[`user-${field}`];
                if (userData && userData.trim() !== ""){
                    displayElement.textContent = userData;
                }       
            }
        })
        let userGender = userProfile["user-gender"];
        if (userGender && userGender.trim() !== ""){
            gender.value = userGender;
        }
        else{
            gender.value = "";
        }
        gender.addEventListener("change", function(){
            updatedUserData["user-gender"] = gender.value;
            console.log("Gender updated to: ", updatedUserData["user-gender"]);
        })

      })
      .catch(error => {
        console.error("Error: ", error);
        alert("Error loading profile. Please try again later");
      })

      document.getElementById("imageInput").addEventListener("change", function(event){
        let file = event.target.files[0] // Get selected file
        if (file){
            let reader = new FileReader();
            reader.onload = function(e){
                document.getElementById("profileImage").src = e.target.result;
                updatedUserData["user-profile-picture"] = e.target.result; // Store image as Base64
            };
            reader.readAsDataURL(file);
        }
      })

      document.getElementById("deleteImageBtn").addEventListener("click", function(){
        removeImage();
      })

      saveChanges.addEventListener("click", function(){
        saveChanges.disabled = true;
        
        let userProfileID = sessionStorage.getItem("userProfileID"); // Get the correct user-profile _id

        if (!userProfileID) {
            console.error("Error: User Profile ID is missing.");
            alert("Error: Unable to update profile. Please refresh and try again.");
            saveChanges.disabled = false;
            return;
        }

        if (updatedUserData["user-profile-picture"]){
            console.log("Profile image updated: ", updatedUserData["user-profile-image"]);
        }

        let newPassword = document.getElementById("newPassword").value.trim();
        let confirmPassword = document.getElementById("confirmPassword").value.trim();

        let confirmPasswordError = document.getElementById("confirmPasswordError");
        let samePasswordError = document.getElementById("samePasswordError");
        let passwordLengthError = document.getElementById("passwordLengthError");
        let emptyPasswordError = document.getElementById("emptyPasswordError");

        confirmPasswordError.style.display = "none";
        samePasswordError.style.display = "none";
        passwordLengthError.style.display = "none";
        emptyPasswordError.style.display = "none";
    
        let existingPassword = sessionStorage.getItem("userPassword");
        if (newPassword !== "" && confirmPassword !== ""){
            if (newPassword === existingPassword){
                samePasswordError.style.display = "block";
                saveChanges.disabled = false;
                return;
            }
            else if (newPassword.length < 6){
                passwordLengthError.style.display = "block";
                saveChanges.disabled = false;
                return;
            }
            else if (newPassword !== confirmPassword){
                confirmPasswordError.style.display = 'block';
                saveChanges.disabled = false;
                return;
            }
            else{
                updatedUserData["user-new-password"] = newPassword //Store the new password
                console.log("New password updated: ", updatedUserData["user-new-password"]);
            }      
        }
        else if (newPassword != "" && confirmPassword === ""){
            emptyPasswordError.style.display = "block";
            saveChanges.disabled = false;
            return;
        }
    
        // Prevent sending empty data
        if (Object.keys(updatedUserData).length === 0) {
            console.warn("No changes detected.");
            alert("No changes were made.");
            saveChanges.disabled = false;
            return;
        }

        let updatedUrl = `${userProfileUrl}/${userProfileID}`;

        let updatedSettings = {
            method: "PUT",
            headers: header,
            body: JSON.stringify(updatedUserData)
        };
        console.log("Updating Profile:", updatedUrl);
        console.log("Data Sent:", JSON.stringify(updatedUserData, null, 2));

        fetch(updatedUrl, updatedSettings)
          .then(response => response.json())
          .then(updatedProfile => {
            console.log("Profile updated successfully: ", updatedProfile);

            let linkedUserID = updatedProfile["linked-userID"]; // Get the linked userID
            console.log("Linked User ID: ", linkedUserID);

            if (linkedUserID && updatedUserData["user-new-password"]){
                updateAllUserInfo(linkedUserID, updatedUserData["user-new-password"]);
            }
            else{
                console.log("Everything but password is not updated");
                saveChanges.disabled = false;
                updatedUserData = {};
            }

            alert("Profile updated successfully!");
            saveChanges.disabled = false;
            updatedUserData = {} // Reset after saving
          })
          .catch(error => {
            console.log("Error updating profile: ", error);
            alert("An error occurred while updating your profile. Please try again.");
            saveChanges.disabled = false;
          })

      })
    
    function updateAllUserInfo(linkedUserID, newPassword){
        let allUserInfoUrl = "https://tryuse-a494.restdb.io/rest/alluserinfo";   // https://fedassg2-66ea.restdb.io/rest/alluserinfo
        let allUserInfoUpdateUrl = `${allUserInfoUrl}/${linkedUserID}`;

        let updatePasswordData = {
            "user-password": newPassword
        };

        let updateSettings = {
            method: "PUT",
            headers: header,
            body: JSON.stringify(updatePasswordData)
        };

        console.log("Updating AllUserInfo API: ", allUserInfoUpdateUrl);
        console.log("New password: ", updatePasswordData)

        fetch (allUserInfoUpdateUrl, updateSettings)
          .then(response => response.json())
          .then(updatedPassword => {
            console.log("Password updated successfully: ", updatedPassword)
            saveChanges.disabled = false;
            updatedUserData = {};
          })
          .catch(error => {
            console.log("Error updating password in allUserInfo API: ", error);
            saveChanges.disabled = false;
          })
    }
    
    function removeImage(){
        let profileImage = document.getElementById("profileImage");
        profileImage.src = "images/man.jpg" // Reset to default
        updatedUserData["user-profile-picture"] = "";
        console.log("Profile image removed");
    }
})