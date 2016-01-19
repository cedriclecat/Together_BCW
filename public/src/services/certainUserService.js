/**
 * Created by Brecht on 1/01/2016.
 */
(function(){
    var certainUserService = function($http) {
        var QueryString = function () {
            var query_string ={};
            var query = window.location.search.substring(1);
            var vars = query.split("&");
            for (var i=0;i<vars.length;i++) {
                var pair = vars[i].split("=");
                // If first entry with this name
                if (typeof query_string[pair[0]] === "undefined") {
                    query_string[pair[0]] = decodeURIComponent(pair[1]);
                    // If second entry with this name
                } else if (typeof query_string[pair[0]] === "string") {
                    var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
                    query_string[pair[0]] = arr;
                    // If third or later entry with this name
                } else {
                    query_string[pair[0]].push(decodeURIComponent(pair[1]));
                }
            }
            return query_string;
        }();
        var byId = function(){
            var url = '/api/profile/:_id?id='+QueryString.id;
            return  $http({method: 'GET', url: url}).then(successCallback,errorCallback);
            function successCallback(response){
                return response.data;
            }
            function errorCallback(response){
                console.log("Failure: " +response.data);
            }
        };

        return{
            getById: byId
        }


    };

    angular.module('profile').factory('certainUserService',['$http',certainUserService]);
})();