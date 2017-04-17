var APIService = angular.module('APIService', [])
.service('API', function ($http) {

    this.test = function (a) {
      console.log(a);
      return;
    };

    this.recent = function (key, amount) {
      // do http post

      $http.post("/api/recent", {"key": key, "amount": amount})
       .then(
           function(response){
             //sucess
             console.log(response.data);
             // ideally I could just return response.data
           },
           function(response){
             //fail
             console.log(response);
           }
        );

      return;
    };

});
