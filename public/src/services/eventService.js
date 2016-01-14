/**
 * Created by Brecht on 31/12/2015.
 */
(function(){
    var eventService = function($http) {
        var events = function(){
            var url = '/api/events';
            return  $http({method: 'GET', url: url}).then(successCallback,errorCallback);
            function successCallback(response){
                return response.data;
            }
            function errorCallback(response){
                console.log("Failure: " + response);
            }
        }

        return{
            getEvents: events
        }

    };

    angular.module('admin').factory('eventService',['$http',eventService]);
})();