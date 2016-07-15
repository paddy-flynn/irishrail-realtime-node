'use strict';
var request = require('request');
var parseString = require('xml2js').parseString;

var responseObject = {status: 0, response: ''};

exports.getAllStations = function (callback, isJSONResponse = false,params = {}) {
    try {
        if (typeof(isJSONResponse) !== "boolean") {
            responseObject.response = 'The isJSONResponse parameter must be a boolean';
            return callback(responseObject);
        }
        var url = 'http://api.irishrail.ie/realtime/realtime.asmx/getAllStationsXML';

        if (params.hasOwnProperty('StationType')) {
            url = url + '_WithStationType';
        }

        request({
            url: url,
            method: 'POST',
            form: params
        }, function (error, response, body) {
            if (error) {
                responseObject.response = error;
            } else if (response.statusCode != 200) {
                responseObject.response = body;
                return callback(responseObject);
            } else {
                if (isJSONResponse) {
                    parseString(body, function (err, result) {
                        if (err) {
                            responseObject.response = err;
                        }
                        else {
                            responseObject.status = 1;
                            responseObject.response = result;
                        }
                    });
                } else {
                    responseObject.status = 1;
                    responseObject.response = body;
                }
            }
            return callback(responseObject);
        });

    } catch (err) {
        responseObject.response = err;
        return callback(responseObject);
    }
};

exports.getCurrentTrains = function (callback, isJSONResponse = false, params = {}) {
    try {
        if (typeof(isJSONResponse) !== "boolean") {
            responseObject.response = 'The isJSONResponse parameter must be a boolean';
            return callback(responseObject);
        }
        var url = 'http://api.irishrail.ie/realtime/realtime.asmx/getCurrentTrainsXML';

        if (params.hasOwnProperty('TrainType')) {
            url = url + '_WithTrainType';
        }

        request({
            url: url,
            method: 'POST',
            form: params
        }, function (error, response, body) {
            if (error) {
                responseObject.response = error;
            } else if (response.statusCode != 200) {
                responseObject.response = body;
                return callback(responseObject);
            } else {
                if (isJSONResponse) {
                    parseString(body, function (err, result) {
                        if (err) {
                            responseObject.response = err;
                        }
                        else {
                            responseObject.status = 1;
                            responseObject.response = result;
                        }
                    });
                } else {
                    responseObject.status = 1;
                    responseObject.response = body;
                }
            }
            return callback(responseObject);
        });
    } catch (err) {
        responseObject.response = err;
        return callback(responseObject);
    }
};


exports.getStationData = function (callback, isJSONResponse = false,params = {}) {
    try {
        if (typeof(isJSONResponse) !== "boolean") {
            responseObject.response = 'The isJSONResponse parameter must be a boolean';
            return callback(responseObject);
        }

        var url = 'http://api.irishrail.ie/realtime/realtime.asmx/getStationDataBy';

        if (params.hasOwnProperty('StationDesc') && params.hasOwnProperty('StationCode')) {
            responseObject.response = 'Cannot have both \'StationDesc\' and \'StationCode\' parameters ';
            return callback(responseObject);
        }
        else if (params.hasOwnProperty('StationDesc')) {
            url = url + 'NameXML';
        } else if (params.hasOwnProperty('StationCode')) {
            url = url + 'CodeXML';
        } else {
            responseObject.response = 'Must have either \'StationDesc\' or \'StationCode\' parameters ';
            return callback(responseObject);
        }

        if (params.hasOwnProperty('NumMins')) {
            url = url + '_withNumMins';
        }

        request({
            url: url,
            method: 'POST',
            form: params
        }, function (error, response, body) {
            if (error) {
                responseObject.response = error;
            } else if (response.statusCode != 200) {
                responseObject.response = body;
                return callback(responseObject);
            } else {
                if (isJSONResponse) {
                    parseString(body, function (err, result) {
                        if (err) {
                            responseObject.response = err;
                        }
                        else {
                            responseObject.status = 1;
                            responseObject.response = result;
                        }
                    });
                } else {
                    responseObject.status = 1;
                    responseObject.response = body;
                }
            }
            return callback(responseObject);
        });
    } catch (err) {
        responseObject.response = err;
        return callback(responseObject);
    }
};

