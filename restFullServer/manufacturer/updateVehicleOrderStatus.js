var request = require("request");
var jwtToken = require('../basic/jwtToken.js');

async function updateVehicleOrderStatus(req,res) {

    var vIn= req.body.vIn;
    var orderStatus= req.body.orderStatus;
    var orderId= req.body.orderId;

    let token = req.headers['x-access-token'] || req.headers['authorization'];
    var verifyTokenResp= await jwtToken.verifyToken(token);
  
    if (!verifyTokenResp.data)
        return res.status(401).send(JSON.stringify({success: false, message:verifyTokenResp.error}));
    
    var companyId=verifyTokenResp.data.companyId;
    var order = "resource:org.ksa.vehicle.manufacturer.Order#"+orderId;

    if(orderStatus=='VIN_ASSIGNED'|| orderStatus=='OWNER_ASSIGNED'|| orderStatus=='DELIVERED'){
        if(!vIn)
            return res.status(422).send(JSON.stringify({success: false, message:'vIn id not provided'}));

        var options = {
            method: 'POST',
            url: 'http://localhost:3000/api/org.ksa.vehicle.manufacturer.UpdateOrderStatus',
            headers: {'content-type': 'application/json'},
            body: {
                "$class": "org.ksa.vehicle.manufacturer.UpdateOrderStatus",
                "orderStatus": orderStatus,
                "vin": vIn,
                "order": order
            },
            json: true
        };
    }
    else{
        var options = {
            method: 'POST',
            url: 'http://localhost:3000/api/org.ksa.vehicle.manufacturer.UpdateOrderStatus',
            headers: {'content-type': 'application/json'},
            body: {
                "$class": "org.ksa.vehicle.manufacturer.UpdateOrderStatus",
                "orderStatus": orderStatus,
                "order": order
            },
            json: true
        };
    }
    //console.log(JSON.stringify(options));
    
    request(options, function (error, response, body) {
        if (error){
        console.log(error);
        return res.status(500).send(JSON.stringify({success: false, message:error}));
        }
        //body=JSON.parse(body);

        if (response.statusCode!=200){
        if(body.error.message && body.error.message.includes('object already exists'))
            return res.status(409).send(JSON.stringify({success: false, message:'Vehicle vIn Already registered.'}));
        else
            return res.status(response.statusCode).send(JSON.stringify({success: false, message: body.error.message}));
        }
        
        var result= {success: true, result: {message: "Vehicle Order Updated Successfully" , trxId: body.transactionId}};
        return res.send(JSON.stringify(result));
    });
    

}   

module.exports={
    updateVehicleOrderStatus
}
