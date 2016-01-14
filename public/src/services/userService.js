/**
 * Created by Brecht on 31/12/2015.
 */
(function(){
    var userService = function($http) {

        var users = function() {
            var url = '/api/profile/';
            return  $http({method: 'GET', url: url}).then(successCallback,errorCallback);
            function successCallback(response){
                return response.data;
            }
            function errorCallback(response){
                console.log("Failure: " + response);
            }
        };

        return{
            getUsers: users
        }

    };

    angular.module('admin').factory('userService',['$http',userService]);
})();