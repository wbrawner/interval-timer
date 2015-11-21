// if (!window.indexedDB) {
//     window.alert("Your browser doesn't support a stable version of IndexedDB. You will not be able to save your timers.");
// }

(function() {
  var app = angular.module('interval-timer', []);
  
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
  var timer = {
      "name" : "Tabata",
      "warm_up": 300,
      "high_intensity" : 20,
      "low_intensity" : 10,
      "cool_down" : 300,
      "cycles" : 8,
      "repeat": 6
    };
  var countDown;
  app.controller('timerCtrl', ['$scope', function($scope){
    $scope.lowIntensityBeep = new Audio('audio/beep-09.mp3');
    $scope.highIntensityBeep = new Audio('audio/button-42(1).mp3');
    $scope.coolDownBeep = new Audio('beep-10.mp3');
    $scope.round = 1;
    $scope.cycle = 1;
    $scope.timer = timer;
    $scope.warmUp = true;
    $scope.warmUpTime = timer.warm_up;
    $scope.lowIntensityTime = timer.low_intensity;
    $scope.highIntensityTime = timer.high_intensity;
    $scope.coolDownTime = timer.cool_down;
    $scope.time = $scope.warmUpTime;
    $scope.settingsOpen = false;
    $scope.setWarmUp = function() {
      clearInterval($scope.countdown);
      $scope.warmUp = true;
      $scope.time = $scope.warmUpTime;
      $scope.startTimer();
    }
    $scope.setCoolDown = function() {
      clearInterval($scope.countdown);
      $scope.coolDown = true;
      $scope.time = $scope.coolDownTime;
      $scope.coolDownBeep.play();
      $scope.startTimer();
    }
    $scope.setLowIntensity = function() {
      clearInterval($scope.countdown);
      $scope.lowIntensity = true;
      $scope.time = $scope.lowIntensityTime;
      $scope.lowIntensityBeep.play();
      $scope.startTimer();
    }
    $scope.setHighIntensity = function() {
      clearInterval($scope.countdown);
      $scope.highIntensity = true;
      $scope.time = $scope.highIntensityTime;
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
      $scope.time = $scope.warmUpTime;
    };
  }]);
})();