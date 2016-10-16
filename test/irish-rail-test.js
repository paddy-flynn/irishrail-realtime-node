var chai = require('chai');
var expect = chai.expect; // we are using the "expect" style of Chai
var irishRailApi = require('./../index');

function callback(responseObject) {
    return responseObject;
}
describe('irishRailApi', function() {
    it('getAllStations() should return 1 if successful', function() {
        console.log("before");
        var response = irishRailApi.getAllStations();
        console.log("after");
        console.log(response);
    });
});