document.addEventListener("DOMContentLoaded", function(){
    let APIKEY = "67875f7d9e18b182ee6941f0";  //  678fbb8a58174779225315d5 67972e07f9d2bb46c9181e32
    let userProfileUrl = "https://tryuse-a494.restdb.io/rest/user-profile";  //  https://fedassg2-66ea.restdb.io/rest/user-profile https://experiment-d5c7.restdb.io/rest/user-profile
    let chatUrl = "https://tryuse-a494.restdb.io/rest/chat"; //  https://fedassg2-66ea.restdb.io/rest/chat https://experiment-d5c7.restdb.io/rest/chat
    let userID = sessionStorage.getItem("userID");
    let sendChat = document.getElementById("sendButton");
    let chatHeaders = document.querySelector(".chat-headers");

    const header = {
        "Content-Type": "application/json",
        "x-apikey": APIKEY,
        "Cache-Control": "no-cache"
    };

    const GETsettings = {
      method: "GET",
      headers: header
    };

    let shopName = sessionStorage.getItem("shopName");

    fetch(userProfileUrl, GETsettings)
    .then(response => response.json())
    .then(data => {
        if (shopName) {
            console.log("Checking if shopname exists in user profiles:", shopName);
            let sellerProfile = data.find(user => user["user-username"].trim().toLowerCase() === shopName.trim().toLowerCase());
            
            if (sellerProfile) {
                console.log("Seller found:", sellerProfile);
                loadChat(shopName, sellerProfile["user-profile-picture"], sellerProfile["linked-userID"]);
            } else {
                console.log("Seller not found. Enabling AI Chat...");
                duckduckGo(shopName);
            }
        }

        if (data.length > 0) {
            data.forEach(user => {
                if (user["linked-userID"] !== userID) {
                    let chatItem = document.createElement("div");
                    chatItem.className = "chat-header-item";
                    let image = user["user-profile-picture"] ? user["user-profile-picture"] : "images/man.jpg";
                    let username = user["user-username"];
                    let receiverID = user["linked-userID"];

                    chatItem.innerHTML = `
                        <img src="${image}" alt="${username}" class="chat-avatar">
                        <span>${username}</span>
                    `;

                    chatItem.addEventListener("click", () => loadChat(username, image, receiverID));
                    chatHeaders.appendChild(chatItem);
                }
            });
        } else {
            console.log("You are the only user, time for some sad music. Meow meow meow meow");
        }
    })
    .catch(error => console.error("Error fetching users from RestDB:", error));

    sendChat.addEventListener("click", sendMessage);

    function sendMessage(){
        let userName = document.getElementById("chatUsername").innerText;
        let userInput = document.getElementById("userInput");
        let messageText = userInput.value.trim();
        let chatbox = document.getElementById("chatBox");

        let receiverID = sessionStorage.getItem("receiverID"); // Get the correct receiverID

        if (messageText && userName !== "Select a Chat" && receiverID){
            let message = {
                "senderID": userID,
                "receiverID": receiverID,
                "message": messageText
            };
            const POSTsettings = {
                method: "POST",
                headers: header,
                body: JSON.stringify(message)
            };

            fetch(chatUrl, POSTsettings)
            .then(response => response.json())
            .then(data => {
                console.log("Data being sent:", data);
                appendMessage("user", messageText);
            })
            .catch(error => console.error("Error:", error));
        }

        userInput.value = "";
        chatbox.scrollTop = chatbox.scrollHeight;
    }

    function loadChat(username, imgUrl, receiverID){

        let chatHeader = document.getElementById("chatHeader");
        chatHeader.style.display = "flex";

        console.log("Chat loading...")
        document.getElementById("chatUsername").innerText = username;
        document.getElementById("chatHeaderImg").src = imgUrl;

        let chatBox = document.getElementById("chatBox");
        chatBox.innerHTML = "";

        const userInput = document.getElementById('userInput');
        userInput.disabled = false;
        const sendButton = userInput.nextElementSibling;
        sendButton.disabled = false;

        fetch(chatUrl, GETsettings)
          .then(response => response.json())
          .then(data => {
            data.forEach(msg => {
                console.log(data);
                if ((msg.senderID === userID && msg.receiverID === receiverID) || 
                    (msg.senderID === receiverID && msg.receiverID === userID)){
                      appendMessage(msg.senderID === userID ? "user" : "receiver", msg.message);
                    }           
            });

            chatBox.scrollTop = chatBox.scrollHeight;
          })
          .catch(error => {
            console.error("Error fetching chat history: ", error);
          });

        // Store receiverID dynamically for sending messages
        sessionStorage.setItem("receiverID", receiverID);
    }
    function duckduckGo(shopName) {
      let chatBox = document.getElementById("chatBox");
      let sendChat = document.getElementById("sendButton");
      let userInput = document.getElementById("userInput");
  
      chatBox.innerHTML = `<p class="text-center text-muted">Chat with ${shopName}</p>`;
  
      // Ensure input is enabled properly
      userInput.disabled = false;
      sendChat.disabled = false;
  
      // Instead of removing listeners, just ensure input is always read correctly
      sendChat.addEventListener("click", function () {
          sendMessageAI(userInput.value.trim());
      });
  
      // Support "Enter" key for sending messages
      userInput.addEventListener("keypress", function (e) {
          if (e.key === "Enter") {
              sendMessageAI(userInput.value.trim());
          }
      });
    }
    
    function sendMessageAI(messageText) {
        let userInput = document.getElementById("userInput");
    
        if (!messageText || messageText.length === 0) {
            console.warn("Message text is empty. Ignoring.");
            return;
        }
    
        appendMessage("user", messageText);
        userInput.value = "";  // Clear input AFTER reading value
    
        fetch(`https://api.duckduckgo.com/?q=${messageText}&format=json`)
            .then(response => response.json())
            .then(data => {
                let aiResponse = data.AbstractText?.trim() || 
                data.Answer?.trim() || 
                (data.RelatedTopics?.[0]?.Text || "I found something, but I'm not sure how to display it. 😭");
                appendMessage("ai", aiResponse);
            })
            .catch(error => {
                console.error("Error fetching AI response:", error);
                appendMessage("ai", "Oops! I'm having trouble responding right now. 😢");
            });
    }
  
    function appendMessage(sender, message) {
      let chatBox = document.getElementById("chatBox");
      let messageBox = document.createElement("div");
      messageBox.className = `message ${sender}`;
      messageBox.innerHTML = `<span>${message}</span>`;
      chatBox.appendChild(messageBox);
      chatBox.scrollTop = chatBox.scrollHeight;
    }
})