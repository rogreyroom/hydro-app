'use strict';

// service worker registration

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('serviceworker.js').then(
      function(registration) {
        // Registration was successful
        console.log(
          'ServiceWorker registration successful with scope: ',
          registration.scope,
        );
      },
      function(err) {
        // registration failed :(
        console.log('ServiceWorker registration failed: ', err);
      },
    );
  });
}

// hydro-app

const addGlass = document.querySelector('.interactions__btn-add--js');
const removeGlass = document.querySelector('.interactions__btn-remove--js');
const theGlass = document.querySelector('.water-glass__counter--js');
let key = `hydro-${new Date().toISOString().slice(0, 10)}`;
let counter;

// Glass
const myStorage = () => {
  const state = localStorage.getItem(key);
  if (state !== null) {
    theGlass.innerHTML = state;
    return state;
  } else {
    localStorage.setItem(key, 0);
    theGlass.innerHTML = 0;
    return 0;
  }
};

const addToGlass = () => {
  counter++;
  localStorage.setItem(key, counter);
  theGlass.innerHTML = counter;
};

const removeFromGlass = () => {
  counter--;
  if (counter < 0) {
    counter = 0;
    localStorage.setItem(key, counter);
    theGlass.innerHTML = counter;
  } else {
    localStorage.setItem(key, counter);
    theGlass.innerHTML = counter;
  }
};

addGlass.addEventListener('click', addToGlass);
removeGlass.addEventListener('click', removeFromGlass);
counter = myStorage();
