document.addEventListener("DOMContentLoaded", function(){
    let APIKEY = "67875f7d9e18b182ee6941f0";  // 678fbb8a58174779225315d5 67972e07f9d2bb46c9181e32
    let allUserInfoUrl = "https://tryuse-a494.restdb.io/rest/alluserinfo";   //  https://fedassg2-66ea.restdb.io/rest/alluserinfo https://experiment-d5c7.restdb.io/rest/alluserinfo
    let chatUrl = "https://tryuse-a494.restdb.io/rest/chat";
    let duckduckGoUrl = "https://api.duckduckgo.com";
    let userID = sessionStorage.getItem("userID");
    let chatContainer = document.querySelector(".chat-headers");

    let header = {
        "Content-Type": "application/json",
        "x-apikey": APIKEY,
        "Cache-Control": "no-cache"
    }

    let chatInfo = sessionStorage.getItem("chatInformation");
    console.log(chatInfo);
    console.log(userID);

    if (!chatInfo || !chatInfo.receiverID){
        console.log("No receiverID found in session storage");
        return;
    }

    let receiverID = chatInfo.receiverID;

    let GETsettings = {
        method: "GET",
        headers: header
    }

    fetch(chatUrl, GETsettings)
      .then(response => response.json())
      .then(chatData => {
        let chatPartners = [];

        chatData.forEach(chat => {
            if (chat.senderID === userID && chatPartners.includes(chat.receiverID)){
                chatPartners.push(chat.receiverID); // Add receiver if not already in the array
            }
            else if (chat.receiverID === userID && !chatPartners.includes(chat.senderID)){
                chatPartners.push(chat.senderID); // Add sender if not already in the array
            }
        });

        console.log(chatPartners);

        fetch(allUserInfoUrl, GETsettings)
            .then(response => response.json())
            .then(users => {
                chatContainer.innerHTML = ""; // Clear previous chat list

                chatPartners.forEach(partnerID => {
                    let user = users.find(u => u._id === partnerID)
                    if (user){
                        let chatItem = document.createElement("div");
                        chatItem.className = "chat-header-item";
                        chatItem.onclick = function(){
                            loadChat(user["user-name"], "images/man.jpg");

                            chatItem.innerHTML = `
                                <img src="images/man.jpg"
                                <span>${user["user-name"]}</span>
                            `;

                            chatContainer.appendChild(chatItem);
                        }
                    }
                })
            })
            .catch(error => console.error("Error fetching users: ", error));

      })
      .catch(error => console.error("Error fetching chat history: ", error));

    function startInstantAnswerChat(){
        let userInput = document.getElementById("userInput");
        let messageText = userInput.value.trim();

        if (!messageText) return;

        let duckduckgo = `${duckduckGoUrl}/?q=${messageText}&format=json`;

        fetch(apiUrl)
          .then(response => response.json())
          .then(data => {
            let duckduckGo;

            if (data.Abstract){
                duckduckGo = data.Abstract;
            }
            else if (data.RelatedTopics.length > 0){
                duckduckGo = data.RelatedTopics[0].Text;
            }
            else {
                duckduckGo = "Sorry, I couldn't find an answer";
            }

            displayMessage(duckduckGo, "other")
          })
          .catch(error => {
            console.error("Error fetcching instant answer: ", error);
            displayMessage("Sorry, I couldn't retrieve an answer right now.", "other");
          })
        userInput.value = ""; // Clear input field
    }

    function displayMessage(text, sender){
        let chatBox = document.getElementById("chatBox");
        let newMessage = document.createElement("div");
        newMessage.className = `message${sender}`;

        if (sender === "other"){
            newMessage.innerHTML = `<img src="images/paypal.png" alt="Bot"> <div class="message-text">${text}</div>`;
        }
        else{
            newMessage.innerHTML = `<span>${text}</span>`;
        }

        chatBox.appendChild(newMessage);
        chatBox.scrollTop = chatBox.scrollHeight;
    }
})