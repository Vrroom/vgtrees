import { isUndef } from "./misc"; 

async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

async function postN (N=1, url = '', data = []) {
  const responses = [];
  for (let i = 0; i < N; i += 1) {
    let dataPt = data[i];
    if (isUndef(dataPt)) {
      dataPt = {};
    }
    const res = await postData(url, dataPt); 
    responses.push(res);
  }
  return responses;
}

function postCurrentTime (data) {
  const now = new Date();
  const dd = now.getDate();
  const mm = now.getMonth();
  const yyyy = now.getFullYear();
  const hrs = now.getHours();
  const min = now.getMinutes();
  const sec = now.getSeconds();
  postData("/time", {
    dd,
    mm,
    yyyy,
    hrs,
    min,
    sec,
    ...data
  });
}

export {
  postData, 
  postN, 
  postCurrentTime
}; 
