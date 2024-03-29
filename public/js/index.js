const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-one');
const messageTwo = document.querySelector('#message-two');

console.log('client side javascript iz loaded.');

weatherForm.addEventListener('submit', e => {
  e.preventDefault();
  const location = search.value;
  messageOne.textContent = 'Loading...';
  messageTwo.textContent = '';
  fetch(`/weather?address=${location}`)
  .then(res => res.json())
  .then(data => {
    if(data.error) {
      messageOne.textContent = data.error;
    } else {
      messageOne.textContent = data.location;
      messageTwo.textContent = data.forecast;
    }
  });
  search.value = '';
});

