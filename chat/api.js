
import Cookies from "js-cookie";


const headers = {
  'Content-Type': 'application/json',
  Accept: "application/json",
  mode: 'no-cors',
  Authorization: `Bearer ${Cookies.get('token')}`
}


/////////////////////////
//Настройки - смена имени
async function changeName(env) {
  env.preventDefault()
  const authUrl = 'https://edu.strada.one/api/user'
  const namelValue = userName.value
  let response = await fetch(authUrl, {
    method: 'PATCH',
    body: JSON.stringify({name: namelValue}),
    headers
  })
  const data = await response.json();
  return data
}


async function checkUser() {
  const checkUrl = 'https://edu.strada.one/api/user/me'
  let response = await fetch(checkUrl, {
    method: 'GET',
    headers
  })
  const data = await response.json();
  return data
}

async function history() {
  const historykUrl = 'https://edu.strada.one/api/messages/'
  let response = await fetch(historykUrl, {
    method: 'GET',
    headers
  })
  const data = await response.json();
  return data.messages.reverse()
}


/////////////////////////
//Авторизация - функция
async function sendAuth(env) {
  env.preventDefault()
  const authUrl = 'https://edu.strada.one/api/user'
  const emailValue = email.value
  let response = await fetch(authUrl, {
    method: 'POST',
    body: JSON.stringify({email: emailValue}),
    headers
  })
  const data = await response.json();
  autorizationModal.classList.remove('active')
  confirmationModal.classList.add('active')
  return data
}

export {changeName, checkUser, history, sendAuth}