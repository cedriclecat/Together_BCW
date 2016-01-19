/**
 * Created by CedricLecat on 18/11/15.
 */


(function(){
    "use strict";

    var EventsController = function($scope,$http,$sce)
    {

        var xmlUser = new XMLHttpRequest();
        xmlUser.open("GET","/api/getuserid", false);
        xmlUser.send(null);
        var UserId ="";
        if(xmlUser.status == 200)
        {
            UserId = xmlUser.responseText;
            UserId = UserId.split('"')[1];

        }

        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET","/api/events", false);
        xmlHttp.send(null);

        if(xmlHttp.status ===200)
        {
            var data = JSON.parse(xmlHttp.responseText);

            var events = [];

            var GaEvents = [];

            for(var i = data.length;i>0;i--)
            {
                //var lat= data[i-1].location.split("/./")[1];
                //var lnt= data[i-1].location.split("/./")[2];
                var adress = data[i-1].location.split("/./")[0];
                adress = adress.replace(" ","+");


                var url="https://www.google.com/maps/embed/v1/place?key=AIzaSyAiapygRLC6a3O-pyXahU2l47I8pMV2Pdw&q="+adress;
                var event = new Event(
                    data[i-1].id,
                    inWords(i+1),
                    data[i-1].name,
                    data[i-1].description,
                    data[i-1].date,
                    data[i-1].time,
                    data[i-1].maxMember,
                    data[i-1].members,
                    data[i-1].location.split("/./")[0],
                    data[i-1].price,
                    data[i-1].pictureUrl,
                    $sce.trustAsResourceUrl(url),
                    data[i-1].promoted,
                    data[i-1].TIMESTAMP,
                    data[i-1].pictureSlider,
                    data[i-1].createdby);
                
                    if(data[i-1].members.indexOf(UserId)>=0)
                    {
                        GaEvents.push(event);
                    }

                events.push(event);


            }
           // console.log(events);
           // console.log(GaEvents);

           /* for(var i = GaEvents.length;i>0;i--)
            {
                var button = document.getElementById(GaEvents[i-1].id);


            }*/

            $scope.events = events;
            $scope.GaEvents = GaEvents;


            $scope.knoppen = function()
            {

                for(var i = GaEvents.length;i>0;i--)
                {
                    var button = document.getElementById(GaEvents[i-1].id);

                    button.disabled = true;
                    button.className = "btn btn-info btn-responsive active disapprove";
                    button.firstChild.className = "fa fa-remove fa-lg";
                    button.nextSibling.className = "btn btn-info btn-responsive approve";
                    button.nextSibling.firstChild.className = "fa fa-check fa-lg";
                //    console.log(button);
                 //   button.nextSibling.classList = "btn btn-info btn-responsive approve";

                }
            };


            $scope.ikGa = function($event){

               // console.log("ik ga");
                var params = $event.currentTarget.id;


                var mijnobjectje = {
                    'id' : params
                };


                var xmlHttp = new XMLHttpRequest();

                xmlHttp.open("POST","/api/events", true);
                xmlHttp.setRequestHeader("Content-type", "application/json");

                xmlHttp.send(JSON.stringify(mijnobjectje));

                var button = document.getElementById(params);
                button.className = "btn btn-info btn-responsive active disapprove";
                button.firstChild.className = "fa fa-remove fa-lg";
                button.nextSibling.className = "btn btn-info btn-responsive approve";
                button.nextSibling.firstChild.className = "fa fa-check fa-lg";
            };
            $scope.ikGaNiet = function($event){

                var params = $event.currentTarget.previousSibling.id;
                var mijnobjectje = {
                    'id' : params
                };
                xmlHttp.open("POST","/api/events/ikganiet", true);
                xmlHttp.setRequestHeader("Content-type", "application/json");
                xmlHttp.send(JSON.stringify(mijnobjectje));


                    var button = document.getElementById(params);

                     button.disabled = false;
                     button.className = "btn btn-info btn-responsive approve";
                     button.firstChild.className = "fa fa-check fa-lg";
                     button.nextSibling.className = "btn btn-info btn-responsive active disapprove";
                     button.nextSibling.firstChild.className = "fa fa-remove fa-lg";
                     //console.log("gelukt")


            }
        }
    };
    var event = angular.module("event",[]);

    angular.module("event").controller('EventsController',['$scope','$http','$sce',EventsController]);

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
