if (!window.indexedDB) {
  window.alert("Your browser doesn't support a stable version of IndexedDB. You will not be able to save your timers.");
}

(function () {
  let wakeLock = null;
  var app = angular.module('interval-timer', ['indexedDB', 'itemSwipe', 'ngAnimate', 'ngCookies', 'ngTouch'])
    .config(function ($indexedDBProvider) {
      $indexedDBProvider
        .connection('interval-timer')
        .upgradeDatabase(1, function (event, db, tx) {
          var objStore = db.createObjectStore('timers', { keyPath: 'id' });
          objStore.createIndex('timer_obj', 'timer', { unique: false });
        })
    });
  var defaultTimer = {
    "id": 0,
    "name": "",
    "description": "",
    "warmUp": {
      "min": 0,
      "sec": 0,
      "time": 0
    },
    "highIntensity": {
      "min": 0,
      "sec": 0,
      "time": 0
    },
    "lowIntensity": {
      "min": 0,
      "sec": 0,
      "time": 0
    },
    "coolDown": {
      "min": 0,
      "sec": 0,
      "time": 0
    },
    "rest": {
      "min": 0,
      "sec": 0,
      "time": 0
    },
    "rounds": 1,
    "cycles": 1
  };
  app.controller('timerCtrl', ['$scope', '$cookies', '$indexedDB', function ($scope, $cookies, $indexedDB) {
    $scope.defaults = defaultTimer;
    function getSavedTimer() {
      var savedTimer = $cookies.getObject("timer");
      if (typeof savedTimer == "object") {
        return savedTimer;
      } else {
        return $scope.defaults;
      }
    }
    $scope.lockScreen = function () {
      if ($scope.timerActive) {
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
    $scope.timers = {}
    $scope.periods = [
      "warmUp",
      "lowIntensity",
      "highIntensity",
      "rest",
      "coolDown"
    ];
    $scope.timersLoaded = false;
    $scope.noTimers = false;
    $scope.setTimers = function () {
      $indexedDB.openStore('timers', function (timers) {
        timers.getAll()
          .then(function (data) {
            $scope.timers = data;
            if (data.length == 0) {
              $scope.noTimers = false;
            } else {
              $scope.noTimers = true;
            }
            $scope.timersLoaded = true;
          })
      })
    }
    $scope.setTimers();
    $scope.timer = {};
    $scope.config = {};
    $scope.initObj = new Promise(function (res, rej) {
      $scope.periods.forEach(function (period) {
        $scope.config[period] = {};
        $scope[period] = {};
        $scope.timer[period] = {};
      })
      res($scope.config);
    });
    $scope.initObj.then(function () {
      $scope.config.warmUp.beep = new Audio('audio/warm.mp3');
      $scope.config.lowIntensity.beep = new Audio('audio/low.mp3');
      $scope.config.highIntensity.beep = new Audio('audio/high.mp3');
      $scope.config.rest.beep = new Audio('audio/rest.mp3');
      $scope.config.coolDown.beep = new Audio('audio/cool.mp3');
      $scope.warmUp.active = true;
    })
    $scope.round = 1;
    $scope.cycle = 1;
    $scope.settingsOpen = false;
    $scope.closeSettings = false;
    $scope.newTimerOpen = false;
    $scope.newTimerClosed = false;
    $scope.showTimerInterface = false;
    $scope.setPeriod = function (period, playBeep) {
      if (typeof playBeep == "undefined") {
        playBeep = true;
      }
      clearInterval($scope.countdown);
      $scope[period].active = true;
      $scope.time = $scope.timer[period].time;
      if (playBeep) {
        if ($scope.config[period].beep) {
          $scope.config[period].beep.play();
        }
      }
      $scope.startTimer();
    }
    $scope.setWarmUp = function () {
      $scope.setPeriod('warmUp');
    }
    $scope.setCoolDown = function () {
      clearInterval($scope.countdown);
      $scope.coolDown.active = true;
      $scope.time = $scope.timer.coolDown.time;
      $scope.coolDownBeep.play();
      $scope.startTimer();
    }
    $scope.setLowIntensity = function () {
      clearInterval($scope.countdown);
      $scope.lowIntensity.active = true;
      $scope.time = $scope.timer.lowIntensity.time;
      $scope.lowIntensityBeep.play();
      $scope.startTimer();
    }
    $scope.setHighIntensity = function () {
      clearInterval($scope.countdown);
      $scope.highIntensity.active = true;
      $scope.time = $scope.timer.highIntensity.time;
      $scope.highIntensityBeep.play();
      $scope.startTimer();
    }
    $scope.startWarmUp = function () {
      if ($scope.time === 0) {
        $scope.warmUp.active = false;
        $scope.setPeriod('lowIntensity');
      }
      $scope.$apply(function () {
        $scope.time--;
      });
    };
    $scope.startCoolDown = function () {
      if ($scope.time === 0) {
        $scope.coolDown.active = false;
        $scope.resetTimer();
      }
      $scope.$apply(function () {
        $scope.time--;
      });
    };
    $scope.startRest = function () {
      if ($scope.time === 0) {
        $scope.rest.active = false;
        $scope.setPeriod('lowIntensity');
      }
      $scope.$apply(function () {
        $scope.time--;
      });
    };
    $scope.startLowIntensity = function () {
      if ($scope.time === 0) {
        $scope.lowIntensity.active = false;
        $scope.setPeriod('highIntensity');
      }
      $scope.$apply(function () {
        $scope.time--;
      });
    };
    $scope.startHighIntensity = function () {
      if ($scope.time === 0) {
        $scope.highIntensity.active = false;
        if ($scope.round == $scope.timer.rounds && $scope.cycle == $scope.timer.cycles) {
          $scope.setPeriod('coolDown');
        } else if ($scope.round == $scope.timer.rounds && $scope.cycle < $scope.timer.cycles) {
          $scope.cycle++;
          $scope.round = 1;
          $scope.setPeriod('rest');
        } else {
          $scope.setPeriod('lowIntensity');
          $scope.round++;
        }
      }
      $scope.$apply(function () {
        $scope.time--;
      });
    };
    $scope.getTimes = function () {
      $scope.periods.forEach(function (period) {
        var min = 0;
        if (typeof $scope.timer[period].min == "number" && $scope.timer[period].min > 0) {
          min = $scope.timer[period].min * 60;
        }
        var sec = $scope.timer[period].sec;
        $scope.timer[period].time = min + sec;
      })
    };
    $scope.startTimer = function () {
      $scope.timerActive = true;
      $scope.lockScreen();
      if ($scope.warmUp.active) {
        $scope.countdown = setInterval($scope.startWarmUp, 1000);
      }
      if ($scope.coolDown.active) {
        $scope.countdown = setInterval($scope.startCoolDown, 1000);
      }
      if ($scope.rest.active) {
        $scope.countdown = setInterval($scope.startRest, 1000);
      }
      if ($scope.highIntensity.active) {
        $scope.countdown = setInterval($scope.startHighIntensity, 1000);
      }
      if ($scope.lowIntensity.active) {
        $scope.countdown = setInterval($scope.startLowIntensity, 1000);
      }
    };
    $scope.pauseTimer = function () {
      $scope.timerActive = false;
      $scope.lockScreen();
      clearInterval($scope.countdown);
    };
    $scope.stepBack = function () {
      if ($scope.warmUp.active) {
        $scope.resetTimer();
        return;
      };
      if ($scope.lowIntensity.active) {
        $scope.lowIntensity.active = false;
        if ($scope.round == 1 && $scope.cycle == 1) {
          $scope.setPeriod('warmUp');
          return;
        }
        if ($scope.round == 1 && $scope.cycle > 1) {
          $scope.setPeriod('rest');
          return;
        }
        $scope.setPeriod('highIntensity');
        $scope.round--;
        return;
      };
      if ($scope.highIntensity.active) {
        $scope.highIntensity.active = false;
        $scope.setPeriod('lowIntensity');
        return;
      };
      if ($scope.rest.active) {
        $scope.rest.active = false;
        $scope.cycle--;
        $scope.round = $scope.timer.rounds;
        $scope.setPeriod('highIntensity');
        return;
      }
      if ($scope.coolDown.active) {
        $scope.coolDown.active = false;
        $scope.setPeriod('highIntensity');
        return;
      }
    };
    $scope.stepForward = function () {
      if ($scope.warmUp.active) {
        $scope.warmUp.active = false;
        $scope.setPeriod('lowIntensity');
        return;
      }
      if ($scope.rest.active) {
        $scope.rest.active = false;
        $scope.setPeriod('lowIntensity');
        return;
      };
      if ($scope.lowIntensity.active) {
        $scope.lowIntensity.active = false;
        $scope.setPeriod('highIntensity');
        return;
      };
      if ($scope.highIntensity.active) {
        $scope.highIntensity.active = false;
        if ($scope.round == $scope.timer.rounds && $scope.cycle == $scope.timer.cycles) {
          $scope.setPeriod('coolDown');
          return;
        } else if ($scope.round == $scope.timer.rounds && $scope.cycle < $scope.timer.cycles) {
          $scope.cycle++;
          $scope.round = 1;
          $scope.setPeriod('rest');
          return;
        }
        $scope.setPeriod('lowIntensity');
        $scope.round++;
        return;
      };
    };
    $scope.resetTimer = function () {
      clearInterval($scope.countdown);
      $scope.timerActive = false;
      $scope.lockScreen();
      $scope.round = 1;
      $scope.cycle = 1;
      $scope.lowIntensity.active = false;
      $scope.highIntensity.active = false;
      $scope.coolDown.active = false;
      $scope.warmUp.active = true;
      $scope.time = $scope.timer.warmUp.time;
    };
    $scope.makeId = function () {
      var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

      return text;
    };
    $scope.openTimer = function (id) {
      $indexedDB.openStore('timers', function (timers) {
        timers.find(id)
          .then(function (data) {
            $scope.timer = data;
            $scope.getTimes();
            $scope.resetTimer();
            $scope.showTimerInterface = true;
          })
      })
    }
    $scope.closeTimer = function () {
      $scope.showTimerInterface = false;
    }
    $scope.deleteTimer = function (item) {
      item.removed = true;
      setTimeout(function () {
        $indexedDB.openStore('timers', function (timers) {
          var result = timers.delete(item.id)
            .then(function (e) {
              $scope.setTimers();
            })
        })
      }, 500);
    };
    $scope.saveTimer = function () {
      $scope.newTimer.id = $scope.makeId();
      $indexedDB.openStore('timers', function (timers) {
        var result = timers.insert($scope.newTimer)
          .then(function (e) {
            $scope.newTimer = {};
            $scope.setTimers();
          })
      })
    };
    $scope.getTimers = function () {
      return $scope.timers;
    }
    $scope.getNumberRange = function (number) {
      range = [];
      for (var i = 0; i <= number; i++) {
        range.push(i);
      }
      return range
    }
    $scope.openNewTimer = function () {
      $scope.newTimerClosed = false;
      $scope.newTimerOpen = true;
    }
    $scope.validateNewTimer = function (newTimer) {
      timerSkel = $scope.defaults;
      angular.merge(timerSkel, newTimer);
      if (timerSkel.rounds < 1) {
        timerSkel.rounds = 1;
      }
      if (timerSkel.cycles < 1) {
        timerSkel.cycles = 1;
      }
      return new Promise(function (res, rej) {
        res(timerSkel);
      })
    }
    $scope.saveNewTimer = function () {
      $scope.validateNewTimer($scope.newTimer)
        .then(function (newTimer) {
          $scope.newTimer = newTimer;
          $scope.saveTimer();
          $scope.closeNewTimer();
        })
    }
    $scope.closeNewTimer = function () {
      $scope.newTimerOpen = false;
      $scope.newTimerClosed = true;
    }
  }]);
})();
