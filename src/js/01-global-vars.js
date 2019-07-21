// the glass
const theGlass = document.querySelector('.water-glass__counter--js');
const addGlass = document.querySelector('.interactions__btn-add--js');
const removeGlass = document.querySelector('.interactions__btn-remove--js');
// glass animations
const waveD = document.querySelector('.wave-down--js');
const waveU = document.querySelector('.wave-up--js');
// history chart
const chartCanvas = document.querySelector('#myChart');
const ctx = document.getElementById('myChart').getContext('2d'); //??? czy tu to dać
const chartCurrent = document.querySelector('.btn__current--js');
const chartNextWeek = document.querySelector('.btn__next--js');
const chartPreviousWeek = document.querySelector('.btn__previous--js');
// chart message
const messagePanel = document.querySelector('.chart__message--js');

// local storage key name
const localStorageKey = `hydro-${new Date().toISOString().slice(0, 10)}`;

// glass counter
let glassCounter;

// current week
let chartYearWeek = moment().isoWeek();
