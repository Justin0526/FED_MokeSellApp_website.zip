document.addEventListener("DOMContentLoaded", function(){
    let APIKEY = "678fbb8a58174779225315d5";  // 67875f7d9e18b182ee6941f0 67972e07f9d2bb46c9181e32
    let contact = "https://fedassg2-66ea.restdb.io/rest/contact"

    let header = {
        "Content-Type": "application/json",
        "x-apikey": APIKEY,
        "Cache-Control": "no-cache"
    }

    let contactForm = document.getElementById("contactForm");

    contactForm.addEventListener("submit", function(e){
        e.preventDefault();

        let contactCategory = document.getElementById("contactCategory").value;
        let contactName = document.getElementById("contactName").value;
        let contactEmail = document.getElementById("contactEmail").value;
        let contactMessage = document.getElementById("contactMessage").value;

        let categoryError = document.getElementById("categoryError");
        let nameError = document.getElementById("nameError");
        let emailError = document.getElementById("emailError");
        let messageError = document.getElementById("messageError");

        categoryError.style.display = "none";
        nameError.style.display = "none";
        emailError.style.display = "none";
        messageError.style.display = "none"

        let isValid = true;

        if (!contactCategory){
            categoryError.style.display = "block";
            isValid = false;
        }

        if (!contactName){
            nameError.style.display = "block";
            isValid = false;
        }

        if (!contactEmail){
            emailError.style.display = "block";
            isValid = false;
        }
        else{
            let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(contactEmail)) {
                emailError.textContent = "Invalid email format";
                emailError.style.display = 'block';
                isValid = false;
            }
        }

        if (!contactMessage){
            messageError.style.display = "block";
            isValid = false;
        }

        if (!isValid){
            return;
        }

        document.getElementById("contactSubmit").disabled = true;

        let contactData = {
            "contact-category": contactCategory,
            "contact-name": contactName,
            "contact-email": contactEmail,
            "contact-message": contactMessage
        }

        let settings = {
            method: "POST",
            headers: header,
            body: JSON.stringify(contactData),
        };

        fetch (contact, settings)
          .then(response => response.json())
          .then(data => {
            console.log(data);
            document.getElementById("contactSubmit").disabled = false;
            alert("Response submitted successfully!");
            contactForm.reset();
          })
          .catch(error => {
            console.error("Error: ", error);
            document.getElementById("contactSubmit").disabled = false;
          })
    })

})