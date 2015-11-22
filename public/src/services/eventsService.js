/**
 * Created by Brecht on 21/11/2015.
 */

(function(){
    "use strict";
    var eventService = function($q,$http){
        return {
            getEvents: function () {
                var deferred = $q.defer(),
                    httpPromise = $http.get('/api/events');

                httpPromise.success(function (events) {
                        deferred.resolve(events);
                    })
                    .error(function (error) {
                        console.error('Error: ' + error);
                    });

                return deferred.promise;
            }
        }
    };

    angular.module('event',[]).factory("eventService",['$q','$http',eventService]);
})();
