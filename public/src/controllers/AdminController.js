/**
 * Created by Brecht on 31/12/2015.
 */
(function(){
    "use strict";

    var AdminController = function($scope,$http,userService,eventService,groupService)
    {
        $scope.nameFilterU = null;
        $scope.nameFilterE = null;
        $scope.nameFilterG = null;

        // om alleen op naam te zoeken
        $scope.searchFilterU = function(user){
            var keyword = new RegExp($scope.nameFilterU,'i');
            return !$scope.nameFilterU || keyword.test(user.firstName);
        };
        $scope.searchFilterE = function(event){
            var keyword = new RegExp($scope.nameFilterE,'i');
            return !$scope.nameFilterE || keyword.test(event.name);
        };
        $scope.searchFilterG = function(group){
            var keyword = new RegExp($scope.nameFilterG,'i');
            return !$scope.nameFilterG || keyword.test(group.name);
        };


        // Get all users from Service
        userService.then(function(data){
            $scope.allUsers = data;
        });

        // Get all events from Service
        eventService.then(function(data){
            $scope.allEvents = data;
        });

        // Get all groups from Service
        groupService.then(function(data){
            $scope.allGroups = data;
        });

        $scope.deleteUser = function(id){
            console.log(id);
            var url = '/api/profile/delete/_:id';
            var params = JSON.stringify({
                "id": id
            });
            console.log(params);
            $http.post(url,params).then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available
                console.log('delete successfully: ' + response.data);
                return response.data
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                console.log('an error occurred', response.data)
            });
        }
    };

    angular.module("admin").controller('AdminController',['$scope','$http','userService','eventService','groupService',AdminController]);

})();