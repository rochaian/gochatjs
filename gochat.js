function createChatbotComponent() {
  const chatbotButton = document.createElement("button");
  const chatbotWindow = document.createElement("div");
  const chatbotWindowHeader = document.createElement("div");
  const chatbotMessages = document.createElement("div");
  const chatbotInput = document.createElement("input");
  const circleRed = document.createElement("div");

   const chatbotTyping = document.createElement("div");

  const userID = document.getElementById('scriptChatBot').dataset.id;


  sessionStorage.removeItem("gochat-chatbotUser");

  var userExists = {};
  
  var messages_history = [];

  
  var chatStyle = '';

  var link = document.createElement('link');
  link.type = 'text/css';
  link.rel = 'stylesheet';
  link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
  document.head.appendChild(link);



  async function getChatStyle(){

    const res = await fetch('https://us-central1-golaunch-ia-chat.cloudfunctions.net/app/chatStyle', 
       { method: 'POST', 
        headers: 
        { 'Content-Type': 'application/json'},
        body: JSON.stringify(
          {
              userID: userID
          })
      })
      const data = await res.json();
      
      if(data.chatStyle){
        chatStyle = data.chatStyle;
        console.log(chatStyle);

        var gochatChatbotButton = chatStyle.gochatChatbotButton || {};
        var gochatCircleRed = chatStyle.gochatCircleRed || {};
        var gochatChatbot = chatStyle.gochatChatbot || {};

        var defaultStyles = `
      #gochat-chatbot-button {
          padding: 0;
          position: fixed;
          bottom: 20px;
          right: 20px;
          background-color: ${gochatChatbotButton.backgroundColor || 'green'};
          border: none;
          border-radius: 50%;
          width: 60px;
          height: 60px;
          color: white;
          font-size: 24px;
          text-align: center;
          line-height: 60px;
          cursor: pointer;
        }
      
        #gochat-chatbot-window {
          display: none;
          position: fixed;
          bottom: 100px;
          right: 20px;
          width: 300px;
          height: 400px;
          background-color: white;
          border-radius: 5px;
          box-shadow: 10px 20px 40px rgba(0, 0, 0, 0.3);
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          margin: 0;  
          padding: 0;
        }
  
        #gochat-chatbot-typing {
          display: none;
          margin: 10px 0;
          padding: 10px;
          border-radius: 7.5px;
          background-color: white;
          color: #000000;
          font-style:italic;
          }
      
        #gochat-chatbot-window-header {
          background-color: ${ gochatChatbot.headerBackgroundColor || '#25D366'} ;
          padding: 10px;
          color: white;
          font-weight: bold;
          border-top-left-radius: 5px;
          border-top-right-radius: 5px;
        }
      
        #gochat-chatbot-messages {
          height: 310px;
          overflow-y: auto;
          padding: 10px;
          font-size: 14.2px;
          line-height: 19px;
          color: #e9edef;
        }
      
        #gochat-chatbot-input {
          font-size: 14px;
          width: 100%;
          height: 40px;
          padding: 5px 20px;
          box-sizing: border-box;
          outline: none;    
          border: solid 1px;
          border-right: 0px;
          border-left: 0px;
          border-bottom: 0px;
        }
  
        #gochat-chatbot-form-overlay{
          position: absolute;
          bottom: -10px;
          background-color: #dff6d7;
          padding: 20px;
          border-radius: 20px 20px 0 0;
        }
  
        #gochat-chatbot-form-overlay h3{
        font-size: 16px;
        color: black;
        margin-top: 0px;
        }
  
        #gochat-chatbot-user-form label{
          font-size: 12px;
          display:block;
          color: black;
          width: 100%;
          margin-bottom: 4px;
        }
  
        #gochat-chatbot-user-form  input {
            display:block;
            height: 28px;
            width: 100%;
            color: black;
            margin-bottom: 8px;
        }
  
        #gochat-chatbot-user-form button{
          margin-top: 12px;
          float: right;
          background-color: #25D366;
          font-size: 16px;
          color: white;
          padding: 10px 20px;
          border-radius: 8px;
          border: none;
        }
  
        #gochat-chatbot-user-form button:hover{
          background-color: #5ef295;
          cursor: pointer;
        }
      
        .gochat-message{
          padding: 10px;
          border-radius: 7.5px;
          margin: 10px 0;
        }
      
        .gochat-assistant-message{
          background-color: #202c33;
        
        }
      
        .gochat-user-message{
          background-color: #005c4b;
        }
      
        .gochat-circle-red{
          position: fixed;
          bottom: 65px;
          right: 10px;
          background-color: ${gochatCircleRed.backgroundColor || 'red'};
          padding: 4px 6px;
          border-radius: 100px;
          font-size: 10px;
          margin-right: 10px;
          color: white;
          font-weight: bold;
        }
      `;

      }

      setChatbotStyle(defaultStyles); 
      createChatbotComponent(data.chatStyle);
  }

  getChatStyle();

 
  function setChatbotStyle(chatbotStyle){
      const style = document.createElement("style");
      style.innerText += chatbotStyle;
      document.head.appendChild(style);
  }


  function createChatbotComponent(chatbotStyle){

    var gochatChatbotButton = chatbotStyle.gochatChatbotButton || {};
    var gochatCircleRed = chatbotStyle.gochatCircleRed || {};
    var gochatChatbot = chatbotStyle.gochatChatbot || {};

    document.body.appendChild(chatbotButton);
    document.body.appendChild(circleRed);
    document.body.appendChild(chatbotWindow);
    chatbotWindow.appendChild(chatbotWindowHeader);
    chatbotWindow.appendChild(chatbotMessages);
    chatbotWindow.appendChild(chatbotInput);
    

    chatbotWindow.id = "gochat-chatbot-window";

    chatbotMessages.id = "gochat-chatbot-messages";

    chatbotInput.id = "gochat-chatbot-input";
    chatbotInput.placeholder = "Digite sua mensagem e precione Enter";

    chatbotButton.id = "gochat-chatbot-button";
    chatbotButton.innerHTML = `<i aria-hidden="true" class="${gochatChatbotButton.iconButton || 'fab fa-whatsapp'}"></i>` ;

    chatbotWindowHeader.id = "gochat-chatbot-window-header";
    chatbotWindowHeader.innerHTML = `${gochatChatbot.headerText || 'Atendente Disponível'}`;

    circleRed.classList.add("gochat-circle-red");
    circleRed.textContent = gochatCircleRed.textContent || '1';

    chatbotWindow.style.display = "none";

   
    chatbotTyping.id = "gochat-chatbot-typing";
    chatbotTyping.textContent = "🤖 Chatbot está digitando...";
    chatbotTyping.style.display = "none";

    addMessageAssistent(gochatChatbot.firstMessage || 'Olá, como posso te ajudar?');

  }


  function showUserFormModal() {
      const formOverlay = document.createElement("div");
      formOverlay.id = "gochat-chatbot-form-overlay";


      formOverlay.innerHTML = `
          <div id="gochat-chatbot-form-container">
              <h3>Por favor, preencha seus dados antes de começar a conversa</h3>
              <form id="gochat-chatbot-user-form">
                  <label for="gochat-chatbot-user-name">Nome:</label>
                  <input type="text" id="gochat-chatbot-user-name" name="gochat-chatbot-user-name" required>
                  <label for="gochat-chatbot-user-email">E-mail:</label>
                  <input type="email" id="gochat-chatbot-user-email" name="gochat-chatbot-user-email" required>
                 
                  <button type="submit">Enviar</button>
              </form>
          </div>
      `;

      document.getElementById('gochat-chatbot-window').appendChild(formOverlay);

      const chatBotUserNameInput = document.getElementById("gochat-chatbot-user-name");
      chatBotUserNameInput.focus();

      const form = document.getElementById("gochat-chatbot-user-form");
      form.addEventListener("submit", (event) => {
          event.preventDefault();

          const name = document.getElementById("gochat-chatbot-user-name").value;
          const email = document.getElementById("gochat-chatbot-user-email").value;
          sessionStorage.setItem("chatbotUser", JSON.stringify({ name, email }));
          formOverlay.style.display = "none";


          sendMessage(chatbotInput.value.trim());
      });
  }

  async function generateHash(hashString) {
      return await crypto.subtle.digest('SHA-256', new TextEncoder().encode(hashString))
        .then(hashBuffer => {
          const hashArray = Array.from(new Uint8Array(hashBuffer));
          const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
          return hashHex;
        });
  }

  const userAgent = window.navigator.userAgent;
  const platform = window.navigator.platform;

  var hashString = platform + " " + userAgent;

  var hashClient =  "";
  
  generateHash(hashString)
        .then(hash => {
          hashClient = hash;
        })
        .catch(error => console.error(error));

  chatbotButton.addEventListener("click", () => {
    if (chatbotWindow.style.display === "none") {
      chatbotWindow.style.display = "block";
      chatbotInput.focus();
    } else {
      chatbotWindow.style.display = "none";
    }
  });


  chatbotInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      userExists = sessionStorage.getItem("chatbotUser");

      if (!userExists) {
        showUserFormModal();
      }else {
        sendMessage(chatbotInput.value.trim());
        }
      }
  });


  function sendMessage(message){

    const userInfo = JSON.parse(sessionStorage.getItem("chatbotUser"));
    if (message) {
      const userMessage = document.createElement("div");
      userMessage.classList.add('gochat-message');
      userMessage.classList.add('gochat-user-message');
      userMessage.textContent = userInfo.name+": " + message;
      chatbotMessages.appendChild(userMessage);

      chatbotMessages.appendChild(chatbotTyping);


      const newMessage = {role: "user", content: message}
      messages_history.push(newMessage);

      chatbotInput.value = '';

      sendToChatGPT(messages_history, newMessage).then((response) => {
        addMessageAssistent(response);
      });

      chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
  }

  function addMessageAssistent(message){
      const assistantMessage = document.createElement('div');
      assistantMessage.classList.add('gochat-message');
      assistantMessage.classList.add('gochat-assistant-message');

      assistantMessage.textContent = '🤖 Chatbot: ' + message;
      chatbotMessages.appendChild(assistantMessage);
      chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        
  }

  async function sendToChatGPT(history, newMessage){

      var content = "";
      const userInfo = JSON.parse(sessionStorage.getItem("chatbotUser"));

       chatbotTyping.style.display = "block";

       console.log( { body :
        {
            messages_history: history,
            newMessage: newMessage,
            userID: userID,
            hashClient: hashClient,
            userInfo: userInfo
        }});

       await fetch('https://us-central1-golaunch-ia-chat.cloudfunctions.net/app/message', 
       { method: 'POST', 
        headers: 
        { 'Content-Type': 'application/json'},
        body: JSON.stringify(
          {
              messages_history: history,
              newMessage: newMessage,
              userID: userID,
              hashClient: hashClient,
              userInfo: userInfo
          })
      })
      .then(res => res.json())
      .then(data => {
          console.log(data);
          const p = document.createElement('p');
          p.style.backgroundColor = "#fcffda";

          const newMessageAssistant = {role: 'assistant', content: data.completion.content}

          messages_history.push(newMessageAssistant);
          
          console.log(messages_history);

          content = newMessageAssistant.content;

          chatbotTyping.style.display = "none";
          
        });

        return content;

  }
}


document.addEventListener("DOMContentLoaded", function() {
      createChatbotComponent()
    });
