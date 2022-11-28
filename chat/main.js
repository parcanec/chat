import Cookies from "js-cookie"

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
function webSocket(){
    const socket = new WebSocket(`wss://edu.strada.one/websockets?${Cookies.get('token')}`)
    socket.onmessage = function(event) {
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
        document.querySelector('#enter_message').value = ''
    }

    checkUser().then(data => Cookies.set(`myEmail`, `${data.email}`))
    history().then(data=>render(data))
    socket.onclose=()=>console.log('закрыто')
    socket.onopen=()=>console.log('открыто')  
}


/////////////////////////
//Авторизация - функция
async function sendAuth(env){
    env.preventDefault()
    const authUrl = 'https://edu.strada.one/api/user'
    const emailValue = email.value
    let response = await fetch(authUrl, {
        method: 'POST',
        body: JSON.stringify({email: emailValue}),
        headers: {
            'Content-Type': 'application/json',
            Accept : "application/json",
            mode : 'no-cors'
        },
    })
    const data = await response.json();
    autorizationModal.classList.remove('active')
    confirmationModal.classList.add('active')
    return data
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
confirmToken.addEventListener('submit', () => Cookies.set(`token`, `${token.value}`, { expires: 7 }))


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


/////////////////////////
//Настройки - смена имени
async function changeName(env){
    env.preventDefault()
    const authUrl = 'https://edu.strada.one/api/user'
    const namelValue = userName.value
    let response = await fetch(authUrl, {
        method: 'PATCH',
        body: JSON.stringify({name: namelValue}),
        headers: {
            'Content-Type': 'application/json',
            Accept : "application/json",
            mode : 'no-cors',
            Authorization : `Bearer ${Cookies.get('token')}`
        },
    })
    const data = await response.json();
    return data
}


async function checkUser() {
    const checkUrl = 'https://edu.strada.one/api/user/me'
    let response = await fetch(checkUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Accept : "application/json",
            mode : 'no-cors',
            Authorization : `Bearer ${Cookies.get('token')}`
        },
    })
    const data = await response.json();
    return data
}


const createMessage = (isOutgingMessage, name, text, time) =>{
    const template = document.querySelector(isOutgingMessage ? '#outgoing_message' : '#incoming_message');
    let newMessage = template.content.cloneNode(true);
    newMessage.querySelector(".name").textContent = name;
    newMessage.querySelector(".message").textContent = text;
    newMessage.querySelector(".time").textContent = new Date(time).toLocaleTimeString();
    chat.append(newMessage)
}

async function history(){
    const historykUrl = 'https://edu.strada.one/api/messages/'
    let response = await fetch(historykUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Accept : "application/json",
            mode : 'no-cors',
            Authorization : `Bearer ${Cookies.get('token')}`
        },
    })
    const data = await response.json();
    return data.messages.reverse()
}


function render(messages){
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