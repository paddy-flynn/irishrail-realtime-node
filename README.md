
# irishrail-realtime-node

This is a Node.js Module for the IrishRail Real time service.

This Module works with ECMAScript 6.

This Module is based off the following websites:

1. http://api.irishrail.ie/realtime/

2. http://api.irishrail.ie/realtime/realtime.asmx

## Installation ##

npm install irishrail-realtime-node

## Usage ##

This needs to be included.

```javascript
const  irishRailApi = require('irishrail-realtime-node');
```

## How to use ##

### Json Response ###

By default the irish rail Api returns all responses in XML. I have provided a way of converting the returned response to JSON instead of xml.

You can request a JSON response by setting the isJSONResponse parameter to either true or false.

Note: This default value for this parameter is false .

```javascript
irishRailApi.getAllStations(); // returns all stations in XML format

OR

irishRailApi.getAllStations(true,params); // returns all stations filtered by params in JSON format

OR

irishRailApi.getAllStations(true); // returns all stations in JSON format
```

### Parameters ###

The params argument is optional for getAllStations and getCurrentTrains and is not included at all in getHaconTrains.

In methods where the parameter is optional it can be called without it as shown below.

```javascript
irishRailApi.getAllStations(true,params); // returns all stations filtered by params in JSON format

OR

irishRailApi.getAllStations(true); // returns all stations in JSON format
```
### Exceptions ###
If there is an error calling the irish rail api the error will be thrown.
You should catach these exceptions in by calling there functions in a try catch block.
Example:
```javascript
try {  
  let stations = await irishRailApi.getAllStations();  
  return res.status(200).send(stations);  
} catch (error) {  
  return res.status(400).json({status: 400, message: error});  
}
```

### Promises ###
All the methods uses promises so you can use the await command when calling these methods.
Example:
```javascript
let trains = await irishRailApi.getCurrentTrains(true);
```

### Get all Stations ###

This example returns a list of all stations in XML format

```javascript
irishRailApi.getAllStations();
```
The below example returns a list of all stations in JSON format.

```javascript
irishRailApi.getAllStations(true);
```
This example returns a list off all stations by type in JSON format.

Note: Possible values for the StationType parameter (A for All, M for Mainline, S for suburban and D for DART) any other value will be changed to A.

```javascript
var  params = { StationType:'D'};

irishRailApi.getAllStations(true,params);
```
### Get Current Trains ###

This example returns a list off all current trains in XML format.

```javascript
irishRailApi.getCurrentTrains();
```

This example returns a list off all current trains in JSON format.

```javascript
irishRailApi.getCurrentTrains(true);
```

This example returns a list off all DART stations in JSON format.

Note: Possible values for the TrainType parameter (A for All, M for Mainline, S for suburban and D for DART) any other value will be changed to A.

```javascript
var  params = { TrainType:'D'};

irishRailApi.getCurrentTrains(true,params);
```
### Get Station Data ###

The getStationData method must have 'StationDesc' or 'StationCode' as a parameter.

These bits of information can be gotten from the getAllStations api call.

An options parameter is 'NumMins' which returns all trains due to serve the named station in the next x minutes.

This example reutrns a stations current information.

```javascript
var  params = { StationCode:'BFSTC', NumMins:'25'};

irishRailApi.getStationData(true,params);
```
### Get Station Filter ###

The getStationsFilter method must have 'StationText' as a parameter.

This method returns a list of station names that contain the StationText.

```javascript

var  params = { StationText:'br'};

irishRailApi.getStationsFilter(true,params);
```
 
### Get Train Movements ###

The getTrainMovements method must have 'TrainId' and 'TrainDate' as a parameters.

The date for the 'TrainDate' parameter should be in dd/mm/yyyy format.

This method returns all stop information for the given train.

```javascript
var  params = { TrainId:'123TR', TrainDate:  '19/03/2018'};

irishRailApi.getTrainMovements(true,params);
```
### Get Hacon Trains ###

The getHaconTrains method doesn't take a params argument like all the previous methods.

This method returns all hacon trains.

```javascript
irishRailApi.getHaconTrains(); // will return in XML

OR

irishRailApi.getHaconTrains(true); // will return in JSON
```