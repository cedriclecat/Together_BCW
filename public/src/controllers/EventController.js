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
                    inWords(i+1),
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
            console.log(events);
            $scope.events = events;
        }


    }
    var event = angular.module("event",[]);

    angular.module("event").controller('EventsController',['$scope',EventsController]);

})();


var a = ['','one','two','three','four', 'five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen'];
var b = ['', '', 'twenty','thirty','forty','fifty', 'sixty','seventy','eighty','ninety'];
function inWords (num) {
    if ((num = num.toString()).length > 9) return 'overflow';
    n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return;
    var str = '';
    str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore ' : '';
    str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh ' : '';
    str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand ' : '';
    str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred ' : '';
    str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + '' + a[n[5][1]]) + '' : '';

    return str.charAt(0).toUpperCase() + str.slice(1);
}
