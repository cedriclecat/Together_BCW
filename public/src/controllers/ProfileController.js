/**
 * Created by Brecht on 8/12/2015.
 */

(function(){
    "use strict";

    var ProfileController = function($scope,$http,$window,mStatusService,jobService,countryService,certainUserService)
    {
        // GET Marital status, Jobs, Countries & Cities from Services + add them to scope
        // ==============================================================================

        mStatusService.getMStatus().then(function(data){
            $scope.status = data;
        });

        jobService.getJobs().then(function(data){
            $scope.jobs = data;
        });

        countryService.getCountries().then(function(data){
            $scope.countries = data;
        });

        certainUserService.getById().then(function(data){
            $scope.profile = data;
        });


        // Submit form profile settings
        // ==============================================================================

        $scope.submitForm = function(){

            $scope.formData = JSON.stringify({
                firstName: this.firstName,
                lastName: this.lastName,
                email: this.email,
                gender: this.gender,
                marital: this.marital.name,
                birthday: this.dt,
                work: this.work.name,
                country: this.country.name,
                city: this.city,
                interests: this.interests,
                description: this.description
            });
            $http.post("/api/profile/:id", $scope.formData).then(successCallback,errorCallback);

            function successCallback(response){
                return response.data;
            }
            function errorCallback(response){
             //   console.log("Failure: " + response.data);
            }
        };




        $scope.today = function() {
            $scope.dt = new Date();
        };
        $scope.today();

        $scope.clear = function () {
            $scope.dt = null;
        };

        // Disable weekend selection
        $scope.disabled = function(date, mode) {
            return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
        };

        $scope.toggleMin = function() {
            $scope.minDate = new Date(1900,1,1)
        };
        $scope.toggleMin();
        $scope.maxDate = new Date(2020, 5, 22);

        $scope.open = function($event) {
            $scope.status.opened = true;
        };

        $scope.setDate = function(year, month, day) {
            $scope.dt = new Date(year, month, day);
        };

        $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
        };

        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[0];

        $scope.status = {
            opened: false
        };

        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        var afterTomorrow = new Date();
        afterTomorrow.setDate(tomorrow.getDate() + 2);
        $scope.events =
            [
                {
                    date: tomorrow,
                    status: 'full'
                },
                {
                    date: afterTomorrow,
                    status: 'partially'
                }
            ];

        $scope.getDayClass = function(date, mode) {
            if (mode === 'day') {
                var dayToCheck = new Date(date).setHours(0,0,0,0);

                for (var i=0;i<$scope.events.length;i++){
                    var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

                    if (dayToCheck === currentDay) {
                        return $scope.events[i].status;
                    }
                }
            }

            return '';
        };

        $scope.saveEdittedEvent = function()
        {

            //event data opslaan
            var velden = input.getElementsByTagName("input");
            var desc = input.getElementsByTagName("textarea")[0];
            var dropdown = input.getElementsByTagName("select")[0];
            var form = velden[0].closest("form");



           /* $http.get("http://maps.googleapis.com/maps/api/geocode/json?address=Meulebeke+krinkelstraat&key=AIzaSyAiapygRLC6a3O-pyXahU2l47I8pMV2Pdw").then(successCallback,errorCallback);

             function successCallback(response){
                 console.log(response);
             }
             function errorCallback(response) {
                 console.log("Failure: " + response.data)
             }*/
            var xmllocation = new XMLHttpRequest();
            xmllocation.open("GET","https://maps.googleapis.com/maps/api/geocode/json?address=Meulebeke+krinkelstraat&key=AIzaSyAiapygRLC6a3O-pyXahU2l47I8pMV2Pdw", true);

            xmllocation.onload=function(e)
            {
               var gegeves = JSON.parse(xmllocation.responseText);
                var location = gegeves["results"][0]["geometry"]["location"];
                var lat = location["lat"];
                var lng = location["lng"];

                var mijnobjectje = {
                    'id':form.id,
                    'picture':velden["pictureUrl"].value,
                    'title':velden["etitle"].value,
                    'date':velden["date"].value,
                    'time':velden["time"].value,
                    'location':velden["Location"].value +"/./"+lat+"/./"+lng,
                    'group':dropdown.value,
                    'cost':velden["cost"].value,
                    'slots':velden["slots"].value,
                    'description':desc.value
                };
                console.log(mijnobjectje);
                var xmlHttp = new XMLHttpRequest();
                xmlHttp.open("POST","/api/profile/updateEvent", true);
                xmlHttp.setRequestHeader("Content-type", "application/json");
                xmlHttp.onload=function(e){
                    document.location.reload(true);
                };
                xmlHttp.send(JSON.stringify(mijnobjectje));



            };
            xmllocation.send(null);





        };

        $scope.deleteEvent= function($event)
        {
            var tr = $event.currentTarget.closest('tr');
            var elementen = tr.getElementsByTagName("td");
            var id = elementen[1].children[2].innerText;
            //console.log(elementen[1].children[2]);

            var deleteEvent = $window.confirm('Are you absolutely sure you want to delete?');
            if(deleteEvent)
            {
                var mijnobjectje = {
                    'id' : id
                };
                var xmlHttp = new XMLHttpRequest();
                xmlHttp.open("POST","/api/profile/deleteEvent", false);
                xmlHttp.setRequestHeader("Content-type", "application/json");
                xmlHttp.send(JSON.stringify(mijnobjectje));

            }

        };
        $scope.editEvent = function($event)
        {

            var tr = $event.currentTarget.closest('tr');
            var elementen = tr.getElementsByTagName("td");
            var lengte = elementen.length;

            var input = document.getElementById("input");
            var velden = input.getElementsByTagName("input");
            var desc = input.getElementsByTagName("textarea")[0];
            var form = velden[0].closest("form");



            $scope.updating = true; //werkt niet bcause angular

            for(var i = lengte;i--;)
            {

                var classname = elementen[i].className.split(" ");

                var test = classname[classname.length-1];
               // console.log(test);
                switch(test)
                {
                    case "image":
                        ///console.log("ima");
                        break;
                    case "name":

                        velden["etitle"].value=elementen[i].innerText;
                        velden["Location"].value = elementen[i].children[1].innerText;
                        desc.value= elementen[i].children[0].innerText;
                        form.id=elementen[i].children[2].innerText;

                        break;
                    case "date":
                        //console.log("date");
                        velden["date"].value=elementen[i].innerText;
                        break;
                    case "time":
                        //console.log("time");
                        velden["time"].value=elementen[i].innerText;
                        break;
                    case "price":
                        //console.log("price");
                        velden["cost"].value=elementen[i].innerText;
                        break;
                    case "maxMember":
                        //console.log("member");
                        velden["slots"].value=elementen[i].innerText;
                        break;
                    default:
                        break;
                }


            }
        }

    };



    angular.module("profile").controller('ProfileController',['$scope','$http','$window','mStatusService','jobService','countryService','certainUserService',ProfileController]);

})();
