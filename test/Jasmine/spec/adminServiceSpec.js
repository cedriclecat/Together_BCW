/**
 * Created by Brecht on 14/01/2016.
 */
describe('adminService', function () {
    var adminService;
    var httpBackend;

    beforeEach(function () {

        module('admin');
        inject(function ($httpBackend, _adminService_) {
            httpBackend = $httpBackend;
            adminService = _adminService_;
        });
    });

    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    it("should have a 'Delete User' function", function () {
        expect(angular.isFunction(adminService.deleteU)).toBe(true);
    });

    it("should have a 'Delete Event' function", function () {
        expect(angular.isFunction(adminService.deleteE)).toBe(true);
    });

    it("should have a 'Delete Group' function", function () {
        expect(angular.isFunction(adminService.deleteG)).toBe(true);
    });


});