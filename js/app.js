// if (!window.indexedDB) {
//     window.alert("Your browser doesn't support a stable version of IndexedDB. You will not be able to save your timers.");
// }

(function() {
    var app = angular.module('interval-timer', [ 'ngCookies' ]);
    // var db;
    // var request = window.indexedDB.open("myTimers", 1);
    // request.onerror = function(event) {
    //   alert("Error: " + event.target.errorCode);
    // };
    // request.onupgradeneeded = function(event) {
    //   db = event.target.result;
    //   var objectStore = db.createObjectStore("timers", { autoIncrement: true });
    //   objectStore.createIndex("name", "name", { unique: false });
    //   objectStore.createIndex("high_intensity", "high_intensity", { unique: false });
    //   objectStore.createIndex("low_intensity", "low_intensity", { unique: false });
    //   objectStore.createIndex("cycles", "cycles", { unique: false });
    //   objectStore.transaction.oncomplete = function(event) {};
    // };
    // request.onsuccess = function(event) {
    //   db = event.target.result;
    // };
    // var transaction = db.transaction(["timers"], "readwrite");
    var defaultTimer = {
        "name" : "Tabata",
        "warmUpTime": 300,
        "highIntensityTime" : 20,
        "lowIntensityTime" : 10,
        "coolDownTime" : 300,
        "cycles" : 8,
        "repeat": 6
    };
    app.controller('timerCtrl', ['$scope', '$cookies', function($scope, $cookies) {
        $scope.defaults = defaultTimer;
        function getSavedTimer() {
            var savedTimer = $cookies.getObject("timer");
            console.log(typeof savedTimer == "object");
            if (typeof savedTimer == "object") {
                return savedTimer;
            } else {
                return $scope.defaults;
            }
        };
        $scope.timer = getSavedTimer();
        $scope.lowIntensityBeep = new Audio('audio/beep-09.mp3');
        $scope.highIntensityBeep = new Audio('audio/button-42(1).mp3');
        $scope.coolDownBeep = new Audio('audio/beep-10.mp3');
        $scope.warmUp = true;
        $scope.round = 1;
        $scope.cycle = 1;
        $scope.time = $scope.timer.warmUpTime;
        $scope.settingsOpen = false;
        $scope.closeSettings = false;
        $scope.getTimeRemaining = function() {
            var totalWarmUpTime = $scope.timer.warmUpTime * $scope.timer.repeat;
            var totalLowIntensityTime = ($scope.timer.lowIntensityTime * $scope.timer.repeat * $scope.timer.cycles) - ($scope.round * $scope.timer.lowIntensityTime) - ($scope.timer.cycles * $scope.cycle * $scope.timer.lowIntensityTime);
            var totalHighIntensityTime = ($scope.timer.highIntensityTime * $scope.timer.repeat * $scope.timer.cycles) - ($scope.round * $scope.timer.highIntensityTime) - ($scope.timer.cycles * $scope.cycle * $scope.timer.highIntensityTime);
            var totalCoolDownTime = $scope.timer.coolDownTime;
            return (totalWarmUpTime + totalLowIntensityTime + totalHighIntensityTime + totalCoolDownTime) * 1000;
        }
        $scope.timeRemaining = $scope.getTimeRemaining();
        console.log($scope.timeRemaining);
        $scope.setWarmUp = function() {
          clearInterval($scope.countdown);
          $scope.warmUp = true;
          $scope.time = $scope.timer.warmUpTime;
          $scope.startTimer();
        }
        $scope.setCoolDown = function() {
          clearInterval($scope.countdown);
          $scope.coolDown = true;
          $scope.time = $scope.timer.coolDownTime;
          $scope.coolDownBeep.play();
          $scope.startTimer();
        }
        $scope.setLowIntensity = function() {
          clearInterval($scope.countdown);
          $scope.lowIntensity = true;
          $scope.time = $scope.timer.lowIntensityTime;
          $scope.lowIntensityBeep.play();
          $scope.startTimer();
        }
        $scope.setHighIntensity = function() {
          clearInterval($scope.countdown);
          $scope.highIntensity = true;
          $scope.time = $scope.timer.highIntensityTime;
          $scope.highIntensityBeep.play();
          $scope.startTimer();
        }
        $scope.startWarmUp = function() {
          if ($scope.time == 0) {
            $scope.warmUp = false;
            $scope.setHighIntensity();
          };
          $scope.$apply(function() {
            $scope.time--;
            $scope.timeRemaining = $scope.getTimeRemaining();
          });
        };
        $scope.startCoolDown = function() {
          if ($scope.time == 0) {
            $scope.coolDown = false;
            $scope.resetTimer();
          };
          $scope.$apply(function() {
            $scope.time--;
            $scope.timeRemaining = $scope.getTimeRemaining();
          });
        };
        $scope.startLowIntensity = function() {
          if ($scope.time == 0) {
            $scope.lowIntensity = false;
            $scope.setHighIntensity();
          };
          $scope.$apply(function() {
            $scope.time--;
            $scope.timeRemaining = $scope.getTimeRemaining();
          });
        };
        $scope.startHighIntensity = function() {
            if ($scope.time == 0) {
                $scope.round++;
                $scope.highIntensity = false;
                console.log("This runs");
                if ($scope.round < $scope.timer.cycles) {
                    $scope.setLowIntensity();
                } else {
                    $scope.cycle++;
                    // console.log($scope.cycle);
                    // console.log($scope.timer.repeat);
                    if ($scope.cycle < $scope.timer.repeat) {
                        $scope.warmUp = true;
                        $scope.setWarmUp();
                    } else {
                        $scope.coolDown = true;
                        $scope.setCoolDown();
                    }
                }
            };
            $scope.$apply(function() {
                $scope.time--;
                $scope.timeRemaining = $scope.getTimeRemaining();
            });
        };
        $scope.startTimer = function() {
          $scope.timerActive = true;
          if ($scope.warmUp) {
            $scope.countdown = setInterval($scope.startWarmUp, 1000);
          }
          if ($scope.coolDown) {
            $scope.countdown = setInterval($scope.startCoolDown, 1000);
          }
          if ($scope.highIntensity) {
            $scope.countdown = setInterval($scope.startHighIntensity, 1000);
          }
          if ($scope.lowIntensity) {
            $scope.countdown = setInterval($scope.startLowIntensity, 1000);
          }
        };
        $scope.pauseTimer = function() {
          $scope.timerActive = false;
          clearInterval($scope.countdown);
        };
        $scope.stepBack = function() {
          if ($scope.warmUp) {
            if ($scope.cycle != 1) {
                $scope.warmUp = false;
                $scope.cycle--;
                $scope.setHighIntensity();
                return;
            } else {
                $scope.resetTimer();
                return;
            }
          };
          if ($scope.lowIntensity) {
            $scope.lowIntensity = false;
            if ($scope.round == 1) {
              $scope.setWarmUp();
              return;
            }
            $scope.setHighIntensity();
            $scope.round--;
            return;
          };
          if ($scope.highIntensity) {
            $scope.highIntensity = false;
            $scope.setLowIntensity();
            return;
          };
          if ($scope.coolDown) {
            $scope.coolDown = false;
            $scope.setHighIntensity();
            return;
          }
        };
        $scope.stepForward = function() {
          if ($scope.warmUp) {
            $scope.warmUp = false;
            $scope.setLowIntensity();
            return;
          }
          if ($scope.lowIntensity) {
            $scope.lowIntensity = false;
            $scope.setHighIntensity();
            return;
          };
          if ($scope.highIntensity) {
            $scope.highIntensity = false;
            if ($scope.round == $scope.timer.cycles && $scope.cycle == $scope.timer.repeat) {
              $scope.setCoolDown();
              return;
            } else if ($scope.round == $scope.timer.cycles && $scope.cycle < $scope.timer.repeat) {
                $scope.cycle++;
                $scope.round = 1;
                $scope.setWarmUp();
                return;
            }
            $scope.setLowIntensity();
            $scope.round++;
            return;
          };
        };
        $scope.resetTimer = function() {
          clearInterval($scope.countdown);
          $scope.timerActive = false;
          $scope.round = 1;
          $scope.cycle = 1;
          $scope.lowIntensity = false;
          $scope.highIntensity = false; 
          $scope.coolDown = false;
          $scope.warmUp = true;
          $scope.time = $scope.timer.warmUpTime;
        };
        $scope.saveTimer = function() {
            console.log("Saved timer:");
            console.log($scope.timer);
            $cookies.putObject("timer", $scope.timer);
            console.log("timer saved");
            console.log($cookies.getObject("timer"));
        };
    }]);
})();