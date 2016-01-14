/**
 * Created by Brecht on 18/12/2015.
 */
(function(){
    var jobService = function($http) {
        var jobs = function(){
            var url = '/api/jobs';
            return  $http({method: 'GET', url: url}).then(successCallback,errorCallback);

            function successCallback(response){
                return response.data;
            }
            function errorCallback(response){
                console.log("Failure: " + response);
            }
        };

        return{
            getJobs: jobs
        }
    };

    angular.module('profile').factory('jobService',['$http',jobService]);
})();