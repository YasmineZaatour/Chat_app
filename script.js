const messageList = document.querySelector(".message-list");
const messageInput = document.querySelector("#message-input");
const sendButton = document.querySelector("#send-button");

sendButton.addEventListener("click", sendMessage);

function sendMessage() {
  const message = messageInput.value;
  if (message.trim() !== "") {
    const messageItem = document.createElement("li");
    messageItem.classList.add("message");
    messageItem.innerHTML = `
      <span class="sender">You:</span>
      <span class="text">${message}</span>
    `;
    messageList.appendChild(messageItem);
    messageInput.value = "";
  }
}
