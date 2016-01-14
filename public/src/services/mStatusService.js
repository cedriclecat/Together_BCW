/**
 * Created by Brecht on 12/12/2015.
 */
(function(){
    var mStatusService = function($http) {

        var mStatus = function(){
            var url = '/api/status';
            return  $http({method: 'GET', url: url}).then(successCallback,errorCallback);

            function successCallback(response){
                return response.data;
            }
            function errorCallback(response){
                console.log("Failure: " + response);
            }
        };

        return{
            getMStatus: mStatus
        }
    };

    angular.module('profile').factory('mStatusService',['$http',mStatusService]);
})();