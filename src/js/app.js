if (!window.indexedDB) {
  // TODO: Show this as an inline alert instead
  window.alert("Your browser doesn't support a stable version of IndexedDB. You will not be able to save your timers.");
}

const defaultTimer = {
  "id": 0,
  "name": "",
  "description": "",
  "warmUp": 300,
  "highIntensity": 60,
  "lowIntensity": 30,
  "rest": 60,
  "coolDown": 300,
  "rounds": 4,
  "cycles": 2
}

const Phase = {
  WARM: {
    name: "Warm Up",
    sound: new Audio('audio/warm.mp3')
  },
  LOW: {
    name: "Low Intensity",
    sound: new Audio('audio/low.mp3')
  },
  HIGH: {
    name: "High Intensity",
    sound: new Audio('audio/high.mp3')
  },
  REST: {
    name: "Rest",
    sound: new Audio('audio/rest.mp3')
  },
  COOL: {
    name: "Cool Down",
    sound: new Audio('audio/cool.mp3')
  },
}

let _state = {
  timers: null,
  timer: null,
  timerJob: null,
  timerComplete: false,
  set: 1,
  round: 1,
  phase: Phase.WARM,
  timeRemaining: 0,
  editingTimer: false,
};

let db = null;
let timerStore = null;

function initApp() {
  Array.from(document.getElementsByClassName('duration')).forEach(input => {
    console.log(input)
    // input.addEventListener('beforeinput', maskDuration);
  });
  loadTimers();
}

function loadTimers() {
  let state = copyState();
  const dbRequest = window.indexedDB.open('interval-timer', 1);
  dbRequest.onerror = (event) => {
    console.error(`Failed to open IndexedDB`, event)
  }

  dbRequest.onsuccess = (event) => {
    db = event.target.result;
    let transaction = db.transaction(["timers"]);
    let objectStore = transaction.objectStore("timers");
    const request = objectStore.getAll();
    request.onerror = function (event) {
      console.error('Failed to load timers', event)
    };
    request.onsuccess = function (event) {
      console.log("Loaded timers", event)
      state.timers = event.target.result;
      updateState(state)  
    };
  }

  dbRequest.onupgradeneeded = (event) => {
    db = event.target.result;
    timerStore = db.createObjectStore('timers', { keyPath: 'id' });
  }
}

function saveTimer() {
  // let transaction = db.transaction(["timers"], "readwrite");
  // transaction.oncomplete
  let state = copyState();
  if (!state.timers) {
    state.timers = [];
  }
  // TODO: get values from fields and then clear them here
  state.timers.push(defaultTimer)
  updateState({
    ...state,
    editingTimer: false,
  });
}

function deleteTimer() {
  //   var request = db.transaction(["customers"], "readwrite")
  //                 .objectStore("customers")
  //                 .delete("444-44-4444");
  // request.onsuccess = function(event) {
  // It's gone!
  // };
}

function openTimer() {

}

function editTimer() {
  updateState({
    editingTimer: true
  })
}

function cancelEdit() {
  updateState({
    editingTimer: false
  })
}

function maskDuration(event) {
  const input = event.target;
  let formatted = input.value.replace(/[^\d]/g, '');
  if (event.inputType === "deleteContentBackward") {
    formatted = formatted.slice(0, formatted.length - 1)
    formatted = ("000000" + formatted).slice(-6)
  } else if (event.inputType === 'insertText' && event.data.match(/\d/)) {
    formatted = ("000000" + formatted).slice(-6)
  }
  input.value = `${formatted.slice(0, 2)}h ${formatted.slice(2, 4)}m ${formatted.slice(4, 6)}s`;
}

function isBeforeInputEventAvailable() {
  return window.InputEvent && typeof InputEvent.prototype.getTargetRanges === "function";
}

function handleDurationCaret(event) {
  const input = event.target;
  const position = Math.min(11, input.value.length);
  input.setSelectionRange(position, position);
}

function toggleTimer() {
  let state = copyState();
  if (state.timerJob != null) {
    clearInterval(state.timerJob)
    state.timerJob = null
  } else {
    state.timerJob = setInterval(timerLoop, 1000);
  }
  updateState(state);
  lockScreen();
}

