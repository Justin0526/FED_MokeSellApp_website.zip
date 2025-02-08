document.addEventListener("DOMContentLoaded", function(){
    let APIKEY = "67875f7d9e18b182ee6941f0";  //   678fbb8a58174779225315d5 67972e07f9d2bb46c9181e32
    let allUserInfoUrl = "https://tryuse-a494.restdb.io/rest/alluserinfo";   // https://fedassg2-66ea.restdb.io/rest/alluserinfo https://experiment-d5c7.restdb.io/rest/alluserinfo
    let header = {
        "Content-Type": "application/json",
        "x-apikey": APIKEY,
        "Cache-Control": "no-cache"
    }

    document.getElementById("login-form").addEventListener("submit", function (e) {
        e.preventDefault();
        
        // Retrieve form data
        let userEmail = document.getElementById("user-email").value;
        let userPassword = document.getElementById("user-password").value;
        let loadingScreen = document.getElementById("loading-screen");

        loadingScreen.style.display = "none";

        // let emailError = document.getElementById("emailError");
        let passwordError = document.getElementById("passwordError");
        // Validate inputs
        if (!validateInput(userEmail)) {
            console.log("Validation failed!");
            return;
        }

        checkEmailExists(userEmail)
          .then(userData => {
            if (!userData){           
                alert("This email is not registered. Please signup first")
                return;
            }

            // emailError.style.display = 'none';
            passwordError.style.display = 'none';
            let userName = userData["user-name"];
            let userID = userData["_id"]; // Get userID from database

            let userEncryptedPassword = userData["user-password"];
            let decipheredPassword = caesarDecipher(userEncryptedPassword, 4);
            console.log(decipheredPassword);

            if (userPassword === decipheredPassword){
                console.log("YAY");

                sessionStorage.setItem("userID", userID);
                sessionStorage.setItem("userEmail", userEmail);
                sessionStorage.setItem("userName", userName);
                sessionStorage.setItem("userPassword", userEncryptedPassword);

                // Disable login button while processing
                let loginButton = document.getElementById("user-login");
                loginButton.disabled = true;
                            
                console.log("UserID: ", userID)
                console.log("Login successful:", userData);

                loadingScreen.style.display = 'flex';

                // Initialize Lottie animation
                const animation = lottie.loadAnimation({
                    container: document.getElementById('lottie-player'), // Render inside this div
                    renderer: 'svg', // Render type
                    loop: true, // Loop animation
                    autoplay: true, // Start automatically
                    path: 'https://lottie.host/0d391166-1d36-4e1c-bd8f-acf3bd0eabb3/qk0ba9dlOI.json' // Replace with your desired Lottie animation URL
                });
            
                setTimeout(() => {
                    // Redirect to home page (change URL as needed)
                    alert(`Welcome back ${userName}`);
                    window.location.href = 'index.html';
                    }, 3000); // Adjust delay time here (3 seconds)
    
            }
            else{
                passwordError.style.display = 'block';
            }           
        })
        .catch(error => {
            console.error("Login error: ", error);
            alert("An error occured while logging in. Pleasee try again");
        })
    })
    // A regular expression (emailRegex) ensures that the email follows a basic structure
    // /^[^\s@]+: Begins with one or more non-whitespace and non @characters
    // @[^\s@]+: Includes an @ symbol followed by one or more valid characters
    // \.[^\s@]+$/: Ends with a dot and a valid domain (eg: .com, .org)
    function validateInput(email){
        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // test() returns true if the string matches the pattern defined by the regular expression, false otherwise
        if (!emailRegex.test(email)){
            alert ("Please enter a valid email address.");
            return false;
        }
        
        return true;
    }

    function checkEmailExists(email){
        let queryUrl = `${allUserInfoUrl}?q={"user-email": "${email}"}`;

        let settings = {
            method: "GET",
            headers: header
        }
        return fetch(queryUrl, settings)
        .then(response => response.json())
        .then(data => {
            if (data.length === 0){
                return null;
            }
            return data[0];
        })
        .catch(error =>{
            console.error("Error checking email: ", error);
            return null;
        })
    }

    function caesarDecipher(str, shift){
        let decrypted = "";
        for (let i = 0; i< str.length; i++){
            let charCode = str.charCodeAt(i);

            if (charCode >= 65 && charCode <= 90){
                let shiftedCode = charCode - shift;
                if (shiftedCode < 65){
                    shiftedCode = 90 - (64 - shiftedCode);
                }
                decrypted += String.fromCharCode(shiftedCode);
            }

            else if (charCode >= 97 && charCode <= 122){
                let shiftedCode = charCode - shift;
                if (shiftedCode < 97){
                    shiftedCode = 122 - (96 - shiftedCode);
                }
                decrypted += String.fromCharCode(shiftedCode);
            }
            else{
                decrypted += str[i];
            }
        }
        return decrypted;
    };
});