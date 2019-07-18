// read and setup glass counter using local storage
const myStorage = () => {

    const state = localStorage.getItem(localStorageKey);
    if (state !== null) {

      theGlass.innerHTML = state;
      return state;
    } else {

      localStorage.setItem(localStorageKey, 0);
      theGlass.innerHTML = 0;
      return 0;
    }
  };

// add new glass to local storage. Add animations to the glass
const addToGlass = () => {
    glassCounter++;
    localStorage.setItem(localStorageKey, glassCounter);
    theGlass.innerHTML = glassCounter;
    waveD.classList.toggle('wave-down--animation');
    waveU.classList.toggle('wave-up--animation');
    
    // czy to powinno tu być - tylko jeżeli wykres bedzie zawsze widoczny
    generateChart();
  };

// remove glass from local storage - never go bellow zero. Add animation to the glass 
const removeFromGlass = () => {
    glassCounter--;
    if (glassCounter < 0) {
      glassCounter = 0;
      localStorage.setItem(localStorageKey, glassCounter);
      theGlass.innerHTML = glassCounter;
    } else {
      localStorage.setItem(localStorageKey, glassCounter);
      theGlass.innerHTML = glassCounter;
    }
    waveD.classList.toggle('wave-down--animation');
    waveU.classList.toggle('wave-up--animation');

    // czy to powinno tu być - tylko jeżeli wykres bedzie zawsze widoczny
    generateChart();
  };

// setup the glassCounter
glassCounte = myStorage();

// glass actions
addGlass.addEventListener('click', addToGlass);
removeGlass.addEventListener('click', removeFromGlass);