function timerLoop() {
  let state = copyState();
  state.timeRemaining -= 1;
  if (state.timeRemaining <= 0) {
    goForward();
  }
  updateState(state);
}

function goBack() {
  let state = copyState();
  if (!state.timer) return;
  switch (state.phase) {
    case Phase.WARM:
      state.timeRemaining = state.timer.warmUp;
      break;
    case Phase.LOW:
      if (state.set == state.timer.sets && state.round == state.timer.rounds) {
        state.phase = Phase.WARM;
        state.timeRemaining = state.timer.warmUp;
      } else if (state.set == state.timer.sets && state.round < state.timer.rounds) {
        state.phase = Phase.REST;
        state.timeRemaining = state.timer.rest;
      } else {
        state.set += 1;
        state.phase = Phase.HIGH;
        state.timeRemaining = state.timer.highIntensity;
      }
      break;
    case Phase.HIGH:
      state.phase = Phase.LOW;
      state.timeRemaining = state.timer.lowIntensity;
      break;
    case Phase.REST:
      state.round += 1;
      state.phase = Phase.HIGH;
      state.set = state.timer.sets;
      state.timeRemaining = state.timer.highIntensity;
      break;
    case Phase.COOL:
      state.phase = Phase.HIGH;
      state.timeRemaining = state.timer.highIntensity;
      break;
  }
  updateState({
    ...state,
    timerComplete: false,
  })
}

function goForward() {
  let state = copyState();
  if (!state.timer) return;
  state.timerComplete = state.phase === Phase.COOL
  switch (state.phase) {
    case Phase.WARM:
      state.phase = Phase.LOW;
      state.timeRemaining = state.timer.lowIntensity;
      break;
    case Phase.LOW:
      state.phase = Phase.HIGH;
      state.timeRemaining = state.timer.highIntensity;
      break;
    case Phase.HIGH:
      if (state.set > 1) {
        state.set -= 1;
        state.phase = Phase.LOW;
        state.timeRemaining = state.timer.lowIntensity;
      } else if (state.round > 1) {
        state.round -= 1;
        state.phase = Phase.REST;
        state.timeRemaining = state.timer.rest;
      } else {
        state.phase = Phase.COOL;
        state.timeRemaining = state.timer.coolDown;
      }
      break;
    case Phase.REST:
      state.set = state.timer.sets;
      state.phase = Phase.LOW;
      state.timeRemaining = state.timer.lowIntensity;
      break;
    case Phase.COOL:
      state.timeRemaining = 0;
      break;
  }
  updateState(state);
}

function copyState() {
  return JSON.parse(JSON.stringify(_state));
}

const debug = false;

function updateState(changes) {
  if (debug) console.log("Before", _state)
  const immutableChanges = JSON.parse(JSON.stringify(changes));
  _state = {
    ..._state,
    ...immutableChanges
  }
  if (debug) console.log("After: ", _state)
  if (_state.timers) {
    document.body.classList.add('timersLoaded')
    if (_state.timers.length === 0) {
      document.body.classList.add('noTimers')
    } else {
      document.body.classList.remove('noTimers')
    }
  }
  if (_state.editingTimer) {
    document.body.classList.add('editing')
  } else {
    document.body.classList.remove('editing')
  }
}

// The wakeLock has to be separate from the state because it doesn't get 
// transferred correctly when the state is copied
let wakeLock = null;

function lockScreen() {
  let state = copyState();
  if (state.timerJob) {
    if (wakeLock) {
      console.log("Ignoring request to lock screen, should already be locked");
      return;
    }
    try {
      navigator.wakeLock.request('screen').then((lock) => {
        wakeLock = lock;
        wakeLock.addEventListener('release', () => {
          console.log('Screen Wake Lock was released');
        });
        console.log('Screen Wake Lock is active');
      }).catch((err) => {
        console.error(`Failed to aquire wakelock: ${err.name}, ${err.message}`);
      })
    } catch (err) {
      console.error(`Failed to aquire wakelock: ${err.name}, ${err.message}`);
    }
  } else {
    try {
      wakeLock.release();
      wakeLock = null;
    } catch (err) {
      console.error(`Failed to release wakelock: ${err.name}, ${err.message}`)
    }
  }
}
