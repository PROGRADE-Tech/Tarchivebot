var tarchive = angular.module('tarchive', ["APIService", "ngTable", "ngSanitize"]);

tarchive.config(['$compileProvider', function( $compileProvider ) {
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|http|ftp|mailto|data|chrome-extension):/);
  }
]);

tarchive.controller('CoreController', ['$scope', '$filter', 'API', 'NgTableParams', function($scope, $filter, API, NgTableParams) {

  $scope.key = localStorage.getItem('tarchiveKey');
  $scope.messageAmount = 1000;
  $scope.tableData = [];
  $scope.content = "table";

  $scope.messageTable = new NgTableParams({
        page: 1,            // show first page
        count: 10           // count per page
    }, {
        total: $scope.tableData.length, // length of data
        getData: function (params) {

            // use build-in angular filter
            var orderedData = params.filter() ? $filter('filter')($scope.tableData, params.filter()) : $scope.tableData;
            params.total(orderedData.length);

            var sorted = $filter('orderBy')(orderedData, params.orderBy());

            var paged = sorted.slice((params.page() - 1) * params.count(), params.page() * params.count());

            return paged;
        }
    });

    $scope.getRecentMessages = function() {
      API.recent($scope.key, $scope.messageAmount, function(data) {
        $scope.tableData = data;
        $scope.setJsonExportData();
        $scope.messageTable.reload();
      });
    };

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

        $scope.getRecentMessages()
        swal({
          title: "Nice!",
          text: "This is the key you entered:<br><code style='word-wrap:break-word;'>" + inputValue + "</code>",
          type: "success",
          html: true
        });
      });
    };

    $scope.setJsonExportData = function() {
      var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify($scope.tableData));
      $scope.jsonData = dataStr;
      $scope.jsonDataFile = Date.now() + "_tarchive_table.json";
    };

    $scope.downloadJsonExportData = function() {
      if($scope.tableData.length <= 0) {
        $scope.setJsonExportData();
      }
      window.location.href = $("#jsonDataExportTable").attr('href');
    }

    if ($scope.key === null) {
      $scope.askForKey();
    } else {
      $scope.getRecentMessages();
    }

}]);
