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