exports.getStationsFilter = function (callback, isJSONResponse = false,params = {}) {
    try {
        if (typeof(isJSONResponse) !== "boolean") {
            responseObject.response = 'The isJSONResponse parameter must be a boolean';
            return callback(responseObject);
        }

        var url = 'http://api.irishrail.ie/realtime/realtime.asmx/getStationsFilterXML';

        if (!params.hasOwnProperty('StationText')) {
            responseObject.response = 'Must have \'StationText\' parameter.';
            return callback(responseObject);
        }

        request({
            url: url,
            method: 'POST',
            form: params
        }, function (error, response, body) {
            if (error) {
                responseObject.response = error;
            } else if (response.statusCode != 200) {
                responseObject.response = body;
                return callback(responseObject);
            }
            else {
                if (isJSONResponse) {
                    parseString(body, function (err, result) {
                        if (err) {
                            responseObject.response = err;
                        }
                        else {
                            responseObject.status = 1;
                            responseObject.response = result;
                        }
                    });
                } else {
                    responseObject.status = 1;
                    responseObject.response = body;
                }
            }
            return callback(responseObject);
        });
    } catch (err) {
        responseObject.response = err;
        return callback(responseObject);
    }
};

exports.getTrainMovements = function (callback, isJSONResponse = false,params = {}) {
    try {
        if (typeof(isJSONResponse) !== "boolean") {
            responseObject.response = 'The isJSONResponse parameter must be a boolean';
            return callback(responseObject);
        }

        var url = 'http://api.irishrail.ie/realtime/realtime.asmx/getTrainMovementsXML';

        if (!params.hasOwnProperty('TrainId')) {
            responseObject.response = 'Must have \'TrainId\' parameter.';
            return callback(responseObject);
        }

        if (!params.hasOwnProperty('TrainDate')) {
            responseObject.response = 'Must have \'TrainDate\' parameter.';
            return callback(responseObject);
        }

        var pattern = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
        if (!params.TrainDate.match(pattern)) {
            responseObject.response = 'Your date parameter must be in the format \'dd/mm/yyyy\'.';
            return callback(responseObject);
        }

        request({
            url: url,
            method: 'POST',
            form: params
        }, function (error, response, body) {
            if (error) {
                responseObject.response = error;
            } else if (response.statusCode != 200) {
                responseObject.response = body;
                return callback(responseObject);
            }
            else {
                if (isJSONResponse) {
                    parseString(body, function (err, result) {
                        if (err) {
                            responseObject.response = err;
                        }
                        else {
                            responseObject.status = 1;
                            responseObject.response = result;
                        }
                    });
                } else {
                    responseObject.status = 1;
                    responseObject.response = body;
                }
            }
            return callback(responseObject);
        });
    }
    catch
        (err) {
        responseObject.response = err;
        return callback(responseObject);
    }
}
;

exports.getHaconTrains = function (callback, isJSONResponse = false) {
    try {
        if (typeof(isJSONResponse) !== "boolean") {
            responseObject.response = 'The isJSONResponse parameter must be a boolean';
            return callback(responseObject);
        }
        var url = 'http://api.irishrail.ie/realtime/realtime.asmx/getHaconTrainsXML';

        request({
            url: url,
            method: 'POST',
            form: {}
        }, function (error, response, body) {
            if (error) {
                responseObject.response = error;
            } else {
                if (isJSONResponse) {
                    parseString(body, function (err, result) {
                        if (err) {
                            responseObject.response = err;
                        }
                        else {
                            responseObject.status = 1;
                            responseObject.response = result;
                        }
                    });
                } else {
                    responseObject.status = 1;
                    responseObject.response = body;
                }
            }
            return callback(responseObject);
        });
    } catch (err) {
        responseObject.response = err;
        return callback(responseObject);
    }
};