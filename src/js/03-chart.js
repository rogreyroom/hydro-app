// get localStorage data and organize them for the chart
const getData = yearWeek => {
  const chartData = [];
  const chartX = [];
  const chartY = [];

  if (localStorage.length !== null) {
    for (let i = 0; i <= localStorage.length - 1; i++) {
      let localStorageKey = localStorage.key(i);
      if (localStorageKey.slice(0, 5) === 'hydro') {
        let scoreDate = localStorageKey.slice(6, localStorageKey.length);
        let scoreWeek = moment(scoreDate).isoWeek();
        let scoreDay = moment(scoreDate).format('dddd');

        if (scoreWeek === yearWeek) {
          chartData.push({
            weekDay: scoreDay,
            date: scoreDate,
            value: localStorage.getItem(localStorageKey),
          });
        }
      }
    }

    // sort chart data by Date
    chartData.sort((aDate, bDate) => {
      let cDate = new Date(aDate.date);
      let dDate = new Date(bDate.date);
      return cDate - dDate;
    });

    // create axis arrays
    chartData.forEach(item => {
      chartX.push(item.weekDay);
      chartY.push(item.value);
    });

    const chartScales =
      {
        weekNumber: yearWeek,
        xScale: chartX,
        yScale: chartY,
      } || {};
  }

  return chartScales;
};

// createChart
const createChart = chartValues => {
  // const ctx = document.getElementById('myChart').getContext('2d');
  const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: chartValues.chartX,
      datasets: [
        {
          label: `Week: ${chartValues.weekNumber}`,
          data: chartValues.chartY,
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

// generate Chart
const generateChart = () => {
  const week = checkWeek();
  const chartData = getData(week);
  createChart(chartData);
};

//test-------------------

/*
  stan poczatkowy - obecny TK
  zapamietaj stan poczatkowy lub zczytaj

*/

const checkWeek = () => {
  if (chartYearWeek <= 0) {
    return (chartYearWeek = moment().isoWeek());
  } else {
    return chartYearWeek;
  }
};

const addWeek = () => {
  chartYearWeek++;
  //week nie może być większy od 52 lub 53
  let test = moment().isoWeeks();
  console.log(`test: ${test}`);
};

const removeWeek = () => {
  chartYearWeek--;
  checkWeek();
  //week nie może być większy od 52 lub 53
};

//end test---------------

const showChart = () => {
  generateChart();
  chartCanvas.classList.toggle('chart__canvas--active');
};
