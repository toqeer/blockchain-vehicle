var request = require("request");
//var jwtToken = require('../basic/jwtToken.js');
async function getAllVehicle(req,res) {

    options = {
        method: 'GET',
        url: 'http://localhost:3000/api/org.vda.vehicle',
        //qs: {limit: 2},
        headers: {accept: 'application/json'},
        json: true
    };
    
    
    request(options, async function (error, response, body) {
        if (error)
            return res.status(500).send(JSON.stringify({success: false, message:error}));

        if (response.statusCode!=200)
            return res.status(response.statusCode).send(JSON.stringify({success: false, message: body.error.message}));


        body.forEach(element => {
            delete element.$class; 
            delete element.vehicleDetails.$class;
            delete element.vehicleStatus;
            if(element.owner)
                element.owner = element.owner.slice(element.owner.lastIndexOf('#') + 1);
            if(element.transferDetails)
                delete element.transferDetails;
        });
        return res.send(JSON.stringify({success: true, result: body}));
    });
    

}

module.exports={
    getAllVehicle
}
