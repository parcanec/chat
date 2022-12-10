import Cookies from "js-cookie";

export const createMessage = (isOutgingMessage, name, text, time) =>{
  const chat = document.querySelector(".middle");
  const template:HTMLTemplateElement = document.querySelector(isOutgingMessage ? '#outgoing_message' : '#incoming_message');
  let newMessage  = template.content.cloneNode(true) as HTMLElement;
  newMessage.querySelector(".name").textContent = name;
  newMessage.querySelector(".message").textContent = text;
  newMessage.querySelector(".time").textContent = new Date(time).toLocaleTimeString();
  chat.append(newMessage)
  chat.scrollTop = chat.scrollHeight;
}


export function render(messages) {
  for (let message of messages) {
    createMessage(message.user.email === Cookies.get('myEmail'), message.user.name, message.text, message.createdAt)
  }
}