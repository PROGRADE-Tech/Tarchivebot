var tarchive = angular.module('tarchive', ["APIService", "ngTable"]);

tarchive.controller('CoreController', ['$scope', '$filter', 'API', 'NgTableParams', function($scope, $filter, API, NgTableParams) {

  $scope.key = localStorage.getItem('tarchiveKey');
  $scope.messageAmount = 1000;
  $scope.newData = [];
  $scope.content = "table";
  API.test("APIService Loaded");

  $scope.messageTable = new NgTableParams({
        page: 1,            // show first page
        count: 10           // count per page
    }, {
        total: $scope.newData.length, // length of data
        getData: function (params) {
            // use build-in angular filter
            var orderedData = params.filter() ? $filter('filter')($scope.newData, params.filter()) : $scope.newData;
            $scope.ordered = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
            params.total(orderedData.length);
            // set total for recalc pagination
            return $scope.ordered;
        }
    });

    $scope.askForKey = function() {
      swal({
        title: "Enter your key!",
        text: "Enter the key provided by the bot:",
        type: "input",
        showCancelButton: true,
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

        API.recent($scope.key, $scope.messageAmount, function(data) {
          $scope.newData = data;
          $scope.messageTable.reload();
        });
        swal({
          title: "Nice!",
          text: "This is the key you entered:<br><code style='word-wrap:break-word;'>" + inputValue + "</code>",
          type: "success",
          html: true
        });
      });
    };

    if ($scope.key === null) {
      $scope.askForKey();
    }

    API.recent($scope.key, $scope.messageAmount, function(data) {
      $scope.newData = data;
      console.log(data);
      console.log($scope.newData);
      $scope.messageTable.reload();
    });

}]);
