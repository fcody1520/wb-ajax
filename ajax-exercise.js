import axios from 'axios';

// PART 1: Show Dog Photo


function showDogPhoto(evt) {
  axios.get(`https://dog.ceo/api/breeds/image/random`).then((response) => {
    let dogImg = document.getElementById('dog-image')
    let newDogImg = document.createElement('img')
    newDogImg.src = response.data.message
    dogImg.appendChild(newDogImg)
  })
}

document.querySelector('#get-dog-image').addEventListener('click', showDogPhoto);

// PART 2: Show Weather

async function showWeather(evt) {
  const zipcode = document.querySelector('#zipcode-field').value;
  const response = await axios.get(`weather.txt?zipcode=${zipcode}`)
  document.querySelector('#weather-info').innerText =response.data
  // TODO: request weather with that URL and show the forecast in #weather-info
}

document.querySelector('#weather-button').addEventListener('click', showWeather);

// PART 3: Order Cookies

async function orderCookies(evt) {
  evt.preventDefault();

  const cookieType = document.querySelector('#cookie-type-field').value;
  const qty = document.querySelector('#qty-field').value;
  const response = await axios.post('/order-cookies.json',
    { cookieType: cookieType, qty: qty}
  );

  const orderStatusDiv = document.querySelector('#order-status');
  orderStatusDiv.innerText = response.data.message;
  if(response.data.resultCode === 'ERROR'){
    orderStatusDiv.classList.add('order-error');
  } else {
    orderStatusDiv.classList.remove('order-error')
  }
  // TODO: Need to preventDefault here, because we're listening for a submit event!
  // TODO: show the result message after your form
  // TODO: if the result code is ERROR, make it show up in red (see our CSS!)
}
document.querySelector('#order-form').addEventListener('submit', orderCookies);

// PART 4: iTunes Search

async function iTunesSearch(evt) {
  evt.preventDefault();
  const searchTerm = document.querySelector("#search-term").value;

  const formData = {'term': searchTerm};
  const queryStr = new URLSearchParams(formData).toString();

  const response = await axios.get(`https://itunes.apple.com/search?${queryStr}`);
  let displayStr = '';
  for (const result of response.data.results){
    displayStr += `<li>Artist: ${result.artistName} Song: ${result.trackName}</li>`;
  } 
  document.querySelector('#itunes-results').innerHTML = displayStr;
  // TODO: In the #itunes-results list, show all results in the following format:
  // `Artist: ${artistName} Song: ${trackName}`
}
document.querySelector('#itunes-search-form').addEventListener('submit', iTunesSearch);
