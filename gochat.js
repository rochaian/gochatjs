// Função para criar e adicionar o componente chatbot à página
function createChatbotComponent() {
    // Crie o HTML necessário para o componente chatbot
    const chatbotButton = document.createElement("button");
    const chatbotWindow = document.createElement("div");
    const chatbotWindowHeader = document.createElement("div");
    const chatbotMessages = document.createElement("div");
    const chatbotInput = document.createElement("input");
    const circleRed = document.createElement("div");

    //ID capturado no script da página
    const dataId = document.getElementById('scriptChatBot').dataset.id;

    // Crie o elemento "digitando"
    const chatbotTyping = document.createElement("div");
    chatbotTyping.id = "chatbot-typing";
    chatbotTyping.textContent = "🤖 Chatbot está digitando...";
    chatbotTyping.style.display = "none";
    
  
    // Adicione os scripts ao Head
    var link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
    document.head.appendChild(link);

   const styles = `
    #chatbot-button {
        padding: 0;
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: #25D366;
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
    
      #chatbot-window {
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

      #chatbot-typing {
        display: none;
        margin: 10px 0;
        padding: 10px;
        border-radius: 7.5px;
        background-color: white;
        color: #000000;
        font-style:italic;
        }
    
      #chatbot-window-header {
        background-color: #25D366;
        padding: 10px;
        color: white;
        font-weight: bold;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
      }
    
      #chatbot-messages {
        height: 310px;
        overflow-y: auto;
        padding: 10px;
        font-size: 14.2px;
        line-height: 19px;
        color: #e9edef;
      }
    
      #chatbot-input {
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

      #chatbot-form-overlay{
        position: absolute;
        bottom: -10px;
        background-color: #dff6d7;
        padding: 20px;
        border-radius: 20px 20px 0 0;
      }

      #chatbot-form-overlay h3{
       font-size: 16px;
       margin-top: 0px;
       color: black;
      }

      #chatbot-user-form label{
        font-size: 12px;
        display:block;
        width: 100%;
        margin-bottom: 4px;
        color: black;
      }

      #chatbot-user-form  input {
        display: block;
        height: 30px;
        width: 100%;
        margin-bottom: 8px;
        border-radius: 4px;
        border: solid 1px #444444;
        color: black;
      }

      #chatbot-user-form button{
        margin-top: 12px;
        float: right;
        background-color: #25D366;
        font-size: 16px;
        color: white;
        padding: 10px 20px;
        border-radius: 8px;
        border: none;
      }

      #chatbot-user-form button:hover{
        background-color: #5ef295;
        cursor: pointer;
      }
    
      .message{
        padding: 10px;
        border-radius: 7.5px;
        margin: 10px 0;
      }
    
      .assistant-message{
        background-color: #202c33;
       
      }
    
      .user-message{
        background-color: #005c4b;
      }
    
      .circle-red{
        position: fixed;
        /* z-index: 1; */
        bottom: 65px;
        right: 10px;
        background-color: red;
        padding: 4px 6px;
        border-radius: 100px;
        font-size: 10px;
        margin-right: 10px;
        color: white;
        font-weight: bold;
      }
    `;

    // Adicione os estilos CSS ao documento
    const style = document.createElement("style");
    style.innerText += styles;
    document.head.appendChild(style);

    //Adionar a estrutura do HTML
    document.body.appendChild(chatbotButton);
    document.body.appendChild(circleRed);
    document.body.appendChild(chatbotWindow);
    chatbotWindow.appendChild(chatbotWindowHeader);
    chatbotWindow.appendChild(chatbotMessages);
    chatbotWindow.appendChild(chatbotInput);
    

    chatbotWindow.id = "chatbot-window";

    chatbotMessages.id = "chatbot-messages";

    chatbotInput.id = "chatbot-input";
    chatbotInput.placeholder = "Digite sua mensagem e precione Enter";

    chatbotButton.id = "chatbot-button";
    chatbotButton.innerHTML = `<i aria-hidden="true" class="fab fa-whatsapp"></i>` ;

    chatbotWindowHeader.id = "chatbot-window-header";
    chatbotWindowHeader.innerHTML = `<span class="circle-red">1</span> Atendente Disponível`;

    circleRed.classList.add("circle-red");
    circleRed.textContent = "1";


    sessionStorage.removeItem("chatbotUser");

    var userExists = {};
    
    chatbotWindow.style.display = "none";

    var messages = [];




      function showUserFormModal() {
        const formOverlay = document.createElement("div");
        formOverlay.id = "chatbot-form-overlay";

        formOverlay.innerHTML = `
            <div id="chatbot-form-container">
                <h3>Por favor, preencha seus dados antes de começar a conversa</h3>
                <form id="chatbot-user-form">
                    <label for="chatbot-user-name">Nome:</label>
                    <input type="text" id="chatbot-user-name" name="chatbot-user-name" required>
                    <label for="chatbot-user-email">E-mail:</label>
                    <input type="email" id="chatbot-user-email" name="chatbot-user-email" required>
                   
                    <button type="submit">Enviar</button>
                </form>
            </div>
        `;

        document.getElementById('chatbot-window').appendChild(formOverlay);

        const form = document.getElementById("chatbot-user-form");
        form.addEventListener("submit", (event) => {
            event.preventDefault();

            const name = document.getElementById("chatbot-user-name").value;
            const email = document.getElementById("chatbot-user-email").value;
            sessionStorage.setItem("chatbotUser", JSON.stringify({ name, email }));
            formOverlay.style.display = "none";

            sendMessage();
        });
    }

    async function generateHash(hashString) {
        return crypto.subtle.digest('SHA-256', new TextEncoder().encode(hashString))
          .then(hashBuffer => {
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
            return hashHex;
          });
    }

    const userAgent = window.navigator.userAgent;
    const platform = window.navigator.platform;

    var hashString = platform + " " + userAgent;

    var hashClient = "";
    
    generateHash(hashString)
        .then(hash => {
          console.log(hash)
          hashClient = hash;
        })
        .catch(error => console.error(error));

    chatbotButton.addEventListener("click", () => {


      addMessageChatbot('Olá, como posso te ajudar?');

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

        // Verificar se o usuário já preencheu o formulário de cadastro
        userExists = sessionStorage.getItem("chatbotUser");

        if (!userExists) {
          showUserFormModal();
        }else {
          sendMessage();
          }
        }
    });


    function sendMessage(){
      const userInfo = JSON.parse(sessionStorage.getItem("chatbotUser"));

      const messageText = chatbotInput.value.trim();
      if (messageText) {
        const userMessage = document.createElement("div");
        userMessage.classList.add('message');
        userMessage.classList.add('user-message');
        userMessage.textContent = userInfo.name+": " + messageText;
        chatbotMessages.appendChild(userMessage);


        // Adicione o elemento "digitando" ao chatbotMessages
        chatbotMessages.appendChild(chatbotTyping);

      

        const newMessage = {role: "user", content: messageText}
        messages.push(newMessage);

        chatbotInput.value = '';
        
        // Implemente aqui a chamada para a API do ChatGPT e exiba a resposta
        sendToChatGPT(messageText).then((response) => {


          addMessageChatbot(response);
          // const assistantMessage = document.createElement('div');
          // assistantMessage.classList.add('message');
          // assistantMessage.classList.add('assistant-message');

          // assistantMessage.textContent = '🤖 Chatbot: ' + response;
          // chatbotMessages.appendChild(assistantMessage);
          // chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

        });

        // Rolar automaticamente para a última mensagem enviada
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
      }
    }

    function addMessageChatbot(message){
        const assistantMessage = document.createElement('div');
        assistantMessage.classList.add('message');
        assistantMessage.classList.add('assistant-message');

        assistantMessage.textContent = '🤖 Chatbot: ' + message;
        chatbotMessages.appendChild(assistantMessage);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
          
    }

    async function sendToChatGPT(messageText){

        var content = "";
        const userInfo = JSON.parse(sessionStorage.getItem("chatbotUser"));

         // Exibir animação de "digitando"
         chatbotTyping.style.display = "block";

         await fetch('https://us-central1-golaunch-ia-chat.cloudfunctions.net/app/message', 
        //  await fetch('https://chatbot-server-hb5m.onrender.com', 
        //  await fetch('http://localhost:3000/message', 
         { method: 'POST', 
        //  origin: "golaunch.com.br",
          headers: 
          { 'Content-Type': 'application/json'},
          body: JSON.stringify(
            {
                messages: messages,
                dataId: dataId,
                hashClient,
                userInfo
            })
        })
        .then(res => res.json())
        .then(data => {
            // console.log(data);
            const p = document.createElement('p');
            p.style.backgroundColor = "#fcffda";

            const newMessageAssistant = {role: 'assistant', content: data.completion.content}
            messages.push(newMessageAssistant);

            console.log(data);

            // p.textContent = `${newMessageAssistant.content}`;
            // messagesChat.appendChild(p);

            content = newMessageAssistant.content;

            // Ocultar animação de "digitando"
            chatbotTyping.style.display = "none";
            
          });

          return content;

    }
  }

  
  // Adicione o componente à página assim que o DOM estiver carregado
  // document.addEventListener("DOMContentLoaded", createChatbotComponent);
  document.addEventListener("DOMContentLoaded", function() {
        createChatbotComponent()
      });
  
