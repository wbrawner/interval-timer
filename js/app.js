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
        console.log($scope.timer);
        $scope.lowIntensityBeep = new Audio('audio/beep-09.mp3');
        $scope.highIntensityBeep = new Audio('audio/button-42(1).mp3');
        $scope.coolDownBeep = new Audio('audio/beep-10.mp3');
        $scope.warmUp = true;
        $scope.round = 1;
        $scope.time = $scope.timer.warmUpTime;
        $scope.settingsOpen = false;
        $scope.closeSettings = false;
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
        $scope.startLowIntensity = function() {
          if ($scope.time == 0) {
            $scope.lowIntensity = false;
            $scope.setHighIntensity();
          };
          $scope.$apply(function() {
            $scope.time--;
          });
        };
        $scope.startHighIntensity = function() {
          if ($scope.time == 0) {
            $scope.round++;
            $scope.highIntensity = false;
            if ($scope.round < $scope.timer.cycles) {
              $scope.setLowIntensity();
            } else {
              $scope.cycle++;
              if ($scope.cycle < $scope.timer.repeat) {
                $scope.warmUp = true;
              } else {
                $scope.coolDown = true;
              }
            }
          };
          $scope.$apply(function() {
            $scope.time--;
          });
        };
        $scope.startTimer = function() {
          $scope.timerActive = true;
          if ($scope.warmUp) {
            $scope.countdown = setInterval($scope.startHighIntensity, 1000);
          }
          if ($scope.coolDown) {
            $scope.countdown = setInterval($scope.startHighIntensity, 1000);
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
            if ($scope.round == $scope.timer.cycles) {
              $scope.setCoolDown();
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