import Cookies from "js-cookie";

const headers = {
  'Content-Type': 'application/json',
  Accept: "application/json",
  mode: 'no-cors',
  Authorization: `Bearer ${Cookies.get('token')}`
};

async function getHistory() {
  const historyUrl = 'https://edu.strada.one/api/messages/'
  let response = await fetch(historyUrl, {
    method: 'GET',
    headers
  })
  const data = await response.json();
  return data.messages.reverse()
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

async function updateName(name) {
  const authUrl = 'https://edu.strada.one/api/user'
  let response = await fetch(authUrl, {
    method: 'PATCH',
    body: JSON.stringify({name}),
    headers
  })
  const data = await response.json();
  return data
}

async function postAuth(email) {
  const authUrl = 'https://edu.strada.one/api/user'
  let response = await fetch(authUrl, {
    method: 'POST',
    body: JSON.stringify({email}),
    headers
  })
  const data = await response.json();
  return data
}

export {postAuth, updateName, getHistory, checkUser}