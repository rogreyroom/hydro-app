// Charts
const hydroX = [];
const hydroY = [];

const allStorage = () => {
  let key;
  hydroX.length = 0;
  hydroY.length = 0;
  if (localStorage.length !== null) {
    for (let i = 0; i <= localStorage.length - 1; i++) {
      key = localStorage.key(i);
      if (key.slice(0, 5) === 'hydro') {
        let kDate = key.slice(6, key.length);
        console.log('d: ' + kDate);
        hydroX.push(kDate);

        let kValue = localStorage.getItem(key);
        console.log('v: ' + kValue);
        hydroY.push(kValue);
      }
    }
  }
};

const createChart = () => {
  const ctx = document.getElementById('myChart').getContext('2d');
  const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: hydroX,
      datasets: [
        {
          label: 'Drinking progress 😉',
          data: hydroY,
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
  allStorage();
  createChart();
};

// generateChart();
