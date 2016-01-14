/**
 * Created by Brecht on 1/01/2016.
 */
(function(){
    var certainUserService = function($http) {

        var byId = function(){
            var url = '/api/profile/:_id';
            return  $http({method: 'GET', url: url}).then(successCallback,errorCallback);
            function successCallback(response){
                return response.data;
            }
            function errorCallback(response){
                console.log("Failure: " + response);
            }
        }

        return{
            getById: byId
        }


    };

    angular.module('profile').factory('certainUserService',['$http',certainUserService]);
})();