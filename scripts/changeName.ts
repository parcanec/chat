import {updateName} from "./network";

export function changeName(env) {
  const userName = document.querySelector('#enter_name')
  env.preventDefault()
  const namelValue = userName.value
  document.querySelector('#enter_name').value = ''
  updateName(namelValue)
    .then(() => settingsModal.classList.remove('active'))

}