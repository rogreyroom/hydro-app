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

feedLocalStorage();
