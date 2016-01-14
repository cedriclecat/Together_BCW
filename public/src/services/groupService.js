/**
 * Created by Brecht on 31/12/2015.
 */
(function(){
    var groupService = function($http) {
        var groups = function(){
            var url = '/api/groups';
            return  $http({method: 'GET', url: url}).then(successCallback,errorCallback);
            function successCallback(response){
                return response.data;
            }
            function errorCallback(response){
                console.log("Failure: " + response);
            }
        }

        return{
            getGroup: groups
        }

    };

    angular.module('admin').factory('groupService',['$http',groupService]);
})();