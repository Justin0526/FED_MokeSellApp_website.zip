document.addEventListener("DOMContentLoaded", function(){
    let APIKEY = "67972e07f9d2bb46c9181e32";  // 67875f7d9e18b182ee6941f0 678fbb8a58174779225315d5
    let allUserInfoUrl = "https://experiment-d5c7.restdb.io/rest/alluserinfo";   // https://tryuse-a494.restdb.io/rest/alluserinfo https://fedassg2-66ea.restdb.io/rest/alluserinfo
    let userProfileUrl = "https://experiment-d5c7.restdb.io/rest/user-profile";  // https://tryuse-a494.restdb.io/rest/user-profile https://fedassg2-66ea.restdb.io/rest/user-profile
    const header = {
        "Content-Type": "application/json",
        "x-apikey": APIKEY,
        "Cache-Control": "no-cache"
    };

    // Get the form element and attach the event listener
    document.getElementById("signup-form").addEventListener("submit", function(e){
        e.preventDefault();

        let signupForm = document.getElementById("signup-form");
        let userName = document.getElementById("user-name").value;
        let userEmail = document.getElementById("user-email").value;
        let userPassword = document.getElementById("user-password").value;
        let confirmUserPassword = document.getElementById("confirm-user-password").value;
        let signupButton = document.getElementById("user-signup");

        let passwordError = document.getElementById("passwordError");
        let confirmPasswordError = document.getElementById("confirmPasswordError");
        let emailError = document.getElementById("emailError");

        passwordError.style.display = 'none';
        confirmPasswordError.style.display = 'none';
        emailError.style.display = 'none';

        signupButton.disabled = true;
        signupButton.textContent = "Processing...";

        let loadingScreen = document.getElementById("loading-screen");  

        if (!validateInput(userEmail, userPassword, confirmUserPassword, passwordError, confirmPasswordError, emailError)){
            console.log("Validation failed!");
            signupButton.disabled = false;
            signupButton.textContent = "Sign up";
            signupForm.reset();
            return;
        }

        let encryptedPassword = caesarCipher(userPassword, 4);
        console.log(encryptedPassword);
        checkEmailUnique(userEmail)
        .then(isUnique => {
            if (!isUnique) {
                alert("This email is already registered. Please use a different email.");
                signupButton.disabled = false;
                signupButton.textContent = "Sign up";
                signupForm.reset();
                return;
            }

            let userJsondata = {
                "user-name": userName,
                "user-email": userEmail,
                "user-password": encryptedPassword
            };

            let userSettings = {
                method: "POST",
                headers: header,
                body: JSON.stringify(userJsondata)
            };

            fetch (allUserInfoUrl, userSettings)
              .then(response => response.json())
              .then(userData => {
                let linkedUserID = userData._id; // Get the new userID

                console.log("User Created", userData);

                let userProfileJsonData = {
                    "user-username": userName,
                    "user-email": userEmail,
                    "user-password": encryptedPassword,
                    "linked-userID": linkedUserID // Store 'allUserinfo' ID in 'user-profile'
                };
                
                let userProfileSettings = {
                    method: "POST",
                    headers: header,
                    body: JSON.stringify(userProfileJsonData)
                };
                return fetch (userProfileUrl, userProfileSettings);
              })
               .then(response => response.json())
               .then(profileData => {
                    console.log("User Profile Created: ", profileData);

                    // Store userID in session for future use
                    sessionStorage.setItem("userID", profileData["linked-userID"]);
                    sessionStorage.setItem("userEmail", userEmail);
                    sessionStorage.setItem("userName", userName);
                    sessionStorage.setItem("userPassword", encryptedPassword);
                    console.log(userName);
                
                    loadingScreen.style.display = 'flex';

                    // Initialize Lottie animation
                    const animation = lottie.loadAnimation({
                        container: document.getElementById('lottie-player'), // Render inside this div
                        renderer: 'svg', // Render type
                        loop: true, // Loop animation
                        autoplay: true, // Start automatically
                        path: 'https://lottie.host/0d391166-1d36-4e1c-bd8f-acf3bd0eabb3/qk0ba9dlOI.json' // Replace with your desired Lottie animation URL
                    });

                    animation.addEventListener("DOMLoaded", function(){
                        console.log("Animation loaded");
                        setTimeout(() => {
                            // Redirect to home page (change URL as needed)
                            alert(`Signup Successful! Hi ${userName}`);
                            window.location.href = 'index.html';
                            }, 3000); // Adjust delay time here (3 seconds)
                    });
                   
               })
                .catch(error => {
                    console.error("Error: ", error);
                    alert("An error occured while signing up. Please try again.");
                })
                .finally(() => {
                    signupButton.disabled = false;
                    signupButton.textContent = "Sign Up"; 
                });
            });

        function validateInput(email, password, confirmPassword, passwordError, confirmPasswordError, emailError) {
            if (password.length < 6) {
                passwordError.style.display = 'block';
                return false;
            }
    
            if (password !== confirmPassword) {
                confirmPasswordError.style.display = 'block';
                return false;
            }

            let passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).+$/; // Ensures that password has at least a letter and number
            if (!passwordRegex.test(password)){
                passwordError.textContent = "Password must contain at least 1 number and 1 letter";
                passwordError.style.display = "block";
                return false;
            }
    
            let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                emailError.style.display = 'block';
                return false;
            }
    
            return true;
        }
    
        function checkEmailUnique(email) {
            // Construct the query URL
            const queryUrl = `${allUserInfoUrl}?q={"user-email": "${email}"}`;
    
            return fetch(queryUrl, {
                method: "GET",
                headers: header
            })
            .then(response => response.json())
            .then(data => {
                return data.length === 0; // If data is empty, email is unique
            })
            .catch(error => {
                console.error("Error checking email:", error);
                return null; // Return false if an error occurs
            });
        }

        function caesarCipher(str, shift){
            let encrypted = "";
            for (let i =0; i< str.length; i++){
               // Use what we learn in sem 1, just the way to get the unicode for each character is different
               let charCode = str.charCodeAt(i);

               // Shift letters only (A-Z, a-z)
               if ((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122)){
                let shiftedCode = charCode + shift;

                // Make sure if Z + 1 it goes back to A
                if (charCode >= 65 && charCode <= 90 && shiftedCode > 90){
                    shiftedCode = 65 + (shiftedCode - 91);
                }

                // Do the same for lowwercase letters
                if (charCode >= 97 && charCode <= 122 && shiftedCode > 122){
                    shiftedCode = 97 + (shiftedCode - 123);
                }

                encrypted += String.fromCharCode(shiftedCode);
               }
               else{
                encrypted += str[i];
               }
            }
            return encrypted;
        }
    });
});