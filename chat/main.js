import Cookies from "js-cookie"
import {sendAuth,changeName,history,checkUser} from './api'

const chat = document.querySelector(".middle");
chat.scrollTop = chat.scrollHeight;
const message = document.querySelector('#enter_message')

/////////////////////////
//Авторизация - модалка
const autorizationButton = document.querySelector("#autorization")
const autorizationModal = document.querySelector("#autorizationModal")
const autorizationModalCloseButton = document.querySelector("#autorizationModal").querySelector("#close")
autorizationButton.addEventListener('click', () => autorizationModal.classList.add('active'))
autorizationModalCloseButton.addEventListener('click', () => autorizationModal.classList.remove('active'))
const email = document.querySelector('#enter_email')
const sendCode = document.querySelector('#email')
sendCode.addEventListener('submit', sendAuth)


//СТАРТ ПРИЛОЖЕНИЯ!!!\\
function webSocket() {
  const socket = new WebSocket(`wss://edu.strada.one/websockets?${Cookies.get('token')}`)
  socket.onmessage = function (event) {
    const dataMessage = JSON.parse(event.data)
    createMessage(dataMessage.user.email === Cookies.get('myEmail'), dataMessage.user.name, dataMessage.text, dataMessage.createdAt)
  };
  const sendMessage = document.querySelector('.bottom')
  sendMessage.addEventListener('submit', send)

  function send(env) {
    env.preventDefault()
    const nowTime = new Date()
    let textMessage = message.value
    socket.send(JSON.stringify({text: `${textMessage}`}))
  }
}

/////////////////////////
//Подтверждение - модалка
const confirmationButton = document.querySelector("#confirmation")
const confirmationModal = document.querySelector("#confirmationModal")
const confirmationModalCloseButton = document.querySelector("#confirmationModal").querySelector("#close")
confirmationButton.addEventListener('click', () => confirmationModal.classList.add('active'))
confirmationModalCloseButton.addEventListener('click', () => confirmationModal.classList.remove('active'))
const token = document.querySelector('#enter_confirm')
const confirmToken = document.querySelector('#email_confirm')
//Подтверждение - сохранение токена в куки
confirmToken.addEventListener('submit', () => Cookies.set(`token`, `${token.value}`, {expires: 7}))


/////////////////////////
//Настройки - модалка
const settingsButton = document.querySelector("#settings")
const settingsModal = document.querySelector("#settingsModal")
const settingsModalCloseButton = document.querySelector("#settingsModal").querySelector("#close")
settingsButton.addEventListener('click', () => settingsModal.classList.add('active'))
settingsModalCloseButton.addEventListener('click', () => settingsModal.classList.remove('active'))
const userName = document.querySelector('#enter_name')
const sendName = document.querySelector('#name')
sendName.addEventListener('submit', changeName)

//checkUser().then(data => Cookies.set(`myEmail`, `${data.email}`))

const createMessage = (isOutgingMessage, name, text, time) => {
  const template = document.querySelector(isOutgingMessage ? '#outgoing_message' : '#incoming_message');
  let newMessage = template.content.cloneNode(true);
  newMessage.querySelector(".name").textContent = name;
  newMessage.querySelector(".message").textContent = text;
  newMessage.querySelector(".time").textContent = new Date(time).toLocaleTimeString();
  chat.append(newMessage)
  document.querySelector('#enter_message').value = ''
}

//history().then(data=>render(data))

function render(messages) {
  for (let message of messages) {
    createMessage(message.user.email === Cookies.get('myEmail'), message.user.name, message.text, message.createdAt)
  }
}

function start() {
  if (Cookies.get('token')) {
    webSocket()
  } else {
    autorizationModal.classList.add('active')
  }
}

start()