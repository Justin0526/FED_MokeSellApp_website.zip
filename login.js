document.addEventListener("DOMContentLoaded", function(){
    const APIKEY = "678fbb8a58174779225315d5";
    let allUserInfoUrl = "https://fedassg2-66ea.restdb.io/rest/alluserinfo";
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
            let correctPassword = userData["user-password"];
            let userID = userData["_id"]; // Get userID from database

            if (userPassword === correctPassword){
                console.log("YAY");
                alert(`Welcome back ${userName}`);

                sessionStorage.setItem("userID", userID);
                sessionStorage.setItem("userEmail", userEmail);
                sessionStorage.setItem("userName", userName);

                // Disable login button while processing
                let loginButton = document.getElementById("user-login");
                loginButton.disabled = true;
                            
                console.log("UserID: ", userID)
                console.log("Login successful:", userData);
                window.location.href = "home.html";
    
            }
            else{
                passwordError.style.display = 'block';
            }           
        })
        .catch(error => {
            console.error("Login error: ", error);
            alert("An error occured while logging in. Pleasee try again");
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
    })
})