
var express = require('express');
var basic = require('./basic');
var user = require('./user');
var manufacturer = require('./manufacturer');
var ministory = require('./ministory');
var fahas = require('./fahas');
var takaful = require('./takaful');

var app = express();
var cors = require('cors');
app.use(cors());
app.use(express.json());

//-------------------------basic----------------------------------

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
app.get('/getAllVehicle', function(req, res){
	console.log("getAllVehicle called");
	basic.getAllVehicle.getAllVehicle(req,res);
});


app.get('/getTransactionDetails', function(req, res){
	console.log("getTransactionDetails called");
	basic.getTransactionDetails.getTransactionDetails(req,res);
});

app.get('/getVehicleFahasRecord', function(req, res){
	console.log("getVehicleFahasRecord called");
	basic.getVehicleFahasRecord.getVehicleFahasRecord(req,res);
});

app.get('/getVehicleTakafulRecord', function(req, res){
	console.log("getVehicleTakafulRecord called");
	basic.getVehicleTakafulRecord.getVehicleTakafulRecord(req,res);
});


//-------------------------user------------------------------------

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

app.get('/getAllTransferRequests_user', function(req, res){
	console.log("getAllTransferRequests_user called");
	user.getAllTransferRequests.getAllTransferRequests(req,res);
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

app.get('/getAllTransactions_user', function(req, res){
	console.log("getAllTransactions called");
	user.getAllTransactions.getAllTransactions(req,res);
});

app.get('/getAllTransactions_manufacturer', function(req, res){
	console.log("getAllTransactions called");
	manufacturer.getAllTransactions.getAllTransactions(req,res);
});

app.get('/getAllVehicleTransactions', function(req, res){
	console.log("getAllVehicleTransactions called");
	user.getAllVehicleTransactions.getAllVehicleTransactions(req,res);
});
//--------------------------------Ministory-------------------------------------------------

app.post('/approveVehicle', function(req, res){
	console.log("approveVehicle called");
	ministory.approveVehicle.approveVehicle(req,res);
});

app.get('/getUnApprovedVehicles', function(req, res){
	console.log("getUnApprovedVehicles called");
	ministory.getUnApprovedVehicles.getUnApprovedVehicles(req,res);
});

app.post('/approveTransferVehicle', function(req, res){
	console.log("approveTransferVehicle called");
	ministory.approveTransferVehicle.approveTransferVehicle(req,res);
});

app.post('/updateLicenseOrderStatus', function(req, res){
	console.log("updateLicenseOrderStatus called");
	ministory.updateLicenseOrderStatus.updateLicenseOrderStatus(req,res);
});


app.post('/revokeLicense', function(req, res){
	console.log("revokeLicense called");
	ministory.revokeLicense.revokeLicense(req,res);
});


app.post('/unRevokeLicense', function(req, res){
	console.log("unRevokeLicense called");
	ministory.unRevokeLicense.unRevokeLicense(req,res);
});

app.get('/getAllLicenses_ministory', function(req, res){
	console.log("getAllLicenses called");
	ministory.getAllLicenses.getAllLicenses(req,res);
});

app.get('/getAllLicenseOrders_ministory', function(req, res){
	console.log("getAllLicenseOrders called");
	ministory.getAllLicenseOrders.getAllLicenseOrders(req,res);
});

app.get('/getAllTransferRequests', function(req, res){
	console.log("getAllTransferRequests called");
	ministory.getAllTransferRequests.getAllTransferRequests(req,res);
});

app.get('/getAllTransactions_ministory', function(req, res){
	console.log("getAllTransactions called");
	ministory.getAllTransactions.getAllTransactions(req,res);
});
//---------------------------------------Fahas---------------------------------------


app.get('/getAllFahasRecord', function(req, res){
	console.log("getAllFahasRecord called");
	fahas.getAllFahasRecord.getAllFahasRecord(req,res);
});


app.post('/addFahasRecord', function(req, res){
	console.log("addFahasRecord called");
	fahas.addFahasRecord.addFahasRecord(req,res);
});

app.get('/getAllTransactions_fahas', function(req, res){
	console.log("getAllTransactions called");
	fahas.getAllTransactions.getAllTransactions(req,res);
});

//---------------------------------------Takaful---------------------------------------


app.get('/getAllTakafulRecord', function(req, res){
	console.log("getAllTakafulRecord called");
	takaful.getAllTakafulRecord.getAllTakafulRecord(req,res);
});


app.post('/addTakafulRecord', function(req, res){
	console.log("addTakafulRecord called");
	takaful.addTakafulRecord.addTakafulRecord(req,res);
});

app.get('/getAllTransactions_takaful', function(req, res){
	console.log("getAllTransactions called");
	takaful.getAllTransactions.getAllTransactions(req,res);
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