/**
 * Created by Brecht on 31/12/2015.
 */
(function(){
    var userService = function($http) {

        var url = '/api/profile/';
        return  $http({
            method: 'GET',
            url: url
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            return response.data;
            //console.log(" SUCCESS " + response.data);
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            console.log(" FAILURE " + response);
        });
    };

    angular.module('admin').factory('userService',['$http',userService]);
})();