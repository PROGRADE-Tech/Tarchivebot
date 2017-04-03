var tarchive = angular.module('tarchive', ["ngTable"]);

tarchive.controller('CoreController', ['$scope', 'NgTableParams', function($scope, NgTableParams) {

  $scope.key = localStorage.getItem('tarchiveKey');
  $scope.content = "table";
  $scope.sampleData = sampleData;



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


  $scope.messageTable = new NgTableParams({
        page: 1,            // show first page
        count: 10           // count per page
    }, {
        total: $scope.sampleData.length, // length of data
        getData: function(params) {
            $scope.tableData = $scope.sampleData.slice((params.page() - 1) * params.count(), params.page() * params.count());

            return $scope.tableData;
        }
});




}]);
