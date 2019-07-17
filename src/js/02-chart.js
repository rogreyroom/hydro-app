const addGlass = document.querySelector('.interactions__btn-add--js');
const removeGlass = document.querySelector('.interactions__btn-remove--js');
const theGlass = document.querySelector('.water-glass__counter--js');
const chartOnOff = document.querySelector('.chart__btn--js');
const chartCanvas = document.querySelector('#myChart');
const waveD = document.querySelector('.wave-down--js');
const waveU = document.querySelector('.wave-up--js');
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
  waveD.classList.toggle('wave-down--animation');
  waveU.classList.toggle('wave-up--animation');

  generateChart();
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
  waveD.classList.toggle('wave-down--animation');
  waveU.classList.toggle('wave-up--animation');
  generateChart();
};

// Chart

const showChart = () => {
  generateChart();
  chartCanvas.classList.toggle('chart__canvas--active');
};

addGlass.addEventListener('click', addToGlass);
removeGlass.addEventListener('click', removeFromGlass);
chartOnOff.addEventListener('click', showChart);
counter = myStorage();

// Charts
//Temp ----
const feedLocalStorage = () => {
  const db = [
    ['hydro-2019-07-01', 5],
    ['hydro-2019-07-02', 3],
    ['hydro-2019-07-03', 8],
    ['hydro-2019-07-04', 2],
    ['hydro-2019-07-05', 7],
    ['hydro-2019-07-06', 4],
    ['hydro-2019-07-07', 1],
    ['hydro-2019-07-08', 5],
    ['hydro-2019-07-09', 3],
    ['hydro-2019-07-10', 8],
    ['hydro-2019-07-11', 2],
    ['hydro-2019-07-12', 7],
    ['hydro-2019-07-13', 4],
    ['hydro-2019-07-14', 1],
    ['hydro-2019-07-15', 5],
    ['hydro-2019-07-16', 3],
    ['hydro-2019-07-17', 8],
    ['hydro-2019-07-18', 2],
    ['hydro-2019-07-19', 7],
    ['hydro-2019-07-20', 4],
    ['hydro-2019-07-21', 1],
  ];

  for (let i = 0; i < db.length; i++) {
    localStorage.setItem(db[i][0], db[i][1]);
  }
};

// temp end -----

// const hydroX = [];
// const hydroY = [];

// const allStorage = () => {
//   let key;
//   hydroX.length = 0;
//   hydroY.length = 0;
//   if (localStorage.length !== null) {
//     for (let i = 0; i <= localStorage.length - 1; i++) {
//       key = localStorage.key(i);
//       if (key.slice(0, 5) === 'hydro') {
//         let kDate = key.slice(6, key.length);
//         console.log('d: ' + kDate);
//         hydroX.push(kDate);

//         let kValue = localStorage.getItem(key);
//         console.log('v: ' + kValue);
//         hydroY.push(kValue);
//       }
//     }
//   }
// };

/*
sprawdz jaki jest tk of y
dla tego tk wyszukaj dane w localS
dla tk-1 (przechowuj tk w pamieci) wyszukaj dane w localS, update chart
dla tk+1 (przechowuj tk w pamieci) wyszukaj dane w localS, update chart
*/

// pobierz on click yearWeek - global

const chartX = [];
const chartY = [];

// const chartData = [];
let yearWeek = moment().isoWeek();
// console.log('1: ' + yearWeek);

const getData = () => {
  const chartData = [];
  let localStorageKey;
  let localStorageKeyDate;
  let weekNumberOfKeyDate;
  let weekDayOfKeyDate;

  chartX.length = 0;
  chartY.length = 0;

  // chartData.length = 0;

  if (localStorage.length !== null) {
    for (let i = 0; i <= localStorage.length - 1; i++) {
      localStorageKey = localStorage.key(i);
      console.log(localStorageKey);

      if (localStorageKey.slice(0, 5) === 'hydro') {
        localStorageKeyDate = localStorageKey.slice(6, localStorageKey.length);
        weekNumberOfKeyDate = moment(localStorageKeyDate).isoWeek();
        weekDayOfKeyDate = moment(localStorageKeyDate).format('dddd');

        if (weekNumberOfKeyDate === yearWeek) {
          chartData.push({
            weekNumber: yearWeek,
            weekDay: weekDayOfKeyDate,
            date: localStorageKeyDate,
            value: localStorage.getItem(localStorageKey),
          });
        }
      }
    }

    // sort

    chartData.sort((a, b) => {
      let c = new Date(a.date);
      let d = new Date(b.date);
      return c - d;
    });

    // xAx = [];
    // yAx = [];
    // for (let i = 0; i < daneC.length; i++) {
    //   xAx.push(daneC[i].weekDay);
    //   yAx.push(daneC[i].value);
    // }

    chartData.forEach(item => {
      chartX.push(item.weekDay);
      chartY.push(item.value);
    });

    //  console.log(chData);

    // return chartData;
  }
};

const createChart = () => {
  // console.log('sss' + daneC[0].d);
  // xAx = [];
  // yAx = [];
  // for (let i = 0; i < daneC.length; i++) {
  //   xAx.push(daneC[i].weekDay);
  //   yAx.push(daneC[i].value);
  // }

  const ctx = document.getElementById('myChart').getContext('2d');
  const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: chartX,
      datasets: [
        {
          label: `Week ${yearWeek}`,
          data: chartY,
          backgroundColor: '#3DC3F3',
          borderColor: '#76C1FB',
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });
};

const generateChart = () => {
  // allStorage();
  getData();
  createChart();
};

feedLocalStorage();
