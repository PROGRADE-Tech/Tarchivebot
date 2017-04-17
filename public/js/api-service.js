var APIService = angular.module('APIService', [])
.service('API', function ($http) {

    this.test = function (a) {
      console.log(a);
      return;
    };

    this.recent = function (key, amount, callback) {

      $http.post("/api/recent", {"key": key, "amount": amount})
       .then(
           function(response){
             // success
             callback(response.data);
           },
           function(response){
             // fail
             console.log(response);
           }
        );

      return;
    };

});
