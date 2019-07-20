// get localStorage data and organize them for the chart
const getData = yearWeek => {
  const chartData = [];
  const chartX = [];
  const chartY = [];
  let chartScales = {};

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

    chartScales =
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
  const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: chartValues.xScale,
      datasets: [
        {
          label: `Week: ${chartValues.weekNumber}`,
          data: chartValues.yScale,
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

const msgInfo = msg => {
  let newMessage = document.createElement('p');
  newMessage.className = 'chart__message-text';
  newMessage.innerHTML = msg;
  messagePanel.appendChild(newMessage);
};

const msgRemove = () => {
  if (messagePanel.firstElementChild !== null) {
    messagePanel.removeChild(messagePanel.firstElementChild);
  }
};

const checkWeek = () => {
  if (chartYearWeek <= 0) {
    return (chartYearWeek = 1);
  } else if (chartYearWeek > moment().isoWeek()) {
    msgRemove();
    msgInfo('No data for next week.');
    if (chartYearWeek > moment().isoWeeksInYear()) {
      chartYearWeek = moment().isoWeeksInYear();
      return chartYearWeek;
    } else {
      return chartYearWeek;
    }
  } else {
    const isData = getData(chartYearWeek);
    if (chartYearWeek < moment().isoWeek() && isData.yScale.length === 0) {
      msgRemove();
      msgInfo('No data for previous week.');
      return chartYearWeek;
    } else {
      msgRemove();
      return chartYearWeek;
    }
  }
};

const nextWeek = () => {
  chartYearWeek++;
  generateChart();
};

const currentWeek = () => {
  chartYearWeek = moment().isoWeek();
  generateChart();
};

const previousWeek = () => {
  chartYearWeek--;
  generateChart();
};

const generateChart = () => {
  const week = checkWeek();
  const chartData = getData(week);
  createChart(chartData);
};

// chart
generateChart();

// chart actions
chartCurrent.addEventListener('click', currentWeek);
chartNextWeek.addEventListener('click', nextWeek);
chartPreviousWeek.addEventListener('click', previousWeek);
