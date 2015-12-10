/**
 * Created by Brecht on 21/11/2015.
 */

//(function(){
//    "use strict";
//    var eventService = function($http){
//        $http({
//            method: 'GET',
//            url: '/api/events'
//        }).then(function successCallback(response) {
//            // this callback will be called asynchronously
//            // when the response is available
//            $scope.events = response.events;
//        }, function errorCallback(response) {
//            // called asynchronously if an error occurs
//            // or server returns response with an error status.
//        });
//    };
//
//    angular.module('event').factory("eventService",['$q','$http',eventService]);
//})();

myApp.service('dataService', function($http) {
    this.getData = function(callbackFunc) {
        $http({
            method: 'GET',
            url: 'http://localhost:3000/api/events'
        }).success(function(data){
            // With the data succesfully returned, call our callback
            callbackFunc(data);
        }).error(function(){
            alert("error");
        });
    };
});
