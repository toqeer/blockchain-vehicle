
var express = require('express');
var basic = require('./basic');
var user = require('./user');
var manufacturer = require('./manufacturer');
var ministory = require('./ministory');

var app = express();
var cors = require('cors');
app.use(cors());
app.use(express.json());


app.post('/signUp', function(req, res){
	console.log("signUp called");
	basic.signUp.signUp(req,res);
});


app.post('/logIn', function(req, res){
	console.log("logIn called");
	basic.logIn.logIn(req,res);
});

app.get('/getAllManufacturers', function(req, res){
	console.log("getAllManufacturers called");
	basic.getAllManufacturers.getAllManufacturers(req,res);
});

app.get('/getAllMinistory', function(req, res){
	console.log("getAllMinistory called");
	basic.getAllMinistory.getAllMinistory(req,res);
});


app.post('/registerVehicle', function(req, res){
	console.log("registerVehicle called");
	user.registerVehicle.registerVehicle(req,res);
});


app.get('/getAllVehicles', function(req, res){
	console.log("getAllVehicles called");
	user.getAllVehicles.getAllVehicles(req,res);
});

app.get('/getAllVehicleOrders_user', function(req, res){
	console.log("getAllVehicleOrders_user called");
	user.getAllVehicleOrders.getAllVehicleOrders(req,res);
});



app.post('/placeVehicleOrder', function(req, res){
	console.log("placeVehicleOrder called");
	user.placeVehicleOrder.placeVehicleOrder(req,res);
});


app.get('/getAllVehicleOrders_manufacturer', function(req, res){
	console.log("getAllVehicleOrders_manufacturer called");
	manufacturer.getAllVehicleOrders.getAllVehicleOrders(req,res);
});


app.post('/updateVehicleOrderStatus_manufacturer', function(req, res){
	console.log("updateVehicleOrderStatus_manufacturer called");
	manufacturer.updateVehicleOrderStatus.updateVehicleOrderStatus(req,res);
});



app.post('/transferVehicle', function(req, res){
	console.log("transferVehicle called");
	user.transferVehicle.transferVehicle(req,res);
});

app.post('/acceptTransferVehicle', function(req, res){
	console.log("acceptTransferVehicle called");
	user.acceptTransferVehicle.acceptTransferVehicle(req,res);
});


app.post('/cancelTransferVehicle', function(req, res){
	console.log("cancelTransferVehicle called");
	user.cancelTransferVehicle.cancelTransferVehicle(req,res);
});


app.post('/placeLicenseOrder', function(req, res){
	console.log("placeLicenseOrder called");
	user.placeLicenseOrder.placeLicenseOrder(req,res);
});


app.get('/getAllLicenses', function(req, res){
	console.log("getAllLicenses called");
	user.getAllLicenses.getAllLicenses(req,res);
});


app.get('/getAllLicenseOrders_user', function(req, res){
	console.log("getAllLicenseOrders called");
	user.getAllLicenseOrders.getAllLicenseOrders(req,res);
});
//--------------------------------Ministory-------------------------------------------------

app.post('/approveTransferVehicle', function(req, res){
	console.log("approveTransferVehicle called");
	ministory.approveTransferVehicle.approveTransferVehicle(req,res);
});

app.post('/updateLicenseOrderStatus', function(req, res){
	console.log("updateLicenseOrderStatus called");
	ministory.updateLicenseOrderStatus.updateLicenseOrderStatus(req,res);
});


app.post('/cancelLicense', function(req, res){
	console.log("cancelLicense called");
	ministory.cancelLicense.cancelLicense(req,res);
});

app.get('/getAllLicenses_ministory', function(req, res){
	console.log("getAllLicenses called");
	ministory.getAllLicenses.getAllLicenses(req,res);
});

app.get('/getAllLicenseOrders_ministory', function(req, res){
	console.log("getAllLicenseOrders called");
	ministory.getAllLicenseOrders.getAllLicenseOrders(req,res);
});

//---------------------------------------------------------------------------------

process.on('unhandledRejection', (reason, promise) => {
    console.log('Unhandled Rejection. This might crash the service');
    console.log('Unhandled Rejection at:', reason.stack || reason);
})

process.on('uncaughtException', (reason, promise) => {
    console.log('Uncaught Exception. This might crash the service');
    console.log('Unhandled Exception at:', reason.stack || reason)
})

var server = app.listen(3001, function () {
    //var host = server.address().address
    var port = server.address().port;
    console.log("The server is listening at port :%s", port);    
});