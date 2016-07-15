# irishrail-realtime-node
This is a Node.js Module for the IrishRail Real time service.

This Module is based off the following website:  
1. http://api.irishrail.ie/realtime/  
2. http://api.irishrail.ie/realtime/realtime.asmx  

## Installation ##

`npm install irishrail-realtime-node`
## Usage ##
This needs to be included.
```javascript
var irishRailApi = require('irishrail-realtime-node');
```
## How to use ##
### Json Response ###
By default the irish rail Api returns all responses in XML. I have provided a way of converting the returned response to JSON instead of xml.
You can request a JSON response by setting the isJSONResponse parameter to either true or false.  
Note: This parameter must be set.
```javascript
irishRailApi.getAllStations(params,true,callback);
```
### Callback ###
** The response is returned in the callback **  
The call back should be a function that takes one parameter. It should be passed into all method calls.  
If the status is 0 and error has occurred.  
If the status is 1 the api has been sucessful.  
The returnedResponse looks like this. 
```javascript
var returnedResponse = {status: 0, response: someResponseObject};
```

Note: This parameter must be set.
Example of what a callback should look like:
```javascript
    var callback = function (returnedResponse) {
        if(returnedResponse.status === 0){
            //and error has occurred
            console.log(returnedResponse.response)
        }else if(returnedResponse.status === 1){
            // success
            console.log(returnedResponse.response)
        }
    };
```
### Get all Stations ###

This example reutrns a list off all stations
```javascript
var params = {};
irishRailApi.getAllStations(params,false,callback);
```
This example reutrns a list off all stations by type.  
Note: Possible values for the StationType parameter (A for All, M for Mainline, S for suburban and D for DART) any other value will be changed to A.
```javascript
var params = { StationType:'D'};
irishRailApi.getAllStations(params,false,callback);
```

### Get Current Trains ###

This example reutrns a list off all current trains.
```javascript
var params = {};
irishRailApi.getCurrentTrains(params,false,callback);
```
This example reutrns a list off all DART stations.  
Note: Possible values for the TrainType parameter (A for All, M for Mainline, S for suburban and D for DART) any other value will be changed to A.
```javascript
var params = { TrainType:'D'};
irishRailApi.getCurrentTrains(params,false,callback);
```

### Get Station Data ###
The getStationData method must have 'StationDesc' or 'StationCode' as a parameter.
These bits of information can be gotten from the getAllStations api call.  
An options parameter is 'NumMins' which returns all trains due to serve the named station in the next x minutes.  
This example reutrns a stations current information.
```javascript
var params = { StationCode:'BFSTC', NumMins:'25'};
irishRailApi.getStationData(params,false,callback);
```
### Get Station Filter ###
The getStationsFilter method must have 'StationText' as a parameter.
This method returns a list of station names that contain the StationText.  
```javascript
var params = { StationText:'br'};
irishRailApi.getStationsFilter(params,true,callback);
```

### Get Train Movements ###
The getTrainMovements method must have 'TrainId' and 'TrainDate' as a parameters.  
The date for the 'TrainDate' parameter should be in dd/mm/yyyy format.  
This method returns all stop information for the given train.
```javascript
var params = { TrainId:'123TR', TrainDate: '14/07/2016'};
irishRailApi.getTrainMovements(params,true,callback);
```

### Get Hacon Trains ###
The getHaconTrains method doesn't take a params argument like all the previous methods.  
This method returns all hacon trains.
```javascript
irishRailApi.getHaconTrains(false,callback);
```
