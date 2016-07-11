'use strict';
var request = require('request');
var parseString = require('xml2js').parseString;

exports.getAllStations = function (callback) {
    request('http://api.irishrail.ie/realtime/realtime.asmx/getAllStationsXML', function (error, response, body) {
        return callback(body);
    });
};

exports.getAllStationsJSON = function (callback) {
    request('http://api.irishrail.ie/realtime/realtime.asmx/getAllStationsXML', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            parseString(body, function (err, result) {
                return callback(result);
            });
        }
    });
};

exports.getAllStationsByType = function (type, callback) {
    request('http://api.irishrail.ie/realtime/realtime.asmx/getAllStationsXML_WithStationType?StationType=' + type, function (error, response, body) {
        return callback(body);
    });
};

exports.getAllStationsByTypeJSON = function (type, callback) {
    request('http://api.irishrail.ie/realtime/realtime.asmx/getAllStationsXML_WithStationType?StationType=' + type, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            parseString(body, function (err, result) {
                return callback(result);
            });
        }
    });
};
