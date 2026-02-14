// Get story ID
const storyId =
  new URLSearchParams(window.location.search).get("id");

// Storage key
const chatKey = "chat_" + storyId;


// LOAD CHAT
function loadChat(){

  const messages =
    JSON.parse(localStorage.getItem(chatKey)) || [];

  const box = document.getElementById("chatBox");
  box.innerHTML = "";

  messages.forEach(msg => {

    box.innerHTML += `
      <div class="msg ${msg.sender}">
        ${msg.text}
        <span class="time">${msg.time}</span>
      </div>
    `;

  });

  // Auto scroll to bottom
  box.scrollTop = box.scrollHeight;
}


// SEND MESSAGE
function sendMessage(){

  const input = document.getElementById("msgInput");
  const text = input.value.trim();

  if(!text) return;

  const messages =
    JSON.parse(localStorage.getItem(chatKey)) || [];

  // Reader message
  messages.push({
    sender:"reader",
    text:text,
    time:new Date().toLocaleTimeString()
  });

  localStorage.setItem(chatKey, JSON.stringify(messages));

  input.value="";
  loadChat();

  // Simulated owner reply
  setTimeout(fakeReply, 1000);
}


// FAKE OWNER REPLY
function fakeReply(){

  const replies = [
    "Thank you for sharing that.",
    "I’m glad my story helped you.",
    "You’re not alone in this.",
    "I appreciate your message."
  ];

  const messages =
    JSON.parse(localStorage.getItem(chatKey)) || [];

  messages.push({
    sender:"owner",
    text: replies[Math.floor(Math.random()*replies.length)],
    time:new Date().toLocaleTimeString()
  });

  localStorage.setItem(chatKey, JSON.stringify(messages));
  loadChat();
}


// INITIAL LOAD
loadChat();