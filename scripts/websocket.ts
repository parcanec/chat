import Cookies from "js-cookie";
import {createMessage, render} from "./createMessage";
import {checkUser, getHistory} from "./network";

export function webSocket() {
  const socket = new WebSocket(`wss://edu.strada.one/websockets?${Cookies.get('token')}`)
  socket.onmessage = function (event) {
    const dataMessage = JSON.parse(event.data)
    createMessage(dataMessage.user.email === Cookies.get('myEmail'), dataMessage.user.name, dataMessage.text, dataMessage.createdAt)
  };
  const sendMessage = document.querySelector('.bottom')
  sendMessage.addEventListener('submit', send)

  function send(env:Event) {
    env.preventDefault()
    const input:HTMLInputElement = document.querySelector('#enter_message')
    socket.send(JSON.stringify({text: `${input.value}`}))
    input.value = ''
  }

  checkUser().then(data => Cookies.set(`myEmail`, `${data.email}`))
  getHistory().then(data => render(data))
  socket.onclose = () => console.log('закрыто')
  socket.onopen = () => console.log('открыто')
}
