/**
 * Created by Brecht on 14/01/2016.
 */
describe("Config Tests", function () {
    it("Config object should exist", function () {
        var o = config;
        expect(typeof (o)).toEqual("object");
    });

    it("should contain a host property", function () {
        expect(config.HOST).toBeDefined();
    });

    it("should contain an online other url property", function () {
        expect(config.MONGODBURL).toBeDefined();
    });
});