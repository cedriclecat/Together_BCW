/**
 * Created by CedricLecat on 18/11/15.
 */

(function(){
    "use strict"

    var EventsController = function($scope)
    {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET","http://localhost:3000/api/events", false);
        xmlHttp.send(null);

        if(xmlHttp.status ===200)
        {
            var data = JSON.parse(xmlHttp.responseText);

            var events = [];

            for(var i = data.length;i>0;i--)
            {

                var event = new Event(
                    data[i-1].id,
                    data[i-1].name,
                    data[i-1].description,
                    data[i-1].date,
                    data[i-1].time,
                    data[i-1].maxMember,
                    data[i-1].members,
                    data[i-1].location,
                    data[i-1].price,
                    data[i-1].pictureUrl,
                    data[i-1].tags);


                events.push(event);

            }
            $scope.events = events;
         }


    }


   angular.module("event").controller('EventsController',['$scope',EventsController]);

})();