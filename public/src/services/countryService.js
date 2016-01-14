/**
 * Created by Brecht on 18/12/2015.
 */
(function(){
    var countryService = function($http) {
        var countries = function(){
            var url = '/api/countries';
            return  $http({method: 'GET', url: url}).then(successCallback,errorCallback);

            function successCallback(response){
                return response.data;
            }
            function errorCallback(response){
                console.log("Failure: " + response);
            }
        }

        return{
            getCountries: countries
        }

    };

    angular.module('profile').factory('countryService',['$http',countryService]);
})();