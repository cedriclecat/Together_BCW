/**
 * Created by CedricLecat on 18/11/15.
 */

//(function(){
//    "use strict";
//
//    var EventController = function($scope,eventService){
//        $scope.eventStuff = {};
//        $scope.eventService = eventService;
//        eventService.getEvents()
//            .then(function (events) {
//                $scope.eventStuff = events;
//            }, function (error) {
//                console.error(error);
//            });
//    };
//
//    angular.module('event').controller("EventController",['$scope','eventService',EventController]);
//})();

myApp.controller('EventController', function($scope, dataService) {
    $scope.data = null;
    dataService.getData(function(dataResponse) {
        $scope.data = dataResponse;
    });
});