/**
 * Created by Brecht on 2/01/2016.
 */
(function(){
    var adminService = function() {

        var deleteUser = function(id){
            var userId = {
                'id' : id
            };

            var xmlHttp = new XMLHttpRequest();
            xmlHttp.open("DELETE","/api/user/delete/:_id", true);
            xmlHttp.setRequestHeader("Content-type", "application/json");

            xmlHttp.send(JSON.stringify(userId));
        };

        var deleteEvent = function(id){
            var eventId = {
                'id' : id
            };

            var xmlHttp = new XMLHttpRequest();
            xmlHttp.open("DELETE","/api/event/delete/:_id", true);
            xmlHttp.setRequestHeader("Content-type", "application/json");

            xmlHttp.send(JSON.stringify(eventId));
        };

        var deleteGroup = function(id){
            var groupId = {
                'id' : id
            };

            var xmlHttp = new XMLHttpRequest();
            xmlHttp.open("DELETE","/api/group/delete/:_id", true);
            xmlHttp.setRequestHeader("Content-type", "application/json");

            xmlHttp.send(JSON.stringify(groupId));
        };

        return  {
            deleteU: deleteUser,
            deleteE: deleteEvent,
            deleteG: deleteGroup
        }
    };

    angular.module('admin').factory('adminService',[adminService]);
})();