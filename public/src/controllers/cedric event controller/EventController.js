/**
 * Created by CedricLecat on 18/11/15.
 */

(function(){
    "use strict"
    var EventController = function($scope)
    {
        $scope.events = [];
        $scope.GetEvents=function(){

            var newevent = new Event("1","cs finals","awel ee naar lcs kijken ee","22/11/2015","10:20","3","","Brussel","10","http://qualitycoast.info/wp-content/uploads/2013/04/award-bronze-300x300.jpg","esports");
            var newevent2 = new Event("2","kiekefuif","nen fuif me kiekens","19/11/2015","18:30","100","","Kortrijk","12","http://kiekenfuif.be/uploads/2D2F-B.jpg","fuifen centaura");
            $events.events.push(newevent);
            $events.events.push(newevent2);
        };
    };
    angular.module("app").controller("EventController",["$scope",EventController]);
})();