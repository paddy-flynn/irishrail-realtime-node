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

exports.getCurrentTrains = function (callback) {
    request('http://api.irishrail.ie/realtime/realtime.asmx/getCurrentTrainsXML', function (error, response, body) {
        return callback(body);
    });
};

exports.getCurrentTrainsJSON = function (callback) {
    request('http://api.irishrail.ie/realtime/realtime.asmx/getCurrentTrainsXML', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            parseString(body, function (err, result) {
                return callback(result);
            });
        }
    });
};

exports.getCurrentTrainsByType = function (type,callback) {
    request('http://api.irishrail.ie/realtime/realtime.asmx/getCurrentTrainsXML_WithTrainType?TrainType='+type, function (error, response, body) {
        return callback(body);
    });
};

exports.getCurrentTrainsByTypeJSON = function (type,callback) {
    request('http://api.irishrail.ie/realtime/realtime.asmx/getCurrentTrainsXML_WithTrainType?TrainType='+type, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            parseString(body, function (err, result) {
                return callback(result);
            });
        }
    });
};

exports.getStationData = function (params,callback) {
    var url = 'http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByNameXML';

    if(params.hasOwnProperty('NumMins')){
        url = url + '_withNumMins';
    }

    console.log(url);
    request({
        url: url,
        method: 'POST',
        headers: {
            'Content-Type': 'MyContentType',
            'Custom-Header': 'Custom Value'
        },
        form: params
    }, function(error, response, body){
        if(error) {
            console.log(error);
            callback(error);
        } else {
            callback(body);
        }
    });
};