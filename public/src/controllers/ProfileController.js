/**
 * Created by Brecht on 8/12/2015.
 */

(function(){
    "use strict";

    var ProfileController = function($scope,$http,mStatusService,jobService,countryService,certainUserService)
    {
        // GET Marital status, Jobs, Countries & Cities from Services + add them to scope
        // ==============================================================================

        mStatusService.then(function(data){
            $scope.status = data;
        });

        jobService.then(function(data){
            $scope.jobs = data;
        });

        countryService.then(function(data){
            $scope.countries = data;
        });

        certainUserService.then(function(data){
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
                    description: this.about
                });
            $http.post("/api/profile/:id", $scope.formData).then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available
                console.log('posted successfully: ' + response.data);
                //return response.data;
                //console.log(" SUCCESS " + response.data);
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                console.log('an error occurred', response.data)
            });
        };

        // Submit form create event
        // ==============================================================================

        //$scope.submitFormE = function(){
        //    $scope.formDataE = JSON.stringify({
        //        // picture = this.picture,
        //        title : this.title,
        //        date : this.date,
        //        time : this.time,
        //        location : this.location,
        //        group : this.group,
        //        price: this.cost,
        //        maxMember: this.slots,
        //        description: this.description,
        //        TIMESTAMP: new Date()
        //
        //
        //    })
        //}

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

    };



    angular.module("profile").controller('ProfileController',['$scope','$http','mStatusService','jobService','countryService','certainUserService',ProfileController]);

})();
