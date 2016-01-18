/**
 * Created by Brecht on 8/12/2015.
 */

(function(){
    "use strict";

    var ProfileController = function($scope,$http,mStatusService,jobService,countryService,certainUserService)
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
                console.log("Failure: " + response.data);
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

        $scope.editEvent = function($event)
        {

            var tr = $event.currentTarget.closest('tr');
            var elementen = tr.getElementsByTagName("td");
            var lengte = elementen.length;

            for(var i = lengte;i--;)
            {

                var classname = elementen[i].className.split(" ");
                console.log(classname[classname.length-1]);
                switch(elementen[i].className)
                {

                }
            }
        }

    };



    angular.module("profile").controller('ProfileController',['$scope','$http','mStatusService','jobService','countryService','certainUserService',ProfileController]);

})();
