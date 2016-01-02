/**
 * Created by Brecht on 31/12/2015.
 */
(function(){
    "use strict";

    var AdminController = function($scope,userService,eventService,groupService,adminService)
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
            adminService.deleteU(id);
        };

        $scope.deleteEvent = function(id){
            adminService.deleteE(id);
        };

        $scope.deleteGroup = function(id){
            adminService.delete(id);
        };
    };

    angular.module("admin").controller('AdminController',['$scope','userService','eventService','groupService','adminService',AdminController]);

})();