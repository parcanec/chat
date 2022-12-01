import {postAuth} from "./network";
import Cookies from "js-cookie";




const autorizationModal = document.querySelector("#autorizationModal")
const autorizationModalCloseButton = document.querySelector("#autorizationModal").querySelector("#close")
const confirmationModal = document.querySelector("#confirmationModal")
const confirmationModalCloseButton = document.querySelector("#confirmationModal").querySelector("#close")

confirmationModalCloseButton.addEventListener('click', () => confirmationModal.classList.remove('active'))
autorizationModalCloseButton.addEventListener('click', () => autorizationModal.classList.remove('active'))




export function exitChat() {
  if (confirm('Вы действительно хотите выйти из чата?')) {
    Cookies.remove('token')
    window.location.reload()
  }
}

export function haveCode() {
  autorizationModal.classList.remove('active')
  confirmationModal.classList.add('active')
}

export function sendAuth(env) {
  env.preventDefault()
  const email = document.querySelector('#enter_email')
  const emailValue = email.value
  postAuth(emailValue).then(() => {
    autorizationModal.classList.remove('active')
    confirmationModal.classList.add('active')
  })
}
