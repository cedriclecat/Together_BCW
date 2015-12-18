/**
 * Created by Brecht on 8/12/2015.
 */

(function(){
    "use strict";

    var ProfileController = function($scope,mStatusService,jobService,countryService)
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

        $scope.parent = { birthday:'2000-01-01' };
        var formData = [];

        $scope.submitForm = function(){

            //    var firstname   = this.firstname;
            //    var lastname    = this.lastname;
            //    var email       = this.email;
            //    var mstatus     = this.marital;
            //    var work        = this.work;
            //    var country     = this.country;
            //    var city        = this.city;
            //    var interests   = this.interests;
            //    var phone       = this.phone;
            //    var facebook    = this.facebook;
            //    var twitter     = this.twitter;
            //    var google      = this.google;
            //
            //formData.push(firstname,lastname,email,mstatus,work,country,city,interests,phone,facebook,twitter,google);
            //console.log(formData);
            //
            //var params = [];
            //params.push({
            //    'firstName' : firstname,
            //    'lastName' : lastname,
            //    'email' : email,
            //    'mstatus' : mstatus,
            //    'work' : work,
            //    'country' : country,
            //    'city' : city,
            //    'interests' : interests,
            //    'phone' : phone,
            //    'facebook' : facebook,
            //    'twitter' : twitter,
            //    'google' : google
            //});
            // console.log(params);


        };

    };

    angular.module("profile").controller('ProfileController',['$scope','mStatusService','jobService','countryService',ProfileController]);

})();
