'use strict';
var request = require('request');
var parseString = require('xml2js').parseString;

exports.getAllStations = function (isJSONResponse = false,params = {}) {
    try {
      return new Promise((resolve, reject) => {
  
        if (typeof(isJSONResponse) !== "boolean") {
          throw 'The isJSONResponse parameter must be a boolean';
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
            throw error;
          } else if (response.statusCode != 200) {
            throw body;
        } else {
            if (isJSONResponse) {
              parseString(body, function (err, result) {
                if (err) {
                  throw err;
                }
                else {
                  return resolve(result);
                }
              });
            } else {
              return resolve(body);
            }
          }
        });
      })
    } catch (err) {
      throw err;
    }
  };

exports.getCurrentTrains = function (isJSONResponse = false, params = {}) {
    try {
        return new Promise((resolve, reject) => {

        if (typeof(isJSONResponse) !== "boolean") {
            throw 'The isJSONResponse parameter must be a boolean';
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
                throw error;
            } else if (response.statusCode != 200) {
                throw body;
            } else {
                if (isJSONResponse) {
                    parseString(body, function (err, result) {
                        if (err) {
                            throw err;
                        }
                        else {
                            return resolve(result);
                        }
                    });
                } else {
                    return resolve(body);
                }
            }        
        });
    })
    } catch (err) {
        throw err;
    }
};


exports.getStationData = function (isJSONResponse = false,params = {}) {
    try {
        return new Promise((resolve, reject) => {
        if (typeof(isJSONResponse) !== "boolean") {
            throw 'The isJSONResponse parameter must be a boolean';        
        }

        var url = 'http://api.irishrail.ie/realtime/realtime.asmx/getStationDataBy';

        if (params.hasOwnProperty('StationDesc') && params.hasOwnProperty('StationCode')) {
            throw 'Cannot have both \'StationDesc\' and \'StationCode\' parameters ';            
        }
        else if (params.hasOwnProperty('StationDesc')) {
            url = url + 'NameXML';
        } else if (params.hasOwnProperty('StationCode')) {
            url = url + 'CodeXML';
        } else {
             throw 'Must have either \'StationDesc\' or \'StationCode\' parameters ';            
        }

        if (params.hasOwnProperty('NumMins')) {
            url = (params.hasOwnProperty('StationDesc')) ? url + '_withNumMins' : url + '_WithNumMins';
        }

        request({
            url: url,
            method: 'POST',
            form: params
        }, function (error, response, body) {
            if (error) {
                throw error;
            }
            else if (response.statusCode != 200) {
                throw body;
            } else {
                if (isJSONResponse) {
                    parseString(body, function (err, result) {
                        if (err) {
                            throw err;
                        }
                        else {
                            return resolve(result);
                        }
                    });
                } else {
                    return resolve(body);
                }
            }            
        });
    })
    } catch (err) {
        throw err;
    }
};

exports.getStationsFilter = function (isJSONResponse = false,params = {}) {
    try {
        return new Promise((resolve, reject) => {

        if (typeof(isJSONResponse) !== "boolean") {
            throw 'The isJSONResponse parameter must be a boolean';        
        }

        var url = 'http://api.irishrail.ie/realtime/realtime.asmx/getStationsFilterXML';

        if (!params.hasOwnProperty('StationText')) {
            throw 'Must have \'StationText\' parameter.';            
        }

        request({
            url: url,
            method: 'POST',
            form: params
        }, function (error, response, body) {
            if (error) {
                throw error;
            } else if (response.statusCode != 200) {
                throw body;
            }
            else {
                if (isJSONResponse) {
                    parseString(body, function (err, result) {
                        if (err) {
                            throw err;
                        }
                        else {
                            return resolve(result);
                        }
                    });
                } else {
                    return resolve(body);
                }
            }            
        });
    })
    } catch (err) {
        throw err;
    }
};

exports.getTrainMovements = function (isJSONResponse = false,params = {}) {
    try {
        return new Promise((resolve, reject) => {

        if (typeof(isJSONResponse) !== "boolean") {
            throw 'The isJSONResponse parameter must be a boolean';        
        }

        var url = 'http://api.irishrail.ie/realtime/realtime.asmx/getTrainMovementsXML';

        if (!params.hasOwnProperty('TrainId')) {
            throw 'Must have \'TrainId\' parameter.';            
        }

        if (!params.hasOwnProperty('TrainDate')) {
            throw 'Must have \'TrainDate\' parameter.';            
        }

        var pattern = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
        if (!params.TrainDate.match(pattern)) {
            throw 'Your date parameter must be in the format \'dd/mm/yyyy\'.';        
        }

        request({
            url: url,
            method: 'POST',
            form: params
        }, function (error, response, body) {
            if (error) {
                throw error;
            } else if (response.statusCode != 200) {
                throw body;                
            }
            else {
                if (isJSONResponse) {
                    parseString(body, function (err, result) {
                        if (err) {
                            throw err;
                        }
                        else {
                            return resolve(result);
                        }
                    });
                } else {                    
                    return resolve(body);
                }
            }            
        });
    })
    }
    catch(err) {
        throw err;
    }
};

exports.getHaconTrains = function (isJSONResponse = false) {
    try {
        return new Promise((resolve, reject) => {

        if (typeof(isJSONResponse) !== "boolean") {
            throw 'The isJSONResponse parameter must be a boolean';            
        }
        var url = 'http://api.irishrail.ie/realtime/realtime.asmx/getHaconTrainsXML';

        request({
            url: url,
            method: 'POST',
            form: {}
        }, function (error, response, body) {
            if (error) {
                throw error;
            }
            else if (response.statusCode != 200) {
                throw body;                
            } else {
                if (isJSONResponse) {
                    parseString(body, function (err, result) {
                        if (err) {
                            throw err;
                        }
                        else {
                            return resolve(result);
                        }
                    });
                } else {
                    return resolve(body);
                }
            }            
        });
    })
    } catch (err) {
        throw err;    
    }
};
