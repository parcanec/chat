import Cookies from "js-cookie"
import {changeName} from "./scripts/changeName";
import {exitChat, haveCode, sendAuth} from "./scripts/auth";
import {webSocket} from "./scripts/websocket";


const chat = document.querySelector(".middle");
chat.scrollTop = chat.scrollHeight;

const sendCode = document.querySelector('#email')
sendCode.addEventListener('submit', sendAuth)

const haveCodeButton = document.querySelector('#have_code')
haveCodeButton.addEventListener('click', haveCode)

const resetSettingsButton = document.querySelector('#resetSettings')
resetSettingsButton.addEventListener('click', () => console.log('reset settings complete'))

const exitButton = document.querySelector('#exit')
exitButton.addEventListener('click', exitChat)

const token = document.querySelector('#enter_confirm')
const confirmToken = document.querySelector('#email_confirm')

confirmToken.addEventListener('submit', () => Cookies.set(`token`, `${token.value}`, {expires: 7}))
const autorizationModal = document.querySelector("#autorizationModal")
const settingsButton = document.querySelector("#settings")
const settingsModal = document.querySelector("#settingsModal")
const settingsModalCloseButton = document.querySelector("#settingsModal").querySelector("#close")
settingsButton.addEventListener('click', () => settingsModal.classList.add('active'))
settingsModalCloseButton.addEventListener('click', () => settingsModal.classList.remove('active'))

const sendName = document.querySelector('#name')
sendName.addEventListener('submit', changeName)


function start() {
  if (Cookies.get('token')) {
    webSocket()
  } else {
    autorizationModal.classList.add('active')
  }
}

start()