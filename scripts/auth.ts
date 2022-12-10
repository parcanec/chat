import {postAuth} from "./network";
import Cookies from "js-cookie";

const autorizationModal: HTMLElement | null = document.querySelector("#autorizationModal")
  const autorizationModalCloseButton: HTMLButtonElement | null | undefined = document.querySelector("#autorizationModal")?.querySelector("#close")

const confirmationModal: HTMLElement | null = document.querySelector("#confirmationModal")
  const confirmationModalCloseButton: HTMLButtonElement | null | undefined = document.querySelector("#confirmationModal")?.querySelector("#close")

confirmationModalCloseButton?.addEventListener('click', () => confirmationModal?.classList.remove('active'))
autorizationModalCloseButton?.addEventListener('click', () => autorizationModal?.classList.remove('active'))

export function exitChat() {
  if (confirm('Вы действительно хотите выйти из чата?')) {
    Cookies.remove('token')
    window.location.reload()
  }
}

export function haveCode() {
  autorizationModal?.classList.remove('active')
  confirmationModal?.classList.add('active')
}

export function sendAuth (env:any) {
  env.preventDefault()
  const email: HTMLInputElement | null = document.querySelector('#enter_email')
  const emailValue: String | undefined = email?.value
  postAuth(emailValue).then(() => {
    autorizationModal?.classList.remove('active')
    confirmationModal?.classList.add('active')
  })
}
