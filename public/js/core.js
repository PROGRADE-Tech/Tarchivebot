var tarchive = angular.module('tarchive',[]);

tarchive.controller('CoreController', ['$scope', function($scope) {

  $scope.key = localStorage.getItem('tarchiveKey');

  if ($scope.key === null) {
    // ask for key
    swal({
      title: "Enter your key!",
      text: "Enter the key provided by the bot:",
      type: "input",
      showCancelButton: false,
      closeOnConfirm: false,
      animation: true,
      inputPlaceholder: "Key"
    },
    function(inputValue){
      if (inputValue === false) return false;

      if (inputValue === "") {
        swal.showInputError("You need to write something!");
        return false
      }

      localStorage.setItem('tarchiveKey', inputValue);
      $scope.key = inputValue;

      swal({
        title: "Nice!",
        text: "This is the key you entered:<br><code style='word-wrap:break-word;'>" + inputValue + "</code>",
        type: "success",
        html: true
      });
    });
  }




}]);
