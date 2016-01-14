/**
 * Created by Brecht on 14/01/2016.
 */
describe('Event object', function () {
    var ev = new Event(1, '8567', 'TestEvent','14/02/2016','18:00','7','2','gent','99.99','testurl.jpg','esports',false,'','','User1');

    it("should be of type Telling", function () {
        expect(ev).toBeTypeOf("Event");
    });

    it("should contain a 'ID' property", function () {
        expect(ev).toHaveProperty("id");
    });
    it("should contain a 'collapseId' property", function () {
        expect(ev).toHaveProperty("collapseId");
    });
    it("should contain a 'Name' property", function () {
        expect(ev).toHaveProperty("name");
    });
    it("should contain a 'Description' property", function () {
        expect(ev).toHaveProperty("description");
    });
    it("should contain a 'Date' property", function () {
        expect(ev).toHaveProperty("date");
    });
    it("should contain a 'Time' property", function () {
        expect(ev).toHaveProperty("time");
    });
    it("should contain a 'maxmember' property", function () {
        expect(ev).toHaveProperty("maxmember");
    });
    it("should contain a 'membersId' property", function () {
        expect(ev).toHaveProperty("members");
    });
    it("should contain a 'Location' property", function () {
        expect(ev).toHaveProperty("location");
    });
    it("should contain a 'Price' property", function () {
        expect(ev).toHaveProperty("price");
    });
    it("should contain a 'Picture' property", function () {
        expect(ev).toHaveProperty("picture");
    });
    it("should contain a 'Tags' property", function () {
        expect(ev).toHaveProperty("tags");
    });
    it("should contain a 'Promoted' property", function () {
        expect(ev).toHaveProperty("promoted");
    });
    it("should contain a 'Timestamp' property", function () {
        expect(ev).toHaveProperty("timestamp");
    });
    it("should contain a 'pictureSlider' property", function () {
        expect(ev).toHaveProperty("pictureSlider");
    });
    it("should contain a 'createdby' property", function () {
        expect(ev).toHaveProperty("createdby");
    });
});

