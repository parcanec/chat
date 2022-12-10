import {updateName} from "./network";

export function changeName(env: Event) {
  env.preventDefault()
  const userName: HTMLInputElement = document.querySelector('#enter_name')
  const nameValue = userName.value
  const settingsModal = document.querySelector('#settingsModal')
  userName.value = ''
  updateName(nameValue).then(() => settingsModal.classList.remove('active'))
}